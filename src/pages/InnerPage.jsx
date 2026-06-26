import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { pages } from '../data/pagesContent'
import './InnerPage.css'

export default function InnerPage({ slug }) {
  const { lang } = useLang()
  const data = pages[lang][slug] || pages.en[slug]
  const ref = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.08 })
    el.querySelectorAll('.reveal').forEach(n => obs.observe(n))
    return () => obs.disconnect()
  }, [slug])

  if (!data) return null

  return (
    <main className="inner-page" ref={ref}>
      {/* Hero banner */}
      <section className="inner-hero" style={{ backgroundImage: `url(${data.heroImage})` }}>
        <div className="inner-hero__overlay" />
        <div className="inner-hero__content section-container">
          <div className="inner-hero__breadcrumb">
            <Link to="/">{lang === 'en' ? 'Home' : 'الرئيسية'}</Link>
            <span>/</span>
            <span>{data.breadcrumb}</span>
          </div>
          <span className="inner-hero__eyebrow">{data.eyebrow}</span>
          <h1 className="inner-hero__title">{data.title}</h1>
          {data.subtitle && <p className="inner-hero__subtitle">{data.subtitle}</p>}
        </div>
      </section>

      {/* Content */}
      <section className="inner-body">
        <div className="section-container inner-body__grid">
          <div className="inner-body__main">
            {data.sections.map((sec, i) => (
              <div className="inner-section reveal" key={i}>
                <h2 className="inner-section__heading">{sec.heading}</h2>
                {sec.body && sec.body.map((p, j) => <p className="inner-section__p" key={j}>{p}</p>)}
                {sec.list && (
                  <ul className="inner-section__list">
                    {sec.list.map((item, j) => (
                      <li key={j}><span className="inner-section__dot" />{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="inner-sidebar reveal">
            <div className="inner-sidebar__card">
              <h3>{lang === 'en' ? 'Explore More' : 'استكشف أكثر'}</h3>
              <ul>
                {data.related && data.related.map((r, i) => (
                  <li key={i}><Link to={r.to}>{r.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="inner-sidebar__cta">
              <h4>{lang === 'en' ? 'Have a question?' : 'لديك سؤال؟'}</h4>
              <p>{lang === 'en' ? 'Get in touch with our team and we will get back to you shortly.' : 'تواصل مع فريقنا وسنرد عليك في أقرب وقت.'}</p>
              <Link to="/contact" className="inner-sidebar__btn">{lang === 'en' ? 'Contact Us' : 'تواصل معنا'}</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
