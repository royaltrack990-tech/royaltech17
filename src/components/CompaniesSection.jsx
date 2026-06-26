import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './CompaniesSection.css'

const COMPANY_IMAGES = [
  '/images/chemistry-lab.jpg',
  '/images/slide4.jpg',
  '/images/slide3.jpg',
  '/images/slide8.jpg',
]

const ACCENT_COLORS = ['#F5A623', '#5BB8A0', '#FFD166', '#7C9A6E']

const PICTORIAL_ICONS = [
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="34" y="10" width="12" height="50" fill="currentColor" opacity="0.15" rx="2"/>
    <rect x="30" y="55" width="20" height="5" fill="currentColor" opacity="0.3" rx="1"/>
    <polygon points="40,8 20,58 60,58" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <line x1="40" y1="8" x2="40" y2="58" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3"/>
    <line x1="28" y1="30" x2="52" y2="30" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="24" y1="44" x2="56" y2="44" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="25" y="58" width="30" height="8" rx="2" fill="currentColor" opacity="0.4"/>
    <rect x="35" y="66" width="10" height="6" rx="1" fill="currentColor" opacity="0.5"/>
    <circle cx="40" cy="20" r="3" fill="currentColor" opacity="0.6"/>
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 38 L40 16 L72 38" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <rect x="12" y="38" width="56" height="28" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2"/>
    <rect x="20" y="48" width="14" height="18" rx="1" fill="currentColor" opacity="0.35"/>
    <rect x="46" y="48" width="14" height="18" rx="1" fill="currentColor" opacity="0.35"/>
    <rect x="35" y="50" width="10" height="10" rx="1" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="50" x2="68" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <line x1="40" y1="38" x2="40" y2="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>
    <circle cx="40" cy="14" r="4" fill="currentColor" opacity="0.5"/>
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q10 44 16 44 L64 44 Q70 44 70 50 L68 58 Q68 62 64 62 L16 62 Q12 62 12 58 Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2"/>
    <rect x="20" y="36" width="16" height="8" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="40" y="30" width="20" height="14" rx="1" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="28" y1="20" x2="28" y2="36" stroke="currentColor" strokeWidth="2"/>
    <path d="M28 20 L44 26" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="22" y="40" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6"/>
    <rect x="34" y="40" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.6"/>
    <path d="M8 65 Q20 60 30 63 Q40 66 50 62 Q60 58 72 63" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
  </svg>,
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="28" width="36" height="40" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="2"/>
    <rect x="24" y="36" width="8" height="8" fill="currentColor" opacity="0.4"/>
    <rect x="40" y="36" width="8" height="8" fill="currentColor" opacity="0.4"/>
    <rect x="24" y="50" width="8" height="8" fill="currentColor" opacity="0.4"/>
    <rect x="40" y="50" width="8" height="8" fill="currentColor" opacity="0.4"/>
    <rect x="32" y="58" width="8" height="10" fill="currentColor" opacity="0.5"/>
    <line x1="56" y1="68" x2="56" y2="14" stroke="currentColor" strokeWidth="2.5"/>
    <line x1="56" y1="16" x2="74" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="56" y1="16" x2="46" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="70" y1="20" x2="70" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"/>
    <circle cx="70" cy="32" r="2" fill="currentColor" opacity="0.6"/>
  </svg>,
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isDesktop
}

function CTA({ company, accent }) {
  const cls = "company-panel__cta"
  if (company.link.startsWith('http')) {
    return (
      <a href={company.link} target="_blank" rel="noopener noreferrer" className={cls} style={{ '--accent': accent }}>
        {company.cta}
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
    )
  }
  return (
    <Link to={company.link} className={cls} style={{ '--accent': accent }}>
      {company.cta}
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </Link>
  )
}

