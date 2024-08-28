import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const mockForms = [
    {
      _id: 'create',
      title: 'Create New Form',
      isCreateCard: true 
    },
    {
      _id: '1',
      title: 'Customer Feedback Form',
      viewCount: 120,
      submissionCount: 15,
      createdAt: '2024-08-28T12:00:00Z'
    },
    {
      _id: '2',
      title: 'Service Satisfaction Survey',
      viewCount: 85,
      submissionCount: 10,
      createdAt: '2024-08-29T08:00:00Z'
    }
  ];

  const [forms, setForms] = useState(mockForms); 
  const [openDialog, setOpenDialog] = useState(false);
  const [newFormName, setNewFormName] = useState('');

  const navigate = useNavigate();

  const handleDelete = (id) => {
    setForms(forms.filter(form => form._id !== id));
    console.log(`Deleted form with id: ${id}`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewFormName('');
  };

  const handleCreateForm = () => {
    if (newFormName) {
      const newFormId = Date.now().toString(); 
      console.log(`Create new form with name: ${newFormName}`);
      setForms([
        ...forms,
        {
          _id: newFormId,
          title: newFormName,
          viewCount: 0,
          submissionCount: 0,
          createdAt: new Date().toISOString()
        }
      ]);
      handleCloseDialog();
      navigate(`/edit/${newFormId}`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit`);
  };

  const handleViewSubmissions = (id) => {
    navigate(`/submissions`);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="card-container">
        {forms.map(form => (
          form.isCreateCard ? (
            <div key={form._id} className="card create-card" onClick={handleOpenDialog}>
              <AddIcon style={{ fontSize: '4rem', color: '#fff' }} />
            </div>
          ) : (
            <div key={form._id} className="card">
              <h2 className="card-title">{form.title}</h2>
              <div className="card-details">
                <div>Viewed: {form.viewCount}</div>
                <div>Submissions: {form.submissionCount}</div>
                <div>Created: {new Date(form.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="card-actions">
                <Button 
                  className="view-submissions"
                  onClick={() => handleViewSubmissions(form._id)}
                  variant="contained" 
                >
                  View Submissions
                </Button>
                <div className="edit-delete">
                  <Button 
                    onClick={() => handleEdit(form._id)} 
                    variant="outlined" 
                    color="secondary"
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(form._id)} 
                    variant="outlined" 
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            fullWidth
            variant="outlined"
            value={newFormName}
            onChange={(e) => setNewFormName(e.target.value)}
          />
        </DialogContent>
        <div className="dialog-actions">
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button
            onClick={handleCreateForm}
            color="primary"
            disabled={!newFormName}
          >
            Create
          </Button>
        </div>
      </Dialog>
    </div>
  );
}

export default Dashboard;
