/** Base URL for the Express API. Empty in dev (Vite proxies /api → :5000). */
export const API_URL = import.meta.env.VITE_API_URL ?? "";
