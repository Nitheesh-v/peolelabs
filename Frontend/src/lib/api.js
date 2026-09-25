// Base URL for the Express API.
// - Local dev: empty string, so calls stay relative and the Vite proxy handles them.
// - Deployed (Vercel): set VITE_API_URL (e.g. https://peolelabs.onrender.com)
//   in the Vercel project environment so the browser calls Render directly.
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
