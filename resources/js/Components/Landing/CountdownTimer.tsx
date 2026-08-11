import React, { useState, useEffect, useCallback } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({
  targetDate,
  label,
  className = '',
}: CountdownTimerProps) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = targetDate.getTime() - Date.now();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      // Rule 5.5: Functional update form for setState
      setTimeLeft(() => calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className={className}>
      {/* Rule 6.7 (rendering-conditional-render): Explicit ternary */}
      {label ? (
        <p className="text-center text-sm text-slate-400 mb-4 font-medium">
          {label}
        </p>
      ) : null}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <div className="glass-card rounded-xl w-[60px] h-[60px] sm:w-[72px] sm:h-[72px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-slate-500 mt-1.5 font-semibold uppercase tracking-widest">
                {unit.label}
              </span>
            </div>
            {/* Rule 6.7: Explicit conditional rendering */}
            {index < timeUnits.length - 1 ? (
              <span className="text-lg font-bold text-brand-500/50 -mt-5 select-none">
                :
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