/* ---------- DESKTOP: Hokaido-style horizontal scroll-pin ---------- */
function HorizontalCompanies({ tx, lang }) {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const extraRef = useRef(0)
  const [translateX, setTranslateX] = useState(0)
  const [wrapperHeight, setWrapperHeight] = useState('100vh')
  const [activePanel, setActivePanel] = useState(0)
  const rafRef = useRef(null)

  const measure = () => {
    if (!trackRef.current) return
    const trackWidth = trackRef.current.scrollWidth
    const viewportWidth = window.innerWidth
    const extra = Math.max(0, trackWidth - viewportWidth)
    extraRef.current = extra
    setWrapperHeight(`${window.innerHeight + extra}px`)
  }

  useLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        if (!wrapperRef.current) return
        const extra = extraRef.current
        if (extra <= 0) { setTranslateX(0); return }
        const rect = wrapperRef.current.getBoundingClientRect()
        const raw = -rect.top
        const progress = Math.min(Math.max(raw / extra, 0), 1)
        setTranslateX(-progress * extra)
        setActivePanel(Math.min(tx.items.length, Math.round(progress * tx.items.length)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [tx.items.length])

  return (
    <div className="companies-hscroll" ref={wrapperRef} style={{ height: wrapperHeight }}>
      <div className="companies-hscroll__pin">
        <div className="companies-hscroll__progress">
          <div className="companies-hscroll__progress-fill" style={{ width: `${(activePanel / tx.items.length) * 100}%` }} />
        </div>

        <div className="companies-hscroll__track" ref={trackRef} style={{ transform: `translateX(${translateX}px)` }}>
          {/* Intro panel */}
          <div className="hscroll-intro">
            <span className="companies__eyebrow">
              <span className="companies__eyebrow-line" />
              {lang === 'en' ? 'Group Companies' : 'شركات المجموعة'}
            </span>
            <h2 className="companies__heading">{tx.heading}</h2>
            <p className="companies__subheading">{tx.subheading}</p>
            <div className="hscroll-intro__hint">
              <span>{lang === 'en' ? 'Scroll to explore' : 'مرر للاستكشاف'}</span>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><path d="M1 6h19M14 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          {/* Company panels */}
          {tx.items.map((company, i) => (
            <div className="company-panel" key={company.id}>
              <div className="company-panel__img" style={{ backgroundImage: `url(${COMPANY_IMAGES[i]})` }}>
                <div className="company-panel__img-overlay" style={{ background: `linear-gradient(135deg, ${ACCENT_COLORS[i]}22, rgba(8,12,24,0.55))` }} />
              </div>
              <div className="company-panel__content">
                <div className="company-panel__pictorial" style={{ color: ACCENT_COLORS[i] }}>{PICTORIAL_ICONS[i]}</div>
                <span className="company-panel__tag" style={{ color: ACCENT_COLORS[i], borderColor: `${ACCENT_COLORS[i]}40`, background: `${ACCENT_COLORS[i]}0E` }}>{company.tag}</span>
                <h3 className="company-panel__name">{company.name}</h3>
                <p className="company-panel__desc">{company.description}</p>
                <ul className="company-panel__services">
                  {company.services.slice(0, 4).map((s, j) => (
                    <li key={j}><span className="dot" style={{ background: ACCENT_COLORS[i] }} />{s}</li>
                  ))}
                </ul>
                <CTA company={company} accent={ACCENT_COLORS[i]} />
              </div>
              <span className="company-panel__num">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- MOBILE: simple vertical stacked cards ---------- */
function VerticalCompanies({ tx, lang }) {
  const headerRef = useRef(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.reveal').forEach((n, i) => setTimeout(() => n.classList.add('visible'), i * 80))
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="companies companies--mobile">
      <div className="companies__header section-container" ref={headerRef}>
        <span className="companies__eyebrow reveal">
          <span className="companies__eyebrow-line" />
          {lang === 'en' ? 'Group Companies' : 'شركات المجموعة'}
        </span>
        <h2 className="companies__heading reveal">{tx.heading}</h2>
        <p className="companies__subheading reveal">{tx.subheading}</p>
      </div>
      <div className="companies__list">
        {tx.items.map((company, i) => (
          <div className="section-container" key={company.id}>
            <div className="company-card">
              <div className="company-card__img-wrap">
                <div className="company-card__img" style={{ backgroundImage: `url(${COMPANY_IMAGES[i]})` }}>
                  <div className="company-card__img-overlay" style={{ background: `linear-gradient(135deg, ${ACCENT_COLORS[i]}18, transparent)` }} />
                </div>
                <div className="company-card__accent-bar" style={{ background: ACCENT_COLORS[i] }} />
              </div>
              <div className="company-card__content">
                <div className="company-card__pictorial" style={{ color: ACCENT_COLORS[i] }}>{PICTORIAL_ICONS[i]}</div>
                <span className="company-card__tag" style={{ color: ACCENT_COLORS[i], borderColor: `${ACCENT_COLORS[i]}40`, background: `${ACCENT_COLORS[i]}0E` }}>{company.tag}</span>
                <h2 className="company-card__name">{company.name}</h2>
                <p className="company-card__desc">{company.description}</p>
                <ul className="company-card__services">
                  {company.services.map((s, j) => (
                    <li key={j} className="company-card__service"><span className="company-card__service-dot" style={{ background: ACCENT_COLORS[i] }} />{s}</li>
                  ))}
                </ul>
                <CTA company={company} accent={ACCENT_COLORS[i]} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function CompaniesSection() {
  const { lang } = useLang()
  const tx = t[lang].companies
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return <section className="companies companies--desktop"><HorizontalCompanies tx={tx} lang={lang} /></section>
  }
  return <VerticalCompanies tx={tx} lang={lang} />
}
