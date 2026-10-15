import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { SEED_JOBS, SEED_WORKERS } from './data.js';

const KEY = 'sahayak-demo-v1';
const Ctx = createContext(null);

const initial = {
  lang: 'en',
  role: 'worker',
  userJobs: [],
  saved: [],
  applications: [],
  enquiries: [],
  profiles: {
    worker: { name: '', trade: 'electrician', skills: '', experience: '', availability: 'Available now', area: 'Pune', samples: '' },
    employer: { name: '', type: 'Individual / household', location: '', description: '' },
  },
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch (e) { /* storage unavailable */ }
  return initial;
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }, [state]);

  const set = useCallback((patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) })), []);

  const api = useMemo(() => ({
    state,
    jobs: [...state.userJobs, ...SEED_JOBS],
    workers: SEED_WORKERS,
    setLang: (lang) => set({ lang }),
    setRole: (role) => set({ role }),
    toggleSave: (id) => set((s) => ({ saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] })),
    apply: (jobId, clarifications) => {
      const app = { id: 'a' + Date.now(), jobId, stage: 1, clarifications, createdAt: new Date().toISOString() };
      set((s) => ({ applications: [app, ...s.applications.filter((a) => a.jobId !== jobId)] }));
      return app;
    },
    advance: (id) => set((s) => ({ applications: s.applications.map((a) => (a.id === id ? { ...a, stage: Math.min(4, a.stage + 1) } : a)) })),
    addEnquiry: (e) => set((s) => ({ enquiries: [{ id: 'e' + Date.now(), createdAt: new Date().toISOString(), ...e }, ...s.enquiries] })),
    postJob: (job) => set((s) => ({ userJobs: [{ ...job, id: 'u' + Date.now(), missing: job.missing || [], vague: [], mine: true }, ...s.userJobs] })),
    saveProfile: (kind, data) => set((s) => ({ profiles: { ...s.profiles, [kind]: data } })),
    reset: () => { setState(initial); },
  }), [state, set]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);

export const STAGES = ['Enquiry submitted', 'Employer response pending', 'Work agreed', 'Work in progress', 'Work completed'];

export const STR = {
  en: { home: 'Home', jobs: 'Find Jobs', hire: 'Hire Workers', profile: 'My Profile', find: 'Find Work', hireBtn: 'Hire a Worker', how: 'Discover How It Works', tagline: 'Where Skills Meet Opportunity.', sub: 'Connecting skilled workers with meaningful work, one opportunity at a time.' },
  hi: { home: 'होम', jobs: 'काम खोजें', hire: 'कारीगर रखें', profile: 'मेरी प्रोफ़ाइल', find: 'काम खोजें', hireBtn: 'कारीगर रखें', how: 'यह कैसे काम करता है', tagline: 'जहाँ हुनर को मिलता है मौका।', sub: 'हुनरमंद कामगारों को सही काम से जोड़ना, एक-एक मौके के साथ।' },
};
