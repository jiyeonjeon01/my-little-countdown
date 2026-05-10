import { useEffect, useState, useRef } from 'react';

const HeartTrail = () => {
    const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);

            // 마우스가 일정 거리(30px) 이상 움직였을 때만 하트 생성 (뱀처럼 안 보이게)
            if (dist > 30) {
                const newTrail = {
                    id: Date.now(),
                    x: e.clientX,
                    y: e.clientY,
                };

                setTrails((prev) => [...prev.slice(-6), newTrail]); // 개수를 7개 정도로 대폭 줄임
                lastPos.current = { x: e.clientX, y: e.clientY };
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {trails.map((trail) => (
                <div
                    key={trail.id}
                    className="cursor-heart-trail text-primary-light"
                    style={{
                        left: `${trail.x}px`,
                        top: `${trail.y}px`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    ❤
                </div>
            ))}
        </>
    );
};

export default HeartTrail;
