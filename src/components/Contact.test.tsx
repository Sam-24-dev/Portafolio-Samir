import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from './Contact';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

const renderContact = () =>
  render(
    <ThemeProvider>
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    </ThemeProvider>
  );

describe('Contact form', () => {
  beforeEach(() => {
    localStorage.setItem('portfolio-language', 'en');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows an error when the contact API fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: 'Email service unavailable.' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContact();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Samir' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'samir@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

    expect(await screen.findByText('Something went wrong. Please try again or email me directly.')).toBeInTheDocument();
  });

  it('submits successfully through the contact API and resets the form', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true, message: 'Message sent successfully.' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderContact();

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Samir' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'samir@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });
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
        })
      );
    });

    expect(await screen.findByText("Message sent successfully. I'll get back to you soon.")).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });
});
