import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Editor = () => {
  const [fields, setFields] = useState([]);
  const [activeFieldIndex, setActiveFieldIndex] = useState(null);
  const [editorField, setEditorField] = useState({ label: '', required: false, errorMessage: '', options: [] });
  const [conditions, setConditions] = useState({ url: '', time: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [newOption, setNewOption] = useState('');
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [formName, setFormName] = useState('');
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedbackResponses, setFeedbackResponses] = useState({});
  const [errors, setErrors] = useState({});

  const conditionFields = [
    { key: 'url', label: 'Show Based on URL', placeholder: 'URL' },
    { key: 'time', label: 'Show Based on Time', placeholder: 'HH:MM' },
    { key: 'date', label: 'Show Based on Date', placeholder: 'DD/MM/YYYY' }
  ];

  const addField = (type) => {
    if (fields.length < 7) {
      setFields([...fields, { type, label: '', required: false, errorMessage: '', options: [], selectedValue: null }]);
    } else {
      alert('You can only add up to 7 fields.');
    }
  };

  const handleEditField = (index) => {
    setActiveFieldIndex(index);
    setEditorField(fields[index]);
    setIsEditing(true);
  };

  const handleSaveField = () => {
    const newFields = [...fields];
    newFields[activeFieldIndex] = editorField;
    setFields(newFields);
    setActiveFieldIndex(null);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setActiveFieldIndex(null);
    setIsEditing(false);
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSelectNumber = (index, number) => {
    const updatedFields = [...fields];
    updatedFields[index].selectedValue = number;
    setFields(updatedFields);
  };

  const handleRatingClick = (index, rating) => {
    const updatedFields = [...fields];
    updatedFields[index].selectedValue = rating;
    setFields(updatedFields);
  };

  const toggleCondition = (condition) => {
    setConditions({
      ...conditions,
      [condition]: conditions[condition] ? '' : '',
    });
  };

  const handleAddOption = () => {
    if (newOption) {
      setEditorField({
        ...editorField,
        options: [...editorField.options, newOption],
      });
      setNewOption('');
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...editorField.options];
    updatedOptions[index] = value;
    setEditorField({ ...editorField, options: updatedOptions });
  };

  const handleSaveDialogClose = (shouldSave) => {
    if (shouldSave && formName) {
      console.log('Form saved as:', formName);
    }
    setOpenSaveDialog(false);
  };

  const handlePublish = () => {
    const initialFeedback = fields.reduce((acc, field) => {
      acc[field.label] = field.type === 'radio' || field.type === 'categories' ? field.options[0] : '';
      return acc;
    }, {});
    setFeedbackResponses(initialFeedback);
    setOpenFeedbackDialog(true);
  };

  const handleFeedbackChange = (fieldLabel, value) => {
    setFeedbackResponses({
      ...feedbackResponses,
      [fieldLabel]: value
    });
  };

  const handleFeedbackSubmit = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !feedbackResponses[field.label]) {
        newErrors[field.label] = field.errorMessage || 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Feedback Responses:', feedbackResponses);
    setOpenFeedbackDialog(false);
  };

  return (
    <div className="editor-container">
      <div className="editor-content">
        <Paper className="editor-paper">
          <div className="header-actions">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenSaveDialog(true)}
              disabled={fields.length < 1}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePublish}
              disabled={fields.length < 1}
            >
              Publish
            </Button>
          </div>
          <h2>Form Editor</h2>
          {!isEditing && (
            <div className="fields-container">
              {fields.map((field, index) => (
                <div key={index} className="field-item">
                  <div className="field-header">
                    <h4>{field.label || 'Edit Field label'}</h4>
                    <div className="field-actions">
                      <EditIcon onClick={() => handleEditField(index)} />
                      <DeleteIcon onClick={() => handleDeleteField(index)} />
                    </div>
                  </div>
                  {field.type === 'text' && <TextField fullWidth variant="outlined" placeholder="Enter text here" multiline rows={3} />}
                  {field.type === 'numeric' && (
                    <div className="numeric-rating-container">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`numeric-rating-box ${field.selectedValue === i + 1 ? 'selected' : ''}`}
                          onClick={() => handleSelectNumber(index, i + 1)}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                  {field.type === 'star' && (
                    <div className="rating-options">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`rating-option ${field.selectedValue >= i + 1 ? 'selected' : ''}`}
                          onClick={() => handleRatingClick(index, i + 1)}
                        />
                      ))}
                    </div>
                  )}
                  {field.type === 'smiley' && (
                    <div className="rating-options">
                      {[...Array(5)].map((_, i) => (
                        <EmojiEmotionsIcon
                          key={i}
                          className={`rating-option ${field.selectedValue >= i + 1 ? 'selected' : ''}`}
                          onClick={() => handleRatingClick(index, i + 1)}
                        />
                      ))}
                    </div>
                  )}
                  {field.type === 'single-line' && <TextField fullWidth variant="outlined" placeholder="Enter text here" />}
                  {field.type === 'radio' && (
                    <div>
                      {field.options.map((option, i) => (
                        <FormControlLabel key={i}
                          control={<Checkbox />}
                          label={<span>{option}</span>}
                        />
                      ))}
                    </div>
                  )}
                  {field.type === 'categories' && (
                    <div>
                      {field.options.map((option, i) => (
                        <div key={i}>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Paper>
      </div>
      <div className="sidebar">
        {isEditing ? (
          <div className="field-editing">
            <IconButton onClick={handleCancelEdit} className="back-button">
              <ArrowBackIcon />
            </IconButton>
            <div className="field-edit-content">
              <TextField
                label="Field Label"
                variant="outlined"
                fullWidth
                value={editorField.label}
                onChange={(e) => setEditorField({ ...editorField, label: e.target.value })}
              />
              <br />
              {editorField.required && (
                <TextField
                  label="Error Message"
                  variant="outlined"
                  fullWidth
                  value={editorField.errorMessage}
                  onChange={(e) => setEditorField({ ...editorField, errorMessage: e.target.value })}
                  multiline
                />
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editorField.required}
                    onChange={(e) => setEditorField({ ...editorField, required: e.target.checked })}
                  />
                }
                label="Required"
              />
              {['radio', 'categories'].includes(editorField.type) && (
                <>
                  <br />
                  <h4>Options</h4>
                  {editorField.options.map((option, i) => (
                    <TextField
                      key={i}
                      value={option}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      variant="outlined"
                      fullWidth
                      placeholder={`Option ${i + 1}`}
                      margin="normal"
                    />
                  ))}
                  <TextField
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="New option"
                    margin="normal"
                  />
                  <Button onClick={handleAddOption} color="primary">
                    Add
                  </Button>
                </>
              )}
              <div className="sidebar-actions">
                <span
                  className={`sidebar-item save-item ${!editorField.label ? 'disabled' : ''}`}
                  onClick={editorField.label ? handleSaveField : null}
                >
                  Save
                </span>
                <span className="sidebar-item cancel-item" onClick={handleCancelEdit}>
                  Cancel
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <br />
            <br />
            <h3>Add Fields</h3>
            {[
              { type: 'text', label: 'Text Area' },
              { type: 'numeric', label: 'Numeric Rating' },
              { type: 'star', label: 'Star Rating' },
              { type: 'smiley', label: 'Smiley Rating' },
              { type: 'single-line', label: 'Single Line Input' },
              { type: 'radio', label: 'Radio Button' },
              { type: 'categories', label: 'Categories' }
            ].map(({ type, label }) => (
              <div
                key={type}
                className="sidebar-item"
                onClick={() => addField(type)}
              >
                {label}
              </div>
            ))}
            <h3>Add Logic</h3>
            {conditionFields.map(({ key, label, placeholder }) => (
              <div className="condition-item" key={key}>
                <span>{label}</span>
                <span onClick={() => toggleCondition(key)} className="toggle-icon">
                  {conditions[key] ? <ToggleOnIcon className="toggle-on" /> : <ToggleOffIcon className="toggle-off" />}
                </span>
                <TextField
                  label={placeholder}
                  variant="outlined"
                  fullWidth
                  value={conditions[key]}
                  onChange={(e) => setConditions({ ...conditions, [key]: e.target.value })}
                  className="condition-input"
                />
              </div>
            ))}
          </>
        )}
      </div>
      <Dialog open={openFeedbackDialog} onClose={() => setOpenFeedbackDialog(false)} sx={{'& .MuiDialog-paper': {width: '600px', }}}>
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          {fields.map((field, index) => {
            const error = errors[field.label];
            switch (field.type) {
              case 'text':
              case 'single-line':
                return (
                  <TextField
                    key={index}
                    label={field.label || `Field ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={feedbackResponses[field.label] || ''}
                    onChange={(e) => handleFeedbackChange(field.label, e.target.value)}
                    margin="normal"
                    multiline={field.type === 'text'}
                    rows={field.type === 'text' ? 3 : undefined}
                    error={!!error}
                    helperText={error}
                    style={{ marginBottom: '1rem' }}
                  />
                );
              case 'numeric':
                return (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h4>{field.label || `Field ${index + 1}`}</h4>
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`numeric-rating-box ${feedbackResponses[field.label] === (i + 1).toString() ? 'selected' : ''}`}
                        onClick={() => handleFeedbackChange(field.label, (i + 1).toString())}
                      >
                        {i + 1}
                      </div>
                    ))}
                    {error && <div className="error-message" style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
                  </div>
                );
              case 'star':
                return (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h4>{field.label || `Field ${index + 1}`}</h4>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`rating-option ${feedbackResponses[field.label] >= (i + 1).toString() ? 'selected' : ''}`}
                        onClick={() => handleFeedbackChange(field.label, (i + 1).toString())}
                      />
                    ))}
                    {error && <div className="error-message" style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
                  </div>
                );
              case 'smiley':
                return (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h4>{field.label || `Field ${index + 1}`}</h4>
                    {[...Array(5)].map((_, i) => (
                      <EmojiEmotionsIcon
                        key={i}
                        className={`rating-option ${feedbackResponses[field.label] >= (i + 1).toString() ? 'selected' : ''}`}
                        onClick={() => handleFeedbackChange(field.label, (i + 1).toString())}
                      />
                    ))}
                    {error && <div className="error-message" style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
                  </div>
                );
              case 'radio':
              case 'categories':
                return (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <h4>{field.label || `Field ${index + 1}`}</h4>
                    {field.options.map((option, i) => (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={feedbackResponses[field.label] === option}
                            onChange={() => handleFeedbackChange(field.label, option)}
                          />
                        }
                        label={option}
                      />
                    ))}
                    {error && <div className="error-message" style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
                  </div>
                );
              default:
                return null;
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedbackDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleFeedbackSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Editor;
