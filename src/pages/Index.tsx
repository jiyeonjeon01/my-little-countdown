import { useState, useEffect } from "react";
import FallingHearts from "@/components/FallingHearts";
import DatingCard from "@/components/DatingCard";
import ReturnCard from "@/components/ReturnCard";
import ReturnProgress from "@/components/ReturnProgress";
import AnniversaryList from "@/components/AnniversaryList";
import HeartTrail from "@/components/HeartTrail";
import VisitorCount from "@/components/VisitorCount";
import SecretLock from "@/components/SecretLock";
import ScratchCard from "@/components/ScratchCard";
import { getTodayKST, formatDateTimeKR } from "@/lib/dateUtils";

const Index = () => {
  const [timeInfo, setTimeInfo] = useState({ dateStr: '', timeStr: '', nanoStr: '' });

  useEffect(() => {
    const update = () => {
      setTimeInfo(formatDateTimeKR(new Date()));
      requestAnimationFrame(update);
    };
    const animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative min-h-screen bg-dots px-4 py-8 md:py-12 overflow-x-hidden">
      <div className="lace-top" />
      {/* 좌측 상단 KST 시계 */}
      <div className="fixed top-4 left-4 z-50 flex flex-col items-start space-y-1 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 backdrop-blur-md rounded-t-md border-x border-t border-primary/20">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[9px] font-black tracking-widest text-primary uppercase">KST Standard</p>
        </div>
        <div className="flex flex-col gap-0.5 font-mono bg-white/80 backdrop-blur-md px-3 py-2 rounded-b-xl rounded-tr-xl border border-primary/20 shadow-sm shadow-primary/5">
          <span className="text-[10px] font-bold text-muted-foreground/60 leading-none">{timeInfo.dateStr}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-foreground tracking-tight leading-none">{timeInfo.timeStr}</span>
            <span className="text-[9px] text-primary/70 font-bold tabular-nums">{timeInfo.nanoStr}</span>
          </div>
        </div>
      </div>

      {/* 우측 상단 가상 접속자 수 */}
      <VisitorCount />

      <FallingHearts />
      <HeartTrail />
      {/* 상단 타이틀 */}
      <header className="mb-8 text-center pt-8">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          지연 <span className="text-primary mx-1">♡</span> 현택
        </h1>
        <p className="text-muted-foreground mt-2 italic text-sm">Since 2025.01.19</p>
      </header>

      {/* D-day 카드 그리드 */}
      <div className="mx-auto max-w-2xl relative z-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="interactive-card">
            <DatingCard />
          </div>
          <div className="interactive-card">
            <ReturnCard />
          </div>
        </div>

        {/* 파병 진행률 */}
        <div className="mt-6">
          <ReturnProgress />
        </div>

        {/* 기념일 리스트 */}
        <div className="mt-6">
          <AnniversaryList />
        </div>

        {/* 추억 긁기 스크래치 카드 */}
        <ScratchCard />

        {/* 시크릿 자물쇠 */}
        <SecretLock />
      </div>

    </div>
  );
};

export default Index;
