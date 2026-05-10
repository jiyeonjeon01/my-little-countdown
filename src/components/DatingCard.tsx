import { Heart } from 'lucide-react';
import { calcDatingDays } from '@/lib/dateUtils';

const START_DATE = '2025-01-19';

const DatingCard = () => {
  const days = calcDatingDays(START_DATE);

  return (
    <div className="relative mt-4">
      <div className="tape-decoration" />
      <div className="relative rounded-lg bg-card p-6 shadow-lg bg-love-dots overflow-hidden border border-pink-100">
        {/* 타이틀 (핑크 리본 배너) */}
        <div className="mb-6 flex justify-center">
          <div className="pink-ribbon">
            <h2 className="text-xl font-bold tracking-tight">우리 사랑한 지</h2>
          </div>
        </div>

        {/* D+N 표시 */}
        <div className="mb-3 text-center">
          <span className="text-5xl font-bold text-primary animate-heartbeat-slow inline-block drop-shadow-sm">
            D+{days}
          </span>
        </div>

        {/* 기준일 */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-pink-400 italic">
          <span>💕</span>
          <p>{START_DATE.replace(/-/g, '.')}부터 사귐</p>
          <span>💕</span>
        </div>

        {/* 하단 장식 */}
        <div className="mt-4 flex justify-center items-center gap-1.5 opacity-60">
          <div className="h-px w-8 bg-pink-200" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
          ))}
          <div className="h-px w-8 bg-pink-200" />
        </div>

        {/* 세련된 테두리 포인트 */}
        <div className="absolute inset-0 rounded-lg border-2 border-pink-50 pointer-events-none" />
        <div className="absolute inset-[4px] rounded-[calc(var(--radius)-2px)] border border-dashed border-pink-200/50 pointer-events-none" />
      </div>
    </div>
  );
};

export default DatingCard;
