// ALL DATA BELOW IS SAMPLE DATA FOR DEMONSTRATION. No real employers, workers or verification.

export const TRADES = [
  { id: 'electrician', label: 'Electricians', hi: 'इलेक्ट्रीशियन', tint: '#14B8A6', keywords: ['electric', 'bijli', 'बिजली', 'इलेक्ट्रीशियन'] },
  { id: 'plumber', label: 'Plumbers', hi: 'प्लंबर', tint: '#67E8F9', keywords: ['plumb', 'nal', 'पाइप', 'प्लंबर'] },
  { id: 'carpenter', label: 'Carpenters', hi: 'बढ़ई', tint: '#8B5CF6', keywords: ['carpent', 'wood', 'badhai', 'बढ़ई', 'कारपेंटर'] },
  { id: 'painter', label: 'Painters', hi: 'पेंटर', tint: '#0F766E', keywords: ['paint', 'rang', 'पेंट', 'रंग'] },
  { id: 'cleaner', label: 'Cleaning professionals', hi: 'सफाई', tint: '#14B8A6', keywords: ['clean', 'safai', 'सफाई'] },
  { id: 'labourer', label: 'General labourers', hi: 'मज़दूर', tint: '#67E8F9', keywords: ['labour', 'mazdoor', 'मजदूर', 'मज़दूर', 'helper'] },
];

export const AREAS = ['Pune', 'Lonavla', 'Mumbai', 'Nashik'];

export const BASIS_LABEL = { day: 'per day', fixed: 'fixed price', month: 'per month', hour: 'per hour' };
export const TYPE_LABEL = { daily: 'Daily wage', short: 'Short-term', full: 'Full-time' };

