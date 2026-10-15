import { SUPPORT, DOCS_CHECKLIST, FAIR_TERMS } from '../data.js';

export default function Support() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-head"><h1>Worker Support Hub</h1><p>Links to official resources. SAHAYAK does not decide eligibility or register you for anything. Always confirm details on the official site.</p></div>
        <div className="grid g2" style={{ marginTop: 28 }}>
          {SUPPORT.map((s) => (
            <article key={s.href} className="card hover job-card">
              <span className="badge info">{s.tag}</span>
              <h3>{s.title}</h3><p style={{ color: 'var(--muted)' }}>{s.body}</p>
              <div className="actions"><a className="btn btn-outline btn-sm" href={s.href} target="_blank" rel="noopener noreferrer">Visit official site ↗</a></div>
            </article>
          ))}
        </div>
        <div className="grid g2" style={{ marginTop: 28 }}>
          <div className="card"><h3>Documents often asked for</h3>
            <p style={{ color: 'var(--muted)', margin: '6px 0 10px', fontSize: 14 }}>A general checklist. Requirements vary by scheme, so check the official site.</p>
            <ul style={{ paddingLeft: 18 }}>{DOCS_CHECKLIST.map((d) => <li key={d}>{d}</li>)}</ul></div>
          <div className="card"><h3>Questions to ask before accepting work</h3>
            <ul style={{ paddingLeft: 18, marginTop: 8 }}>{FAIR_TERMS.map((t) => <li key={t.key}>{t.ask}</li>)}</ul></div>
        </div>
      </div>
    </div>
  );
}
