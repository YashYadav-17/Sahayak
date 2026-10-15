import { useEffect, useState } from 'react';
import { NavLink, Link, Route, Routes, useLocation } from 'react-router-dom';
import { useStore, STR } from './store.jsx';
import { BrandMark } from './ui.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import Hire from './pages/Hire.jsx';
import Profile from './pages/Profile.jsx';
import Support from './pages/Support.jsx';

function Navbar() {
  const { state, setLang } = useStore();
  const t = STR[state.lang];
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const initial = (state.profiles[state.role].name || 'S')[0].toUpperCase();
  return (
    <header className={`nav ${solid ? 'solid' : ''}`}>
      <div className="container nav-in">
        <Link to="/" className="brand" aria-label="SAHAYAK home"><BrandMark />SAHAYAK</Link>
        <nav aria-label="Primary">
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            <li><NavLink to="/" end>{t.home}</NavLink></li>
            <li><NavLink to="/jobs">{t.jobs}</NavLink></li>
            <li><NavLink to="/hire">{t.hire}</NavLink></li>
            <li><NavLink to="/profile">{t.profile}</NavLink></li>
          </ul>
        </nav>
        <div className="nav-right">
          <label className="sr-only" htmlFor="lang">Language</label>
          <select id="lang" className="lang" value={state.lang} onChange={(e) => setLang(e.target.value)} style={{ width: 'auto', minHeight: 36 }}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          <Link to="/profile" className="avatar" aria-label="Open profile">{initial}</Link>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? '✕' : '☰'}</button>
        </div>
      </div>
    </header>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>SAHAYAK · ARTEMIS 2026 hackathon prototype. All jobs, workers and employers shown are sample data.</span>
          <Link to="/support">Worker Support Hub</Link>
        </div>
      </footer>
    </>
  );
}
