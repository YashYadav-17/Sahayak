import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, STAGES } from '../store.jsx';
import { AREAS, TRADES, formatWage } from '../data.js';
import { Toast } from '../ui.jsx';

function Passport({ p }) {
  const trade = TRADES.find((t) => t.id === p.trade);
  const skills = p.skills.split(',').map((s) => s.trim()).filter(Boolean);
  const samples = p.samples.split('\n').map((s) => s.trim()).filter(Boolean);
  return (
    <div className="passport" id="passport">
      <small>SKILL PASSPORT · SELF-REPORTED</small>
      <h3>{p.name || 'Your name'}</h3>
      <p>{trade.label.replace(/s$/, '')}{p.experience ? ` · ${p.experience} years` : ''}</p>
      <div className="tags">{skills.length ? skills.map((s) => <span className="tag" key={s}>{s}</span>) : <span className="tag">Add your skills</span>}</div>
      {samples.length > 0 && <><small>Work samples</small><ul style={{ margin: '6px 0 10px', paddingLeft: 18 }}>{samples.map((s) => <li key={s}>{s}</li>)}</ul></>}
      <small>{p.availability} · {p.area}</small>
      <div style={{ marginTop: 10 }}><small>Not verified by SAHAYAK. Information is entered by the worker.</small></div>
    </div>
  );
}

