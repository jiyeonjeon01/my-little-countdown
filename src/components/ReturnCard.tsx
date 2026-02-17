import { Shield, Star } from 'lucide-react';
import { calcReturnDays } from '@/lib/dateUtils';

const RETURN_DATE = '2026-07-14';

const ReturnCard = () => {
  const days = calcReturnDays(RETURN_DATE);

  const displayText = days <= 0
    ? (days === 0 ? 'D-Day' : `D+${Math.abs(days)}`)
    : `D-${days}`;

  return (
    <div className="relative rounded-lg bg-card p-6 shadow-lg camo-subtle overflow-hidden">
      {/* 군번줄 장식 (상단) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-8 w-px bg-olive/40" />
      </div>

      {/* 배지/계급장 포인트 */}
      <div className="absolute -top-2 right-4">
        <div className="dog-tag rounded px-2 py-0.5 text-[10px] font-bold tracking-wider text-olive-dark">
          하사
        </div>
      </div>

      {/* 타이틀 */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <Shield className="h-5 w-5 text-secondary" />
        <h2 className="text-2xl font-bold text-secondary">복귀까지</h2>
        <Shield className="h-5 w-5 text-secondary" />
      </div>

      {/* D-N 표시 */}
      <div className="mb-3 text-center">
        <span className="text-5xl font-bold text-secondary animate-pulse-soft inline-block">
          {displayText}
        </span>
      </div>

      {/* 복귀일 */}
      <p className="text-center text-sm text-muted-foreground">
        {RETURN_DATE.replace(/-/g, '.')} 복귀
      </p>

      {/* 하단 별 장식 */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-khaki text-khaki" />
        ))}
      </div>

      {/* 군번줄 스타일 테두리 */}
      <div className="absolute inset-0 rounded-lg border-2 border-olive/20 pointer-events-none" />
      <div className="absolute inset-[3px] rounded-[calc(var(--radius)-1px)] border border-dashed border-olive/10 pointer-events-none" />
    </div>
  );
};

export default ReturnCard;
