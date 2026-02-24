const CEBU_SERVICE_URL = process.env.CEBU_SERVICE_URL || 'http://127.0.0.1:8001';

interface CurrencyRate {
  amount: number | null;
  php: number | null;
}

interface Rates {
  KRW: CurrencyRate;
  updated_at: string | null;
}

export async function getRates(): Promise<Rates | null> {
  try {
    const res = await fetch(`${CEBU_SERVICE_URL}/api/rates`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface BookingNotification {
  name: string;
  contact: string;
  tour: string;
  message?: string;
}

export async function notifyBooking(data: BookingNotification): Promise<boolean> {
  try {
    const res = await fetch(`${CEBU_SERVICE_URL}/api/booking`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
