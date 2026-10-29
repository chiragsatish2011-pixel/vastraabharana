import React, { useState, useEffect, useRef } from 'react';

export const StatsCounter = () => {
  const [inView, setInView] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const containerRef = useRef(null);

  // Trigger animation entry every time the user scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      } else {
        setInView(false); // Reset to re-trigger every time as requested
      }
    }, { threshold: 0.25 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Rapid High-Speed Count-Up Animation (From 0 to Target in Full Speed, Video Frame 35)
  useEffect(() => {
    if (!inView) {
      setCount1(0);
      setCount2(0);
      setCount3(0);
      return;
    }

    let startTimestamp = null;
    let animId;
    const duration = 1200; // 1.2s rapid spin

    const target1 = 3386;
    const target2 = 1993;
    const target3 = 400;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Fast exponential ease-out for high-speed counter tick feel
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount1(Math.floor(ease * target1));
      setCount2(Math.floor(ease * target2));
      setCount3(Math.floor(ease * target3));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [inView]);

  const stats = [
    {
      value: count1.toLocaleString(),
      label: 'FOLLOWERS'
    },
    {
      value: count2.toLocaleString(),
      label: 'Happy Patrons'
    },
    {
      value: count3.toLocaleString(),
      label: 'Master Weavers'
    }
  ];

  return (
    <section
      id="metrics"
      ref={containerRef}
      className="py-14 sm:py-20 bg-white select-none"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── NORMAL NUMBERS WITHOUT ANY OUTLINES, CARDS, OR SHAPES (MATCHING VIDEO FRAME 35) ── */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Normal, Uncluttered Number with Zero Box or Border */}
              <span className="font-sans font-light sm:font-normal text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-none">
                {stat.value}
              </span>
              
              {/* Clean Subtitle Label */}
              <span className="text-[11px] sm:text-xs lg:text-[13px] font-sans font-medium text-neutral-500 tracking-wide mt-2.5 sm:mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};