export const organizationSchema = {
  "@type": "Organization",
  "@id": "https://calculaeasy.com/#organization",
  "name": "CalculaEasy",
  "url": "https://calculaeasy.com",
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": "https://calculaeasy.com/#website",
  "url": "https://calculaeasy.com",
  "name": "CalculaEasy",
  "publisher": {
    "@id": "https://calculaeasy.com/#organization",
  },
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
};
