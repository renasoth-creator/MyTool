export const BACKEND_URL = "https://api.pdfconvert.tech";

// Helper: centralize fetch settings for the frontend API.
// Updated: omit credentials by default since backend uses x-api-key header (no cookies),
// and attach X-API-Key from Vite env variable VITE_API_KEY if present.
export async function apiFetch(path: string, options: RequestInit = {}) {
	const url = BACKEND_URL + path;

	const defaultHeaders: Record<string, string> = {
		"Content-Type": "application/json",
	};

	// Pull API key from Vite env if provided. (Use VITE_ prefix for Vite.)
	// Note: exposing an API key in frontend is insecure; prefer server-side.
	const apiKey = (typeof process === 'undefined') ? (import.meta.env?.VITE_API_KEY ?? '') : (process.env?.VITE_API_KEY ?? '');
	if (apiKey) {
		defaultHeaders['x-api-key'] = apiKey;
	}

	const headers = {
		...defaultHeaders,
		...(options.headers || {}),
	} as Record<string, string>;

	const res = await fetch(url, {
		// omit credentials: backend uses x-api-key header instead of cookies
		credentials: 'omit',
		mode: 'cors',
		...options,
		headers,
	});

	return res;
}
