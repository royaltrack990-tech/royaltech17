import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './HeroSlider.css'

// Indices 0-3 = ROFS (shared video background)
// Indices 4-6 = image backgrounds
const VIDEO_SRC = '/videos/rofs-hero.mp4'
const VIDEO_GROUP_END = 3 // last index that uses the video

const IMAGE_SLIDES = [
  { bg: '/images/port-containers-sunrise.jpg', accent: '#5BB8A0' }, // index 4 - General Trading
  { bg: '/images/maersk-ship.jpg', accent: '#FFD166' },             // index 5 - Oil & Gas Trading
  { bg: '/images/slide8.jpg', accent: '#7C9A6E' },                  // index 6 - Royal Track
]

const ACCENTS = ['#F5A623', '#F5A623', '#F5A623', '#F5A623', '#5BB8A0', '#FFD166', '#7C9A6E']

const AUTOPLAY = 4500

export default function HeroSlider() {
  const { lang } = useLang()
  const tx = t[lang].hero.slides
  const [current, setCurrent] = useState(0)
  const [textKey, setTextKey] = useState(0)
  const [textVisible, setTextVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)
  const switchRef = useRef(null)
  const progressRef = useRef(null)
  const total = tx.length

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

  const isVideoActive = current <= VIDEO_GROUP_END
  const activeAccent = ACCENTS[current]

  return (
    <section className="hero">
      {/* Persistent video layer, mounted once, never restarts while cycling slides 0-3 */}
      <div className={`hero__slide hero__slide--video ${isVideoActive ? 'active' : ''}`}>
        <video
          className="hero__video"
          src={VIDEO_SRC}
          poster="/images/slide1.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero__overlay" />
        <div className="hero__gradient" />
      </div>

      {/* Image slides, crossfade among themselves and against the video layer */}
      {IMAGE_SLIDES.map((slide, i) => {
        const realIndex = i + VIDEO_GROUP_END + 1
        return (
          <div
            key={realIndex}
            className={`hero__slide ${current === realIndex ? 'active' : ''}`}
          >
            <div className="hero__bg" style={{ backgroundImage: `url(${slide.bg})` }} />
            <div className="hero__overlay" />
            <div className="hero__gradient" />
          </div>
        )
      })}

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
