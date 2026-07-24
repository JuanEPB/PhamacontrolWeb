type RequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
