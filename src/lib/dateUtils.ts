/**
 * 날짜 계산 유틸리티 (한국 시간 기준)
 * 
 * D+N 계산: 기준일 당일을 D+1로 처리
 *   - 예: 2025-01-19 시작 → 1/19은 D+1, 1/20은 D+2
 * 
 * D-N 계산: 목표일까지 남은 일수
 *   - 목표일 당일이면 D-Day(D-0) 표시
 */

/** 한국 시간(KST) 기준 오늘 날짜를 YYYY-MM-DD로 반환 */
export function getTodayKST(): Date {
  const now = new Date();
  // KST = UTC+9, toLocaleDateString으로 한국 날짜 얻기
  const kstString = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
  // 'YYYY-MM-DD' 형식 → Date 객체 (자정 기준)
  return new Date(kstString + 'T00:00:00');
}

/** 
 * "사귄 지" D+N 계산 
 * 기준일 포함 (당일 = D+1)
 */
export function calcDatingDays(startDate: string): number {
  const start = new Date(startDate + 'T00:00:00');
  const today = getTodayKST();
  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  // 당일은 D+1이므로 +1
  return diffDays + 1;
}

/**
 * "복귀까지" D-N 계산
 * 복귀 당일 = D-0 (D-Day)
 * 복귀 후 = 양수 반환 (지남)
 */
export function calcReturnDays(returnDate: string): number {
  const target = new Date(returnDate + 'T00:00:00');
  const today = getTodayKST();
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

/** 기념일 자동 계산 (100일, 200일, 300일, 1주년, 500일, 2주년) */
export interface Anniversary {
  label: string;
  date: Date;
  isPast: boolean;
}

export function calcAnniversaries(startDate: string): Anniversary[] {
  const start = new Date(startDate + 'T00:00:00');
  const today = getTodayKST();

  const milestones = [
    { label: '100일', days: 99 },   // D+100 = 시작일 + 99일
    { label: '200일', days: 199 },
    { label: '300일', days: 299 },
    { label: '1주년', years: 1 },
    { label: '500일', days: 499 },
    { label: '2주년', years: 2 },
  ];

  return milestones.map(m => {
    let date: Date;
    if (m.years) {
      date = new Date(start);
      date.setFullYear(date.getFullYear() + m.years);
    } else {
      date = new Date(start.getTime() + m.days! * 24 * 60 * 60 * 1000);
    }
    return {
      label: m.label,
      date,
      isPast: date.getTime() <= today.getTime(),
    };
  });
}

/** 날짜를 한국어 형식으로 포맷 */
export function formatDateKR(date: Date): string {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}
