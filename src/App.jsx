import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SideNav from './components/SideNav'
import Home from './pages/Home'
import InnerPage from './pages/InnerPage'

const ROUTES = [
  '/about',
  '/rofs-uae',
  '/rofs-uae/upstream',
  '/rofs-uae/downstream',
  '/rofs-uae/qhse',
  '/rofs-uae/solutions/oil-field-development',
  '/rofs-uae/solutions/asset-management',
  '/rofs-uae/solutions/environmental',
  '/rofs-uae/solutions/smart-solutions',
  '/rofs-uae/supply/equipment',
  '/rofs-uae/supply/chemicals',
  '/trading',
  '/trading/about',
  '/trading/values',
  '/trading/partners',
  '/trading/products',
  '/trading/logistics',
  '/general-trading',
  '/general-trading/mr-buffalo',
  '/products',
  '/partners',
  '/contact',
]

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Navbar />
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          {ROUTES.map(path => (
            <Route key={path} path={path} element={<InnerPage slug={path.replace(/^\//, '')} />} />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  )
}
