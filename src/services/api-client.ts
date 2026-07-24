type RequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: BodyInit | Record<string, unknown> | null;
  headers?: Record<string, string>;
  skipAuth?: boolean;
};

export const apiUrl = normalizeApiUrl(import.meta.env.VITE_API_URL);
const authTokenKey = 'pharmacontrol.accessToken';
const authUserKey = 'pharmacontrol.user';
const isDev = import.meta.env.DEV;

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const token = options.skipAuth ? null : getAccessToken();
  const method = options.method ?? 'GET';
  const url = `${apiUrl}${path}`;
  const headers: Record<string, string> = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  logApiRequest({ body: options.body, method, path, url });

  const response = await fetch(url, {
    ...options,
    body: serializeBody(options.body),
    headers,
  }).catch((error: unknown) => {
    logApiNetworkError({ error, method, path, url });
    throw new ApiError(0, 'No se pudo conectar con la API.');
  });

  if (!response.ok) {
    const errorBody = await readErrorBody(response);
    logApiResponse({ body: errorBody.raw, method, path, response, url });
    throw new ApiError(response.status, errorBody.message);
  }

  if (response.status === 204) {
    logApiResponse({ body: null, method, path, response, url });
    return undefined as T;
  }

  const data = (await response.json()) as T;
  logApiResponse({ body: data, method, path, response, url });
  return data;
}

function normalizeApiUrl(value: string | undefined) {
  return value ? value.replace(/\/$/, '') : '';
}

export function getAccessToken() {
  return window.localStorage.getItem(authTokenKey);
}

export function setAccessToken(token: string) {
  window.localStorage.setItem(authTokenKey, token);
}

export function getStoredUser<T>() {
  const value = window.localStorage.getItem(authUserKey);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    clearStoredUser();
    return null;
  }
}

export function setStoredUser(user: unknown) {
  window.localStorage.setItem(authUserKey, JSON.stringify(user));
}

export function clearStoredUser() {
  window.localStorage.removeItem(authUserKey);
}

export function clearAccessToken() {
  window.localStorage.removeItem(authTokenKey);
}

export function clearAuthSession() {
  clearAccessToken();
  clearStoredUser();
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function serializeBody(body: RequestOptions['body']) {
  if (!body || body instanceof FormData || typeof body === 'string') {
    return body as BodyInit | null | undefined;
  }

  return JSON.stringify(body);
}

async function readErrorBody(response: Response) {
  try {
    const data = (await response.json()) as { message?: string | string[]; error?: string };
    if (Array.isArray(data.message)) {
      return {
        message: data.message.join(', '),
        raw: data,
      };
    }
    return {
      message: data.message ?? data.error ?? `API request failed with status ${response.status}`,
      raw: data,
    };
  } catch {
    return {
      message: `API request failed with status ${response.status}`,
      raw: null,
    };
  }
}

function logApiRequest({
  body,
  method,
  path,
  url,
}: {
  body: RequestOptions['body'];
  method: string;
  path: string;
  url: string;
}) {
  if (!isDev) {
    return;
  }

  console.groupCollapsed(`[API request] ${method} ${path}`);
  console.info('URL:', url);
  if (body) {
    console.info('Body:', sanitizeBody(body));
  }
  console.groupEnd();
}

function logApiResponse({
  body,
  method,
  path,
  response,
  url,
}: {
  body: unknown;
  method: string;
  path: string;
  response: Response;
  url: string;
}) {
  if (!isDev) {
    return;
  }

  const logger = response.ok ? console.info : console.error;
  console.groupCollapsed(`[API response] ${method} ${path} ${response.status}`);
  logger('URL:', url);
  logger('Status:', response.status, response.statusText);
  logger('Body:', body);
  console.groupEnd();
}

function logApiNetworkError({
  error,
  method,
  path,
  url,
}: {
  error: unknown;
  method: string;
  path: string;
  url: string;
}) {
  if (!isDev) {
    return;
  }

  console.groupCollapsed(`[API network error] ${method} ${path}`);
  console.error('URL:', url);
  console.error('Error:', error);
  console.info('Revisa si la API esta encendida y si CORS permite el origen del frontend.');
  console.groupEnd();
}

function sanitizeBody(body: RequestOptions['body']) {
  if (body instanceof FormData) {
    return '[FormData]';
  }

  if (!body || typeof body === 'string' || !isPlainObject(body)) {
    return body;
  }

  const sanitized: Record<string, unknown> = { ...body };
  for (const key of Object.keys(sanitized)) {
    if (/password|contrase/i.test(key)) {
      sanitized[key] = '[hidden]';
    }
  }
  return sanitized;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}
