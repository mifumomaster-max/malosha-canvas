import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface LoadingScreenProps {
  isReady: boolean;
  onExitComplete?: () => void;
}

const LOADING_STEPS = [
  'Inaandaa studio yako ya ubunifu...',
  'Inapakia fonti na violezo vya kisasa...',
  'Inapanga ukubwa wa skrini na zana...'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isReady, onExitComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState<number>(32);
  const [stepIndex, setStepIndex] = useState<number>(0);

  useEffect(() => {
    if (isReady) {
      setProgress(100);
      setStepIndex(2);
      return;
    }

    const stepTimer = window.setInterval(() => {
      setStepIndex((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 360);

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const increment = prev < 65 ? 9 : 4;
        return Math.min(92, prev + increment);
      });
    }, 110);

    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(progressTimer);
    };
  }, [isReady]);

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {!isReady && (
        <motion.div
          key="malosha-loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.015,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 px-6 text-center select-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 35%, rgba(251, 191, 36, 0.09), transparent 55%)'
          }}
          role="status"
          aria-live="polite"
          aria-label="Inapakia Malosha Poster Studio"
        >
          {/* Subtle Architectural Grid Backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />

          <div className="relative flex flex-col items-center max-w-sm w-full">
            {/* Layered Poster Studio Emblem */}
            <motion.div
              initial={prefersReducedMotion ? false : { scale: 0.94, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-900 border border-amber-400/30 shadow-2xl"
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -2, 0] }
                }
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <rect
                  x="6"
                  y="4"
                  width="18"
                  height="24"
                  rx="3"
                  stroke="#525252"
                  strokeWidth="2"
                />
                <rect
                  x="12"
                  y="8"
                  width="18"
                  height="24"
                  rx="3"
                  fill="#171717"
                  stroke="#fbbf24"
                  strokeWidth="2.2"
                />
                <path
                  d="M16 15H26M16 20H23"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="23.5" cy="25.5" r="2.2" fill="#fbbf24" />
              </motion.svg>
            </motion.div>

            {/* Brand Title */}
            <h1 className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Malosha Poster Studio
            </h1>

            {/* Quiet Unboxed Subtitle Capabilities */}
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-neutral-400">
              <span>Violezo vya Kisasa</span>
              <span aria-hidden="true">·</span>
              <span>Grafu &amp; Takwimu</span>
              <span aria-hidden="true">·</span>
              <span>Ubora wa 4K HD</span>
            </div>

            {/* Progress Track (compositor-only scaleX) */}
            <div className="mt-7 w-full max-w-[240px]">
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full w-full origin-left rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                  initial={{ scaleX: 0.25 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 truncate">
                  {LOADING_STEPS[stepIndex]}
                </span>
                <span className="font-mono tabular-nums font-semibold text-amber-400 shrink-0">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
