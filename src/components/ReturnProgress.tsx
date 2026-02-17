import { Shield, Flag } from 'lucide-react';
import { getTodayKST } from '@/lib/dateUtils';

const DEPLOY_DATE = '2025-11-18';
const RETURN_DATE = '2026-07-14';

const ReturnProgress = () => {
  const today = getTodayKST();
  const start = new Date(DEPLOY_DATE + 'T00:00:00');
  const end = new Date(RETURN_DATE + 'T00:00:00');

  const totalMs = end.getTime() - start.getTime();
  const elapsedMs = today.getTime() - start.getTime();

  const totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));
  const elapsedDays = Math.max(0, Math.min(totalDays, Math.round(elapsedMs / (1000 * 60 * 60 * 24))));
  const percent = Math.max(0, Math.min(100, Math.round((elapsedDays / totalDays) * 100)));

  return (
    <div className="rounded-lg bg-card p-5 shadow-md camo-subtle overflow-hidden relative">
      {/* 군번줄 테두리 */}
      <div className="absolute inset-0 rounded-lg border-2 border-olive/15 pointer-events-none" />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-secondary" />
          <h3 className="text-lg font-bold text-foreground">파병 진행률</h3>
        </div>
        <span className="dog-tag rounded-full px-2.5 py-0.5 text-xs font-bold text-olive-dark">
          {percent}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="relative h-5 w-full overflow-hidden rounded-full bg-olive-light border border-olive/20">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, hsl(90 25% 45%), hsl(90 30% 35%))',
          }}
        />
        {/* 진행 위치 마커 */}
        {percent > 0 && percent < 100 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${percent}%` }}
          >
            <div className="h-3 w-3 rounded-full bg-primary border-2 border-card shadow-sm animate-pulse" />
          </div>
        )}
      </div>

      {/* 라벨 */}
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Flag className="h-3 w-3" />
          <span>{DEPLOY_DATE.replace(/-/g, '.')}</span>
        </div>
        <span>{elapsedDays}일 / {totalDays}일</span>
        <div className="flex items-center gap-1">
          <span>{RETURN_DATE.replace(/-/g, '.')}</span>
          <Flag className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

export default ReturnProgress;
