export const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/KRW';

export interface ExchangeApiResponse {
  result: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
}

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

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch(EXCHANGE_API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`API ${res.status}`);

    const data: ExchangeApiResponse = await res.json();
    if (data.result !== 'success' || !data.rates?.PHP) {
      throw new Error('Invalid response');
    }

    return {
      amount: 10000,
      php: Math.round(data.rates.PHP * 10000),
      updatedAt: data.time_last_update_utc,
    };
  } catch {
    return FALLBACK_RATES;
  }
}
