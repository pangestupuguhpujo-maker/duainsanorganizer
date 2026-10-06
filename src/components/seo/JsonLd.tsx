import * as React from 'react';
import { siteConfig } from '@/config/site';

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EventPlanningService',
    name: siteConfig.name,
    image: `${siteConfig.url}/images/logo/logo.png`,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: 'Rp 18.500.000 - Rp 45.000.000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pekanbaru, Riau (Temu Janji Fleksibel / On-Location)',
      addressLocality: 'Pekanbaru',
      addressRegion: 'Riau',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 0.5071,
      longitude: 101.4478,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [siteConfig.contact.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
