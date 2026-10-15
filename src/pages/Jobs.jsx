import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../store.jsx';
import { AREAS, TRADES, TYPE_LABEL, BASIS_LABEL, FAIR_TERMS, termStatus, termValue, formatWage } from '../data.js';
import { JobCard, Modal, Toast, EmployerBadge } from '../ui.jsx';

const STATUS_TEXT = { specified: 'Clearly specified', clarify: 'Needs clarification', missing: 'Not provided' };

function FairWorkCheck({ job, onApply, applied }) {
  const [step, setStep] = useState(0);
  const [asks, setAsks] = useState([]);
  const [copied, setCopied] = useState(false);
  const total = FAIR_TERMS.length;
  const statuses = FAIR_TERMS.map((t) => ({ ...t, status: termStatus(job, t.key), value: termValue(job, t.key) }));
  const gaps = statuses.filter((s) => s.status !== 'specified');
  const toggle = (k) => setAsks((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]));
  const questions = statuses.filter((s) => asks.includes(s.key)).map((s) => s.ask);

  if (step >= total) {
    return (
      <div className="fwc">
        <h3>Your review summary</h3>
        <p className="note">{total - gaps.length} of {total} terms are clearly specified.</p>
        <div style={{ marginTop: 10 }}>
          {statuses.map((s) => (
            <div className="summary-row" key={s.key}><span>{s.label}</span><span className={`status ${s.status}`}>{STATUS_TEXT[s.status]}</span></div>
          ))}
        </div>
        {gaps.length > 0 && <div className="warning" role="alert">⚠ {gaps.length} term{gaps.length > 1 ? 's are' : ' is'} unclear or missing. Consider asking the employer before accepting work.</div>}
        {questions.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <b>Questions to ask the employer</b>
            <ul style={{ paddingLeft: 20, color: '#E2E8F0' }}>{questions.map((q) => <li key={q}>{q}</li>)}</ul>
            <button className="btn btn-ghost btn-sm" onClick={() => { navigator.clipboard?.writeText(questions.join('\n')).then(() => setCopied(true)).catch(() => {}); }}>{copied ? 'Copied ✓' : 'Copy questions'}</button>
          </div>
        )}
        <p className="disclaimer">This check only reflects what the listing says. It does not confirm the job is genuine or guarantee payment.</p>
        <div className="fwc-nav">
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>Review again</button>
          {applied ? <span className="badge ok">Interest recorded (demo)</span> : <button className="btn btn-primary btn-sm" onClick={() => onApply(questions)}>Express interest (demo)</button>}
        </div>
      </div>
    );
  }
  const cur = statuses[step];
  return (
    <div className="fwc">
      <h3>Fair Work Check</h3>
      <p className="note">Review each term before you accept. Step {step + 1} of {total}.</p>
      <div className="progress" aria-hidden="true">{FAIR_TERMS.map((_, i) => <i key={i} className={i <= step ? 'on' : ''} />)}</div>
      <div className="term" key={cur.key}>
        <div className="lbl">{cur.label}</div>
        <div className="val">{cur.value}</div>
        <span className={`status ${cur.status}`}>{STATUS_TEXT[cur.status]}</span>
        {cur.status !== 'specified' && (
          <label className="check"><input type="checkbox" checked={asks.includes(cur.key)} onChange={() => toggle(cur.key)} /><span>Add to my questions: “{cur.ask}”</span></label>
        )}
      </div>
      <div className="fwc-nav">
        <button className="btn btn-ghost btn-sm" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
        <button className="btn btn-primary btn-sm" onClick={() => setStep(step + 1)}>{step === total - 1 ? 'See summary' : 'Next →'}</button>
      </div>
    </div>
  );
}

