import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStore, STR } from '../store.jsx';
import { TRADES } from '../data.js';
import { Reveal, TradeIcon, JobCard, Modal } from '../ui.jsx';

function Hero() {
  const { state } = useStore();
  const t = STR[state.lang];
  const particles = Array.from({ length: 22 }, (_, i) => ({ left: (i * 47) % 100, top: 30 + ((i * 29) % 60), delay: (i * 0.7) % 9 }));
  return (
    <section className="hero" aria-label="SAHAYAK introduction">
      {/* Drop a high-quality hands clip at /public/hero/hands.mp4 to show it here; it hides itself if missing. */}
      <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true" onError={(e) => (e.currentTarget.style.display = 'none')}>
        <source src="./hero/hands.mp4" type="video/mp4" />
      </video>
      <svg className="hero-art" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="tl" x1="0" x2="1"><stop offset="0" stopColor="#14B8A6" stopOpacity="0" /><stop offset="1" stopColor="#67E8F9" /></linearGradient>
          <linearGradient id="tr" x1="1" x2="0"><stop offset="0" stopColor="#8B5CF6" stopOpacity="0" /><stop offset="1" stopColor="#67E8F9" /></linearGradient>
        </defs>
        <path className="trail faint" stroke="url(#tl)" d="M0 220 C260 120 420 520 600 360" />
        <path className="trail faint b" stroke="url(#tr)" d="M1200 500 C940 600 780 200 600 360" />
        <path className="trail" stroke="url(#tl)" d="M0 360 C240 260 400 460 600 360" />
        <path className="trail b" stroke="url(#tr)" d="M1200 360 C960 460 800 260 600 360" />
        <g transform="translate(600 360)">
          <circle className="ripple" r="40" /><circle className="ripple r2" r="40" /><circle className="ripple r3" r="40" />
          <circle className="node" r="9" fill="#fff" /><circle className="node" r="18" fill="none" stroke="#67E8F9" strokeWidth="2" />
        </g>
      </svg>
      <div className="glow" />
      <div className="particles" aria-hidden="true">
        {particles.map((p, i) => <span key={i} style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s` }} />)}
      </div>
      <div className="hero-content">
        <h1>SAHAYAK</h1>
        <p className="tagline">{t.tagline}</p>
        <p className="subline">{t.sub}</p>
        <div className="rotator" aria-hidden="true"><div><span>Find Work</span><span>Build Trust</span><span>Grow Together</span></div></div>
        <div className="hero-cta">
          <Link className="btn btn-primary" to="/jobs">{t.find}</Link>
          <Link className="btn btn-ghost" to="/hire">{t.hireBtn}</Link>
        </div>
        <p className="hero-more"><a href="#how">{t.how} ↓</a></p>
      </div>
      <p className="hero-note">Illustrative light animation. Not an official visual of any other brand.</p>
    </section>
  );
}

export default function Home() {
  const { jobs, state, toggleSave } = useStore();
  const carRef = useRef(null);
  const featured = jobs.filter((j) => !j.missing.length).slice(0, 6);
  const scroll = (d) => carRef.current?.scrollBy({ left: d * 360, behavior: 'smooth' });
  return (
    <>
      <Hero />

      <section className="section" id="how">
        <div className="container">
          <Reveal><p className="eyebrow">How SAHAYAK works</p><h2>Three simple steps to better work</h2></Reveal>
          <div className="grid g3 steps">
            {[['Discover opportunities', 'Browse nearby jobs or skilled workers by trade, area and payment, with no long forms.'], ['Connect with the right person', 'Review profiles and job details clearly before you commit to anything.'], ['Agree on terms and get to work', 'Confirm wage, hours and payment timing up front, then start with confidence.']].map(([h, p], i) => (
              <Reveal key={h} delay={i * 120}><div className="card step"><h3>{h}</h3><p>{p}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <Reveal><p className="eyebrow">Popular trades</p><h2>Every skill deserves a chance</h2></Reveal>
          <div className="grid g3" style={{ marginTop: 32 }}>
            {TRADES.map((tr, i) => (
              <Reveal key={tr.id} delay={i * 70}>
                <Link to={`/jobs?trade=${tr.id}`} className="trade-card" style={{ '--tint': tr.tint }}>
                  <TradeIcon id={tr.id} /><h3>{tr.label}</h3><small>{tr.hi} · See open jobs →</small>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Featured opportunities</p><h2>Jobs with clear terms</h2>
            <p className="lead">Sample listings that spell out wage, hours and payment timing. <Link to="/jobs" className="link-btn">Browse all jobs</Link></p>
          </Reveal>
          <div className="carousel" ref={carRef} tabIndex={0} aria-label="Featured jobs">
            {featured.map((j) => <JobCard key={j.id} job={j} compact saved={state.saved.includes(j.id)} onSave={toggleSave} onOpen={() => (window.location.hash = `#/jobs?job=${j.id}`)} />)}
          </div>
          <div className="car-ctl">
            <button className="btn btn-outline btn-sm" onClick={() => scroll(-1)} aria-label="Previous jobs">←</button>
            <button className="btn btn-outline btn-sm" onClick={() => scroll(1)} aria-label="Next jobs">→</button>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <Reveal><p className="eyebrow">Trust and safety</p><h2>Know the terms before you say yes</h2>
            <p className="lead">SAHAYAK helps workers ask the right questions. It does not guarantee any job or payment.</p></Reveal>
          <div className="trust">
            {[['Fair Work Check', 'Step through wage, hours, location and payment timing. See what is clear and what is missing.'], ['Transparent payment terms', 'Wage basis and payment timing appear on every job card and detail page.'], ['Employer information', 'See what the employer has shared and what they have not. Nothing is marked verified without evidence.'], ['Report and ask', 'Use the Support Hub to find official grievance channels and questions to ask.']].map(([h, p], i) => (
              <Reveal key={h} delay={i * 100}><div className="frame"><div className="inner glass" style={{ padding: 24, background: '#0A1B26' }}><h3 style={{ color: 'var(--cyan)', fontSize: 18, marginBottom: 8 }}>{h}</h3><p style={{ color: '#B7C4D2', fontSize: 15 }}>{p}</p></div></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid g2" style={{ alignItems: 'center' }}>
          <Reveal>
            <p className="eyebrow">Worker empowerment</p><h2>A profile without a résumé</h2>
            <p className="lead">Show your trade, skills and availability with a Skill Passport. Find welfare and registration information in the Worker Support Hub.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" to="/profile">Create my Skill Passport</Link>
              <Link className="btn btn-outline" to="/support">Worker Support Hub</Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="passport"><small>SKILL PASSPORT · SAMPLE</small><h3>Ramesh Yadav</h3><p>Electrician · 8 years</p>
              <div className="tags"><span className="tag">House wiring</span><span className="tag">Panel fitting</span><span className="tag">Fault finding</span></div>
              <small>Available now · Pune · Self-reported details</small></div>
          </Reveal>
        </div>
      </section>

      <section className="section cta">
        <div className="container">
          <Reveal><h2>Your skills can take you further.</h2>
            <div className="hero-cta"><Link className="btn btn-primary" to="/jobs">Find Your Next Job</Link><Link className="btn btn-ghost" to="/hire">Hire Skilled Workers</Link></div></Reveal>
        </div>
      </section>
    </>
  );
}
