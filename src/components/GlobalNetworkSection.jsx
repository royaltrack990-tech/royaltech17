import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LanguageContext'
import './GlobalNetworkSection.css'

const COUNTRIES = [
  { name: 'UAE',            nameAr: 'الإمارات',          code: 'AE', lat: 24.45, lng: 54.37, color: '#F5A623', primary: true  },
  { name: 'Oman',           nameAr: 'عُمان',             code: 'OM', lat: 21.51, lng: 55.92, color: '#F5A623', primary: true  },
  { name: 'United Kingdom', nameAr: 'المملكة المتحدة',   code: 'GB', lat: 51.50, lng: -0.12, color: '#5BB8A0', primary: false },
  { name: 'China',          nameAr: 'الصين',             code: 'CN', lat: 35.86, lng:104.19, color: '#5BB8A0', primary: false },
  { name: 'South Sudan',    nameAr: 'جنوب السودان',      code: 'SS', lat:  6.87, lng: 31.30, color: '#E07B39', primary: false },
  { name: 'Pakistan',       nameAr: 'باكستان',           code: 'PK', lat: 30.37, lng: 69.34, color: '#5BB8A0', primary: false },
  { name: 'Libya',          nameAr: 'ليبيا',             code: 'LY', lat: 26.33, lng: 17.22, color: '#E07B39', primary: false },
  { name: 'Kuwait',         nameAr: 'الكويت',            code: 'KW', lat: 29.31, lng: 47.48, color: '#F5A623', primary: false },
  { name: 'Saudi Arabia',   nameAr: 'السعودية',          code: 'SA', lat: 23.89, lng: 45.08, color: '#F5A623', primary: false },
  { name: 'Tanzania',       nameAr: 'تنزانيا',           code: 'TZ', lat: -6.37, lng: 34.89, color: '#E07B39', primary: false },
]

const LOGOS = [
  { src: '/images/logo-main.png',    label: 'Oil & Gas Fields Services LLC', labelAr: 'خدمات حقول النفط والغاز ذ.م.م' },
  { src: '/images/logo-oman.png',    label: 'ROFS, Oman',        labelAr: 'ROFS, عُمان'     },
  { src: '/images/logo-trading.png', label: 'Oil & Gas Trading',  labelAr: 'تجارة النفط والغاز' },
  { src: '/images/logo-general.png', label: 'General Trading',    labelAr: 'التجارة العامة'  },
]

const content = {
  en: {
    eyebrow: 'Worldwide Operations',
    heading: 'Royal Tech Global Network',
    sub: 'Operating across the Middle East, Africa, Europe and Asia, connecting global markets with integrated energy and trading solutions.',
    stats: [
      { n: '10',  l: 'Countries' },
      { n: '4',   l: 'Companies' },
      { n: '20+', l: 'Partners'  },
      { n: '2013',l: 'Founded'   },
    ],
  },
  ar: {
    eyebrow: 'عمليات عالمية',
    heading: 'الشبكة العالمية لرويال تك',
    sub: 'نعمل في الشرق الأوسط وأفريقيا وأوروبا وآسيا, نربط الأسواق العالمية بحلول طاقة وتجارة متكاملة.',
    stats: [
      { n: '١٠',  l: 'دول'           },
      { n: '٤',   l: 'شركات'         },
      { n: '٢٠+', l: 'شركاء'         },
      { n: '٢٠١٣',l: 'تأسست'        },
    ],
  },
}

function LeafletMap({ countries }) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    import('leaflet/dist/leaflet.css')
    import('leaflet').then(({ default: L }) => {
      delete L.Icon.Default.prototype._getIconUrl
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [25, 30], zoom: 2, zoomControl: true,
        scrollWheelZoom: false, attributionControl: false,
        minZoom: 1, maxZoom: 8,
      })
      mapRef.current = map

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd', maxZoom: 20,
      }).addTo(map)

      countries.forEach(c => {
        const icon = L.divIcon({
          className: '',
          html: `
            <div class="lmap-pin" style="--clr:${c.color}">
              <div class="lmap-pin__ring"></div>
              <div class="lmap-pin__dot"></div>
              <span class="lmap-pin__label">${c.name}</span>
            </div>`,
          iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -15],
        })
        const marker = L.marker([c.lat, c.lng], { icon }).addTo(map)
        marker.bindPopup(`
          <div class="lmap-popup">
            <strong>${c.name}</strong>
          </div>
        `, { className: 'custom-popup', closeButton: false })
        marker.on('mouseover', function() { this.openPopup() })
        marker.on('mouseout', function() { this.closePopup() })
      })

      const uae = countries[0]
      countries.slice(1).forEach(c => {
        L.polyline([[uae.lat, uae.lng], [c.lat, c.lng]], {
          color: 'rgba(245,166,35,0.25)', weight: 1, dashArray: '6 8',
        }).addTo(map)
      })
    })

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; initRef.current = false }
    }
  }, [])

  return <div ref={containerRef} className="lmap-container" />
}

export default function GlobalNetworkSection() {
  const { lang } = useLang()
  const tx = content[lang]
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.reveal').forEach((n, i) => {
          setTimeout(() => n.classList.add('visible'), i * 70)
        })
      }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="network" ref={ref}>
      <div className="section-container">
        <div className="network__hdr reveal">
          <span className="network__eyebrow">
            <span className="network__eyebrow-line"/>
            {tx.eyebrow}
          </span>
          <h2 className="network__heading">{tx.heading}</h2>
          <p className="network__sub">{tx.sub}</p>
        </div>

        <div className="network__body reveal">
          <div className="network__map-box">
            <LeafletMap countries={COUNTRIES} />
          </div>

          <div className="network__flags">
            {COUNTRIES.map((c, i) => (
              <div key={i} className="nflag">
                <span className="nflag__code">{c.code}</span>
                <span className="nflag__name">{lang === 'ar' ? c.nameAr : c.name}</span>
                <span className="nflag__dot" style={{ background: c.color }}/>
              </div>
            ))}
          </div>
        </div>

        <div className="network__logos reveal">
          {LOGOS.map((l, i) => (
            <div key={i} className="nlogo">
              <div className="nlogo__box"><img src={l.src} alt={l.label} /></div>
              <span className="nlogo__label">{lang === 'ar' ? l.labelAr : l.label}</span>
            </div>
          ))}
        </div>

        <div className="network__stats reveal">
          {tx.stats.map((s, i) => (
            <div key={i} className="nstat">
              <span className="nstat__num">{s.n}</span>
              <span className="nstat__label">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
