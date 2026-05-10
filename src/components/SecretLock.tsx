import { useState, useEffect } from "react";
import { Lock, Unlock, Heart, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const questions = [
  { text: "우리가 처음 만난 장소는?", answers: ["강남역"] },
  { text: "우리가 처음 알게된 년도는?", answers: ["2022년", "2022"] }
];

const SecretLock = () => {
  const [answer, setAnswer] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);

  useEffect(() => {
    // 처음에 랜덤하게 질문 하나를 선택
    setQuestionIdx(Math.floor(Math.random() * questions.length));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 공백 제거해서 검사 (예: 강남 역, 강남역 등 허용)
    const cleanAnswer = answer.trim().replace(/\s+/g, '');
    const validAnswers = questions[questionIdx].answers.map(a => a.replace(/\s+/g, ''));
    
    if (validAnswers.includes(cleanAnswer)) {
      setIsUnlocked(true);
      setIsError(false);
      toast.success("정답! 자물쇠가 열렸습니다 💖", { position: 'top-center' });
    } else {
      setIsError(true);
      toast.error("땡! 다시 생각해 보세요 🤔", { position: 'top-center' });
      // 에러 표시(빨간 테두리) 후 1.5초 뒤 복구
      setTimeout(() => setIsError(false), 1500);
    }
  };

  const handleReset = () => {
    setIsUnlocked(false);
    setAnswer("");
    // 다시 잠글 때 새로운 랜덤 질문 뽑기
    setQuestionIdx(Math.floor(Math.random() * questions.length));
  };

  return (
    <div className="mt-12 mb-8 flex flex-col items-center justify-center w-full relative z-10">
      <div 
        className={`w-full max-w-sm bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border-2 transition-all duration-300 ${
          isUnlocked 
            ? 'border-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.3)]' 
            : isError 
              ? 'border-red-300 bg-red-50/50' 
              : 'border-primary/20'
        }`}
      >
        
        {!isUnlocked ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isError ? 'bg-red-100 text-red-500' : 'bg-primary/10 text-primary'}`}>
              <Lock size={22} />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-black text-foreground text-lg">시크릿 퀴즈 🔒</h3>
              <p className="text-muted-foreground text-sm font-medium">{questions[questionIdx]?.text}</p>
            </div>
            
            <div className="flex w-full gap-2 mt-2">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setIsError(false);
                }}
                placeholder="정답을 입력해주세요"
                className={`flex-1 rounded-xl border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground/40 ${isError ? 'border-red-300 focus:ring-red-400' : 'border-primary/20'}`}
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-12 flex items-center justify-center rounded-xl transition-colors shadow-sm"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-5 py-4 animate-in fade-in zoom-in duration-500">
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 shadow-inner">
              <Unlock size={26} />
            </div>
            
            <div className="flex items-center justify-center">
              <p className="text-3xl font-black text-pink-500 tracking-tight">
                정답!! 사랑해❤️❤️❤️
              </p>
            </div>
            
            <button 
              onClick={handleReset}
              className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground underline underline-offset-4 mt-6 transition-colors"
            >
              다시 잠그기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretLock;
