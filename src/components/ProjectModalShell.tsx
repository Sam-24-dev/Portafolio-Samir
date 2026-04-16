import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { KeyboardEvent as ReactKeyboardEvent, ReactNode, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalTheme = 'analyst' | 'engineering';

export interface ProjectModalTabDefinition {
  id: string;
  label: string;
  panelId: string;
  tabId: string;
  disabled?: boolean;
}

interface ProjectModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
  triggerElement: HTMLElement | null;
  theme: ModalTheme;
  badge: string;
  title: string;
  subtitle?: string;
  closeLabel: string;
  tabListLabel: string;
  tabs: ProjectModalTabDefinition[];
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  children: ReactNode;
  footer?: ReactNode;
}

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'));
};

const findNextEnabledTabIndex = (tabs: ProjectModalTabDefinition[], startIndex: number, direction: 1 | -1) => {
  const total = tabs.length;

  for (let step = 1; step <= total; step += 1) {
    const nextIndex = (startIndex + direction * step + total) % total;

    if (!tabs[nextIndex].disabled) {
      return nextIndex;
    }
  }

  return startIndex;
};

const ProjectModalShell = ({
  isOpen,
  onClose,
  onExited,
  triggerElement,
  theme,
  badge,
  title,
  subtitle,
  closeLabel,
  tabListLabel,
  tabs,
  activeTab,
  onSelectTab,
  children,
  footer,
}: ProjectModalShellProps) => {
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const restoreTarget = triggerElement ?? previouslyFocused;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const appShell = document.getElementById('app-shell');
    const previousAriaHidden = appShell?.getAttribute('aria-hidden') ?? null;
    const shellWasInert = appShell?.hasAttribute('inert') ?? false;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    if (appShell) {
      appShell.setAttribute('aria-hidden', 'true');
      appShell.setAttribute('inert', '');
    }

    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener('keydown', handleEscape);

      if (appShell) {
        if (previousAriaHidden === null) {
          appShell.removeAttribute('aria-hidden');
        } else {
          appShell.setAttribute('aria-hidden', previousAriaHidden);
        }

        if (shellWasInert) {
          appShell.setAttribute('inert', '');
        } else {
          appShell.removeAttribute('inert');
        }
      }

      restoreTarget?.focus();
    };
  }, [isOpen, onClose, triggerElement]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements(dialogRef.current);
    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (!activeElement || activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      return;
    }

    if (!activeElement || activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = findNextEnabledTabIndex(tabs, index, 1);
      tabRefs.current[nextIndex]?.focus();
      onSelectTab(tabs[nextIndex].id);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const previousIndex = findNextEnabledTabIndex(tabs, index, -1);
      tabRefs.current[previousIndex]?.focus();
      onSelectTab(tabs[previousIndex].id);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const firstIndex = findNextEnabledTabIndex(tabs, -1, 1);
      tabRefs.current[firstIndex]?.focus();
      onSelectTab(tabs[firstIndex].id);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const lastIndex = findNextEnabledTabIndex(tabs, 0, -1);
      tabRefs.current[lastIndex]?.focus();
      onSelectTab(tabs[lastIndex].id);
    }
  };

  const overlayTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.18, ease: 'easeOut' };
  const panelTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: 'easeOut' };
  const panelInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 };
  const tablistClassName =
    theme === 'engineering'
      ? 'inline-flex rounded-full border border-[var(--engineering-pill-border)] bg-[var(--engineering-pill-bg)] p-1'
      : 'ui-control-shell inline-flex rounded-full';

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {isOpen && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          className="fixed inset-0 z-[90] backdrop-blur-md dark:bg-primary-bg/80 light:bg-slate-900/40"
          onClick={onClose}
        >
          <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={panelInitial}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={panelInitial}
              transition={panelTransition}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={handleDialogKeyDown}
              className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[32px] border shadow-[0_28px_80px_rgba(15,23,42,0.22)] dark:border-primary-lighter dark:bg-primary-light light:border-lightMode-border light:bg-white sm:max-h-[90vh] sm:max-w-5xl sm:rounded-[32px]"
            >
              <div className="sticky top-0 z-20 border-b px-5 py-4 backdrop-blur-sm dark:border-primary-lighter dark:bg-primary-light/95 light:border-lightMode-border light:bg-lightMode-surface/95 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${
                        theme === 'engineering' ? 'ui-engineering-kicker' : 'ui-eyebrow'
                      }`}
                    >
                      {badge}
                    </p>
                    <h3
                      id={titleId}
                      className="text-2xl font-poppins font-bold dark:text-text-highlight light:text-lightMode-text-primary sm:text-3xl"
                    >
                      {title}
                    </h3>
                    {subtitle ? (
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed dark:text-text-secondary light:text-lightMode-text-secondary">
                        {subtitle}
                      </p>
                    ) : null}
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    aria-label={closeLabel}
                    className={`focus-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border transition-colors ${
                      theme === 'engineering'
                        ? 'border-[var(--engineering-pill-border)] bg-[var(--engineering-pill-bg)] text-[var(--engineering-pill-text)] hover:border-[var(--engineering-link)] hover:text-[var(--engineering-link)]'
                        : 'dark:border-primary-lighter dark:bg-primary-bg/80 dark:text-text-primary dark:hover:border-accent-cyan dark:hover:text-accent-cyan light:border-lightMode-border light:bg-lightMode-surfaceAlt light:text-lightMode-text-primary light:hover:border-lightMode-accent-primary light:hover:text-lightMode-accent-primary'
                    }`}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 overflow-x-auto pb-1">
                  <div role="tablist" aria-label={tabListLabel} className={tablistClassName}>
                    {tabs.map((tab, index) => {
                      const isSelected = activeTab === tab.id;
                      const tabClassName =
                        theme === 'engineering'
                          ? `focus-ring rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-[var(--engineering-chip-bg)] text-[var(--engineering-chip-text)]'
                                : 'text-[var(--engineering-link)] hover:bg-[var(--engineering-pill-bg)]'
                            } ${tab.disabled ? 'cursor-not-allowed opacity-50' : ''}`
                          : `focus-ring ui-control-toggle rounded-full ${
                              isSelected ? 'ui-control-toggle-active' : 'ui-control-toggle-idle'
                            } ${tab.disabled ? 'cursor-not-allowed opacity-50' : ''}`;

                      return (
                        <button
                          key={tab.id}
                          ref={(element) => {
                            tabRefs.current[index] = element;
                          }}
                          id={tab.tabId}
                          role="tab"
                          type="button"
                          aria-selected={isSelected}
                          aria-controls={tab.panelId}
                          tabIndex={isSelected ? 0 : -1}
                          disabled={tab.disabled}
                          onClick={() => !tab.disabled && onSelectTab(tab.id)}
                          onKeyDown={(event) => handleTabKeyDown(event, index)}
                          className={tabClassName}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto overscroll-contain px-5 pb-6 pt-5 light:bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] sm:px-6 sm:pb-8 md:px-8">
                {children}

                {footer ? (
                  <div className="mt-6 flex flex-col gap-3 border-t pt-5 dark:border-primary-lighter light:border-lightMode-border sm:flex-row sm:flex-wrap">
                    {footer}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModalShell;
