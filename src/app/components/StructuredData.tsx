export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "세부골프투어",
    "description": "세부 현지 한국인 운영 골프 투어 전문. 알타비스타, 에어베이스, 세부CC, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 전역 6개 골프장 맞춤 패키지.",
    "url": "https://cebu.sasori.dev",
    "telephone": "+63-912-345-6789",
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
        "name": "세부에서 이용 가능한 골프장은 어디인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "알타비스타, 막탄 에어베이스, 세부 컨트리클럽, 클럽필리피노, 릴로안, 퀸스 아일랜드 등 세부 주요 골프장 6곳을 모두 이용하실 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부 골프 캐디팁은 얼마를 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "캐디팁은 1인당 300~500페소가 일반적입니다. 기사팁은 팀당 300~500페소입니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부 골프 여행 최적 시기는 언제인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "11월부터 5월까지가 건기로 골프하기 가장 좋습니다. 특히 1~3월은 날씨가 쾌적하고 비가 거의 없어 인기가 많습니다."
        }
      },
      {
        "@type": "Question",
        "name": "세부 골프 투어 예약은 얼마나 전에 해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "최소 2주 전 예약을 권장합니다. 성수기(12~3월)에는 한 달 전 예약이 안전합니다."
        }
      },
      {
        "@type": "Question",
        "name": "도착 당일 라운딩이 가능한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 막탄 에어베이스 골프장은 공항에서 차량 5~10분 거리라 도착 당일 라운딩이 가능합니다."
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
      "name": "세부 시티 코스 패키지 - 54홀",
      "description": "알타비스타 + 에어베이스 + 세부CC. 세부 시내 3대 명문 코스를 3일간 라운딩하는 인기 패키지.",
      "image": "https://cebu.sasori.dev/images/golf-highland.webp",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/#packages"
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
      "name": "세부 풀코스 패키지 - 72홀",
      "description": "시내 코스 + 북부 코스까지 4일 라운딩. 다양한 코스 경험과 여유로운 일정.",
      "image": "https://cebu.sasori.dev/images/golf-coastal.webp",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/#packages"
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
      "name": "세부 리조트 패키지",
      "description": "퀸스 아일랜드 리조트에서 숙박과 라운딩을 동시에. 태평양 뷰와 함께하는 프리미엄 골프.",
      "image": "https://cebu.sasori.dev/images/golf-clubhouse.webp",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "availability": "https://schema.org/InStock",
        "url": "https://cebu.sasori.dev/#packages"
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
