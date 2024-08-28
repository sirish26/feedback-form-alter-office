const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection string
const mongoURI = 'mongodb+srv://root:root@alter-office-task.emdzy.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Mongoose schemas and models
const feedbackFormSchema = new mongoose.Schema({
  name: String,
  fields: [{
    type: String,
    label: String,
    required: Boolean,
    errorMessage: String,
    options: [String],
    selectedValue: Number
  }],
  conditions: {
    url: String,
    time: String,
    date: String
  },
  createdDate: { type: Date, default: Date.now },
  viewCount: { type: Number, default: 0 },
  submissionCount: { type: Number, default: 0 }
});

const feedbackSubmissionSchema = new mongoose.Schema({
  formId: mongoose.Schema.Types.ObjectId,
  data: Object,
  submittedAt: { type: Date, default: Date.now }
});

const FeedbackForm = mongoose.model('FeedbackForm', feedbackFormSchema);
const FeedbackSubmission = mongoose.model('FeedbackSubmission', feedbackSubmissionSchema);

// Admin Routes

// Create a new feedback form
app.post('/forms', async (req, res) => {
  try {
    const form = new FeedbackForm(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all feedback forms
app.get('/forms', async (req, res) => {
  try {
    const forms = await FeedbackForm.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific feedback form by ID
app.get('/forms/:id', async (req, res) => {
  try {
    const form = await FeedbackForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Routes

// Submit feedback for a specific form
app.post('/submissions', async (req, res) => {
  try {
    const submission = new FeedbackSubmission(req.body);
    await submission.save();

    // Update submission count for the form
    await FeedbackForm.findByIdAndUpdate(
      req.body.formId,
      { $inc: { submissionCount: 1 } },
      { new: true }
    );

    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all submissions for a specific form
app.get('/submissions/:formId', async (req, res) => {
  try {
    const submissions = await FeedbackSubmission.find({ formId: req.params.formId });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Increment view count when the form is viewed
app.post('/forms/:id/view', async (req, res) => {
  try {
    const form = await FeedbackForm.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
