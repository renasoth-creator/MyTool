export const BACKEND_URL = "https://api.pdfconvert.tech";

// Helper: centralize fetch settings for the frontend API.
// This allows us to consistently include credentials and common headers in one place.
// Note: if your backend does not allow credentials or CORS headers, requests will still be blocked
// — the real fix remains on the server (Add Access-Control-Allow-Origin and related headers).
export async function apiFetch(path: string, options: RequestInit = {}) {
	const url = BACKEND_URL + path;

	const defaultHeaders: Record<string, string> = {
		"Content-Type": "application/json",
	};

	const headers = {
		...defaultHeaders,
		...(options.headers || {}),
	} as Record<string, string>;

	const res = await fetch(url, {
		credentials: 'include', // include cookies/auth if backend uses them
		mode: 'cors',
		...options,
		headers,
	});

	return res;
}
