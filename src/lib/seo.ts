export const SITE = {
  name: "Portale Monti Lepini",
  tagline: "26 borghi. 3000 anni di storia. Una natura straordinaria.",
  description:
    "Enciclopedia digitale dei 26 comuni dei Monti Lepini, tra Latina, Roma e Frosinone: borghi, sentieri, natura, calendario e imprese del territorio.",
  url: "https://lepinidigital.com",
};

export function titleFor(page: string) {
  return `${page} | ${SITE.name}`;
}

export function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify({ "@context": "https://schema.org", ...data });
}
