import { Star } from 'lucide-react';
import { calcReturnDays } from '@/lib/dateUtils';

const RETURN_DATE = '2026-07-14';

const ReturnCard = () => {
  const days = calcReturnDays(RETURN_DATE);

  const displayText = days <= 0
    ? (days === 0 ? 'D-Day' : `D+${Math.abs(days)}`)
    : `D-${days}`;

  return (
    <div className="relative mt-4">
      <div className="tape-decoration tape-decoration-olive" />
      <div className="relative rounded-lg bg-card p-6 shadow-lg camo-cute overflow-hidden border border-olive/10">
        {/* 타이틀 (리본 배너) */}
        <div className="mb-6 flex justify-center">
          <div className="ribbon-banner">
            <h2 className="text-xl font-bold tracking-tight">현택이 복귀까지</h2>
          </div>
        </div>

        {/* D-N 표시 */}
        <div className="mb-3 text-center">
          <span className="text-5xl font-bold text-secondary animate-heartbeat-slow inline-block drop-shadow-sm">
            {displayText}
          </span>
        </div>

        {/* 복귀일 */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-olive/70 italic">
          <span>🎖️</span>
          <p>{RETURN_DATE.replace(/-/g, '.')} 복귀</p>
          <span>🎖️</span>
        </div>

        {/* 하단 별 장식 (계급장 느낌) */}
        <div className="mt-4 flex justify-center items-center gap-1.5 grayscale opacity-70">
          <div className="h-px w-8 bg-olive/20" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-olive text-olive" />
          ))}
          <div className="h-px w-8 bg-olive/20" />
        </div>

        {/* 세련된 테두리 포인트 */}
        <div className="absolute inset-0 rounded-lg border-2 border-olive/5 pointer-events-none" />
        <div className="absolute inset-[4px] rounded-[calc(var(--radius)-2px)] border border-dashed border-olive/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default ReturnCard;
