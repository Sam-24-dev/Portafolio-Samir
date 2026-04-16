import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '../context/LanguageContext';
import { caseStudies } from '../data/caseStudies';
import { projects } from '../data/projects';
import CaseStudyModal from './CaseStudyModal';

const renderCaseStudyModal = () =>
  render(
    <LanguageProvider>
      <CaseStudyModal
        caseStudy={caseStudies[0]}
        isOpen
        onClose={vi.fn()}
        onExited={vi.fn()}
        project={projects[0]}
        triggerElement={document.body}
      />
    </LanguageProvider>
  );

describe('CaseStudyModal', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('preserves the analyst overview and preview tabs', () => {
    renderCaseStudyModal();

    expect(screen.getByRole('tab', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Live Preview' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'Live Preview' }));

    expect(screen.getByTitle(/live preview/i)).toBeInTheDocument();
  });

  it('still closes on Escape', () => {
    const onClose = vi.fn();

    render(
      <LanguageProvider>
        <CaseStudyModal
          caseStudy={caseStudies[0]}
          isOpen
          onClose={onClose}
          onExited={vi.fn()}
          project={projects[0]}
          triggerElement={document.body}
        />
      </LanguageProvider>
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
