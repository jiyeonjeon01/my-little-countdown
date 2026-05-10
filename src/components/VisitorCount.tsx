import { useState, useEffect } from "react";
import { Users } from "lucide-react";

const VisitorCount = () => {
  const [visitors, setVisitors] = useState(1);
  const [ip, setIp] = useState("");

  useEffect(() => {
    // 현재 접속 기기의 IP 주소 가져오기
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(() => setIp(""));
    // 임의로 접속자 수가 1~2명 사이를 오가도록 시뮬레이션
    // DB가 없으므로 실제 동시 접속자 구현은 불가능하지만 
    // 커플 앱의 특성을 살려 귀엽게 1~2명이 접속 중인 것처럼 표현
    const interval = setInterval(() => {
      // 70% 확률로 1명, 30% 확률로 2명 (둘 다 접속 중인 상황 연출)
      const newVisitors = Math.random() > 0.7 ? 2 : 1;
      setVisitors(newVisitors);
    }, 10000 + Math.random() * 15000); // 10~25초마다 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end space-y-1 pointer-events-none">
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 backdrop-blur-md rounded-t-md border-x border-t border-primary/20">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
        <p className="text-[9px] font-black tracking-widest text-primary uppercase">Live</p>
      </div>
      <div className="flex flex-col items-end bg-white/80 backdrop-blur-md px-3 py-2 rounded-b-xl rounded-tl-xl border border-primary/20 shadow-sm shadow-primary/5">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-primary/70" />
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-bold text-muted-foreground/80">현재 접속자</span>
            <span className="text-sm font-black text-foreground">{visitors}</span>
            <span className="text-[10px] font-bold text-muted-foreground/80">명</span>
          </div>
        </div>
        {ip && (
          <div className="text-[8px] text-muted-foreground/40 font-mono mt-0.5 leading-none">
            {ip}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorCount;
