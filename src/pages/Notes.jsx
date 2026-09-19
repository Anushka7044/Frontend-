import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Plus, Upload, Search, Filter, ArrowUpDown, 
  FileText, Star, Eye, Edit3, Trash2, X, CheckCircle2, 
  AlertCircle, Download, FileCheck, Layers, Calendar, 
  Sparkles, Bold, Italic, List, ListOrdered, Heading 
} from 'lucide-react';
import { NOTE_SUBJECTS } from '../data/notesData';
import './Notes.css';

export default function Notes({ notes, setNotes, onSelectFeature }) {
  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'created' | 'uploaded' | 'favorite'
  const [sortBy, setSortBy] = useState('updated'); // 'updated' | 'alpha'

  // Modals State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Form State (Create & Edit)
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Operating Systems',
    topic: '',
    content: '',
    tags: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Upload Form State
  const [uploadData, setUploadData] = useState({
    title: '',
    subject: 'Computer Networks',
    topic: '',
    file: null
  });
  const [uploadErrors, setUploadErrors] = useState({});

  // Statistics Calculation
  const stats = useMemo(() => {
    const total = notes.length;
    const subjects = new Set(notes.map(n => n.subject)).size;
    const favorites = notes.filter(n => n.isFavorite).length;
    const recentlyAdded = notes.slice(0, 4).length;
    return { total, subjects, favorites, recentlyAdded };
  }, [notes]);

  // Filtered & Sorted Notes
  const filteredNotes = useMemo(() => {
    return notes
      .filter(note => {
        // Search query matching
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          note.title.toLowerCase().includes(q) ||
          note.subject.toLowerCase().includes(q) ||
          note.topic.toLowerCase().includes(q) ||
          (note.tags && note.tags.some(t => t.toLowerCase().includes(q)));

        // Subject filter
        const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;

        // Type filter
        let matchesType = true;
        if (selectedType === 'created') matchesType = note.type === 'created';
        if (selectedType === 'uploaded') matchesType = note.type === 'uploaded';
        if (selectedType === 'favorite') matchesType = note.isFavorite;

        return matchesQuery && matchesSubject && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'alpha') {
          return a.title.localeCompare(b.title);
        }
        // Default sort by order in list
        return 0;
      });
  }, [notes, searchQuery, selectedSubject, selectedType, sortBy]);

  // Actions
  const handleToggleFavorite = (noteId, e) => {
    e?.stopPropagation();
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isFavorite: !n.isFavorite } : n));
    if (previewNote && previewNote.id === noteId) {
      setPreviewNote(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      subject: 'Operating Systems',
      topic: '',
      content: '',
      tags: ''
    });
    setFormErrors({});
    setEditingNote(null);
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (note, e) => {
    e?.stopPropagation();
    setEditingNote(note);
    setFormData({
      title: note.title,
      subject: note.subject,
      topic: note.topic,
      content: note.content || '',
      tags: note.tags ? note.tags.join(', ') : ''
    });
    setFormErrors({});
    if (previewNote) setPreviewNote(null);
    setCreateModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required.';
    if (!formData.subject) errors.subject = 'Please select a subject.';
    if (!formData.topic.trim()) errors.topic = 'Topic is required.';
    if (!formData.content.trim()) errors.content = 'Note content cannot be empty.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingNote) {
      // Edit existing note
      setNotes(prev => prev.map(n => {
        if (n.id === editingNote.id) {
          return {
            ...n,
            title: formData.title.trim(),
            subject: formData.subject,
            topic: formData.topic.trim(),
            content: formData.content,
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : n.tags,
            updatedAt: 'Just now'
          };
        }
        return n;
      }));
      showToast('Note updated successfully!');
    } else {
      // Create new note
      const newNote = {
        id: `note-${Date.now()}`,
        title: formData.title.trim(),
        subject: formData.subject,
        topic: formData.topic.trim(),
        type: 'created',
        content: formData.content,
        isFavorite: false,
        updatedAt: 'Just now',
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [formData.subject.split(' ')[0]]
      };
      setNotes(prev => [newNote, ...prev]);
      showToast('Note created successfully!');
    }

    setCreateModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteConfirm = () => {
    if (!deletingNote) return;
    setNotes(prev => prev.filter(n => n.id !== deletingNote.id));
    if (previewNote && previewNote.id === deletingNote.id) {
      setPreviewNote(null);
    }
    setDeletingNote(null);
    showToast('Note removed from current session.');
  };

  // Upload Form Handlers
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData(prev => ({
        ...prev,
        file: {
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          type: file.type || 'Document'
        },
        title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')
      }));
    }
  };

  const handleSaveUpload = (e) => {
    e.preventDefault();
    const errors = {};
    if (!uploadData.title.trim()) errors.title = 'Title is required.';
    if (!uploadData.topic.trim()) errors.topic = 'Topic is required.';
    if (!uploadData.file) errors.file = 'Please select a study document.';

    if (Object.keys(errors).length > 0) {
      setUploadErrors(errors);
      return;
    }

    const newUploadedNote = {
      id: `note-up-${Date.now()}`,
      title: uploadData.title.trim(),
      subject: uploadData.subject,
      topic: uploadData.topic.trim(),
      type: 'uploaded',
      fileInfo: uploadData.file,
      content: `Uploaded reference document: ${uploadData.file.name}. View file properties in the preview window.`,
      isFavorite: false,
      updatedAt: 'Just now',
      tags: [uploadData.subject.split(' ')[0], 'Document']
    };

    setNotes(prev => [newUploadedNote, ...prev]);
    setUploadModalOpen(false);
    setUploadData({ title: '', subject: 'Computer Networks', topic: '', file: null });
    setUploadErrors({});
    showToast('Document uploaded successfully!');
  };

  // Content formatting toolbar helpers
  const insertFormatting = (prefix, suffix = '') => {
    setFormData(prev => ({
      ...prev,
      content: prev.content ? `${prev.content}\n${prefix}sample text${suffix}` : `${prefix}sample text${suffix}`
    }));
  };

  return (
    <div className="notes-page-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="notes-toast-banner" role="alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="notes-header-row">
        <div>
          <div className="page-breadcrumb">
            <span>Dashboard</span> / <span className="active">Study Notes</span>
          </div>
          <h1 className="notes-page-title">My Notes</h1>
          <p className="notes-page-subtitle">
            Create, organize, and review your computer science study material.
          </p>
        </div>

        <div className="notes-cta-group">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleOpenCreate}
          >
            <Plus size={16} />
            <span>Create Note</span>
          </button>
        </div>
      </div>

      {/* Statistics Row (4 Cards) */}
      <div className="notes-stats-grid">
        <div className="glass-card note-stat-card">
          <div className="n-stat-icon-wrapper purple">
            <BookOpen size={20} />
          </div>
          <div>
            <span className="n-stat-label">Total Notes</span>
            <h3 className="n-stat-value">{stats.total}</h3>
          </div>
        </div>

        <div className="glass-card note-stat-card">
          <div className="n-stat-icon-wrapper cyan">
            <Layers size={20} />
          </div>
          <div>
            <span className="n-stat-label">Subjects</span>
            <h3 className="n-stat-value">{stats.subjects}</h3>
          </div>
        </div>

        <div className="glass-card note-stat-card">
          <div className="n-stat-icon-wrapper amber">
            <Star size={20} />
          </div>
          <div>
            <span className="n-stat-label">Starred Favorites</span>
            <h3 className="n-stat-value">{stats.favorites}</h3>
          </div>
        </div>

        <div className="glass-card note-stat-card">
          <div className="n-stat-icon-wrapper emerald">
            <Calendar size={20} />
          </div>
          <div>
            <span className="n-stat-label">Active This Week</span>
            <h3 className="n-stat-value">{stats.recentlyAdded}</h3>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="glass-card notes-filter-bar">
        {/* Search Input */}
        <div className="notes-search-box">
          <Search size={17} className="search-icon" />
          <input 
            type="text"
            placeholder="Search by note title, subject, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="notes-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="notes-filter-actions">
          {/* Subject Filter */}
          <div className="filter-select-group">
            <Filter size={15} className="filter-icon" />
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="notes-dropdown-select"
            >
              {NOTE_SUBJECTS.map(subj => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="filter-select-group">
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="notes-dropdown-select"
            >
              <option value="All">All Types</option>
              <option value="created">Created Notes</option>
              <option value="uploaded">Uploaded Documents</option>
              <option value="favorite">Starred Favorites</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="filter-select-group">
            <ArrowUpDown size={15} className="filter-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="notes-dropdown-select"
            >
              <option value="updated">Recently Updated</option>
              <option value="alpha">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes List / Grid */}
      {filteredNotes.length > 0 ? (
        <div className="notes-cards-grid">
          {filteredNotes.map(note => (
            <div 
              key={note.id} 
              className="glass-card note-card"
              onClick={() => setPreviewNote(note)}
            >
              <div className="note-card-header">
                <div className="note-type-badge-row">
                  <span className={`note-type-pill ${note.type}`}>
                    {note.type === 'uploaded' ? <FileText size={12} /> : <BookOpen size={12} />}
                    <span>{note.type === 'uploaded' ? 'Document' : 'Note'}</span>
                  </span>
                  <span className="note-subject-tag">{note.subject}</span>
                </div>

                <button 
                  className={`favorite-star-btn ${note.isFavorite ? 'starred' : ''}`}
                  onClick={(e) => handleToggleFavorite(note.id, e)}
                  title={note.isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
                >
                  <Star size={16} fill={note.isFavorite ? '#F59E0B' : 'none'} />
                </button>
              </div>

              <h3 className="note-card-title">{note.title}</h3>
              <p className="note-card-topic">Topic: <strong>{note.topic}</strong></p>

              {note.fileInfo && (
                <div className="note-file-snippet">
                  <FileCheck size={14} className="file-icon" />
                  <span className="file-name">{note.fileInfo.name}</span>
                  <span className="file-size">({note.fileInfo.size})</span>
                </div>
              )}

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="note-tags-row">
                  {note.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="note-tag-chip">#{tag}</span>
                  ))}
                </div>
              )}

              <div className="note-card-footer">
                <span className="note-date-text">Updated {note.updatedAt}</span>
                
                <div className="note-actions-btn-group" onClick={e => e.stopPropagation()}>
                  <button 
                    className="note-icon-action-btn"
                    onClick={() => setPreviewNote(note)}
                    title="View note content"
                  >
                    <Eye size={15} />
                  </button>
                  <button 
                    className="note-icon-action-btn"
                    onClick={(e) => handleOpenEdit(note, e)}
                    title="Edit note"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button 
                    className="note-icon-action-btn danger"
                    onClick={() => setDeletingNote(note)}
                    title="Delete note"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-card notes-empty-state">
          <div className="empty-state-icon">
            <BookOpen size={36} />
          </div>
          <h3>{searchQuery || selectedSubject !== 'All' || selectedType !== 'All' ? 'No matching notes found' : 'No notes yet'}</h3>
          <p>
            {searchQuery || selectedSubject !== 'All' || selectedType !== 'All'
              ? 'Try modifying your search keywords or reset active filters to view all notes.'
              : 'Start building your personal computer science study library with markdown notes and syllabus attachments.'}
          </p>
          <div className="empty-state-actions">
            {searchQuery || selectedSubject !== 'All' || selectedType !== 'All' ? (
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => { setSearchQuery(''); setSelectedSubject('All'); setSelectedType('All'); }}
              >
                Clear Filters
              </button>
            ) : (
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleOpenCreate}
              >
                <Plus size={16} />
                <span>Create Your First Note</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: CREATE / EDIT NOTE
         ========================================================================= */}
      {createModalOpen && (
        <div className="notes-modal-overlay" role="dialog" aria-modal="true" onClick={() => setCreateModalOpen(false)}>
          <div className="notes-modal-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  {editingNote ? <Edit3 size={18} /> : <Plus size={18} />}
                </div>
                <div>
                  <h3 className="modal-title">{editingNote ? 'Edit Study Note' : 'Create New Study Note'}</h3>
                  <p className="modal-subtitle">Organize core concepts and code snippets</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setCreateModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="note-form-body">
              {/* Title Field */}
              <div className="form-group">
                <label className="form-label">Note Title <span className="req">*</span></label>
                <input 
                  type="text"
                  placeholder="e.g. Process Synchronization & Critical Section"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`form-input ${formErrors.title ? 'has-error' : ''}`}
                />
                {formErrors.title && <span className="form-err-msg">{formErrors.title}</span>}
              </div>

              {/* Subject & Topic Row */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Subject <span className="req">*</span></label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="form-select"
                  >
                    {NOTE_SUBJECTS.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic / Unit <span className="req">*</span></label>
                  <input 
                    type="text"
                    placeholder="e.g. Concurrency & Semaphores"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    className={`form-input ${formErrors.topic ? 'has-error' : ''}`}
                  />
                  {formErrors.topic && <span className="form-err-msg">{formErrors.topic}</span>}
                </div>
              </div>

              {/* Content Field with formatting toolbar */}
              <div className="form-group">
                <div className="content-label-row">
                  <label className="form-label">Content (Markdown supported) <span className="req">*</span></label>
                  <div className="toolbar-buttons">
                    <button type="button" onClick={() => insertFormatting('**', '**')} title="Bold">
                      <Bold size={13} />
                    </button>
                    <button type="button" onClick={() => insertFormatting('*', '*')} title="Italic">
                      <Italic size={13} />
                    </button>
                    <button type="button" onClick={() => insertFormatting('### ')} title="Heading">
                      <Heading size={13} />
                    </button>
                    <button type="button" onClick={() => insertFormatting('- ')} title="Bullet List">
                      <List size={13} />
                    </button>
                    <button type="button" onClick={() => insertFormatting('1. ')} title="Numbered List">
                      <ListOrdered size={13} />
                    </button>
                  </div>
                </div>
                <textarea 
                  rows={8}
                  placeholder="Type your notes, algorithms, code snippets, or key revision points..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className={`form-textarea ${formErrors.content ? 'has-error' : ''}`}
                />
                {formErrors.content && <span className="form-err-msg">{formErrors.content}</span>}
              </div>

              {/* Tags Field */}
              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input 
                  type="text"
                  placeholder="e.g. OS, Concurrency, Exam2026"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="form-input"
                />
              </div>

              {/* Actions */}
              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setCreateModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  {editingNote ? 'Save Note Changes' : 'Create Study Note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: UPLOAD DOCUMENT NOTE
         ========================================================================= */}
      {uploadModalOpen && (
        <div className="notes-modal-overlay" role="dialog" aria-modal="true" onClick={() => setUploadModalOpen(false)}>
          <div className="notes-modal-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <div className="modal-icon-badge cyan">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="modal-title">Upload Study Document</h3>
                  <p className="modal-subtitle">Attach PDF, Word documents or text notes</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setUploadModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="note-form-body">
              {/* Drag and Drop Zone */}
              <div className="file-drop-zone">
                <input 
                  type="file" 
                  id="note-file-input" 
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden-file-input"
                />
                <label htmlFor="note-file-input" className="drop-zone-label">
                  <div className="drop-icon-box">
                    <FileText size={28} />
                  </div>
                  <span className="drop-text-main">
                    {uploadData.file ? uploadData.file.name : 'Click to browse or drag & drop study file'}
                  </span>
                  <span className="drop-text-sub">
                    {uploadData.file ? `${uploadData.file.size} • ${uploadData.file.type}` : 'Supports PDF, DOC, DOCX, TXT up to 25MB'}
                  </span>
                </label>
              </div>
              {uploadErrors.file && <span className="form-err-msg">{uploadErrors.file}</span>}

              {/* Title */}
              <div className="form-group">
                <label className="form-label">Document Title <span className="req">*</span></label>
                <input 
                  type="text"
                  placeholder="e.g. TCP Handshake Lecture Slides Summary"
                  value={uploadData.title}
                  onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                  className="form-input"
                />
                {uploadErrors.title && <span className="form-err-msg">{uploadErrors.title}</span>}
              </div>

              {/* Subject & Topic */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select 
                    value={uploadData.subject}
                    onChange={(e) => setUploadData(prev => ({ ...prev, subject: e.target.value }))}
                    className="form-select"
                  >
                    {NOTE_SUBJECTS.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic <span className="req">*</span></label>
                  <input 
                    type="text"
                    placeholder="e.g. Transport Layer"
                    value={uploadData.topic}
                    onChange={(e) => setUploadData(prev => ({ ...prev, topic: e.target.value }))}
                    className="form-input"
                  />
                  {uploadErrors.topic && <span className="form-err-msg">{uploadErrors.topic}</span>}
                </div>
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  Upload to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: NOTE PREVIEW
         ========================================================================= */}
      {previewNote && (
        <div className="notes-modal-overlay" role="dialog" aria-modal="true" onClick={() => setPreviewNote(null)}>
          <div className="notes-preview-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="preview-top-bar">
              <div className="preview-meta-group">
                <span className="preview-subject-badge">{previewNote.subject}</span>
                <span className="preview-topic-badge">{previewNote.topic}</span>
                <span className="preview-date-text">Updated {previewNote.updatedAt}</span>
              </div>

              <div className="preview-controls">
                <button 
                  className={`favorite-star-btn ${previewNote.isFavorite ? 'starred' : ''}`}
                  onClick={() => handleToggleFavorite(previewNote.id)}
                  title="Favorite"
                >
                  <Star size={18} fill={previewNote.isFavorite ? '#F59E0B' : 'none'} />
                </button>
                <button 
                  className="preview-ctrl-btn"
                  onClick={(e) => handleOpenEdit(previewNote, e)}
                  title="Edit Note"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  className="modal-close-btn"
                  onClick={() => setPreviewNote(null)}
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="preview-content-scroll">
              <h2 className="preview-note-title">{previewNote.title}</h2>

              {/* File details banner if uploaded document */}
              {previewNote.fileInfo && (
                <div className="preview-file-banner">
                  <div className="file-banner-icon">
                    <FileText size={24} />
                  </div>
                  <div className="file-banner-info">
                    <p className="file-banner-name">{previewNote.fileInfo.name}</p>
                    <span className="file-banner-sub">{previewNote.fileInfo.type} • {previewNote.fileInfo.size}</span>
                  </div>
                  <button 
                    className="btn btn-outline btn-sm download-btn"
                    onClick={() => alert(`Simulated downloading: ${previewNote.fileInfo.name}`)}
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              )}

              {/* Content Body */}
              <div className="preview-rendered-body">
                {previewNote.content ? (
                  previewNote.content.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return <h3 key={index} className="rendered-h3">{line.replace('## ', '')}</h3>;
                    }
                    if (line.startsWith('### ')) {
                      return <h4 key={index} className="rendered-h4">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={index} className="rendered-li">{line.replace('- ', '')}</li>;
                    }
                    if (line.trim() === '') {
                      return <div key={index} className="rendered-spacer" />;
                    }
                    return <p key={index} className="rendered-p">{line}</p>;
                  })
                ) : (
                  <p className="rendered-p">No text content available.</p>
                )}
              </div>
            </div>

            <div className="preview-footer">
              <div className="preview-tags-row">
                {previewNote.tags?.map(t => (
                  <span key={t} className="note-tag-chip">#{t}</span>
                ))}
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setPreviewNote(null)}>
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: DELETE CONFIRMATION DIALOG
         ========================================================================= */}
      {deletingNote && (
        <div className="notes-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDeletingNote(null)}>
          <div className="delete-dialog-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="delete-icon-box">
              <AlertCircle size={28} />
            </div>
            <h3>Delete this note?</h3>
            <p className="delete-msg">
              <strong>"{deletingNote.title}"</strong> will be removed from your current session library.
            </p>
            <div className="delete-actions-row">
              <button className="btn btn-outline btn-block" onClick={() => setDeletingNote(null)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-block danger-btn" onClick={handleDeleteConfirm}>
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
