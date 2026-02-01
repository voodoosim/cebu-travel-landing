export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Cebu Travel",
    "description": "Premium island hopping tours and adventures in Cebu, Philippines",
    "url": "https://cebutravel.com",
    "telephone": "+63-32-123-4567",
    "email": "info@cebutravel.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cebu City",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.3157",
      "longitude": "123.8854"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "423"
    },
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TourProductsSchema() {
  const tours = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Island Hopping Adventure",
      "description": "Visit the most beautiful islands in Mactan. Snorkel in crystal clear waters and enjoy a BBQ lunch.",
      "image": "https://cebutravel.com/island-hopping.jpg",
      "offers": {
        "@type": "Offer",
        "price": "45",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://cebutravel.com/tours/island-hopping"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "128"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Oslob Whale Shark Watching",
      "description": "A once-in-a-lifetime experience swimming with the gentle giants of the sea in Oslob.",
      "image": "https://cebutravel.com/whale-sharks.jpg",
      "offers": {
        "@type": "Offer",
        "price": "60",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://cebutravel.com/tours/whale-sharks"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "85"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Kawasan Falls Canyoneering",
      "description": "Jump, slide, and swim through the canyons of Badian ending at the majestic Kawasan Falls.",
      "image": "https://cebutravel.com/kawasan-falls.jpg",
      "offers": {
        "@type": "Offer",
        "price": "55",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://cebutravel.com/tours/canyoneering"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "210"
      }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(tours) }}
    />
  );
}
