export interface Company {
  id: string;
  name: string;
  vat: string;
  cf: string;
  address: string;
  zip: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  pec: string;
  logo: string;
}

export function emptyCompany(id: string): Company {
  return {
    id,
    name: "",
    vat: "",
    cf: "",
    address: "",
    zip: "",
    city: "",
    province: "",
    phone: "",
    email: "",
    pec: "",
    logo: "",
  };
}

export function companyLabel(c: Company): string {
  const name = c.name.trim();
  if (name) return name;
  if (c.vat.trim()) return `P.IVA ${c.vat.trim()}`;
  return "";
}

export function companyLines(c: Company): string[] {
  const lines: string[] = [];
  if (c.name.trim()) lines.push(c.name.trim());
  const loc = [c.address, [c.zip, c.city, c.province].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  if (loc) lines.push(loc);
  const ids = [
    c.vat.trim() ? `P.IVA ${c.vat.trim()}` : "",
    c.cf.trim() ? `C.F. ${c.cf.trim()}` : "",
  ].filter(Boolean);
  if (ids.length) lines.push(ids.join(" · "));
  const contact = [c.phone, c.email, c.pec].map((x) => x.trim()).filter(Boolean);
  if (contact.length) lines.push(contact.join(" · "));
  return lines;
}
