import { cache } from 'react';
import { prisma } from './prisma';

export interface ExchangeRates {
  amount: number;
  php: number;
  updatedAt: string | null;
}

export const FALLBACK_RATES: ExchangeRates = {
  amount: 10000,
  php: 420,
  updatedAt: null,
};

// React cache(): 동일 렌더 사이클 내 중복 호출 방지 (request-level dedup)
export const fetchExchangeRates = cache(async (): Promise<ExchangeRates> => {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'exchange_php' },
    });
    if (!setting) return FALLBACK_RATES;

    return {
      amount: 10000,
      php: parseInt(setting.value, 10) || FALLBACK_RATES.php,
      updatedAt: setting.updatedAt.toISOString(),
    };
  } catch {
    return FALLBACK_RATES;
  }
});
