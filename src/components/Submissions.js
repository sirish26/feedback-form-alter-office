import React, { useState } from 'react';
import { Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Submission = () => {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Simulating the previous feedback data
  const feedbackData = [
    {
      _id: { $oid: "64b8a1234abc567def890456" },
      formId: { $oid: "64b8a1234abc567def890123" },
      data: {
        "Rate our service": 5,
        "How happy are you with our service?": "😊",
        "What did you like about our service?": "Fast delivery and helpful support.",
        "Would you recommend us?": "Yes",
        "Select your favorite service": "Customer Support",
        "Rate our pricing (1 to 10)": 8,
        "Your email address": "rajesh.kumar@example.com"
      },
      submittedAt: { $date: "2024-08-28T15:00:00.000Z" }
    },
    {
      _id: { $oid: "64b8a1234abc567def890789" },
      formId: { $oid: "64b8a1234abc567def890123" },
      data: {
        "Rate our service": 4,
        "How happy are you with our service?": "😊",
        "What did you like about our service?": "Excellent product quality.",
        "Would you recommend us?": "Maybe",
        "Select your favorite service": "Product Quality",
        "Rate our pricing (1 to 10)": 9,
        "Your email address": "anjali.sharma@example.com"
      },
      submittedAt: { $date: "2024-08-28T15:30:00.000Z" }
    },
    {
      _id: { $oid: "64b8a1234abc567def890abc" },
      formId: { $oid: "64b8a1234abc567def890123" },
      data: {
        "Rate our service": 3,
        "How happy are you with our service?": "😐",
        "What did you like about our service?": "Timely updates.",
        "Would you recommend us?": "No",
        "Select your favorite service": "Updates",
        "Rate our pricing (1 to 10)": 6,
        "Your email address": "vikram.patel@example.com"
      },
      submittedAt: { $date: "2024-08-28T16:00:00.000Z" }
    },
    {
      _id: { $oid: "64b8a1234abc567def890def" },
      formId: { $oid: "64b8a1234abc567def890123" },
      data: {
        "Rate our service": 5,
        "How happy are you with our service?": "😊",
        "What did you like about our service?": "Great customer service.",
        "Would you recommend us?": "Yes",
        "Select your favorite service": "Customer Service",
        "Rate our pricing (1 to 10)": 7,
        "Your email address": "sita.rao@example.com"
      },
      submittedAt: { $date: "2024-08-28T16:30:00.000Z" }
    },
    {
      _id: { $oid: "64b8a1234abc567def890efg" },
      formId: { $oid: "64b8a1234abc567def890123" },
      data: {
        "Rate our service": 2,
        "How happy are you with our service?": "😟",
        "What did you like about our service?": "N/A",
        "Would you recommend us?": "No",
        "Select your favorite service": "N/A",
        "Rate our pricing (1 to 10)": 5,
        "Your email address": "neeta.kapoor@example.com"
      },
      submittedAt: { $date: "2024-08-28T17:00:00.000Z" }
    }
  ];

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="submission-container">
      <Paper className="submission-paper">
        <div className="header">
          <IconButton onClick={handleBack} className="back-button">
            <ArrowBackIcon />
          </IconButton>
          <div className="form-header">
            <div className="form-name">Feedback Form Name</div>
            <div className="created-timestamp">Created at: 2024-08-28</div>
          </div>
        </div>
        <div className="stats">
          <div className="stat-item">
            <span>Views:</span>
            <span className="stat-number">150</span>
          </div>
          <div className="stat-item">
            <span>Submitted:</span>
            <span className="stat-number">20</span>
          </div>
        </div>
        <div className="conditions">
          <div>Page URL: example.com</div>
          <div>Date: 2024-08-28</div>
          <div>Time: 15:00</div>
        </div>
        <div className="submissions-list">
          {feedbackData.map((item, index) => (
            <div
              key={index}
              className={`submission-item ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => handleExpand(index)}
            >
              <div><strong>Name:</strong> {["Feedback"]}</div>
              <div><strong>Time:</strong> {new Date(item.submittedAt.$date).toLocaleString()}</div>
              {expandedIndex === index && (
                <div className="submission-details">
                  <div><strong>Rate our service:</strong> {item.data["Rate our service"]}</div>
                  <div><strong>How happy are you with our service?</strong> {item.data["How happy are you with our service?"]}</div>
                  <div><strong>What did you like about our service?</strong> {item.data["What did you like about our service?"]}</div>
                  <div><strong>Would you recommend us?</strong> {item.data["Would you recommend us?"]}</div>
                  <div><strong>Select your favorite service:</strong> {item.data["Select your favorite service"]}</div>
                  <div><strong>Rate our pricing (1 to 10):</strong> {item.data["Rate our pricing (1 to 10)"]}</div>
                  <div><strong>Your email address:</strong> {item.data["Your email address"]}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default Submission;
