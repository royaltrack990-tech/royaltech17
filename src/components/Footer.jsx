import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './Footer.css'

export default function Footer() {
  const { lang } = useLang()
  const tx = t[lang]
  const nav = tx.nav
  const footer = tx.footer

  const links = [
    { label: nav.home, to: '/' },
    { label: nav.about, to: '/about' },
    { label: nav.fieldServices, to: '/rofs-uae' },
    { label: nav.generalTrading, to: '/general-trading' },
    { label: nav.ogTrading, to: '/trading' },
    { label: nav.partners, to: '/partners' },
    { label: nav.contact, to: '/contact' },
  ]

  return (
    <footer className="footer">
      <div className="footer__top section-container">
        <div className="footer__brand">
          <div className="footer__logo-wrap">
            <img src="/images/logo-main.png" alt="Royal Tech Group" className="footer__logo" />
          </div>
          <p className="footer__tagline">{footer.tagline}</p>
          <div className="footer__socials">
            <a href="https://www.facebook.com/profile.php?id=61566755398574" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/royal-tech-oil-and-gas-field-services-llc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.youtube.com/@RoyalTechOilandGasFieldsServic" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--navy)"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__links-col">
          <h4>{footer.quickLinks}</h4>
          <ul>{links.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul>
        </div>

        <div className="footer__contact-col">
          <h4>{footer.contactUs}</h4>
          <div className="footer__contact-items">
            <div className="footer__contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{footer.address}</span>
            </div>
            <div className="footer__contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.91 19.79 19.79 0 01.0 1.27a2 2 0 011.99-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 6.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <a href="tel:+97145774590">{footer.phone}</a>
            </div>
            <div className="footer__contact-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:info@royal-techgroup.com">{footer.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom section-container">
        <span>{footer.rights}</span>
        <span>{lang === 'en' ? 'Royal Tech Group, Dubai, UAE' : 'رويال تك جروب, دبي، الإمارات'}</span>
      </div>
    </footer>
  )
}
