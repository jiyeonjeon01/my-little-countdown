import { Gift, Check, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { calcAnniversaries, formatDateKR } from '@/lib/dateUtils';
import { useState, useMemo } from 'react';

const START_DATE = '2025-01-19';

const AnniversaryList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anniversaries = useMemo(() => calcAnniversaries(START_DATE), []);

  const upcomingAnniversaries = anniversaries.filter(a => !a.isPast);
  const nextAnniversary = upcomingAnniversaries[0] || anniversaries[anniversaries.length - 1];

  return (
    <div className="relative mt-4">
      <div className="tape-decoration tape-decoration-yellow" />
      <div className="rounded-xl bg-card shadow-lg bg-yellow-dots overflow-hidden border border-yellow-100 transition-all duration-300">
        {/* 아코디언 헤더 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex flex-col items-center p-6 pb-4 hover:bg-yellow-50/10 transition-colors relative"
        >
          {/* 타이틀 (노란색 리본 배너) */}
          <div className="mb-4 flex justify-center">
            <div className="yellow-ribbon">
              <h2 className="text-xl font-bold tracking-tight">기념일</h2>
            </div>
          </div>

          {!isOpen && nextAnniversary && (
            <div className="flex items-center gap-2 text-sm font-bold text-yellow-600 animate-pulse-soft">
              <span className="text-xs uppercase tracking-wider opacity-70">Next</span>
              <span>{nextAnniversary.label}</span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[10px]">
                {nextAnniversary.daysLeft === 0 ? 'D-Day' : `D-${nextAnniversary.daysLeft}`}
              </span>
            </div>
          )}

          <div className="absolute top-6 right-6">
            {isOpen ? <ChevronUp className="h-5 w-5 text-yellow-500/50" /> : <ChevronDown className="h-5 w-5 text-yellow-500/50" />}
          </div>
        </button>

        {/* 펼쳐지는 리스트 */}
        <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="p-6 pt-0">
            <div className="h-px bg-yellow-100 mb-6" />
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              {anniversaries.map((a) => (
                <li
                  key={a.label}
                  className={`post-it flex flex-col items-center justify-center p-3 text-center rounded-sm transition-all ${a.isPast
                    ? 'opacity-50 grayscale-[0.8]'
                    : 'ring-1 ring-yellow-100 shadow-sm'
                    }`}
                >
                  <div className="mb-1 flex items-center gap-1.5 w-full justify-center">
                    {a.isPast ? (
                      <Check className="h-3 w-3 text-yellow-600" />
                    ) : (
                      <span className="text-[10px] font-bold text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded leading-none">
                        {a.daysLeft === 0 ? 'D-Day' : `D-${a.daysLeft}`}
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-foreground/80 truncate max-w-[80px]">{a.label}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                    <Calendar className="h-2.5 w-2.5 opacity-50 text-yellow-600" />
                    {formatDateKR(a.date)}
                  </div>
                  {/* 포스트잇 핀 장식 */}
                  <div className={`absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${a.isPast ? 'bg-gray-200' : 'bg-yellow-400'} shadow-sm`} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryList;
