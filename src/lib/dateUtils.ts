/**
 * 날짜 계산 유틸리티 (한국 시간 기준)
 * 
 * D+N 계산: 기준일 당일을 D+1로 처리
 *   - 예: 2025-01-19 시작 → 1/19은 D+1, 1/20은 D+2
 * 
 * D-N 계산: 목표일까지 남은 일수
 *   - 목표일 당일이면 D-Day(D-0) 표시
 */

/** 한국 시간(KST) 기준 오늘 날짜를 Date 객체로 반환 */
export function getTodayKST(): Date {
  const now = new Date();
  return now;
}

/** 한국 시간(KST) 기준 오늘 자정 날짜를 Date 객체로 반환 */
export function getMidnightKST(): Date {
  const now = new Date();
  const kstString = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
  return new Date(kstString + 'T00:00:00');
}

/** 
 * "사귄 지" D+N 계산 
 * 당일을 1일로 보지 않고, 24시간이 지나야 1일로 계산되도록 조정 (사용자 요청 반영: Feb 21일 기준 397일)
 */
export function calcDatingDays(startDate: string): number {
  const start = new Date(startDate + 'T00:00:00');
  const today = getMidnightKST();
  const diffMs = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * "복귀까지" D-N 계산
 * 목표일에서 오늘을 뺀 남은 일수 (D-146 기준)
 */
export function calcReturnDays(returnDate: string): number {
  const target = new Date(returnDate + 'T00:00:00');
  const today = getMidnightKST();
  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return diffDays;
}

/** 기념일 자동 계산 (100일, 200일, 300일, 1주년, 500일, 2주년) */
export interface Anniversary {
  label: string;
  date: Date;
  isPast: boolean;
  daysLeft?: number;
}

export function calcAnniversaries(startDate: string): Anniversary[] {
  const start = new Date(startDate + 'T00:00:00');
  const today = getTodayKST();
  const currentYear = today.getFullYear();

  const milestones = [
    { label: '100일', days: 100 },
    { label: '현택 생일 🎂', fixedDate: `${currentYear}-03-11` },
    { label: '200일', days: 200 },
    { label: '300일', days: 300 },
    { label: '1주년', years: 1 },
    { label: '400일', days: 400 },
    { label: '500일', days: 500 },
    { label: '600일', days: 600 },
    { label: '700일', days: 700 },
    { label: '2주년', years: 2 },
    { label: '지연 생일 🎂', fixedDate: `${currentYear}-12-17` },
  ];

  const midnightToday = getMidnightKST();

  return milestones.map(m => {
    let date: Date;
    if (m.fixedDate) {
      date = new Date(m.fixedDate + 'T00:00:00');
      if (date.getTime() < midnightToday.getTime() - (24 * 60 * 60 * 1000)) {
        date.setFullYear(currentYear + 1);
      }
    } else if (m.years) {
      date = new Date(start);
      date.setFullYear(date.getFullYear() + m.years);
      date.setDate(date.getDate() + 1);
    } else {
      date = new Date(start.getTime() + (m.days! + 1) * 24 * 60 * 60 * 1000);
    }

    const diffMs = date.getTime() - midnightToday.getTime();
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    return {
      label: m.label,
      date,
      isPast: date.getTime() < midnightToday.getTime(),
      daysLeft: daysLeft >= 0 ? daysLeft : undefined
    };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** 날짜를 한국어 형식으로 포맷 */
export function formatDateKR(date: Date): string {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

/** 날짜와 시간을 한국어 형식으로 포맷 (초/나노초 포함) */
export function formatDateTimeKR(date: Date): { dateStr: string; timeStr: string; nanoStr: string } {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const parts = formatter.formatToParts(date);

  const getValue = (type: string) => parts.find(p => p.type === type)?.value || '';

  const dateStr = `${getValue('year')}.${getValue('month')}.${getValue('day')}`;
  const timeStr = `${getValue('hour')}:${getValue('minute')}:${getValue('second')}`;

  // 나노초 시뮬레이션 (밀리초 기반 + 랜덤 6자리)
  const ms = String(date.getMilliseconds()).padStart(3, '0');
  // performance.now()를 사용하여 좀 더 정밀한 느낌을 줌
  const micro = String(Math.floor((performance.now() % 1) * 1000000)).padStart(6, '0');
  const nanoStr = ms + micro;

  return { dateStr, timeStr, nanoStr };
}
