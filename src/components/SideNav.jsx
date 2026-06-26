import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { t } from '../data/translations'
import './SideNav.css'

export default function SideNav() {
  const { lang } = useLang()
  const tx = t[lang].nav
  const location = useLocation()

  const items = [
    { label: tx.about, to: '/about', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    )},
    { label: tx.partners, to: '/partners', icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    )},
  ]

  return (
    <div className="side-nav">
      {items.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={`side-nav__btn ${location.pathname === item.to ? 'active' : ''}`}
        >
          <span className="side-nav__icon">{item.icon}</span>
          <span className="side-nav__text">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
