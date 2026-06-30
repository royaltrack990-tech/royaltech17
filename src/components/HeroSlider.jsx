import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './HeroSlider.css'

// Single persistent video background for all hero slides — no images at all
const VIDEO_SRC = '/videos/royal_tech_video.mp4'

const ACCENTS = ['#F5A623', '#F5A623', '#F5A623', '#F5A623', '#5BB8A0', '#FFD166', '#7C9A6E']

const AUTOPLAY = 4500

export default function HeroSlider() {
  const { lang } = useLang()
  const tx = t[lang].hero.slides
  const [current, setCurrent] = useState(0)
  const [textKey, setTextKey] = useState(0)
  const [textVisible, setTextVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [videoFaded, setVideoFaded] = useState(false)
  const timerRef = useRef(null)
  const switchRef = useRef(null)
  const progressRef = useRef(null)
  const videoRef = useRef(null)
  const total = tx.length

  // Fade the video out just before it loops, then fade it back in once it restarts
  const handleTimeUpdate = useCallback((e) => {
    const v = e.target
    if (!v.duration) return
    const remaining = v.duration - v.currentTime
    if (remaining < 0.45) {
      setVideoFaded(true)
    } else if (v.currentTime < 0.45) {
      setVideoFaded(false)
    }
  }, [])

  const goTo = useCallback((idx) => {
    setTextVisible(false)
    clearTimeout(switchRef.current)
    switchRef.current = setTimeout(() => {
      setCurrent(idx)
      setTextKey(k => k + 1)
      setTextVisible(true)
    }, 260)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % total)
  }, [current, total, goTo])

  // Autoplay
  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(next, AUTOPLAY)
    return () => clearTimeout(timerRef.current)
  }, [current, next])

  // Progress bar
  useEffect(() => {
    cancelAnimationFrame(progressRef.current)
    const startTime = performance.now()
    const animate = (now) => {
      const elapsed = now - startTime
      const pct = Math.min((elapsed / AUTOPLAY) * 100, 100)
      setProgress(pct)
      if (pct < 100) progressRef.current = requestAnimationFrame(animate)
    }
    progressRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(progressRef.current)
  }, [current])

  const activeAccent = ACCENTS[current]

  return (
    <section className="hero">
      {/* Single persistent video background, used for every slide, mounted once so it never restarts */}
      <div className="hero__slide hero__slide--video active">
        <video
          ref={videoRef}
          className={`hero__video ${videoFaded ? 'is-faded' : ''}`}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
        />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
      </div>

      <div className="hero__gold-line" />

      <div className={`hero__content section-container ${textVisible ? 'is-visible' : 'is-hiding'}`} key={textKey}>
        <div className="hero__text">
          <span className="hero__eyebrow" style={{ color: activeAccent }}>
            <span className="hero__eyebrow-dot" style={{ background: activeAccent }} />
            {tx[current].eyebrow}
          </span>

          <h1 className="hero__title">
            {tx[current].title.split('\n').map((line, i) => (
              <span key={i} className="hero__title-line" style={{ animationDelay: `${i * 0.12}s` }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero__subtitle">{tx[current].subtitle}</p>

          <div className="hero__cta-row">
            {tx[current].link.startsWith('http') ? (
              <a href={tx[current].link} target="_blank" rel="noopener noreferrer" className="hero__btn hero__btn--primary">
                {tx[current].cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ) : (
              <Link to={tx[current].link} className="hero__btn hero__btn--primary">
                {tx[current].cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
            <Link to="/about" className="hero__btn hero__btn--ghost">
              {lang === 'en' ? 'About the Group' : 'عن المجموعة'}
            </Link>
          </div>
        </div>

        <div className="hero__counter">
          <span className="hero__counter-current">{String(current + 1).padStart(2, '0')}</span>
          <div className="hero__counter-bar">
            <div className="hero__counter-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="hero__counter-total">{String(total).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="hero__dots">
        {tx.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button className="hero__arrow hero__arrow--prev" onClick={() => goTo((current - 1 + total) % total)} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="hero__arrow hero__arrow--next" onClick={() => goTo((current + 1) % total)} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>{lang === 'en' ? 'Scroll' : 'تمرير'}</span>
      </div>
    </section>
  )
}
