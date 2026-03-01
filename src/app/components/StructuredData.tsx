import products from '@/data/products.json';

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "세부가이드",
    "description": "세부 현지 한국인 운영 통합 가이드. 골프 예약, 리조트 예약, 관광 액티비티, 공항 픽업, 전용 차량, 한국어 통역까지 세부 여행 토탈 솔루션.",
    "url": "https://cebu.sasori.dev",
    "telephone": "+63-917-555-0123",
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
      "reviewCount": "320"
    },
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
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
        "name": "세부가이드는 어떤 서비스를 제공하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "골프장 예약, 리조트/호텔 예약, 관광 액티비티 예약, 공항 픽업, 전용 차량, 한국어 통역까지 세부 여행에 필요한 모든 것을 대행합니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부에서 이용 가능한 골프장은 어디인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "알타비스타, 막탄 에어베이스, 세부 컨트리클럽, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 주요 골프장 6곳 예약을 대행합니다."
        }
      },
      {
        "@type": "Question",
        "name": "리조트 예약도 대행해 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 샹그릴라, 크림슨, 플랜테이션베이, 제이파크, 무벤픽, 래디슨블루 등 세부 주요 리조트 예약을 대행합니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부 여행 최적 시기는 언제인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "11월부터 5월까지가 건기로 여행하기 가장 좋습니다. 특히 1~3월은 날씨가 쾌적하고 비가 거의 없어 인기가 많습니다."
        }
      },
      {
        "@type": "Question",
        "name": "한국어 통역/가이드가 가능한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 현지 한국인 스태프가 상주하고 있으며, 필요 시 전 일정 한국어 가이드 동행이 가능합니다."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}

export function TourProductsSchema() {
  const pkgs = products.packages;

  const schema = {
    "@context": "https://schema.org",
    "@graph": pkgs.map((pkg) => ({
      "@type": "Product",
      "name": `세부 ${pkg.name}`,
      "description": pkg.description,
      "image": `https://cebu.sasori.dev${pkg.image}`,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/package/"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
