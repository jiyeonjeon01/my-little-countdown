import { Heart } from 'lucide-react';
import { calcDatingDays } from '@/lib/dateUtils';

const START_DATE = '2025-01-19';

const DatingCard = () => {
  const days = calcDatingDays(START_DATE);

  return (
    <div className="relative rounded-lg bg-card p-6 shadow-lg lace-border">
      {/* 하트 장식 */}
      <div className="absolute -top-3 -right-3 animate-float-heart">
        <Heart className="h-7 w-7 fill-primary text-primary" />
      </div>
      <div className="absolute -top-2 -left-2 animate-float-heart" style={{ animationDelay: '1s' }}>
        <Heart className="h-5 w-5 fill-pink-medium text-pink-medium" />
      </div>

      {/* 리본 장식 */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="text-pink-medium">♡</span>
        <h2 className="text-2xl font-bold text-primary">사귄 지</h2>
        <span className="text-pink-medium">♡</span>
      </div>

      {/* D+N 표시 */}
      <div className="mb-3 text-center">
        <span className="text-5xl font-bold text-primary animate-pulse-soft inline-block">
          D+{days}
        </span>
      </div>

      {/* 기준일 */}
      <p className="text-center text-sm text-muted-foreground">
        {START_DATE.replace(/-/g, '.')}부터
      </p>

      {/* 하단 레이스 라인 */}
      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <Heart key={i} className="h-3 w-3 fill-accent text-accent" />
        ))}
      </div>
    </div>
  );
};

export default DatingCard;
