import { Heart } from "lucide-react";
import FallingHearts from "@/components/FallingHearts";
import DatingCard from "@/components/DatingCard";
import ReturnCard from "@/components/ReturnCard";
import ReturnProgress from "@/components/ReturnProgress";
import AnniversaryList from "@/components/AnniversaryList";
import { getTodayKST, formatDateKR } from "@/lib/dateUtils";

const Index = () => {
  const today = formatDateKR(getTodayKST());

  return (
    <div className="relative min-h-screen bg-background px-4 py-8 md:py-12">
      <FallingHearts />
      {/* 상단 타이틀 */}
      <header className="mb-8 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 fill-primary text-primary animate-float-heart" />
          <h1 className="text-4xl font-bold text-primary md:text-5xl">지연 ♡ 현택</h1>
          <Heart className="h-6 w-6 fill-primary text-primary animate-float-heart" style={{ animationDelay: "0.5s" }} />
        </div>
        <p className="text-muted-foreground">Since 2025.01.19</p>
      </header>

      {/* D-day 카드 그리드 */}
      <div className="mx-auto max-w-2xl">
        <div className="grid gap-6 md:grid-cols-2">
          <DatingCard />
          <ReturnCard />
        </div>

        {/* 파병 진행률 */}
        <div className="mt-6">
          <ReturnProgress />
        </div>

        {/* 기념일 리스트 */}
        <div className="mt-6">
          <AnniversaryList />
        </div>

        {/* 오늘 날짜 */}
        <p className="mt-6 text-center text-xs text-muted-foreground">오늘 {today} 기준</p>
      </div>
    </div>
  );
};

export default Index;
