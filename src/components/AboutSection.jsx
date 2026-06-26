import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './AboutSection.css'

export default function AboutSection() {
  const { lang } = useLang()
  const tx = t[lang].about
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.reveal').forEach((n, i) => {
          setTimeout(() => n.classList.add('visible'), i * 90)
        })
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="about-section" ref={ref}>
      <div className="about-section__inner section-container">
        <div className="about-section__visual reveal">
          <div className="about-section__img-wrap">
            <div className="about-section__img" style={{ backgroundImage: 'url(/images/storage-tanks.jpg)' }}/>
            <div className="about-section__img-overlay"/>
            <div className="about-section__year-badge">
              <span className="about-section__year-num">10+</span>
              <span className="about-section__year-label">{lang === 'en' ? 'Years of Excellence' : 'سنوات من التميز'}</span>
            </div>
          </div>
          <div className="about-section__badges">
            {tx.badges.map((b, i) => (
              <div key={i} className="about-section__badge">
                <span className="about-section__badge-dot"/>
                <span className="about-section__badge-label">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section__content">
          <span className="about-section__eyebrow reveal">
            <span className="about-section__eyebrow-line"/>
            {tx.eyebrow}
          </span>
          <h2 className="about-section__heading reveal">{tx.heading}</h2>
          <p className="about-section__body reveal">{tx.body}</p>
          <p className="about-section__body reveal">{tx.body2}</p>
          <p className="about-section__body reveal">{tx.body3}</p>

          <div className="about-section__vm reveal">
            <div className="about-vm">
              <h4 className="about-vm__title">{tx.vision.title}</h4>
              <p className="about-vm__text">{tx.vision.text}</p>
            </div>
            <div className="about-vm">
              <h4 className="about-vm__title">{tx.mission.title}</h4>
              <p className="about-vm__text">{tx.mission.text}</p>
            </div>
          </div>

          <div className="about-section__values reveal">
            <span className="about-section__values-label">{lang === 'en' ? 'Core Values' : 'قيمنا الأساسية'}</span>
            <div className="about-section__values-list">
              {tx.values.map((v, i) => <span key={i} className="about-value">{v}</span>)}
            </div>
          </div>

          <Link to="/about" className="about-section__cta reveal">
            {tx.cta}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="about-section__brief section-container reveal">
        <span className="about-section__brief-intro">{tx.companiesIntro}</span>
        <div className="about-brief__grid">
          {tx.companiesBrief.map((c, i) => (
            <div key={i} className="about-brief__item">
              <span className="about-brief__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h5 className="about-brief__name">{c.name}</h5>
                <p className="about-brief__desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
