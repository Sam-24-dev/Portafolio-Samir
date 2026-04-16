import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from './Contact';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import type { PortfolioRouteMode } from '../lib/portfolioRoute';

const portfolioEvents: CustomEvent[] = [];

const capturePortfolioEvent = (event: Event) => {
  portfolioEvents.push(event as CustomEvent);
};

const renderContact = (routeMode: PortfolioRouteMode = 'analyst') =>
  render(
    <ThemeProvider>
      <LanguageProvider>
        <Contact routeMode={routeMode} />
      </LanguageProvider>
    </ThemeProvider>
  );

const fillContactForm = () => {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Samir' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'samir@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Hello there. I would like to discuss an analyst opportunity.' },
  });
};

describe('Contact form', () => {
  beforeEach(() => {
    localStorage.setItem('portfolio-language', 'en');
    localStorage.removeItem('portfolio-contact-last-success-at');
    portfolioEvents.length = 0;
    window.addEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
  });

  afterEach(() => {
    window.removeEventListener('portfolio:analytics', capturePortfolioEvent as EventListener);
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('shows an error when the contact API fails and tracks the failure without PII', async () => {
    let now = 1_710_000_000_000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn().mockResolvedValue({
        message: 'Unable to submit this message right now. Please review your information and try again.',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContact();
    fillContactForm();
    now += 3_000;
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(
      await screen.findByText('Contact form is not configured yet. Add the contact service environment variables to enable it.')
    ).toBeInTheDocument();
    expect(portfolioEvents.at(-1)?.detail).toEqual({
      name: 'contact_submit_error',
      location: 'contact',
      language: 'en',
      routeMode: 'analyst',
    });
    expect(portfolioEvents.at(-1)?.detail).not.toHaveProperty('email');
    expect(portfolioEvents.at(-1)?.detail).not.toHaveProperty('message');
    expect(portfolioEvents.at(-1)?.detail).not.toHaveProperty('company');
  });

  it('submits successfully through the contact API, sends startedAt, resets the form, and tracks success', async () => {
    let now = 1_710_000_000_000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true, message: 'Message sent successfully.' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContact();
    fillContactForm();
    now += 3_000;
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: expect.any(String),
        })
      );
    });

    const requestBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);

    expect(requestBody).toMatchObject({
      name: 'Samir',
      email: 'samir@example.com',
      message: 'Hello there. I would like to discuss an analyst opportunity.',
      company: '',
      startedAt: 1_710_000_000_000,
    });

    expect(await screen.findByText("Message sent successfully. I'll get back to you soon.")).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
    expect(localStorage.getItem('portfolio-contact-last-success-at')).toBe('1710000003000');
    expect(portfolioEvents.at(-1)?.detail).toEqual({
      name: 'contact_submit_success',
      location: 'contact',
      language: 'en',
      routeMode: 'analyst',
    });
  });

  it('shows the faster feedback when the form is submitted too quickly', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    renderContact();
    fillContactForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Please wait a moment before sending the form.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(portfolioEvents.at(-1)?.detail).toEqual({
      name: 'contact_submit_error',
      location: 'contact',
      language: 'en',
      routeMode: 'analyst',
    });
  });

  it('blocks repeat submissions during the client cooldown window', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(1_710_000_050_000);
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    localStorage.setItem('portfolio-contact-last-success-at', '1710000000000');

    renderContact();
    fillContactForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Please wait 10s before sending another message.')).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(portfolioEvents.at(-1)?.detail).toEqual({
      name: 'contact_submit_error',
      location: 'contact',
      language: 'en',
      routeMode: 'analyst',
    });
  });

  it('adds form autocomplete hygiene and tracks external contact links', () => {
    renderContact();

    expect(screen.getByLabelText('Name')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText('Email')).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByLabelText('Email')).toHaveAttribute('spellcheck', 'false');
    expect(screen.getByLabelText('Email')).toHaveAttribute('autocapitalize', 'off');
    expect(screen.getByLabelText('Email')).toHaveAttribute('autocorrect', 'off');
    expect(screen.getByLabelText('Message')).toHaveAttribute('autocomplete', 'off');

    fireEvent.click(screen.getByRole('link', { name: 'linkedin.com/in/samir-caizapasto' }));

    expect(portfolioEvents[0].detail).toEqual({
      name: 'external_profile_click',
      location: 'contact',
      language: 'en',
      routeMode: 'analyst',
      target: 'linkedin_profile',
    });
  });

  it('keeps the engineering route context in shared contact analytics', async () => {
    let now = 1_710_000_000_000;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true, message: 'Message sent successfully.' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContact('engineer');
    fillContactForm();
    now += 3_000;
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText("Message sent successfully. I'll get back to you soon.")).toBeInTheDocument();
    expect(portfolioEvents.at(-1)?.detail).toEqual({
      name: 'contact_submit_success',
      location: 'contact',
      language: 'en',
      routeMode: 'engineer',
    });

    fireEvent.click(screen.getByRole('link', { name: 'github.com/Sam-24-dev' }));

    expect(portfolioEvents.at(-1)?.detail).toEqual({
      name: 'external_profile_click',
      location: 'contact',
      language: 'en',
      routeMode: 'engineer',
      target: 'github_profile',
    });
  });

  it('changes the shared support copy based on the active profile', () => {
    const { rerender } = renderContact('analyst');

    expect(
      screen.getByText(/turn data into clear analysis, useful dashboards, and better-informed decisions/i)
    ).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <LanguageProvider>
          <Contact routeMode="engineer" />
        </LanguageProvider>
      </ThemeProvider>
    );

    expect(
      screen.getByText(/build reliable pipelines, automate data delivery, and turn analysis into reviewable public products/i)
    ).toBeInTheDocument();
  });
});
