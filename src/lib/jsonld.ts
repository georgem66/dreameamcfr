import { event, site, socials, contact } from "./content";

const numericPrice = (price: string) => price.replace(/[^0-9.]/g, "");

/** schema.org Organization — site-wide structured data. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TUT Colour Fun Run",
    description: site.description,
    url: site.url,
    email: contact.email,
    telephone: "+27727512636",
    sameAs: socials.map((s) => s.href),
  };
}

/** schema.org SportsEvent — eligible for rich event results in search. */
export function eventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.name,
    description: event.welcome,
    startDate: event.startISO,
    endDate: event.endISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Fun Run",
    image: [`${site.url}/opengraph-image`],
    url: site.url,
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pretoria Campus, Tshwane University of Technology",
        addressLocality: "Pretoria",
        addressRegion: "Gauteng",
        addressCountry: "ZA",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "TUT Sport Management Students",
      url: site.url,
    },
    offers: event.entryFees.map((f) => ({
      "@type": "Offer",
      name: `${f.who} entry`,
      price: numericPrice(f.price),
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
      url: site.url,
    })),
  };
}
