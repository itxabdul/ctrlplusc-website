// Simple Node.js Express backend for waitlist
// Run: npm install express cors helmet ratelimit nodemailer
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Waitlist endpoint
app.post('/api/waitlist', limiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // Read existing emails
    const emailsFile = 'waitlist-emails.json';
    let emails = [];

    try {
      const data = await fs.readFile(emailsFile, 'utf8');
      emails = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet
    }

    // Check if email already exists
    if (emails.some(entry => entry.email === email)) {
      return res.status(200).json({ message: 'Email already registered' });
    }

    // Add new email
    emails.push({
      email,
      timestamp: new Date().toISOString(),
      ip: req.ip
    });

    // Save to file
    await fs.writeFile(emailsFile, JSON.stringify(emails, null, 2));

    // TODO: Send welcome email here
    console.log(`New waitlist signup: ${email}`);

    res.status(200).json({ message: 'Successfully added to waitlist' });
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve index.html for all routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;