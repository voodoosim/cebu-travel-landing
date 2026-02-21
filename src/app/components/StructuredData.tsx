export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Cebu Travel",
    "description": "Premium island hopping tours and adventures in Cebu, Philippines",
    "url": "https://cebu.sasori.dev",
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

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "세부 여행 최적 시기는 언제인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "세부 여행의 최적 시기는 건기인 11월부터 5월까지입니다. 이 기간에는 날씨가 맑고 화창하여 섬 호핑과 다이빙을 즐기기에 완벽합니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부 공항에서 시내까지 어떻게 가나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "막탄 세부 국제공항에서 세부 시내까지는 택시로 약 30-40분 소요됩니다. Grab 앱을 이용하거나 공항 택시를 이용할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "고래상어 투어 예약은 필수인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "오슬롭 고래상어 투어는 사전 예약을 강력히 권장합니다. 특히 성수기(12월-4월)에는 현장 예약이 어려울 수 있으며, 새벽 일찍 출발해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부에서 필리핀 페소로 환전할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "세부 공항과 시내 쇼핑몰에 환전소가 많습니다. 환율은 시내 환전소가 공항보다 유리합니다. ATM도 널리 이용 가능합니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부 투어 비용은 얼마나 드나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "아일랜드 호핑 투어는 약 $45, 고래상어 투어는 $60, 카와산 폭포 캐녀닝은 $55부터 시작합니다. 모든 투어에는 가이드, 장비, 점심이 포함됩니다."
        }
      }
    ]
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
      "image": "https://cebu.sasori.dev/island-hopping.jpg",
      "offers": {
        "@type": "Offer",
        "price": "45",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/tours/island-hopping"
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
      "image": "https://cebu.sasori.dev/whale-sharks.jpg",
      "offers": {
        "@type": "Offer",
        "price": "60",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/tours/whale-sharks"
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
      "image": "https://cebu.sasori.dev/kawasan-falls.jpg",
      "offers": {
        "@type": "Offer",
        "price": "55",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/tours/canyoneering"
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
