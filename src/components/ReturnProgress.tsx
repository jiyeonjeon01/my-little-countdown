import { useState, useEffect } from 'react';
import { calcReturnDays } from '@/lib/dateUtils';

const DEPLOY_DATE = '2025-11-18';
const RETURN_DATE = '2026-07-14';

const ReturnProgress = () => {
  const [percent, setPercent] = useState(0);
  const [elapsedDays, setElapsedDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);

  useEffect(() => {
    const start = new Date(DEPLOY_DATE + 'T00:00:00');
    const end = new Date(RETURN_DATE + 'T00:00:00');
    const totalMs = end.getTime() - start.getTime();

    // Day counts are static or change daily, can be calculated once or updated less frequently
    const tDays = Math.round(totalMs / (1000 * 60 * 60 * 24)) + 1;
    setTotalDays(tDays);

    const update = () => {
      const now = new Date();
      const elapsedMs = now.getTime() - start.getTime();
      const currentPercent = Math.max(0, Math.min(100, (elapsedMs / totalMs) * 100));

      setPercent(currentPercent);

      const rDays = calcReturnDays(RETURN_DATE);
      setRemainingDays(rDays);
      setElapsedDays(tDays - rDays);

      requestAnimationFrame(update);
    };

    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="rounded-lg bg-card p-5 shadow-md bg-white/50 overflow-hidden relative border border-pink-100">
      {/* 부드러운 하트 배경 느낌의 테두리 */}
      <div className="absolute inset-0 rounded-lg border-2 border-pink-50 pointer-events-none" />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-foreground">파병 힘내자!</h3>
        </div>
        <span className="rounded-full bg-pink-100 px-3 py-1 text-[10px] sm:text-xs font-bold text-pink-500 shadow-sm border border-pink-200 animate-pulse-soft font-mono">
          {percent.toFixed(6)}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="relative h-6 w-full overflow-hidden rounded-full bg-pink-100/50 border border-pink-200">
        <div
          className="h-full rounded-full transition-all duration-300 ease-linear"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #ffb6c1, #ff69b4)',
          }}
        />
        {/* 진행 위치 마커 (하트) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ease-linear flex flex-col items-center"
          style={{ left: `${percent}%` }}
        >
          <span className="text-sm animate-pulse" style={{ animationDuration: '1.5s' }}>
            ❤️
          </span>
        </div>
      </div>

      {/* 라벨 */}
      <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-pink-400 font-medium">
        <div className="flex items-center gap-1">
          <span>{DEPLOY_DATE.replace(/-/g, '.')}</span>
        </div>
        <span className="text-pink-500 font-bold whitespace-nowrap">{elapsedDays}일 / {totalDays}일 ({remainingDays}일 남음)</span>
        <div className="flex items-center gap-1">
          <span>{RETURN_DATE.replace(/-/g, '.')}</span>
        </div>
      </div>
    </div>
  );
};

export default ReturnProgress;
