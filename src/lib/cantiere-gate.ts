const KEY = "cantiere-auth";
const HASH = "d84610282b55765f1a67874044dd1b47b8eb882dca1de01031af2e5b44e078a4";

async function sha256hex(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function cantiereUnlocked() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function lockCantiere() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* */
  }
}

export async function unlockCantiere(password: string) {
  const hex = await sha256hex(`lepini-cantiere:${password.trim()}`);
  if (hex !== HASH) return false;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* */
  }
  return true;
}
