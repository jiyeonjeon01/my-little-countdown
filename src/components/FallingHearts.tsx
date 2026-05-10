import { useEffect, useState, useCallback } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  isPopping?: boolean;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
}

const FallingHearts = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const generateHearts = useCallback((count: number) => {
    return Array.from({ length: count }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: 15 + Math.random() * 20,
      duration: 5 + Math.random() * 7,
      delay: Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.3,
      color: Math.random() < 2 / 3 ? 'text-primary' : 'text-white',
    }));
  }, []);

  useEffect(() => {
    setHearts(generateHearts(30));

    const interval = setInterval(() => {
      setHearts(prev => {
        const activeHearts = prev.filter(h => !h.isPopping);
        if (activeHearts.length < 35) {
          return [...prev, ...generateHearts(5)];
        }
        return prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [generateHearts]);

  const handleHeartClick = (e: React.MouseEvent, id: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setHearts(prev => prev.map(h => h.id === id ? { ...h, isPopping: true } : h));

    // 하트가 사라지기 시작한 직후(120ms 뒤)에 터지는 효과 발생
    setTimeout(() => {
      const newSparks = Array.from({ length: 12 }, (_, i) => ({
        id: Math.random(),
        x,
        y,
        size: 4 + Math.random() * 6,
        tx: (Math.random() - 0.5) * 250,
        ty: (Math.random() - 0.5) * 250,
        color: ['#ff4d6d', '#ff758f', '#ff85a1', '#ffb3c1', '#ffffff'][Math.floor(Math.random() * 5)],
      }));

      setSparks(prev => [...prev, ...newSparks]);

      setTimeout(() => {
        setSparks(prev => prev.filter(s => !newSparks.find(ns => ns.id === s.id)));
      }, 700);
    }, 120);

    // 하트 개체 완전 제거 타이밍 (애니메이션 종료 시점)
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 300);
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-0 bg-transparent">
      {/* 떨어지는 하트들 */}
      {hearts.map((h) => (
        <span
          key={h.id}
          onClick={(e) => !h.isPopping && handleHeartClick(e, h.id)}
          className={`absolute animate-falling-heart ${h.color} cursor-pointer select-none transition-transform hover:scale-125 active:scale-90 ${h.isPopping ? 'animate-heart-pop pointer-events-none' : ''}`}
          style={{
            left: `${h.left}%`,
            top: '-50px',
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.isPopping ? 1 : h.opacity,
            zIndex: h.isPopping ? 50 : 0,
            pointerEvents: 'auto',
          }}
        >
          ♥
        </span>
      ))}

      {/* 터지는 효과 (대형 스파클) */}
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute animate-spark pointer-events-none"
          style={{
            left: s.x,
            top: s.y,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            borderRadius: '50%',
            boxShadow: `0 0 10px ${s.color}`,
            zIndex: 100,
            '--tx': `${s.tx}px`,
            '--ty': `${s.ty}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FallingHearts;
