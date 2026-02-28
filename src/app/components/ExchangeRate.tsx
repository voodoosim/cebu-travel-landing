const RATES = {
  KRW: { amount: 10000, php: 420 },
  updated_at: null as string | null,
};

export default function ExchangeRate() {
  const krw = RATES.KRW;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-100">
      <h3 className="text-lg font-bold text-slate-700 text-center mb-6">
        오늘의 환율
      </h3>

      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl sm:text-5xl" role="img" aria-label="Korea">&#x1F1F0;&#x1F1F7;</span>
          <span className="text-xs text-slate-500 font-medium">KRW</span>
          <span className="text-2xl sm:text-3xl font-bold text-slate-900">
            {krw.amount.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500">원</span>
        </div>

        <div className="flex flex-col items-center gap-1 px-2">
          <span className="text-3xl text-emerald-500 font-light">=</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl sm:text-5xl" role="img" aria-label="Philippines">&#x1F1F5;&#x1F1ED;</span>
          <span className="text-xs text-slate-500 font-medium">PHP</span>
          <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
            {krw.php.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500">페소</span>
        </div>
      </div>

      {RATES.updated_at && (
        <p className="text-xs text-slate-400 text-center mt-6">
          {new Date(RATES.updated_at).toLocaleDateString("ko-KR")} 기준
        </p>
      )}
    </div>
  );
}
