import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Golf Courses
  const golfCourses = [
    {
      slug: 'alta-vista',
      name: 'Alta Vista Golf & Country Club',
      nameKo: '알타비스타 골프 & CC',
      holes: 18,
      par: 72,
      yards: 6073,
      courseType: '산악형',
      distance: '공항 30~50분',
      designer: 'Gary Player 설계',
      features: JSON.stringify(['해발 150m 고지대', '세부 해협 파노라마 뷰', '도전적인 업다운 코스']),
      images: JSON.stringify(['/images/golf-highland.webp']),
      badge: '명문',
      badgeColor: 'bg-emerald-600 text-white',
      sortOrder: 0,
    },
    {
      slug: 'mactan-airbase',
      name: 'Mactan Island Golf Club',
      nameKo: '막탄 에어베이스 골프',
      holes: 18,
      par: 72,
      yards: 6435,
      courseType: '평지형',
      distance: '공항 5~10분',
      features: JSON.stringify(['공항에서 가장 가까운 골프장', '도착 당일 라운딩 가능', '산호석 페어웨이']),
      images: JSON.stringify(['/images/golf-coastal.webp']),
      badge: '가성비',
      badgeColor: 'bg-sky-500 text-white',
      sortOrder: 1,
    },
    {
      slug: 'cebu-country-club',
      name: 'Cebu Country Club',
      nameKo: '세부 컨트리 클럽',
      holes: 18,
      par: 72,
      yards: 6677,
      courseType: '평지형',
      distance: '공항 25~30분',
      designer: '1928년 개장',
      features: JSON.stringify(['필리핀 최고 역사의 골프장', '잘 정비된 페어웨이', '인터클럽 대회 개최지']),
      images: JSON.stringify(['/images/golf-clubhouse.webp']),
      badge: '프라이빗',
      badgeColor: 'bg-amber-600 text-white',
      sortOrder: 2,
    },
    {
      slug: 'club-filipino',
      name: 'Club Filipino de Cebu',
      nameKo: '클럽 필리피노 드 세부',
      holes: 18,
      par: 71,
      yards: 6128,
      courseType: '구릉형',
      distance: '공항 50분',
      designer: '1935년 개장',
      features: JSON.stringify(['좁은 페어웨이 정확성 코스', '롤링힐스 지형', '세부 북부 드라이브']),
      images: JSON.stringify(['/images/golf-group.webp']),
      sortOrder: 3,
    },
    {
      slug: 'liloan',
      name: 'Liloan Golf & Leisure Estate',
      nameKo: '릴로안 골프 & 레저',
      holes: 18,
      par: 72,
      yards: 7200,
      courseType: '현대형',
      distance: '공항 25분',
      designer: '2017년 개장',
      features: JSON.stringify(['세부 최장 7,200야드', '65헥타르 대규모 부지', '골프 아카데미 운영']),
      images: JSON.stringify(['/images/golf-highland.webp']),
      badge: '최장 코스',
      badgeColor: 'bg-violet-600 text-white',
      sortOrder: 4,
    },
    {
      slug: 'queens-island',
      name: "Queen's Island Golf & Resort",
      nameKo: '퀸스 아일랜드 골프 리조트',
      holes: 18,
      par: 72,
      yards: 6835,
      courseType: '리조트형',
      distance: '공항 약 2시간',
      designer: 'Paspalum 잔디',
      features: JSON.stringify(['48실 리조트 숙박', '태평양 오션 뷰', '숙박+골프 올인원']),
      images: JSON.stringify(['/images/golf-coastal.webp']),
      badge: '리조트',
      badgeColor: 'bg-rose-500 text-white',
      sortOrder: 5,
    },
  ];

  for (const course of golfCourses) {
    await prisma.golfCourse.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }
  console.log(`Seeded ${golfCourses.length} golf courses`);

  // Resorts
  const resorts = [
    { slug: 'shangri-la', name: 'Shangri-La Mactan Resort & Spa', grade: '5성급', area: '막탄', feature: '프라이빗 비치, 스파', sortOrder: 0 },
    { slug: 'crimson', name: 'Crimson Resort & Spa Mactan', grade: '5성급', area: '막탄', feature: '인피니티 풀, 다이빙', sortOrder: 1 },
    { slug: 'plantation-bay', name: 'Plantation Bay Resort & Spa', grade: '5성급', area: '막탄', feature: '라군 풀, 가족 친화', sortOrder: 2 },
    { slug: 'jpark', name: 'Jpark Island Resort & Waterpark', grade: '5성급', area: '막탄', feature: '워터파크, 카지노', sortOrder: 3 },
    { slug: 'movenpick', name: 'Movenpick Hotel Mactan', grade: '5성급', area: '막탄', feature: '아일랜드 뷰, 초콜릿 아워', sortOrder: 4 },
    { slug: 'radisson-blu', name: 'Radisson Blu Cebu', grade: '5성급', area: '세부시티', feature: 'SM몰 연결, 비즈니스', sortOrder: 5 },
    { slug: 'seda-ayala', name: 'Seda Ayala Center Cebu', grade: '4성급', area: '세부시티', feature: '아얄라몰 직결, 루프탑 풀', sortOrder: 6 },
    { slug: 'bai-hotel', name: 'Bai Hotel Cebu', grade: '4성급', area: '만다웨', feature: '세부 최대 규모, 인피니티 풀', sortOrder: 7 },
    { slug: 'bluewater', name: 'Bluewater Maribago', grade: '4성급', area: '막탄', feature: '프라이빗 비치, 가족 리조트', sortOrder: 8 },
  ];

  for (const resort of resorts) {
    await prisma.resort.upsert({
      where: { slug: resort.slug },
      update: resort,
      create: resort,
    });
  }
  console.log(`Seeded ${resorts.length} resorts`);

  // Activities
  const activities = [
    { slug: 'island-hopping', name: '아일랜드 호핑', description: '나루수안, 판다논, 힐루뚱안 섬 투어. 스노클링 포함.', icon: '\uD83C\uDFDD', sortOrder: 0 },
    { slug: 'whale-shark', name: '고래상어 투어', description: '오슬롭 고래상어 스노클링. 세부 남부 당일치기.', icon: '\uD83D\uDC0B', sortOrder: 1 },
    { slug: 'kawasan-falls', name: '카와산 폭포', description: '캐녀닝 + 폭포 점프. 세부 최고 인기 액티비티.', icon: '\uD83C\uDFDE', sortOrder: 2 },
    { slug: 'diving', name: '다이빙 & 스노클링', description: '모알보알 정어리런, 거북이 포인트. 체험/자격증.', icon: '\uD83E\uDD3F', sortOrder: 3 },
    { slug: 'city-tour', name: '세부 시티투어', description: '마젤란 십자가, 산페드로 요새, 탑스 전망대.', icon: '\uD83C\uDFDB', sortOrder: 4 },
    { slug: 'bohol-tour', name: '보홀 당일투어', description: '초콜릿힐, 안경원숭이, 로복강 크루즈.', icon: '\uD83E\uDD8E', sortOrder: 5 },
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: activity,
      create: activity,
    });
  }
  console.log(`Seeded ${activities.length} activities`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