function WorkerProfile() {
  const { state, saveProfile, jobs, advance, toggleSave } = useStore();
  const [p, setP] = useState(state.profiles.worker);
  const [toast, setToast] = useState('');
  const up = (k) => (e) => setP({ ...p, [k]: e.target.value });
  const apps = state.applications.map((a) => ({ ...a, job: jobs.find((j) => j.id === a.jobId) })).filter((a) => a.job);
  const savedJobs = jobs.filter((j) => state.saved.includes(j.id));
  const share = async () => {
    const text = `${p.name || 'A worker'} · ${TRADES.find((t) => t.id === p.trade).label.replace(/s$/, '')} · ${p.experience || '?'} yrs · ${p.skills} · ${p.availability}, ${p.area} (SAHAYAK Skill Passport, self-reported)`;
    try {
      if (navigator.share) await navigator.share({ title: 'My Skill Passport', text });
      else { await navigator.clipboard.writeText(text); setToast('Passport summary copied'); }
    } catch (e) { /* user cancelled */ }
  };
  return (
    <div className="grid g2" style={{ alignItems: 'start' }}>
      <div className="card">
        <h3>My details</h3><p style={{ color: 'var(--muted)', margin: '4px 0 14px' }}>No résumé needed. Fill in what you can.</p>
        <form className="form" onSubmit={(e) => { e.preventDefault(); saveProfile('worker', p); setToast('Profile saved on this device'); }}>
          <label className="f">Name<input value={p.name} onChange={up('name')} /></label>
          <div className="row2">
            <label className="f">Trade<select value={p.trade} onChange={up('trade')}>{TRADES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></label>
            <label className="f">Experience (years)<input type="number" min="0" max="60" value={p.experience} onChange={up('experience')} /></label>
          </div>
          <label className="f">Skills (comma separated)<input value={p.skills} onChange={up('skills')} placeholder="House wiring, Panel fitting" /></label>
          <div className="row2">
            <label className="f">Availability<select value={p.availability} onChange={up('availability')}><option>Available now</option><option>Available from Monday</option><option>Not available</option></select></label>
            <label className="f">Preferred work area<select value={p.area} onChange={up('area')}>{AREAS.map((a) => <option key={a}>{a}</option>)}</select></label>
          </div>
          <label className="f">Work samples (one per line)<textarea value={p.samples} onChange={up('samples')} placeholder="e.g. Rewired a 2BHK in Baner" /></label>
          <button className="btn btn-primary" type="submit">Save profile</button>
        </form>
      </div>
      <div style={{ display: 'grid', gap: 18 }}>
        <Passport p={p} />
        <div><button className="btn btn-outline" onClick={share}>Share my Skill Passport</button></div>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>My Work Journey</h3>
        <p className="badge info" style={{ margin: '8px 0 0' }}>Simulated: no real employer is involved in this demo</p>
        {apps.length === 0 ? <div className="empty" style={{ marginTop: 14 }}>No applications yet. <Link className="link-btn" to="/jobs">Find a job</Link> and use Fair Work Check.</div> : (
          <div className="grid g2" style={{ marginTop: 14 }}>
            {apps.map((a) => (
              <div key={a.id} className="card">
                <b>{a.job.title}</b><div style={{ color: 'var(--muted)', fontSize: 14 }}>{a.job.employer || 'Employer not named'} · {formatWage(a.job)}</div>
                <ol className="timeline">{STAGES.map((s, i) => <li key={s} className={i < a.stage ? 'done' : i === a.stage ? 'now' : ''}><i />{s}</li>)}</ol>
                {a.clarifications.length > 0 && <p style={{ fontSize: 13, color: 'var(--muted)' }}>Questions noted: {a.clarifications.length}</p>}
                <button className="btn btn-outline btn-sm" disabled={a.stage >= 4} onClick={() => advance(a.id)}>{a.stage >= 4 ? 'Completed' : 'Simulate next stage'}</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>Saved jobs</h3>
        {savedJobs.length === 0 ? <p style={{ color: 'var(--muted)', marginTop: 8 }}>Nothing saved yet.</p> : (
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>{savedJobs.map((j) => (
            <div key={j.id} className="summary-row" style={{ borderColor: 'var(--border)' }}><span><b>{j.title}</b> · {formatWage(j)}</span>
              <span><Link className="link-btn" to={`/jobs?job=${j.id}`}>Open</Link> · <button className="link-btn" onClick={() => toggleSave(j.id)}>Remove</button></span></div>))}</div>
        )}
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  );
}

function EmployerProfile() {
  const { state, saveProfile, jobs } = useStore();
  const [p, setP] = useState(state.profiles.employer);
  const [toast, setToast] = useState('');
  const up = (k) => (e) => setP({ ...p, [k]: e.target.value });
  const mine = jobs.filter((j) => j.mine);
  return (
    <div className="grid g2" style={{ alignItems: 'start' }}>
      <div className="card">
        <h3>Employer details</h3>
        <form className="form" style={{ marginTop: 14 }} onSubmit={(e) => { e.preventDefault(); saveProfile('employer', p); setToast('Profile saved on this device'); }}>
          <label className="f">Employer or business name<input value={p.name} onChange={up('name')} /></label>
          <label className="f">Type of employer<select value={p.type} onChange={up('type')}><option>Individual / household</option><option>Contractor</option><option>Small business</option><option>Company</option><option>Housing society</option></select></label>
          <label className="f">Work location<input value={p.location} onChange={up('location')} /></label>
          <label className="f">Description<textarea value={p.description} onChange={up('description')} /></label>
          <button className="btn btn-primary" type="submit">Save profile</button>
        </form>
      </div>
      <div className="card">
        <h3>Information status</h3>
        <div style={{ marginTop: 10 }}>
          <div className="summary-row" style={{ borderColor: 'var(--border)' }}><span>Business name</span><span className="badge info">{p.name ? 'Entered by you' : 'Not provided'}</span></div>
          <div className="summary-row" style={{ borderColor: 'var(--border)' }}><span>Location</span><span className="badge info">{p.location ? 'Entered by you' : 'Not provided'}</span></div>
          <div className="summary-row" style={{ borderColor: 'var(--border)' }}><span>Independent verification</span><span className="badge">Not verified</span></div>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 10 }}>Confirmed vs unconfirmed: nothing here is verified in this prototype.</p>
      </div>
      <div className="card">
        <h3>Posted jobs</h3>
        {mine.length === 0 ? <p style={{ color: 'var(--muted)', marginTop: 8 }}>None yet. <Link className="link-btn" to="/hire">Post a job</Link></p> : <ul style={{ paddingLeft: 18 }}>{mine.map((j) => <li key={j.id}>{j.title} · {formatWage(j)}</li>)}</ul>}
      </div>
      <div className="card">
        <h3>Hiring enquiries</h3>
        <p className="badge info" style={{ marginTop: 8 }}>Saved on this device only</p>
        {state.enquiries.length === 0 ? <p style={{ color: 'var(--muted)', marginTop: 8 }}>None yet. <Link className="link-btn" to="/hire">Find workers</Link></p> : (
          <ul style={{ paddingLeft: 18 }}>{state.enquiries.map((e) => <li key={e.id}><b>{e.workerName}</b>: {e.work.slice(0, 60)} · ₹{e.amount} {e.basis} · <i>pending (not sent)</i></li>)}</ul>
        )}
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}
    </div>
  );
}

export default function Profile() {
  const { state, setRole, reset } = useStore();
  return (
    <div className="page">
      <div className="container">
        <div className="page-head"><h1>My Profile</h1><p>Your profile adapts to how you use SAHAYAK. Everything is stored on this device only.</p></div>
        <div className="seg" style={{ margin: '22px 0' }} role="tablist">
          <button className={state.role === 'worker' ? 'on' : ''} onClick={() => setRole('worker')}>I’m a worker</button>
          <button className={state.role === 'employer' ? 'on' : ''} onClick={() => setRole('employer')}>I’m an employer</button>
        </div>
        {state.role === 'worker' ? <WorkerProfile /> : <EmployerProfile />}
        <p style={{ marginTop: 28 }}><Link className="link-btn" to="/support">Worker Support Hub →</Link> · <button className="link-btn" onClick={() => { if (window.confirm('Clear all demo data on this device?')) reset(); }}>Reset demo data</button></p>
      </div>
    </div>
  );
}
