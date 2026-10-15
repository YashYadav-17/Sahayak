import { useEffect, useRef, useState } from 'react';
import { TRADES, TYPE_LABEL, formatWage } from './data.js';

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }}>{children}</Tag>;
}

const ICONS = {
  electrician: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  plumber: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  carpenter: <><path d="M3 20 14 9" /><path d="m13 4 7 7-3 3-7-7z" /></>,
  painter: <><rect x="4" y="3" width="14" height="6" rx="1" /><path d="M18 6h2v6h-8v3" /><rect x="10" y="15" width="4" height="6" rx="1" /></>,
  cleaner: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6 6 2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></>,
  labourer: <><path d="M3 17h18M5 17a7 7 0 0 1 14 0" /><path d="M12 6v4" /></>,
};
export const TradeIcon = ({ id }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[id]}</svg>
);

export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <defs><linearGradient id="bm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#67E8F9" /><stop offset="1" stopColor="#0F766E" /></linearGradient></defs>
      <circle cx="20" cy="20" r="18" fill="none" stroke="url(#bm)" strokeWidth="2" />
      <path d="M8 24c6-12 10-12 12-4s6 8 12-4" fill="none" stroke="url(#bm)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="20" cy="20" r="2.5" fill="#67E8F9" />
    </svg>
  );
}

export function Modal({ onClose, label, children }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={label}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        {children}
      </div>
    </div>
  );
}

export function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [onDone]);
  return <div className="toast" role="status">{msg}</div>;
}

export function EmployerBadge({ job }) {
  if (job.mine) return <span className="badge info">Posted by you (demo)</span>;
  if (!job.employerDetails) return <span className="badge warn">Employer details not provided</span>;
  return <span className="badge info">Employer details provided · not verified</span>;
}

export function JobCard({ job, saved, onSave, onOpen, compact }) {
  const trade = TRADES.find((t) => t.id === job.trade);
  return (
    <article className="card hover job-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <span className="badge">{trade?.label.replace(/s$/, '')}</span>
        <span className="badge">{TYPE_LABEL[job.type]}</span>
      </div>
      <h3>{job.title}</h3>
      <div className="emp">{job.employer || 'Employer not named'}</div>
      <div className="wage">{formatWage(job)}</div>
      <div className="meta">
        <span>📍 {job.location || job.area}</span>
        <span>🕘 {job.hours || 'Hours not stated'}</span>
        {!compact && <span>⏳ {job.duration}</span>}
      </div>
      <EmployerBadge job={job} />
      <div className="actions">
        <button className="btn btn-primary btn-sm" onClick={() => onOpen(job)}>View details</button>
        <button className="btn btn-outline btn-sm" onClick={() => onSave(job.id)} aria-pressed={saved} aria-label={saved ? 'Remove saved job' : 'Save job'}>{saved ? '★ Saved' : '☆ Save'}</button>
      </div>
    </article>
  );
}
