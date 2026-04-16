type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  startedAt?: number;
};

type ContactErrorCode = 'invalid_submission' | 'too_fast';

type RequestLike = {
  method?: string;
  body?: ContactPayload | string;
  headers?: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  setHeader: (name: string, value: string) => void;
  json: (payload: unknown) => void;
  end: (payload?: string) => void;
};

const RESEND_API_URL = 'https://api.resend.com/emails';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 20;
const MIN_FORM_FILL_MS = 2_000;
const MAX_FORM_AGE_MS = 2 * 60 * 60 * 1000;
const INVALID_SUBMISSION_MESSAGE = 'Unable to submit this message right now. Please review your information and try again.';
const TOO_FAST_SUBMISSION_MESSAGE = 'Please wait a moment before sending the form.';
const INVALID_SUBMISSION_CODE: ContactErrorCode = 'invalid_submission';
const TOO_FAST_SUBMISSION_CODE: ContactErrorCode = 'too_fast';

const parseBody = (body: RequestLike['body']): ContactPayload => {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactPayload;
    } catch {
      return {};
    }
  }

  return body;
};

const normalize = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const normalizeNumber = (value: unknown) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  return value;
};

const stripControlChars = (value: string, preserveNewline: boolean) =>
  Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);

      if (code === 127) {
        return false;
      }

      if (code < 32) {
        return preserveNewline && code === 10;
      }

      return true;
    })
    .join('');

const sanitizeHeaderValue = (value: string) =>
  stripControlChars(value.replaceAll('\r', ' ').replaceAll('\n', ' '), false)
    .replace(/\s+/g, ' ')
    .trim();

const sanitizeTextValue = (value: string) =>
  stripControlChars(value.replace(/\r\n?/g, '\n'), true).trim();

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const isValidPayload = (payload: ContactPayload) => {
  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const message = normalize(payload.message);

  return Boolean(
    name &&
      email &&
      message &&
      name.length >= MIN_NAME_LENGTH &&
      name.length <= MAX_NAME_LENGTH &&
      email.length <= MAX_EMAIL_LENGTH &&
      message.length >= MIN_MESSAGE_LENGTH &&
      message.length <= MAX_MESSAGE_LENGTH &&
      EMAIL_PATTERN.test(email)
  );
};

const getHeaderValue = (headers: RequestLike['headers'], targetHeader: string) => {
  if (!headers) {
    return '';
  }

  const matchedEntry = Object.entries(headers).find(([headerName]) => headerName.toLowerCase() === targetHeader);
  const value = matchedEntry?.[1];

  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return typeof value === 'string' ? value : '';
};

const getRequestOrigin = (headers: RequestLike['headers']) => {
  const originHeader = getHeaderValue(headers, 'origin');

  if (originHeader) {
    try {
      return new URL(originHeader).origin;
    } catch {
      return '';
    }
  }

  const refererHeader = getHeaderValue(headers, 'referer');

  if (!refererHeader) {
    return '';
  }

  try {
    return new URL(refererHeader).origin;
  } catch {
    return '';
  }
};

const isAllowedOrigin = (origin: string) => {
  if (!origin) {
    return false;
  }

  const productionOrigins = new Set([
    'https://portafolio-samir-tau.vercel.app',
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ]);

  if (productionOrigins.has(origin)) {
    return true;
  }

  try {
    const parsedOrigin = new URL(origin);
    return ['localhost', '127.0.0.1'].includes(parsedOrigin.hostname);
  } catch {
    return false;
  }
};

const getSubmissionWindowState = (startedAt: number | null) => {
  if (startedAt === null) {
    return 'invalid';
  }

  const age = Date.now() - startedAt;

  if (age < MIN_FORM_FILL_MS) {
    return 'too_fast';
  }

  if (age > MAX_FORM_AGE_MS) {
    return 'too_old';
  }

  return 'valid';
};

const buildEmailContent = (payload: Required<Pick<ContactPayload, 'name' | 'email' | 'message'>>) => {
  const subjectName = sanitizeHeaderValue(payload.name);
  const senderName = sanitizeHeaderValue(payload.name);
  const senderEmail = sanitizeHeaderValue(payload.email);
  const plainMessage = sanitizeTextValue(payload.message);
  const safeName = escapeHtml(senderName);
  const safeEmail = escapeHtml(senderEmail);
  const safeMessage = escapeHtml(plainMessage).replaceAll('\n', '<br />');

  return {
    subject: `Portfolio contact from ${subjectName}`,
    text: `New portfolio message from ${senderName} <${senderEmail}>.\n\n${plainMessage}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 12px;">New portfolio contact</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 16px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
          ${safeMessage}
        </div>
      </div>
    `.trim(),
  };
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.status(405).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
    return;
  }

  const payload = parseBody(req.body);

  // Silent success for obvious bot submissions.
  if (normalize(payload.company)) {
    res.status(200).json({ ok: true, message: 'Message sent successfully.' });
    return;
  }

  const requestOrigin = getRequestOrigin(req.headers);

  if (!isAllowedOrigin(requestOrigin)) {
    res.status(400).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
    return;
  }

  const submissionWindowState = getSubmissionWindowState(normalizeNumber(payload.startedAt));

  if (submissionWindowState === 'too_fast') {
    res.status(400).json({ code: TOO_FAST_SUBMISSION_CODE, message: TOO_FAST_SUBMISSION_MESSAGE });
    return;
  }

  if (submissionWindowState !== 'valid') {
    res.status(400).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
    return;
  }

  if (!isValidPayload(payload)) {
    res.status(400).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    res.status(500).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
    return;
  }

  const normalizedPayload = {
    name: normalize(payload.name),
    email: normalize(payload.email),
    message: normalize(payload.message),
  };
  const emailContent = buildEmailContent(normalizedPayload);

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: normalizedPayload.email,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html,
      }),
    });

    if (!response.ok) {
      res.status(502).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
      return;
    }

    res.status(200).json({ ok: true, message: 'Message sent successfully.' });
  } catch {
    res.status(502).json({ code: INVALID_SUBMISSION_CODE, message: INVALID_SUBMISSION_MESSAGE });
  }
}
