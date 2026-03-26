import { beforeEach, describe, expect, it, vi } from 'vitest';
import handler from './contact';

type MockResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  status: (code: number) => MockResponse;
  setHeader: (name: string, value: string) => void;
  json: (payload: unknown) => void;
  end: (payload?: string) => void;
};

const createResponse = (): MockResponse => {
  const response: MockResponse = {
    statusCode: 200,
    headers: {},
    body: undefined,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    setHeader(name: string, value: string) {
      this.headers[name] = value;
    },
    json(payload: unknown) {
      this.body = payload;
    },
    end(payload?: string) {
      this.body = payload;
    },
  };

  return response;
};

describe('contact API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.RESEND_API_KEY = 're_test_key';
    process.env.CONTACT_TO_EMAIL = 'samir.leonardo.caizapasto04@gmail.com';
    process.env.CONTACT_FROM_EMAIL = 'Portfolio <onboarding@resend.dev>';
  });

  it('rejects non-POST requests', async () => {
    const response = createResponse();

    await handler({ method: 'GET' }, response);

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({ message: 'Method not allowed.' });
  });

  it('rejects invalid payloads', async () => {
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        body: { name: '', email: 'bad-email', message: '' },
      },
      response
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'Please complete all fields with valid information.' });
  });

  it('sends an email through Resend when payload is valid', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 'email_123' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        body: {
          name: 'Samir',
          email: 'samir@example.com',
          message: 'Hello from the website',
        },
      },
      response
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer re_test_key',
          'Content-Type': 'application/json',
        }),
      })
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true, message: 'Message sent successfully.' });
  });
});
