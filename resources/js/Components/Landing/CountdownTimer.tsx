import React, { useState, useEffect, useCallback } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
  className?: string;
  variant?: 'default' | 'menacing';
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
  variant = 'default',
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

  const isMenacing = variant === 'menacing';

  return (
    <div className={className}>
      {/* Rule 6.7 (rendering-conditional-render): Explicit ternary */}
      {label ? (
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="animate-pulse text-red-500 font-bold text-xs">⚠️</span>
          <p className={`text-center text-xs sm:text-sm font-mono font-bold tracking-wider uppercase ${isMenacing ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-slate-300'}`}>
            {label}
          </p>
          <span className="animate-pulse text-red-500 font-bold text-xs">⚠️</span>
        </div>
      ) : null}
      <div className="flex items-center justify-center gap-2 sm:gap-3.5">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <div className={`
                rounded-2xl w-[64px] h-[64px] sm:w-[78px] sm:h-[78px] flex items-center justify-center transition-all duration-300
                ${isMenacing 
                  ? 'bg-gradient-to-b from-red-950/80 to-dark-950 border-2 border-red-500/40 shadow-xl shadow-red-950/50 backdrop-blur-md relative group overflow-hidden' 
                  : 'glass-card border border-white/10'}
              `}>
                {isMenacing ? (
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/10 to-transparent pointer-events-none" />
                ) : null}
                <span className={`
                  text-2xl sm:text-3xl font-black tabular-nums tracking-tight z-10
                  ${isMenacing 
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-200 to-red-400 drop-shadow-[0_2px_10px_rgba(239,68,68,0.4)]' 
                    : 'text-white'}
                `}>
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className={`text-[10px] sm:text-xs mt-1.5 font-mono font-bold uppercase tracking-widest ${isMenacing ? 'text-red-400/80' : 'text-slate-400'}`}>
                {unit.label}
              </span>
            </div>
            {/* Rule 6.7: Explicit conditional rendering */}
            {index < timeUnits.length - 1 ? (
              <span className={`text-xl sm:text-2xl font-black -mt-6 select-none ${isMenacing ? 'text-red-500/80 animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]' : 'text-brand-500/50'}`}>
                :
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