// `missing` = field not provided; `vague` = provided but unclear.
export const SEED_JOBS = [
  { id: 'j1', title: 'Wiring for 2BHK flat', trade: 'electrician', employer: 'Kulkarni Interiors', area: 'Pune', location: 'Baner, Pune (society gate 2)', distanceKm: 3.2, wage: 900, basis: 'day', hours: '9:00 – 17:00', duration: '4 days', type: 'short', payTiming: 'Paid at end of each day, in cash or UPI', description: 'Complete internal wiring for a 2BHK flat including switch boards and fan points.', responsibilities: 'Conduit laying, wiring, switch/socket fitting. Materials supplied by employer.', contactProvided: true, employerDetails: true, safety: 'Helmet and gloves provided on site.', missing: [], vague: [] },
  { id: 'j2', title: 'Bathroom pipe repair', trade: 'plumber', employer: 'Shree Apartments Society', area: 'Pune', location: 'Wakad, Pune', distanceKm: 6.8, wage: 700, basis: 'day', hours: '10:00 – 16:00', duration: '2 days', type: 'daily', payTiming: '', description: 'Fix leaking pipes in two bathrooms and replace taps.', responsibilities: 'Pipe replacement and tap fitting.', contactProvided: true, employerDetails: true, safety: '', missing: ['payTiming'], vague: [] },
  { id: 'j3', title: 'Wardrobe and shelves carpenter', trade: 'carpenter', employer: 'Patil Furniture Works', area: 'Pune', location: 'Hadapsar, Pune', distanceKm: 9.5, wage: 18000, basis: 'fixed', hours: 'Flexible', duration: '10 days', type: 'short', payTiming: '50% advance, 50% on completion', description: 'Build and install two wardrobes and wall shelves.', responsibilities: 'Cutting, assembly and installation. Tools to be brought by worker.', contactProvided: true, employerDetails: true, safety: '', missing: [], vague: ['hours'] },
  { id: 'j4', title: 'Exterior wall painting', trade: 'painter', employer: 'Rao Constructions', area: 'Lonavla', location: 'Lonavla, near market road', distanceKm: 2.1, wage: 800, basis: 'day', hours: '8:00 – 16:00', duration: '2 weeks', type: 'short', payTiming: 'Weekly, every Saturday', description: 'Two-coat exterior painting of a bungalow.', responsibilities: 'Surface prep, primer, two coats. Paint supplied.', contactProvided: true, employerDetails: false, safety: 'Scaffolding provided.', missing: [], vague: [] },
  { id: 'j5', title: 'Office deep cleaning', trade: 'cleaner', employer: 'BrightSpace Facilities', area: 'Mumbai', location: 'Andheri East, Mumbai', distanceKm: 4.4, wage: 600, basis: 'day', hours: '7:00 – 13:00', duration: '1 day', type: 'daily', payTiming: 'Same day by UPI', description: 'Deep clean of a 3,000 sq ft office.', responsibilities: 'Floor scrubbing, glass and washroom cleaning. Supplies provided.', contactProvided: true, employerDetails: true, safety: 'Gloves and masks provided.', missing: [], vague: [] },
  { id: 'j6', title: 'Site helper for construction', trade: 'labourer', employer: '', area: 'Pune', location: '', distanceKm: 12.0, wage: 0, basis: 'day', hours: '', duration: 'Ongoing', type: 'daily', payTiming: '', description: 'Helper needed at a construction site. Details to be discussed.', responsibilities: '', contactProvided: false, employerDetails: false, safety: '', missing: ['wage', 'location', 'hours', 'payTiming', 'responsibilities', 'employer'], vague: [] },
  { id: 'j7', title: 'Maintenance electrician', trade: 'electrician', employer: 'Hotel Sahyadri Residency', area: 'Lonavla', location: 'Tungarli, Lonavla', distanceKm: 4.9, wage: 16000, basis: 'month', hours: '9:00 – 18:00, 6 days', duration: 'Full-time', type: 'full', payTiming: 'By the 7th of every month', description: 'In-house electrician for a 40-room hotel.', responsibilities: 'Daily rounds, fault repair, generator changeover.', contactProvided: true, employerDetails: true, safety: 'PPE provided.', missing: [], vague: [] },
  { id: 'j8', title: 'Kitchen plumbing fit-out', trade: 'plumber', employer: 'Joshi Home Services', area: 'Nashik', location: 'College Road, Nashik', distanceKm: 3.7, wage: 750, basis: 'day', hours: '9:30 – 17:30', duration: '3 days', type: 'short', payTiming: 'On completion', description: 'Sink, RO line and drainage fitting in a new kitchen.', responsibilities: 'Pipe laying, sink and RO line fitting.', contactProvided: true, employerDetails: true, safety: '', missing: [], vague: ['payTiming'] },
  { id: 'j9', title: 'Furniture polishing', trade: 'carpenter', employer: 'Deshmukh Home', area: 'Lonavla', location: 'Lonavla (exact address shared after contact)', distanceKm: 7.3, wage: 650, basis: 'day', hours: '10:00 – 16:00', duration: '5 days', type: 'daily', payTiming: 'Daily', description: 'Polish old wooden furniture.', responsibilities: 'Sanding and polishing.', contactProvided: true, employerDetails: true, safety: '', missing: [], vague: ['location'] },
  { id: 'j10', title: 'Loading and unloading helper', trade: 'labourer', employer: 'Gupta Transport', area: 'Mumbai', location: 'Bhiwandi godown, Mumbai', distanceKm: 8.8, wage: 550, basis: 'day', hours: '8:00 – 18:00', duration: '1 week', type: 'daily', payTiming: 'Every evening in cash', description: 'Load and unload goods at a godown.', responsibilities: 'Lifting and stacking up to 25 kg bags.', contactProvided: true, employerDetails: true, safety: 'Gloves provided.', missing: [], vague: [] },
  { id: 'j11', title: 'Apartment repainting', trade: 'painter', employer: 'Mehta Realty', area: 'Pune', location: 'Kothrud, Pune', distanceKm: 5.6, wage: 24000, basis: 'fixed', hours: 'Flexible', duration: '8 days', type: 'short', payTiming: '30% advance, balance on completion', description: 'Interior repainting of a 3BHK apartment.', responsibilities: 'Putty, primer and two coats. Paint supplied.', contactProvided: true, employerDetails: true, safety: '', missing: [], vague: [] },
  { id: 'j12', title: 'Housekeeping staff', trade: 'cleaner', employer: 'Lakeview Homestay', area: 'Pune', location: 'Pashan, Pune', distanceKm: 7.1, wage: 12000, basis: 'month', hours: '8:00 – 16:00', duration: 'Full-time', type: 'full', payTiming: 'Monthly, on the 1st', description: 'Daily housekeeping for a 12-room homestay.', responsibilities: 'Room cleaning, linen changes, common-area upkeep.', contactProvided: true, employerDetails: true, safety: '', missing: [], vague: [] },
];

