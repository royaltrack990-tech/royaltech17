import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './StatsSection.css'

export default function StatsSection() {
  const { lang } = useLang()
  const stats = t[lang].stats
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.stat').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="stats">
      <div className="stats__inner section-container" ref={ref}>
        {stats.map((s, i) => (
          <div key={i} className="stat">
            <span className="stat__number">{s.number}</span>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
