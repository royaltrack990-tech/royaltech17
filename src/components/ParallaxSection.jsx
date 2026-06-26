import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import './ParallaxSection.css'

const content = {
  en: {
    eyebrow: 'Why Royal Tech Group',
    heading: 'Built On Excellence',
    points: [
      { num: '01', title: 'Integrated Solutions', desc: 'From field services to global trading, one group, complete energy solutions across the entire value chain.' },
      { num: '02', title: 'Regional Expertise', desc: 'Deep knowledge of Middle East energy markets with operations across the UAE, Oman and beyond.' },
      { num: '03', title: 'QHSE Commitment', desc: 'Uncompromising standards in Quality, Health, Safety and Environment across all group operations.' },
      { num: '04', title: 'Strategic Partnerships', desc: 'Allied with global technology leaders including KERUI, Hengxin, Hunting and TenEx Technologies.' },
    ],
  },
  ar: {
    eyebrow: 'لماذا رويال تك جروب',
    heading: 'مبنية على التميز',
    points: [
      { num: '01', title: 'حلول متكاملة', desc: 'من خدمات الحقول إلى التجارة العالمية, مجموعة واحدة، حلول طاقة كاملة عبر سلسلة القيمة بأكملها.' },
      { num: '02', title: 'خبرة إقليمية', desc: 'معرفة عميقة بأسواق الطاقة في الشرق الأوسط مع عمليات في الإمارات وعُمان وما وراءها.' },
      { num: '03', title: 'التزام QHSE', desc: 'معايير صارمة في الجودة والصحة والسلامة والبيئة في جميع عمليات المجموعة.' },
      { num: '04', title: 'شراكات استراتيجية', desc: 'تحالفات مع قادة التكنولوجيا العالميين KERUI وHengxin وHunting وTenEx Technologies.' },
    ],
  },
}

export default function ParallaxSection() {
  const { lang } = useLang()
  const tx = content[lang]
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
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="parallax-section" ref={ref}>
      <div className="parallax-section__inner section-container">
        <div className="parallax-section__header reveal">
          <span className="parallax-section__eyebrow">
            <span className="parallax-section__eyebrow-line"/>
            {tx.eyebrow}
          </span>
          <h2 className="parallax-section__heading">{tx.heading}</h2>
        </div>

        <div className="parallax-section__grid">
          {tx.points.map((p, i) => (
            <div key={i} className="parallax-card reveal">
              <span className="parallax-card__num">{p.num}</span>
              <h3 className="parallax-card__title">{p.title}</h3>
              <p className="parallax-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
