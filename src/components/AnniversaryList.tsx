import { Gift, Check } from 'lucide-react';
import { calcAnniversaries, formatDateKR } from '@/lib/dateUtils';

const START_DATE = '2025-01-19';

const AnniversaryList = () => {
  const anniversaries = calcAnniversaries(START_DATE);

  return (
    <div className="rounded-lg bg-card/80 p-5 shadow-md backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2">
        <Gift className="h-4 w-4 text-primary" />
        <h3 className="text-lg font-bold text-foreground">기념일</h3>
      </div>

      <ul className="space-y-2">
        {anniversaries.map((a) => (
          <li
            key={a.label}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
              a.isPast
                ? 'bg-muted/50 text-muted-foreground'
                : 'bg-accent/40 text-accent-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              {a.isPast ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              )}
              <span className="font-medium">{a.label}</span>
            </div>
            <span className="tabular-nums">{formatDateKR(a.date)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnniversaryList;