export const SEED_WORKERS = [
  { id: 'w1', name: 'Ramesh Yadav', trade: 'electrician', skills: ['House wiring', 'Panel fitting', 'Fault finding'], experience: 8, availability: 'Available now', area: 'Pune', preferred: 'Daily wage', samples: ['Wired 30+ flats in Baner (self-reported)'], idProof: false },
  { id: 'w2', name: 'Sunita Pawar', trade: 'cleaner', skills: ['Deep cleaning', 'Office housekeeping', 'Glass cleaning'], experience: 5, availability: 'Available from Monday', area: 'Mumbai', preferred: 'Full-time', samples: ['Regular office cleaning contract (self-reported)'], idProof: false },
  { id: 'w3', name: 'Imran Shaikh', trade: 'plumber', skills: ['Pipe fitting', 'Bathroom fit-out', 'RO installation'], experience: 6, availability: 'Available now', area: 'Nashik', preferred: 'Short-term', samples: ['Bathroom renovation, 4 homes (self-reported)'], idProof: false },
  { id: 'w4', name: 'Dattatray More', trade: 'carpenter', skills: ['Wardrobes', 'Modular kitchens', 'Polishing'], experience: 12, availability: 'Busy until 20th', area: 'Pune', preferred: 'Short-term', samples: ['Wardrobe and shelf installs (self-reported)'], idProof: false },
  { id: 'w5', name: 'Anil Kamble', trade: 'painter', skills: ['Interior painting', 'Texture finish', 'Waterproofing'], experience: 9, availability: 'Available now', area: 'Lonavla', preferred: 'Daily wage', samples: ['Exterior paint, 5 bungalows (self-reported)'], idProof: false },
  { id: 'w6', name: 'Lakshmi Devi', trade: 'labourer', skills: ['Loading', 'Site helper', 'Material shifting'], experience: 3, availability: 'Available now', area: 'Pune', preferred: 'Daily wage', samples: [], idProof: false },
  { id: 'w7', name: 'Vijay Gaikwad', trade: 'electrician', skills: ['Hotel maintenance', 'Generator changeover'], experience: 10, availability: 'Available from Monday', area: 'Lonavla', preferred: 'Full-time', samples: ['Maintenance at a 30-room hotel (self-reported)'], idProof: false },
  { id: 'w8', name: 'Farhana Sayyed', trade: 'painter', skills: ['Wall putty', 'Interior painting'], experience: 4, availability: 'Busy until 25th', area: 'Mumbai', preferred: 'Short-term', samples: [], idProof: false },
];

export const FAIR_TERMS = [
  { key: 'wage', label: 'Agreed wage', ask: 'How much exactly will I be paid?' },
  { key: 'basis', label: 'Payment basis', ask: 'Is this per day, per month or a fixed price?' },
  { key: 'location', label: 'Work location', ask: 'What is the exact address of the work?' },
  { key: 'hours', label: 'Working hours', ask: 'What are the daily working hours?' },
  { key: 'payTiming', label: 'Payment date / timing', ask: 'When will I be paid, and how?' },
  { key: 'responsibilities', label: 'Job responsibilities', ask: 'What exactly will I be expected to do?' },
  { key: 'employer', label: 'Employer information', ask: 'Who is the employer and how can I contact them?' },
];

export function termStatus(job, key) {
  if (key === 'basis') return job.missing.includes('wage') ? 'missing' : 'specified';
  if (job.missing.includes(key)) return 'missing';
  if (job.vague.includes(key)) return 'clarify';
  return 'specified';
}

export function termValue(job, key) {
  const v = {
    wage: job.wage ? `₹${job.wage.toLocaleString('en-IN')}` : '',
    basis: job.missing.includes('wage') ? '' : BASIS_LABEL[job.basis],
    location: job.location,
    hours: job.hours,
    payTiming: job.payTiming,
    responsibilities: job.responsibilities,
    employer: job.employer,
  }[key];
  return v || 'Not provided';
}

export function formatWage(job) {
  if (!job.wage) return 'Not stated';
  return `₹${job.wage.toLocaleString('en-IN')} ${BASIS_LABEL[job.basis]}`;
}

export const SUPPORT = [
  { title: 'e-Shram – National Database of Unorganised Workers', body: 'Government portal where unorganised workers can register. Check the site for who can register and what it offers.', href: 'https://eshram.gov.in', tag: 'Registration' },
  { title: 'Ministry of Labour & Employment', body: 'Official source for labour laws, welfare schemes and notices.', href: 'https://labour.gov.in', tag: 'Official resource' },
  { title: 'National Career Service', body: 'Government job-matching and career information portal.', href: 'https://www.ncs.gov.in', tag: 'Jobs & skills' },
  { title: 'Skill India Digital', body: 'Government skilling and certification courses.', href: 'https://skillindiadigital.gov.in', tag: 'Training' },
  { title: 'Maharashtra Building & Other Construction Workers Welfare Board', body: 'State board for construction workers. Confirm eligibility and registration steps on the official site.', href: 'https://mahabocw.in', tag: 'State welfare board' },
];

export const DOCS_CHECKLIST = [
  'Identity proof (for example Aadhaar)',
  'Mobile number linked to your identity proof',
  'Bank account details',
  'Proof of work or trade, if you have it',
];
