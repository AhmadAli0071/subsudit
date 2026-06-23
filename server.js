import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASS = process.env.ADMIN_PASS || 'subaudit@2026';

// MongoDB Schema
const waitlistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subscriptions: [String],
  forgottenChargeHistory: String,
  joinedAt: { type: Date, default: Date.now },
  queueNumber: { type: Number, unique: true }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

app.use(cors());
app.use(express.json());
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// POST /api/waitlist - receive new signup
app.post('/api/waitlist', async (req, res) => {
  const { fullName, email, subscriptions, forgottenChargeHistory } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const lastEntry = await Waitlist.findOne().sort({ queueNumber: -1 });
    const nextQueueNumber = lastEntry ? lastEntry.queueNumber + 1 : 1421;

    const newSignup = new Waitlist({
      fullName,
      email,
      subscriptions: subscriptions || [],
      forgottenChargeHistory: forgottenChargeHistory || '',
      queueNumber: nextQueueNumber
    });

    await newSignup.save();
    res.status(201).json({ success: true, data: newSignup });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate entry' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/waitlist - get all signups
app.get('/api/waitlist', async (req, res) => {
  try {
    const data = await Waitlist.find().sort({ joinedAt: -1 });
    res.json({ total: data.length, data });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/waitlist/stats - get stats
app.get('/api/waitlist/stats', async (req, res) => {
  try {
    const data = await Waitlist.find();
    const subCounts = {};
    data.forEach(d => {
      (d.subscriptions || []).forEach(sub => {
        subCounts[sub] = (subCounts[sub] || 0) + 1;
      });
    });

    const historyCounts = {};
    data.forEach(d => {
      const h = d.forgottenChargeHistory || 'Unknown';
      historyCounts[h] = (historyCounts[h] || 0) + 1;
    });

    res.json({ total: data.length, subCounts, historyCounts });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASS) {
    res.json({ success: true, token: 'admin-token' });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Admin panel: http://localhost:${PORT}/admin`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
