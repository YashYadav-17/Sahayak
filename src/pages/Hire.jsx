import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store.jsx';
import { AREAS, TRADES, TYPE_LABEL, BASIS_LABEL, formatWage } from '../data.js';
import { JobCard, Modal, Toast } from '../ui.jsx';

function Field({ label, error, children }) {
  return <label className="f">{label}{children}{error && <span className="err" role="alert">{error}</span>}</label>;
}

function EnquiryForm({ worker, onClose }) {
  const { addEnquiry } = useStore();
  const [f, setF] = useState({ work: '', amount: '', basis: 'day', schedule: '', contact: '' });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.work.trim().length < 10) er.work = 'Please describe the work (at least 10 characters).';
    if (!f.amount || Number(f.amount) <= 0) er.amount = 'Enter the payment amount.';
    if (!f.schedule.trim()) er.schedule = 'Add when you need the work done.';
    if (!f.contact.trim()) er.contact = 'Add a phone number or email.';
    setErrs(er);
    if (Object.keys(er).length) return;
    addEnquiry({ workerId: worker.id, workerName: worker.name, ...f });
    setSent(true);
  };
  if (sent) return (
    <div className="ok-box" role="status">
      <b>Enquiry saved in this demo.</b>
      <p>{worker.name} has not been contacted because this prototype has no live messaging. You can review it in <Link className="link-btn" to="/profile" onClick={onClose}>My Profile → Employer</Link>.</p>
      <button className="btn btn-outline btn-sm" style={{ marginTop: 10 }} onClick={onClose}>Close</button>
    </div>
  );
  return (
    <form className="form" onSubmit={submit} noValidate>
      <Field label="Describe the work" error={errs.work}><textarea value={f.work} onChange={up('work')} placeholder="e.g. Rewire two rooms in a flat" /></Field>
      <div className="row2">
        <Field label="Payment amount (₹)" error={errs.amount}><input type="number" min="0" value={f.amount} onChange={up('amount')} /></Field>
        <Field label="Payment basis"><select value={f.basis} onChange={up('basis')}>{Object.entries(BASIS_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
      </div>
      <Field label="Schedule" error={errs.schedule}><input value={f.schedule} onChange={up('schedule')} placeholder="e.g. Next Monday, 9 am, 3 days" /></Field>
      <Field label="Your contact (phone or email)" error={errs.contact}><input value={f.contact} onChange={up('contact')} /></Field>
      <button className="btn btn-primary" type="submit">Submit hiring enquiry (demo)</button>
    </form>
  );
}

function WorkerModal({ worker, onClose }) {
  const trade = TRADES.find((t) => t.id === worker.trade);
  const [form, setForm] = useState(false);
  return (
    <Modal onClose={onClose} label={worker.name}>
      <span className="badge">{trade.label.replace(/s$/, '')}</span>
      <h2 style={{ marginTop: 10 }}>{worker.name}</h2>
      <div className="kv">
        <div><small>Experience</small><b>{worker.experience} years (self-reported)</b></div>
        <div><small>Availability</small><b>{worker.availability}</b></div>
        <div><small>Service area</small><b>{worker.area}</b></div>
        <div><small>Preferred work</small><b>{worker.preferred}</b></div>
      </div>
      <h4>Skills</h4>
      <div className="chips" style={{ margin: '8px 0 14px' }}>{worker.skills.map((s) => <span key={s} className="badge info">{s}</span>)}</div>
      <h4>Work samples</h4>
      <p style={{ margin: '6px 0 14px' }}>{worker.samples.length ? worker.samples.join('; ') : 'No samples added yet.'}</p>
      <p className="badge warn" style={{ marginBottom: 16 }}>Identity not verified · this prototype cannot verify identity or credentials</p>
      {form ? <EnquiryForm worker={worker} onClose={onClose} /> : <button className="btn btn-primary" onClick={() => setForm(true)}>Send hiring enquiry</button>}
    </Modal>
  );
}

function PostJob({ onPosted }) {
  const { postJob, state } = useStore();
  const empty = { title: '', trade: 'electrician', employer: state.profiles.employer.name, area: 'Pune', location: '', wage: '', basis: 'day', hours: '', duration: '', type: 'short', payTiming: '', description: '' };
  const [f, setF] = useState(empty);
  const [errs, setErrs] = useState({});
  const [preview, setPreview] = useState(false);
  const up = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const validate = () => {
    const er = {};
    if (f.title.trim().length < 4) er.title = 'Enter a job title.';
    if (!f.location.trim()) er.location = 'Enter the work location.';
    if (!f.wage || Number(f.wage) <= 0) er.wage = 'Enter the payment amount.';
    if (!f.hours.trim()) er.hours = 'Enter working hours.';
    if (!f.duration.trim()) er.duration = 'Enter the duration.';
    if (!f.payTiming.trim()) er.payTiming = 'Say when payment will be made.';
    if (f.description.trim().length < 10) er.description = 'Add a short description.';
    setErrs(er);
    return !Object.keys(er).length;
  };
  const job = { ...f, wage: Number(f.wage), distanceKm: 0, responsibilities: f.description, contactProvided: true, employerDetails: !!f.employer.trim(), safety: '', missing: f.employer.trim() ? [] : ['employer'], vague: [] };
  return (
    <div className="card" style={{ maxWidth: 760 }}>
      {preview ? (
        <>
          <h3>Preview</h3><p style={{ color: 'var(--muted)', margin: '6px 0 14px' }}>This is how workers will see your listing.</p>
          <div className="preview"><JobCard job={{ ...job, mine: true }} onSave={() => {}} onOpen={() => {}} /></div>
          <div className="actions" style={{ marginTop: 16 }}>
            <button className="btn btn-outline" onClick={() => setPreview(false)}>← Edit</button>
            <button className="btn btn-primary" onClick={() => { postJob(job); setF(empty); setPreview(false); onPosted(); }}>Publish (demo)</button>
          </div>
        </>
      ) : (
        <form className="form" noValidate onSubmit={(e) => { e.preventDefault(); if (validate()) setPreview(true); }}>
          <div className="row2">
            <Field label="Job title" error={errs.title}><input value={f.title} onChange={up('title')} /></Field>
            <Field label="Trade"><select value={f.trade} onChange={up('trade')}>{TRADES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></Field>
          </div>
          <Field label="Employer / business name (optional)"><input value={f.employer} onChange={up('employer')} /></Field>
          <div className="row2">
            <Field label="Area"><select value={f.area} onChange={up('area')}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></Field>
            <Field label="Work location / address" error={errs.location}><input value={f.location} onChange={up('location')} /></Field>
          </div>
          <div className="row2">
            <Field label="Payment amount (₹)" error={errs.wage}><input type="number" min="0" value={f.wage} onChange={up('wage')} /></Field>
            <Field label="Payment basis"><select value={f.basis} onChange={up('basis')}>{Object.entries(BASIS_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
          </div>
          <div className="row2">
            <Field label="Work hours" error={errs.hours}><input value={f.hours} onChange={up('hours')} placeholder="e.g. 9:00 – 17:00" /></Field>
            <Field label="Duration" error={errs.duration}><input value={f.duration} onChange={up('duration')} placeholder="e.g. 5 days" /></Field>
          </div>
          <div className="row2">
            <Field label="Type of work"><select value={f.type} onChange={up('type')}>{Object.entries(TYPE_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></Field>
            <Field label="Payment timing" error={errs.payTiming}><input value={f.payTiming} onChange={up('payTiming')} placeholder="e.g. Daily, in cash or UPI" /></Field>
          </div>
          <Field label="Description" error={errs.description}><textarea value={f.description} onChange={up('description')} /></Field>
          <button className="btn btn-primary" type="submit">Preview listing</button>
        </form>
      )}
    </div>
  );
}

export default function Hire() {
  const { workers, state, jobs } = useStore();
  const [tab, setTab] = useState('find');
  const [q, setQ] = useState('');
  const [trade, setTrade] = useState('all');
  const [avail, setAvail] = useState('all');
  const [area, setArea] = useState('All');
  const [minExp, setMinExp] = useState(0);
  const [open, setOpen] = useState(null);
  const [toast, setToast] = useState('');

  const list = useMemo(() => workers.filter((w) => {
    if (q && !`${w.name} ${w.skills.join(' ')} ${w.trade}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (trade !== 'all' && w.trade !== trade) return false;
    if (avail === 'now' && w.availability !== 'Available now') return false;
    if (area !== 'All' && w.area !== area) return false;
    if (w.experience < minExp) return false;
    return true;
  }), [workers, q, trade, avail, area, minExp]);
  const mine = jobs.filter((j) => j.mine);

  return (
    <div className="page">
      <div className="container">
        <div className="page-head"><h1>Hire Workers</h1><p>Find skilled people for your work, or post a job.</p></div>
        <div className="demo-banner">Prototype: worker profiles are sample data. Enquiries are saved on this device only and are not sent to anyone.</div>
        <div className="seg" style={{ margin: '22px 0' }} role="tablist"><button className={tab === 'find' ? 'on' : ''} onClick={() => setTab('find')}>Find workers</button><button className={tab === 'post' ? 'on' : ''} onClick={() => setTab('post')}>Post a job</button></div>

        {tab === 'find' && (
          <>
            <div className="toolbar">
              <div className="search-row">
                <label className="sr-only" htmlFor="wq">Search workers</label>
                <input id="wq" className="grow" placeholder="Search by name or skill" value={q} onChange={(e) => setQ(e.target.value)} />
                <label className="sr-only" htmlFor="wa">Area</label>
                <select id="wa" className="sel" value={area} onChange={(e) => setArea(e.target.value)}><option value="All">All areas</option>{AREAS.map((a) => <option key={a}>{a}</option>)}</select>
                <label className="sr-only" htmlFor="we">Experience</label>
                <select id="we" className="sel" value={minExp} onChange={(e) => setMinExp(Number(e.target.value))}><option value={0}>Any experience</option><option value={3}>3+ years</option><option value={5}>5+ years</option><option value={10}>10+ years</option></select>
              </div>
              <div className="chips">
                <button className={`chip ${trade === 'all' ? 'on' : ''}`} onClick={() => setTrade('all')}>All trades</button>
                {TRADES.map((t) => <button key={t.id} className={`chip ${trade === t.id ? 'on' : ''}`} onClick={() => setTrade(t.id)}>{t.label}</button>)}
                <button className={`chip ${avail === 'now' ? 'on' : ''}`} onClick={() => setAvail(avail === 'now' ? 'all' : 'now')}>Available now</button>
                {(q || trade !== 'all' || avail !== 'all' || area !== 'All' || minExp) ? <button className="link-btn" onClick={() => { setQ(''); setTrade('all'); setAvail('all'); setArea('All'); setMinExp(0); }}>Reset filters</button> : null}
              </div>
            </div>
            <div className="result-meta"><span>{list.length} worker{list.length === 1 ? '' : 's'} found</span></div>
            {list.length === 0 ? <div className="empty">No workers match. Try removing a filter.</div> : (
              <div className="grid g3">
                {list.map((w) => (
                  <article key={w.id} className="card hover job-card">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <div className="avatar" style={{ width: 48, height: 48 }}>{w.name[0]}</div>
                      <div><h3>{w.name}</h3><div className="emp">{TRADES.find((t) => t.id === w.trade).label.replace(/s$/, '')} · {w.experience} yrs</div></div>
                    </div>
                    <div className="chips">{w.skills.slice(0, 3).map((s) => <span key={s} className="badge info">{s}</span>)}</div>
                    <div className="meta"><span>📍 {w.area}</span><span>🗓 {w.availability}</span></div>
                    <span className="badge warn">Identity not verified</span>
                    <div className="actions"><button className="btn btn-primary btn-sm" onClick={() => setOpen(w)}>View profile</button></div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'post' && <PostJob onPosted={() => setToast('Listing published to the demo job list')} />}
        {tab === 'post' && mine.length > 0 && (
          <div style={{ marginTop: 28 }}><h3>Your demo listings</h3>
            <div className="grid g3" style={{ marginTop: 14 }}>{mine.map((j) => <JobCard key={j.id} job={j} onSave={() => {}} onOpen={() => (window.location.hash = `#/jobs?job=${j.id}`)} />)}</div>
            <p style={{ marginTop: 12 }}><Link className="link-btn" to="/jobs">See them in Find Jobs →</Link></p></div>
        )}
      </div>
      {open && <WorkerModal worker={open} onClose={() => setOpen(null)} />}
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  );
}
