export const navLinks = [
  { href: '/golf/', label: '골프', key: 'golf' },
  { href: '/resort/', label: '리조트', key: 'resort' },
  { href: '/activity/', label: '액티비티', key: 'activity' },
  { href: '/package/', label: '패키지', key: 'package' },
  { href: '/faq/', label: 'FAQ', key: 'faq' },
] as const;

export type ActivePage = (typeof navLinks)[number]['key'] | null;
