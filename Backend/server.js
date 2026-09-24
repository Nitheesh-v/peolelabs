import express from 'express';
import cors from 'cors';
import { agentsData } from './src/data/agents.js';
import { sectorsData } from './src/data/sectors.js';
import { servicesData } from './src/data/services.js';
import { jobsData } from './src/data/jobs.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PeopleLabs / Arena Agents API',
    timestamp: new Date().toISOString()
  });
});

// Stats API
app.get('/api/stats', (req, res) => {
  res.json({
    placementsCount: '500+',
    industriesCount: '20+',
    globalReachCountries: '30+',
    retentionRate: '98%',
    salaryNegotiated: '$150M+'
  });
});

// Agents Roster API
app.get('/api/agents', (req, res) => {
  const { search, industry, featured } = req.query;
  let filtered = [...agentsData];

  if (featured === 'true') {
    filtered = filtered.filter(a => a.featured);
  }

  if (industry && industry !== 'All') {
    filtered = filtered.filter(a =>
      a.industry.toLowerCase().includes(industry.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.specialty.toLowerCase().includes(q) ||
      a.skills.some(skill => skill.toLowerCase().includes(q))
    );
  }

  res.json({
    count: filtered.length,
    agents: filtered
  });
});

// Get single agent by ID
app.get('/api/agents/:id', (req, res) => {
  const agent = agentsData.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  res.json(agent);
});

// Sectors API
app.get('/api/sectors', (req, res) => {
  res.json({
    count: sectorsData.length,
    sectors: sectorsData
  });
});

// Services / Playbook API
app.get('/api/services', (req, res) => {
  res.json({
    count: servicesData.length,
    services: servicesData
  });
});

// Jobs API
app.get('/api/jobs', (req, res) => {
  const { search, department } = req.query;
  let filtered = [...jobsData];

  if (department && department !== 'All') {
    filtered = filtered.filter(j =>
      j.department.toLowerCase().includes(department.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q)
    );
  }

  res.json({
    count: filtered.length,
    jobs: filtered
  });
});

// Contact Form Handler
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  console.log('Received contact submission:', { name, email, company, subject, message });

  res.status(200).json({
    success: true,
    message: `Thank you ${name}! Your inquiry has been received. An Arena Agents specialist will contact you within 2 business hours.`,
    referenceId: `PL-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

// Job Application Handler
app.post('/api/apply', (req, res) => {
  const { jobId, name, email, phone, linkedin, notes } = req.body;

  if (!name || !email || !jobId) {
    return res.status(400).json({ error: 'Name, email, and position ID are required.' });
  }

  console.log('Received job application:', { jobId, name, email, linkedin });

  res.status(200).json({
    success: true,
    message: `Application submitted successfully for candidate ${name}! Our executive search team will review your profile shortly.`,
    applicationId: `APP-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