function JobModal({ job, onClose }) {
  const { state, apply, toggleSave } = useStore();
  const existing = state.applications.find((a) => a.jobId === job.id);
  const [tab, setTab] = useState('details');
  const [done, setDone] = useState(false);
  const trade = TRADES.find((t) => t.id === job.trade);
  const signals = [
    ['Contact information provided', job.contactProvided],
    ['Work terms specified', job.missing.length === 0 && job.vague.length === 0],
    ['Employer details available', job.employerDetails],
    ['Safety information shared', !!job.safety],
  ];
  return (
    <Modal onClose={onClose} label={job.title}>
      <span className="badge">{trade?.label.replace(/s$/, '')} · {TYPE_LABEL[job.type]}</span>
      <h2 style={{ marginTop: 10 }}>{job.title}</h2>
      <p style={{ color: 'var(--muted)' }}>{job.employer || 'Employer not named'}</p>
      <div className="tabs" role="tablist">
        {[['details', 'Job details'], ['check', 'Fair Work Check'], ['trust', 'Trust signals']].map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'details' && (
        <>
          <div className="kv">
            <div><small>Wage</small><b>{formatWage(job)}</b></div>
            <div><small>Payment timing</small><b>{job.payTiming || 'Not provided'}</b></div>
            <div><small>Location</small><b>{job.location || 'Not provided'}</b></div>
            <div><small>Working hours</small><b>{job.hours || 'Not provided'}</b></div>
            <div><small>Duration</small><b>{job.duration}</b></div>
            <div><small>Safety / reporting</small><b>{job.safety || 'Not provided'}</b></div>
          </div>
          <h4>Work description</h4><p style={{ margin: '6px 0 14px' }}>{job.description}</p>
          <h4>Responsibilities</h4><p style={{ margin: '6px 0 14px' }}>{job.responsibilities || 'Not provided'}</p>
          <EmployerBadge job={job} />
          <div className="actions" style={{ marginTop: 18 }}>
            <button className="btn btn-primary" onClick={() => setTab('check')}>Review terms &amp; express interest</button>
            <button className="btn btn-outline" onClick={() => toggleSave(job.id)}>{state.saved.includes(job.id) ? '★ Saved' : '☆ Save'}</button>
          </div>
        </>
      )}
      {tab === 'check' && (
        <>
          <FairWorkCheck job={job} applied={!!existing} onApply={(q) => { apply(job.id, q); setDone(true); }} />
          {(done || existing) && (
            <div className="ok-box" style={{ marginTop: 14 }} role="status">
              <b>Interest recorded in this demo.</b>
              <p>No real employer has been contacted. Track the simulated status in <Link className="link-btn" to="/profile" onClick={onClose}>My Profile → My Work Journey</Link>.</p>
            </div>
          )}
        </>
      )}
      {tab === 'trust' && (
        <div>
          <p style={{ color: 'var(--muted)', marginBottom: 12 }}>What information is available about this listing. This is not a trust score.</p>
          {signals.map(([l, ok]) => (
            <div key={l} className="summary-row" style={{ borderColor: 'var(--border)' }}><span>{l}</span><span className={`badge ${ok ? 'ok' : 'warn'}`}>{ok ? 'Available' : 'Not provided'}</span></div>
          ))}
          <div className="summary-row" style={{ borderColor: 'var(--border)' }}><span>Independent verification</span><span className="badge">Not available in this prototype</span></div>
        </div>
      )}
    </Modal>
  );
}

