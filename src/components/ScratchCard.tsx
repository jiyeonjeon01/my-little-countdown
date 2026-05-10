import { useEffect, useRef, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

// List of photos in the public/pics directory
const PHOTOS = [
  "pics/1739544610535-9.jpg",
  "pics/1739653573441.jpg",
  "pics/1739653592725-2.jpg",
  "pics/1740753123319-1.jpg",
  "pics/1741054563053-1.jpg",
  "pics/1744984184193-1.jpg",
  "pics/1746327340315.jpg",
  "pics/Screenshot_20250412_202631_KakaoTalk.jpg"
];

const ScratchCard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [randomPhoto, setRandomPhoto] = useState("");
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const lastPosRef = useRef<{ x: number, y: number } | null>(null);
  const scratchCountRef = useRef(0);

  useEffect(() => {
    // Pick a random photo on mount and on reset
    setRandomPhoto(PHOTOS[Math.floor(Math.random() * PHOTOS.length)]);
    setIsFullyRevealed(false);
    scratchCountRef.current = 0;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas logical size
    canvas.width = 240;
    canvas.height = 320;

    // Reset composite operation to draw the cover
    ctx.globalCompositeOperation = "source-over";
    
    // Fill with cute cover color
    ctx.fillStyle = "#ffb6c1"; // light pink
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text on cover
    ctx.font = "bold 16px 'Noto Sans KR', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("우리의 추억 긁어보기!", canvas.width / 2, canvas.height / 2);

    // Some cute dots for texture
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 1,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fill();
    }
  }, [isScratched]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    // Scale coordinates if canvas display size differs from logical size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check every 16th pixel for performance
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    const step = 4 * 16; 
    
    for (let i = 3; i < pixels.length; i += step) {
      if (pixels[i] < 128) {
        transparent++;
      }
    }
    
    const totalSampled = Math.floor(pixels.length / step);
    const percentage = transparent / totalSampled;
    
    // 60% 이상 지워지면 완전 공개
    if (percentage > 0.6) {
      setIsFullyRevealed(true);
    }
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isFullyRevealed) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const currentPos = getCoordinates(e);

    // Brush-like scratching using lines
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 36; // Brush size
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPosRef.current) {
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    } else {
      ctx.moveTo(currentPos.x, currentPos.y);
    }
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPosRef.current = currentPos;

    // 일정 주기로 퍼센트 계산
    scratchCountRef.current += 1;
    if (scratchCountRef.current % 15 === 0) {
      checkPercentage();
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    lastPosRef.current = getCoordinates(e);
    scratch(e); // Draw a dot immediately
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const handleMouseLeave = () => {
    // 밖으로 나갔을 때 선이 이어지지 않도록 위치만 초기화 (isDrawing은 유지)
    lastPosRef.current = null;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    // 다시 들어왔을 때 마우스를 누르고 있는 상태면 이어서 긁기
    if (e.buttons === 1) {
      if (isDrawing) {
        lastPosRef.current = getCoordinates(e);
      }
    } else {
      setIsDrawing(false);
    }
  };

  const reset = () => {
    setIsScratched(prev => !prev);
  };

  // Get correct image URL (handling GitHub Pages subpath if any)
  const getImageUrl = (path: string) => {
    return import.meta.env.BASE_URL + path;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative z-10 mt-8 mb-6">
      <div className={`relative w-full max-w-[240px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-[6px] border-white bg-white rotate-2 hover:rotate-0 transition-transform duration-300 ${isFullyRevealed ? 'animate-in zoom-in-95 duration-500 shadow-[0_0_20px_rgba(244,114,182,0.4)]' : ''}`}>
        {/* Hidden Photo */}
        {randomPhoto && (
          <img 
            src={getImageUrl(randomPhoto)} 
            alt="Random Memory" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        
        {/* Cute Pop Effect */}
        {isFullyRevealed && (
          <>
            <style>{`
              @keyframes tinyParticle {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                30% { transform: translate(calc(-50% + var(--tx) * 0.6), calc(-50% + var(--ty) * 0.6)) scale(1); opacity: 1; }
                100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty) + 20px)) scale(0); opacity: 0; }
              }
            `}</style>
            <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
              {[...Array(36)].map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const dist = 30 + Math.random() * 80;
                const tx = Math.cos(angle) * dist;
                const ty = Math.sin(angle) * dist;
                const size = 3 + Math.random() * 4; // 3~7px 매우 작은 크기
                const colors = ['bg-pink-400', 'bg-pink-300', 'bg-white', 'bg-rose-300', 'bg-pink-200'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                return (
                  <div 
                    key={i} 
                    className={`absolute left-1/2 top-1/2 rounded-full ${color}`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      '--tx': `${tx}px`,
                      '--ty': `${ty}px`,
                      animation: `tinyParticle ${0.5 + Math.random() * 0.4}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          </>
        )}
        
        {/* Scratch Canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-crosshair touch-none transition-all duration-700 ${isFullyRevealed ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}
          onMouseDown={startDrawing}
          onMouseMove={scratch}
          onMouseUp={stopDrawing}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={startDrawing}
          onTouchMove={scratch}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
      </div>
      
      <button 
        onClick={reset}
        className="mt-4 text-xs font-bold text-muted-foreground flex items-center gap-1.5 hover:text-pink-500 transition-colors bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-md border border-pink-100"
      >
        <Sparkles size={14} />
        다른 사진 긁기
      </button>
    </div>
  );
};

export default ScratchCard;
