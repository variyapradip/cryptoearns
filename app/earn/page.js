'use client';
import { useState, useEffect } from 'react';
import { useTasks } from '@/lib/hooks/useTasks';
import { motion, AnimatePresence } from "framer-motion";
const AUTOPLAY_MS = 5000;

export default function EarnPage() {
  const { tasks, loading } = useTasks(); // status === 'active' only

  const slides = tasks;
  const [index, setIndex] = useState(0);

  // Keep index in range if the slide list shrinks/changes (e.g. admin edits live)
  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [slides.length, index]);
  console.log('tasklist', tasks);

  // Autoplay
  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  const current = slides[index];

  return (
    <div className="earn-page">
      <div className="earn-slider-wrap">
        <div className="earn-slider">
          <div className="earn-slider__glow" />

          {loading ? (
            <p className="earn-slide-desc">Loading offers…</p>
          ) : !current ? (
            <p className="earn-slide-desc">
              No offers available.
            </p>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id || index}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
                className="earn-slider-content"
              >
                <div>
                  {current.badgeText && (
                    <span className="earn-slide-tag">
                      ✦ {current.badgeText}
                    </span>
                  )}

                  <h2 className="earn-slide-title">
                    {current.title}
                  </h2>

                  {current.subtitle && (
                    <p className="earn-slide-desc">
                      {current.subtitle}
                    </p>
                  )}

                  <div className="earn-slide-row">
                    <button className="btn-primary">
                      Learn more
                    </button>

                    <div className="earn-slide-reward">
                      <span>◈ {current.reward?.crypto}</span>
                      <span className="earn-slide-usd">
                        ~ ${current.reward?.usd}
                      </span>
                    </div>
                  </div>
                </div>

                {current.bannerImage ? (
                  <img
                    src={current.bannerImage}
                    alt={current.title}
                    className="earn-slider-img earn-slider-img--white"
                  />
                ) : (
                  <div
                    className="earn-slider-img"
                    style={{
                      background:
                        (current.color || "#7c3aed") + "20",
                    }}
                  >
                    {current.icon}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {slides.length > 1 && (
          <div className="earn-slider-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`earn-slider-dot${i === index ? ' active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to offer ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