function Radar({ jobs, onOpen }) {
  const [sel, setSel] = useState(null);
  const R = 15;
  const pos = (j) => {
    let h = 0; for (const c of j.id) h = (h * 31 + c.charCodeAt(0)) % 360;
    const a = (h * Math.PI) / 180; const r = (Math.min(j.distanceKm, R) / R) * 190;
    return [200 + r * Math.cos(a), 200 + r * Math.sin(a)];
  };
  const sorted = [...jobs].sort((a, b) => a.distanceKm - b.distanceKm);
  return (
    <div className="radar-wrap">
      <div>
        <div className="radar">
          <svg viewBox="0 0 400 400" role="img" aria-label="Illustrative radar of nearby jobs">
            <defs><linearGradient id="sw" x1="0" x2="1"><stop offset="0" stopColor="#14B8A6" stopOpacity="0" /><stop offset="1" stopColor="#67E8F9" stopOpacity=".55" /></linearGradient></defs>
            {[2, 5, 10, 15].map((k) => <g key={k}><circle cx="200" cy="200" r={(k / R) * 190} fill="none" stroke="rgba(103,232,249,.25)" /><text x="204" y={200 - (k / R) * 190 + 12} fill="#8EA0B2" fontSize="10">{k} km</text></g>)}
            <path className="sweep" d="M200 200 L390 200 A190 190 0 0 0 340 66 Z" fill="url(#sw)" />
            <circle cx="200" cy="200" r="5" fill="#fff" />
            {sorted.map((j) => { const [x, y] = pos(j); return <circle key={j.id} className={`blip ${sel === j.id ? 'sel' : ''}`} cx={x} cy={y} r={sel === j.id ? 9 : 7} fill={j.missing.length ? '#FDE68A' : '#14B8A6'} stroke="#fff" strokeWidth="1.5" tabIndex={0} role="button" aria-label={`${j.title}, ${j.distanceKm} km`} onClick={() => setSel(j.id)} onKeyDown={(e) => e.key === 'Enter' && setSel(j.id)} />; })}
          </svg>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 10 }}>Illustrative view. Distances are sample values from the selected area’s centre, not live GPS. Amber dots have missing terms.</p>
      </div>
      <div className="grid">
        {sorted.length === 0 && <div className="empty">No jobs in this area yet.</div>}
        {sorted.map((j) => (
          <div key={j.id} className="card hover" style={sel === j.id ? { borderColor: 'var(--electric)' } : undefined} onClick={() => setSel(j.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><b>{j.title}</b><span className="badge">{j.distanceKm} km</span></div>
            <div className="meta"><span>{TRADES.find((t) => t.id === j.trade)?.label.replace(/s$/, '')}</span><span>{formatWage(j)}</span><span>{j.type === 'full' ? 'Full-time' : j.duration}</span></div>
            <button className="link-btn" style={{ marginTop: 8 }} onClick={(e) => { e.stopPropagation(); onOpen(j); }}>View details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceBar({ onTrade }) {
  const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const rec = useRef(null);
  const start = () => {
    const r = new SR();
    r.lang = 'hi-IN'; r.interimResults = false;
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onerror = () => { setListening(false); setHeard('Could not hear you. Please tap a trade instead.'); };
    r.onresult = (e) => {
      const text = e.results[0][0].transcript; setHeard(`Heard: “${text}”`);
      const m = TRADES.find((t) => t.keywords.some((k) => text.toLowerCase().includes(k.toLowerCase())));
      if (m) onTrade(m.id); else setHeard(`Heard: “${text}”. No matching trade, please tap one.`);
    };
    rec.current = r; r.start();
  };
  return (
    <div className="voice">
      <b>Tap a trade:</b>
      {TRADES.map((t) => <button key={t.id} className="chip" onClick={() => onTrade(t.id)}>{t.hi}</button>)}
      {SR
        ? <button className="btn btn-outline btn-sm" onClick={() => (listening ? rec.current?.stop() : start())}>{listening ? '⏹ Stop' : '🎤 Speak a trade'}</button>
        : <span style={{ color: 'var(--muted)', fontSize: 13 }}>Voice search isn’t supported in this browser. Use the trade buttons.</span>}
      {listening && <span className="listening" role="status">Listening…</span>}
      {heard && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{heard}</span>}
    </div>
  );
}

export default function Jobs() {
  const { jobs, state, toggleSave } = useStore();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState('');
  const [area, setArea] = useState('All');
  const [trade, setTrade] = useState(params.get('trade') || 'all');
  const [type, setType] = useState('all');
  const [basis, setBasis] = useState('all');
  const [dist, setDist] = useState('any');
  const [savedOnly, setSavedOnly] = useState(false);
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => { const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const id = params.get('job');
    if (id) { const j = jobs.find((x) => x.id === id); if (j) setOpen(j); }
  }, [params, jobs]);
  useEffect(() => { if (params.get('trade')) setTrade(params.get('trade')); }, [params]);

  const radarArea = area === 'All' ? 'Pune' : area;
  const list = useMemo(() => jobs.filter((j) => {
    const text = `${j.title} ${j.employer} ${j.location} ${TRADES.find((t) => t.id === j.trade)?.label}`.toLowerCase();
    if (q && !text.includes(q.toLowerCase())) return false;
    if (view === 'radar') return j.area === radarArea;
    if (area !== 'All' && j.area !== area) return false;
    if (trade !== 'all' && j.trade !== trade) return false;
    if (type !== 'all' && j.type !== type) return false;
    if (basis !== 'all' && j.basis !== basis) return false;
    if (dist !== 'any' && j.distanceKm > Number(dist)) return false;
    if (savedOnly && !state.saved.includes(j.id)) return false;
    return true;
  }), [jobs, q, area, trade, type, basis, dist, savedOnly, state.saved, view, radarArea]);

  const reset = () => { setQ(''); setArea('All'); setTrade('all'); setType('all'); setBasis('all'); setDist('any'); setSavedOnly(false); setParams({}); };
  const close = () => { setOpen(null); if (params.get('job')) { const p = new URLSearchParams(params); p.delete('job'); setParams(p); } };
  const onSave = (id) => { toggleSave(id); setToast(state.saved.includes(id) ? 'Removed from saved' : 'Job saved'); };
  const filtersOn = q || area !== 'All' || trade !== 'all' || type !== 'all' || basis !== 'all' || dist !== 'any' || savedOnly;

  return (
    <div className="page">
      <div className="container">
        <div className="page-head"><h1>Find Jobs</h1><p>Browse sample opportunities. No sign-up needed.</p></div>
        <div className="demo-banner">Prototype: all listings are sample data and applications are simulated. No real employer is contacted.</div>
        <div className="toolbar">
          <div className="search-row">
            <label className="sr-only" htmlFor="q">Search jobs</label>
            <input id="q" className="grow" placeholder="Search by trade or job title" value={q} onChange={(e) => setQ(e.target.value)} />
            <label className="sr-only" htmlFor="area">Area</label>
            <select id="area" className="sel" value={area} onChange={(e) => setArea(e.target.value)}><option value="All">All areas</option>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
            <label className="sr-only" htmlFor="dist">Distance</label>
            <select id="dist" className="sel" value={dist} onChange={(e) => setDist(e.target.value)}><option value="any">Any distance</option><option value="5">Within 5 km</option><option value="10">Within 10 km</option></select>
          </div>
          <VoiceBar onTrade={(id) => { setTrade(id); setView('list'); }} />
          <div className="chips" aria-label="Trade filters">
            <button className={`chip ${trade === 'all' ? 'on' : ''}`} onClick={() => setTrade('all')}>All trades</button>
            {TRADES.map((t) => <button key={t.id} className={`chip ${trade === t.id ? 'on' : ''}`} onClick={() => setTrade(t.id)}>{t.label}</button>)}
          </div>
          <div className="chips" aria-label="Type and payment filters">
            {Object.entries(TYPE_LABEL).map(([k, l]) => <button key={k} className={`chip ${type === k ? 'on' : ''}`} onClick={() => setType(type === k ? 'all' : k)}>{l}</button>)}
            <span style={{ width: 8 }} />
            {Object.entries(BASIS_LABEL).filter(([k]) => k !== 'hour').map(([k, l]) => <button key={k} className={`chip ${basis === k ? 'on' : ''}`} onClick={() => setBasis(basis === k ? 'all' : k)}>{l}</button>)}
            <button className={`chip ${savedOnly ? 'on' : ''}`} onClick={() => setSavedOnly(!savedOnly)}>★ Saved ({state.saved.length})</button>
            {filtersOn && <button className="link-btn" onClick={reset}>Reset filters</button>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div className="seg" role="tablist"><button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>List</button><button className={view === 'radar' ? 'on' : ''} onClick={() => setView('radar')}>Kaam Radar</button></div>
            {view === 'radar' && <span style={{ color: 'var(--muted)', alignSelf: 'center' }}>Showing jobs around {radarArea}. Change area above.</span>}
          </div>
        </div>

        {view === 'list' && <div className="result-meta"><span>{loading ? 'Loading…' : `${list.length} job${list.length === 1 ? '' : 's'} found`}</span></div>}
        {loading ? (
          <div className="grid g3"><div className="skel" /><div className="skel" /><div className="skel" /></div>
        ) : view === 'radar' ? (
          <div style={{ marginTop: 18 }}><Radar jobs={list} onOpen={setOpen} /></div>
        ) : list.length === 0 ? (
          <div className="empty"><b>No jobs match these filters.</b><p style={{ margin: '8px 0 14px' }}>Try a wider area or fewer filters.</p><button className="btn btn-outline btn-sm" onClick={reset}>Reset filters</button></div>
        ) : (
          <div className="grid g3">{list.map((j) => <JobCard key={j.id} job={j} saved={state.saved.includes(j.id)} onSave={onSave} onOpen={setOpen} />)}</div>
        )}
      </div>
      {open && <JobModal job={open} onClose={close} />}
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  );
}
