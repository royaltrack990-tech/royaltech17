import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import './SisterCompaniesSection.css'

const content = {
  en: {
    eyebrow: 'Beyond Royal Tech Group',
    heading: 'Our Sister Companies',
    sub: 'Independent businesses connected to Royal Tech Group through shared values, leadership and a commitment to excellence across industries and regions.',
    items: [
      {
        name: 'Royal Track Building and Contracting LLC',
        country: 'United Arab Emirates', code: 'AE',
        img: '/images/villa-aerial.jpg',
        desc: 'Premium construction and contracting solutions across the UAE, from luxury residences to large-scale commercial developments.',
        cta: 'Visit Website', link: 'https://royaltrack.ae', external: true,
      },
      {
        name: 'Royal Tech Tanzania',
        country: 'Tanzania', code: 'TZ',
        img: '/images/dar-es-salaam.jpg',
        desc: 'Extending the Royal Tech network into East Africa, supporting regional trade and energy-sector opportunities.',
        cta: null,
      },
      {
        name: "RT Arch Door's Factory",
        country: 'Saudi Arabia', code: 'SA',
        img: '/images/chemistry-lab.jpg',
        desc: 'A specialized manufacturing operation in the Kingdom of Saudi Arabia, producing doors and architectural fittings.',
        cta: null,
      },
      {
        name: 'R Tech Group LLC',
        country: 'Oman', code: 'OM',
        img: '/images/refinery-aerial.jpg',
        desc: 'Our Oman-based affiliate delivering oil field development, IOR/EOR solutions and equipment supply across the Sultanate.',
        cta: null,
      },
    ],
  },
  ar: {
    eyebrow: 'إلى جانب رويال تك جروب',
    heading: 'شركاتنا الشقيقة',
    sub: 'أعمال مستقلة مرتبطة برويال تك جروب من خلال قيم مشتركة وقيادة موحدة وتركيز على التميز عبر الصناعات والمناطق.',
    items: [
      {
        name: 'رويال تراك للمباني والمقاولات ذ.م.م',
        country: 'الإمارات العربية المتحدة', code: 'AE',
        img: '/images/villa-aerial.jpg',
        desc: 'حلول بناء ومقاولات متميزة عبر الإمارات, من المساكن الفاخرة إلى المشاريع التجارية الكبرى.',
        cta: 'زيارة الموقع', link: 'https://royaltrack.ae', external: true,
      },
      {
        name: 'رويال تك تنزانيا',
        country: 'تنزانيا', code: 'TZ',
        img: '/images/dar-es-salaam.jpg',
        desc: 'توسيع شبكة رويال تك إلى شرق أفريقيا، لدعم فرص التجارة الإقليمية وقطاع الطاقة.',
        cta: null,
      },
      {
        name: 'آرتي آرتش دورز فاكتوري',
        country: 'المملكة العربية السعودية', code: 'SA',
        img: '/images/chemistry-lab.jpg',
        desc: 'عملية تصنيع متخصصة في المملكة العربية السعودية، تنتج الأبواب والتجهيزات المعمارية.',
        cta: null,
      },
      {
        name: 'آر تك جروب ذ.م.م',
        country: 'عُمان', code: 'OM',
        img: '/images/refinery-aerial.jpg',
        desc: 'الشركة التابعة في عُمان تقدم تطوير حقول النفط وحلول IOR/EOR وتوريد المعدات في السلطنة.',
        cta: null,
      },
    ],
  },
}

export default function SisterCompaniesSection() {
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
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="sister-section" ref={ref}>
      <div className="section-container">
        <div className="sister-section__header reveal">
          <span className="sister-section__eyebrow">
            <span className="sister-section__eyebrow-line"/>
            {tx.eyebrow}
          </span>
          <h2 className="sister-section__heading">{tx.heading}</h2>
          <p className="sister-section__sub">{tx.sub}</p>
        </div>

        <div className="sister-section__grid">
          {tx.items.map((s, i) => (
            <div key={i} className="sister-card reveal">
              <div className="sister-card__img" style={{ backgroundImage: `url(${s.img})` }}>
                <div className="sister-card__img-overlay"/>
                <span className="sister-card__code">{s.code}</span>
              </div>
              <div className="sister-card__body">
                <span className="sister-card__country">{s.country}</span>
                <h3 className="sister-card__name">{s.name}</h3>
                <p className="sister-card__desc">{s.desc}</p>
                {s.cta && s.external && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="sister-card__cta">
                    {s.cta}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
