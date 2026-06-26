import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import './ProfileSection.css'

const content = {
  en: {
    eyebrow: 'Company Profiles',
    heading: 'Download Our Company Profiles',
    body: 'Explore our comprehensive company profiles to learn more about Royal Tech Group, our services, solutions, technology partnerships, and global operations across the UAE and Oman.',
    docs: [
      {
        title: 'Royal Tech Oil & Gas Fields Services LLC',
        meta: 'PDF · English · 2025 Edition',
        file: '/documents/royal-tech-profile-2025.pdf',
        dlName: 'Royal-Tech-Profile-2025.pdf',
        tags: ['Full Services Overview', 'Technology Partnerships', 'EOR & IOR Solutions'],
      },
      {
        title: 'R Tech Group LLC, Oman Profile',
        meta: 'PDF · English & Arabic',
        file: '/documents/r-tech-group-oman-profile.pdf',
        dlName: 'R-Tech-Group-Oman-Profile.pdf',
        tags: ['Oil Field Development', 'IOR / EOR Solutions', 'ISO 9001 / 45001 / 14001'],
      },
    ],
    viewBtn: 'View', dlBtn: 'Download',
  },
  ar: {
    eyebrow: 'ملفات الشركة',
    heading: 'حمّل ملفات الشركة',
    body: 'استكشف ملفات شركتنا الشاملة لمعرفة المزيد عن رويال تك جروب, خدماتنا وحلولنا وشراكاتنا التكنولوجية وعملياتنا العالمية عبر الإمارات وعُمان.',
    docs: [
      {
        title: 'شركة رويال تك لخدمات حقول النفط والغاز',
        meta: 'PDF · إنجليزي · طبعة 2025',
        file: '/documents/royal-tech-profile-2025.pdf',
        dlName: 'Royal-Tech-Profile-2025.pdf',
        tags: ['نظرة عامة على الخدمات', 'شراكات التكنولوجيا', 'حلول EOR و IOR'],
      },
      {
        title: 'آر تك جروب ذ.م.م, ملف عُمان',
        meta: 'PDF · إنجليزي وعربي',
        file: '/documents/r-tech-group-oman-profile.pdf',
        dlName: 'R-Tech-Group-Oman-Profile.pdf',
        tags: ['تطوير حقول النفط', 'حلول IOR / EOR', 'ISO 9001 / 45001 / 14001'],
      },
    ],
    viewBtn: 'عرض', dlBtn: 'تحميل',
  },
}

export default function ProfileSection() {
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
    <section className="profile-section" ref={ref}>
      <div className="section-container">
        <div className="profile-section__header reveal">
          <span className="profile-section__eyebrow">
            <span className="profile-section__eyebrow-line"/>
            {tx.eyebrow}
          </span>
          <h2 className="profile-section__heading">{tx.heading}</h2>
          <p className="profile-section__body">{tx.body}</p>
        </div>

        <div className="profile-list">
          {tx.docs.map((doc, i) => (
            <div key={i} className="profile-row reveal">
              <div className="profile-row__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="13" y2="17"/>
                </svg>
              </div>
              <div className="profile-row__main">
                <h3 className="profile-row__title">{doc.title}</h3>
                <span className="profile-row__meta">{doc.meta}</span>
                <div className="profile-row__tags">
                  {doc.tags.map((tag, j) => <span key={j} className="profile-row__tag">{tag}</span>)}
                </div>
              </div>
              <div className="profile-row__actions">
                <a href={doc.file} target="_blank" rel="noopener noreferrer" className="profile-row__btn profile-row__btn--ghost">{tx.viewBtn}</a>
                <a href={doc.file} download={doc.dlName} className="profile-row__btn profile-row__btn--solid">
                  {tx.dlBtn}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
