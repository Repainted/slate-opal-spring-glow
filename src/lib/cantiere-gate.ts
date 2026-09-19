const KEY = "cantiere-auth";
const HASH = "e69d0ff599ed8cfc3f4e8ac2a757e429ca413128e5eb32672bb2c2ffd491140b";

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
