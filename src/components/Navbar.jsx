import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import { navStructure } from '../data/navStructure'
import './Navbar.css'

export default function Navbar() {
  const { lang, toggleLang } = useLang()
  const tx = t[lang]
  const items = navStructure[lang]
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openIdx, setOpenIdx] = useState(null)
  const [mobileOpenIdx, setMobileOpenIdx] = useState(null)
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setOpenIdx(null); setMobileOpenIdx(null) }, [location])

  useEffect(() => {
    const onClick = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenIdx(null) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`} ref={navRef}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/images/logo-main.png" alt="Royal Tech" />
        </Link>

        <ul className="navbar__links">
          {items.map((item, i) => {
            const hasDropdown = item.mega || item.flat
            const isActive = location.pathname === item.to
            return (
              <li
                key={item.to + i}
                className="navbar__item"
                onMouseEnter={() => hasDropdown && setOpenIdx(i)}
                onMouseLeave={() => hasDropdown && setOpenIdx(null)}
              >
                <Link to={item.to} className={isActive ? 'active' : ''}>
                  {item.label}
                  {hasDropdown && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </Link>

                {item.mega && openIdx === i && (
                  <div className="navbar__mega">
                    {item.mega.map((col, ci) => (
                      <div className="navbar__mega-col" key={ci}>
                        <span className="navbar__mega-title">{col.title}</span>
                        {col.items.map(sub => (
                          <Link key={sub.to} to={sub.to} className="navbar__mega-link">{sub.label}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {item.flat && openIdx === i && (
                  <div className="navbar__dropdown-menu navbar__dropdown-menu--flat">
                    {item.flat.map(sub => (
                      <Link key={sub.to} to={sub.to}>{sub.label}</Link>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <Link to="/contact" className="navbar__contact-btn">{tx.nav.contact}</Link>

        <div className="navbar__actions">
          <button className="navbar__lang" onClick={toggleLang} aria-label="Toggle language">
            <span className={lang === 'en' ? 'active' : ''}>English</span>
            <span className="divider">|</span>
            <span className={lang === 'ar' ? 'active' : ''}>العربية</span>
          </button>
          <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu - accordion style */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        {items.map((item, i) => {
          const hasDropdown = item.mega || item.flat
          const subItems = item.mega ? item.mega.flatMap(c => c.items.map(it => ({ ...it, group: c.title }))) : item.flat
          return (
            <div key={item.to + i} className="navbar__mobile-item">
              <div className="navbar__mobile-row">
                <Link to={item.to} className="navbar__mobile-main">{item.label}</Link>
                {hasDropdown && (
                  <button
                    className={`navbar__mobile-toggle ${mobileOpenIdx === i ? 'open' : ''}`}
                    onClick={() => setMobileOpenIdx(p => p === i ? null : i)}
                    aria-label="Toggle submenu"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                )}
              </div>
              {hasDropdown && mobileOpenIdx === i && (
                <div className="navbar__mobile-sub">
                  {item.mega ? (
                    item.mega.map((col, ci) => (
                      <div key={ci} className="navbar__mobile-group">
                        <span>{col.title}</span>
                        {col.items.map(sub => <Link key={sub.to} to={sub.to}>{sub.label}</Link>)}
                      </div>
                    ))
                  ) : (
                    subItems.map(sub => <Link key={sub.to} to={sub.to}>{sub.label}</Link>)
                  )}
                </div>
              )}
            </div>
          )
        })}
        <Link to="/contact" className="navbar__mobile-contact">{tx.nav.contact}</Link>
        <button className="navbar__lang navbar__lang--mobile" onClick={toggleLang}>
          <span className={lang === 'en' ? 'active' : ''}>English</span>
          <span className="divider"> | </span>
          <span className={lang === 'ar' ? 'active' : ''}>العربية</span>
        </button>
      </div>
    </nav>
  )
}
