import { clearSession, getToken } from "./token";
 
const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
// fetch wrapper that adds the JWT and signs the user out on a 401
export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers);
 
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
 
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
 
  if (res.status === 401 && token) {
    clearSession();
    window.location.href = "/login";
  }
 
  return res;
}
 