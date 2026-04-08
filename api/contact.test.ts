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

const VALID_ORIGIN_HEADERS = {
  origin: 'https://portafolio-samir-tau.vercel.app',
};

const VALID_PAYLOAD = {
  name: 'Samir',
  email: 'samir@example.com',
  message: 'Hello from the website. I would like to discuss an analyst opportunity.',
  startedAt: Date.now() - 10_000,
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

  it('returns silent success for honeypot submissions', async () => {
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        headers: VALID_ORIGIN_HEADERS,
        body: {
          ...VALID_PAYLOAD,
          company: 'Bot Corp',
        },
      },
      response
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ ok: true, message: 'Message sent successfully.' });
  });

  it('rejects invalid payloads with a generic message', async () => {
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        headers: VALID_ORIGIN_HEADERS,
        body: { ...VALID_PAYLOAD, name: 'S', message: 'short' },
      },
      response
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Unable to submit this message right now. Please review your information and try again.',
    });
  });

  it('rejects submissions that are too fast', async () => {
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        headers: VALID_ORIGIN_HEADERS,
        body: {
          ...VALID_PAYLOAD,
          startedAt: Date.now() - 2_000,
        },
      },
      response
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Unable to submit this message right now. Please review your information and try again.',
    });
  });

  it('rejects submissions that are too old', async () => {
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        headers: VALID_ORIGIN_HEADERS,
        body: {
          ...VALID_PAYLOAD,
          startedAt: Date.now() - 3 * 60 * 60 * 1000,
        },
      },
      response
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Unable to submit this message right now. Please review your information and try again.',
    });
  });

  it('rejects requests from disallowed origins', async () => {
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        headers: {
          origin: 'https://example.com',
        },
        body: VALID_PAYLOAD,
      },
      response
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Unable to submit this message right now. Please review your information and try again.',
    });
  });

  it('sends an email through Resend when payload and origin are valid', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: 'email_123' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const response = createResponse();

    await handler(
      {
        method: 'POST',
        headers: VALID_ORIGIN_HEADERS,
        body: VALID_PAYLOAD,
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
