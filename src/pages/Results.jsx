import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, TrendingUp, BarChart3, Plus, Edit3, 
  Trash2, X, CheckCircle2, Award, Percent, Calendar, 
  ChevronRight, AlertCircle, Sparkles, BookOpen 
} from 'lucide-react';
import { 
  calculateSemesterSGPA, 
  calculateCumulativeCGPA, 
  generateAcademicInsights, 
  GRADE_POINTS 
} from '../data/resultsData';
import './Results.css';

export default function Results({ semesters, setSemesters }) {
  // Active selected semester tab
  const [selectedSemId, setSelectedSemId] = useState(semesters[semesters.length - 1]?.id || 'sem-4');
  
  // Graph Mode: 'cgpa' | 'percentage'
  const [graphMode, setGraphMode] = useState('cgpa');

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingSubject, setDeletingSubject] = useState(null);

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Form State
  const [formData, setFormData] = useState({
    semesterId: selectedSemId,
    subjectName: '',
    marks: '',
    grade: 'A',
    credits: 4
  });
  const [formErrors, setFormErrors] = useState({});

  // Dynamic Metrics Calculation
  const currentCGPA = useMemo(() => calculateCumulativeCGPA(semesters), [semesters]);
  const currentPercentage = useMemo(() => (currentCGPA * 10).toFixed(1), [currentCGPA]);
  
  const currentSemesterObj = semesters.find(s => s.id === selectedSemId) || semesters[0];
  
  const bestSemester = useMemo(() => {
    if (!semesters || semesters.length === 0) return null;
    return [...semesters].sort((a, b) => b.sgpa - a.sgpa)[0];
  }, [semesters]);

  const insights = useMemo(() => generateAcademicInsights(semesters), [semesters]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingSubject(null);
    setFormData({
      semesterId: selectedSemId,
      subjectName: '',
      marks: '',
      grade: 'A',
      credits: 4
    });
    setFormErrors({});
    setAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (subj) => {
    setEditingSubject(subj);
    setFormData({
      semesterId: selectedSemId,
      subjectName: subj.name,
      marks: subj.marks,
      grade: subj.grade,
      credits: subj.credits
    });
    setFormErrors({});
    setAddModalOpen(true);
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.subjectName.trim()) errors.subjectName = 'Subject name is required.';
    const marksNum = Number(formData.marks);
    if (formData.marks === '' || isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
      errors.marks = 'Marks must be between 0 and 100.';
    }
    if (!formData.credits || Number(formData.credits) < 1) {
      errors.credits = 'Credits must be at least 1.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Add / Edit
  const handleSaveResult = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const marksNum = Number(formData.marks);
    const creditsNum = Number(formData.credits);

    setSemesters(prevSemesters => {
      return prevSemesters.map(sem => {
        if (sem.id === formData.semesterId) {
          let updatedSubjects = [];
          if (editingSubject) {
            // Update existing subject
            updatedSubjects = sem.subjects.map(s => s.id === editingSubject.id ? {
              ...s,
              name: formData.subjectName.trim(),
              marks: marksNum,
              grade: formData.grade,
              credits: creditsNum
            } : s);
          } else {
            // Add new subject
            const newSubj = {
              id: `subj-${Date.now()}`,
              name: formData.subjectName.trim(),
              marks: marksNum,
              grade: formData.grade,
              credits: creditsNum
            };
            updatedSubjects = [...sem.subjects, newSubj];
          }

          // Recalculate semester SGPA and percentage
          const newSgpa = calculateSemesterSGPA(updatedSubjects);
          const newCredits = updatedSubjects.reduce((acc, s) => acc + Number(s.credits), 0);
          const newPct = Number((newSgpa * 10).toFixed(1));

          return {
            ...sem,
            subjects: updatedSubjects,
            sgpa: newSgpa,
            credits: newCredits,
            percentage: newPct
          };
        }
        return sem;
      });
    });

    setAddModalOpen(false);
    showToast(editingSubject ? 'Result updated successfully!' : 'Subject result added successfully!');
  };

  // Delete Subject Confirmation
  const handleDeleteConfirm = () => {
    if (!deletingSubject) return;

    setSemesters(prevSemesters => {
      return prevSemesters.map(sem => {
        if (sem.id === selectedSemId) {
          const updatedSubjects = sem.subjects.filter(s => s.id !== deletingSubject.id);
          const newSgpa = calculateSemesterSGPA(updatedSubjects);
          const newCredits = updatedSubjects.reduce((acc, s) => acc + Number(s.credits), 0);
          const newPct = Number((newSgpa * 10).toFixed(1));

          return {
            ...sem,
            subjects: updatedSubjects,
            sgpa: newSgpa,
            credits: newCredits,
            percentage: newPct
          };
        }
        return sem;
      });
    });

    setDeletingSubject(null);
    showToast('Result removed from current session.');
  };

  // SVG Chart Geometry
  const width = 500;
  const height = 180;
  const padX = 50;
  const padY = 30;

  const chartPoints = semesters.map((sem, i) => {
    const x = padX + (i * (width - 2 * padX)) / Math.max(1, semesters.length - 1);
    let val = sem.sgpa;
    let min = 6.5;
    let max = 9.5;
    if (graphMode === 'percentage') {
      val = sem.percentage;
      min = 65;
      max = 95;
    }
    const y = height - padY - ((val - min) / (max - min)) * (height - 2 * padY);
    return { x, y, semName: sem.name, val, sgpa: sem.sgpa, pct: sem.percentage };
  });

  const pathD = chartPoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
  const areaD = chartPoints.length > 0 
    ? `${pathD} L ${chartPoints[chartPoints.length - 1].x},${height - 18} L ${chartPoints[0].x},${height - 18} Z` 
    : '';

  return (
    <div className="results-page-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="results-toast-banner" role="alert">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="results-header-row">
        <div>
          <div className="page-breadcrumb">
            <span>Dashboard</span> / <span className="active">Academic Performance</span>
          </div>
          <h1 className="results-page-title">Academic Performance</h1>
          <p className="results-page-subtitle">
            Track your semester results, SGPA trends, and subject-wise scorecards.
          </p>
        </div>

        <button 
          className="btn btn-primary btn-sm"
          onClick={handleOpenAdd}
        >
          <Plus size={16} />
          <span>Add Subject Result</span>
        </button>
      </div>

      {/* Summary Statistics Cards (4 Cards) */}
      <div className="results-summary-grid">
        <div className="glass-card result-metric-card">
          <div className="r-metric-icon cyan">
            <GraduationCap size={22} />
          </div>
          <div className="r-metric-body">
            <span className="r-metric-label">Cumulative CGPA</span>
            <div className="r-metric-val-row">
              <span className="r-metric-big">{currentCGPA.toFixed(2)}</span>
              <span className="r-metric-sub">/ 10.0</span>
            </div>
            <span className="r-metric-badge positive">+0.32 across 4 semesters</span>
          </div>
        </div>

        <div className="glass-card result-metric-card">
          <div className="r-metric-icon emerald">
            <Percent size={20} />
          </div>
          <div className="r-metric-body">
            <span className="r-metric-label">Percentage Equivalent</span>
            <div className="r-metric-val-row">
              <span className="r-metric-big">{currentPercentage}%</span>
            </div>
            <span className="r-metric-desc">First Class with Distinction</span>
          </div>
        </div>

        <div className="glass-card result-metric-card">
          <div className="r-metric-icon purple">
            <Calendar size={20} />
          </div>
          <div className="r-metric-body">
            <span className="r-metric-label">Current Standing</span>
            <div className="r-metric-val-row">
              <span className="r-metric-big">{currentSemesterObj?.name || 'Semester 4'}</span>
            </div>
            <span className="r-metric-desc">{currentSemesterObj?.academicYear || '2025-2026'}</span>
          </div>
        </div>

        <div className="glass-card result-metric-card">
          <div className="r-metric-icon amber">
            <Award size={20} />
          </div>
          <div className="r-metric-body">
            <span className="r-metric-label">Best Recorded Semester</span>
            <div className="r-metric-val-row">
              <span className="r-metric-big">{bestSemester ? bestSemester.name : 'Sem 4'}</span>
            </div>
            <span className="r-metric-desc">
              {bestSemester ? `${bestSemester.sgpa.toFixed(2)} SGPA (${bestSemester.percentage}%)` : '8.42 SGPA'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Performance Graph & Academic Insights */}
      <div className="results-top-grid">
        {/* Performance Graph Card */}
        <div className="glass-card results-chart-card">
          <div className="chart-card-header">
            <div className="chart-title-group">
              <div className="card-icon-tag cyan">
                <BarChart3 size={18} />
              </div>
              <div>
                <h3 className="chart-heading">Academic Performance Progression</h3>
                <p className="chart-subheading">Historical Semester Growth Curve</p>
              </div>
            </div>

            {/* Toggle CGPA vs Percentage */}
            <div className="card-pill-tabs">
              <button 
                className={`card-tab-btn ${graphMode === 'cgpa' ? 'active' : ''}`}
                onClick={() => setGraphMode('cgpa')}
              >
                SGPA Trend
              </button>
              <button 
                className={`card-tab-btn ${graphMode === 'percentage' ? 'active' : ''}`}
                onClick={() => setGraphMode('percentage')}
              >
                Percentage
              </button>
            </div>
          </div>

          {/* SVG Progression Graph */}
          <div className="chart-render-container">
            <svg viewBox={`0 0 ${width} ${height}`} className="results-svg-graph">
              <defs>
                <linearGradient id="resultsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background Guide Lines */}
              <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1={padX} y1={height / 2} x2={width - padX} y2={height / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <line x1={padX} y1={height - 24} x2={width - padX} y2={height - 24} stroke="rgba(255,255,255,0.12)" />

              {/* Area Fill */}
              {areaD && <path d={areaD} fill="url(#resultsGradient)" />}

              {/* Line Stroke */}
              {pathD && (
                <path 
                  d={pathD} 
                  fill="none" 
                  stroke="#06B6D4" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              )}

              {/* Points & Value Tooltips */}
              {chartPoints.map((pt) => (
                <g key={pt.semName} className="chart-node">
                  <circle cx={pt.x} cy={pt.y} r="6" fill="#0A0E17" stroke="#06B6D4" strokeWidth="3" />
                  <text x={pt.x} y={pt.y - 12} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                    {graphMode === 'cgpa' ? pt.sgpa.toFixed(2) : `${pt.pct}%`}
                  </text>
                  <text x={pt.x} y={height - 6} textAnchor="middle" fill="#94A3B8" fontSize="10">
                    {pt.semName}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Academic Insights Box (Strictly Mock Data Based) */}
        <div className="glass-card results-insights-card">
          <div className="insights-header">
            <div className="card-icon-tag indigo">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="chart-heading">Academic Insights</h3>
              <p className="chart-subheading">Computed from current session records</p>
            </div>
          </div>

          <div className="insights-list">
            {insights.map(item => (
              <div key={item.id} className={`insight-card-item ${item.type}`}>
                <h4 className="insight-title">{item.title}</h4>
                <p className="insight-desc">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="insight-disclaimer">
            <span>* Descriptive metrics calculated strictly from logged marksheet records.</span>
          </div>
        </div>
      </div>

      {/* Semester Selection Tabs */}
      <div className="semester-tabs-wrapper">
        <span className="semester-tabs-title">Select Semester to View Marksheet:</span>
        <div className="semester-tabs-pills">
          {semesters.map(sem => (
            <button
              key={sem.id}
              className={`sem-pill-btn ${selectedSemId === sem.id ? 'active' : ''}`}
              onClick={() => setSelectedSemId(sem.id)}
            >
              <span className="sem-pill-name">{sem.name}</span>
              <span className="sem-pill-sgpa">{sem.sgpa.toFixed(2)} SGPA</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subject Results Marksheet Table */}
      <div className="glass-card marksheet-card">
        <div className="marksheet-header">
          <div>
            <h3 className="marksheet-title">
              {currentSemesterObj?.name} Marksheet & Course Credits
            </h3>
            <p className="marksheet-meta">
              Total Credits: <strong>{currentSemesterObj?.credits || 0}</strong> • Semester SGPA: <strong>{currentSemesterObj?.sgpa.toFixed(2)}</strong>
            </p>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={handleOpenAdd}
          >
            <Plus size={14} />
            <span>Add Course</span>
          </button>
        </div>

        {/* Responsive Table */}
        <div className="table-responsive-container">
          <table className="results-data-table">
            <thead>
              <tr>
                <th>Subject / Course Title</th>
                <th className="text-center">Marks</th>
                <th className="text-center">Letter Grade</th>
                <th className="text-center">Grade Point</th>
                <th className="text-center">Credits</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSemesterObj?.subjects?.length > 0 ? (
                currentSemesterObj.subjects.map(subj => {
                  const pts = GRADE_POINTS[subj.grade] ?? 7;

                  return (
                    <tr key={subj.id}>
                      <td className="subject-name-cell">
                        <span className="subj-title">{subj.name}</span>
                      </td>
                      <td className="text-center">
                        <span className="marks-badge">{subj.marks}%</span>
                      </td>
                      <td className="text-center">
                        <span className={`grade-pill-tag grade-${subj.grade.replace('+', 'plus')}`}>
                          {subj.grade}
                        </span>
                      </td>
                      <td className="text-center text-muted font-mono">{pts}</td>
                      <td className="text-center text-muted font-mono">{subj.credits}</td>
                      <td className="text-right">
                        <div className="table-actions-group">
                          <button 
                            className="table-action-icon"
                            onClick={() => handleOpenEdit(subj)}
                            title="Edit result"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button 
                            className="table-action-icon danger"
                            onClick={() => setDeletingSubject(subj)}
                            title="Delete result"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center empty-table-cell">
                    No subjects recorded for this semester yet. Click "Add Course" above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          MODAL: ADD / EDIT RESULT
         ========================================================================= */}
      {addModalOpen && (
        <div className="results-modal-overlay" role="dialog" aria-modal="true" onClick={() => setAddModalOpen(false)}>
          <div className="results-modal-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header-row">
              <div className="modal-title-group">
                <div className="modal-icon-badge cyan">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="modal-title">{editingSubject ? 'Edit Subject Result' : 'Add Subject Result'}</h3>
                  <p className="modal-subtitle">Automatically updates semester SGPA & overall CGPA</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="result-form-body">
              {/* Semester Dropdown */}
              <div className="form-group">
                <label className="form-label">Semester</label>
                <select 
                  value={formData.semesterId}
                  onChange={(e) => setFormData(prev => ({ ...prev, semesterId: e.target.value }))}
                  className="form-select"
                  disabled={Boolean(editingSubject)}
                >
                  {semesters.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject Name */}
              <div className="form-group">
                <label className="form-label">Subject / Course Name <span className="req">*</span></label>
                <input 
                  type="text"
                  placeholder="e.g. Distributed Operating Systems"
                  value={formData.subjectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, subjectName: e.target.value }))}
                  className={`form-input ${formErrors.subjectName ? 'has-error' : ''}`}
                />
                {formErrors.subjectName && <span className="form-err-msg">{formErrors.subjectName}</span>}
              </div>

              {/* Marks, Grade, Credits Row */}
              <div className="form-row-3col">
                <div className="form-group">
                  <label className="form-label">Marks (0-100) <span className="req">*</span></label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 85"
                    value={formData.marks}
                    onChange={(e) => setFormData(prev => ({ ...prev, marks: e.target.value }))}
                    className={`form-input ${formErrors.marks ? 'has-error' : ''}`}
                  />
                  {formErrors.marks && <span className="form-err-msg">{formErrors.marks}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Letter Grade</label>
                  <select 
                    value={formData.grade}
                    onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                    className="form-select"
                  >
                    {Object.keys(GRADE_POINTS).map(g => (
                      <option key={g} value={g}>{g} (Point {GRADE_POINTS[g]})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Credits <span className="req">*</span></label>
                  <input 
                    type="number"
                    min="1"
                    max="6"
                    placeholder="e.g. 4"
                    value={formData.credits}
                    onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
                    className={`form-input ${formErrors.credits ? 'has-error' : ''}`}
                  />
                  {formErrors.credits && <span className="form-err-msg">{formErrors.credits}</span>}
                </div>
              </div>

              <div className="modal-actions-row">
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-sm"
                >
                  {editingSubject ? 'Update Result' : 'Add to Marksheet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: DELETE CONFIRMATION
         ========================================================================= */}
      {deletingSubject && (
        <div className="results-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDeletingSubject(null)}>
          <div className="delete-dialog-card glass-card" onClick={e => e.stopPropagation()}>
            <div className="delete-icon-box">
              <AlertCircle size={28} />
            </div>
            <h3>Delete this subject result?</h3>
            <p className="delete-msg">
              <strong>"{deletingSubject.name}"</strong> will be removed and your SGPA will be recalculated.
            </p>
            <div className="delete-actions-row">
              <button className="btn btn-outline btn-block" onClick={() => setDeletingSubject(null)}>
                Cancel
              </button>
              <button className="btn btn-primary btn-block danger-btn" onClick={handleDeleteConfirm}>
                Delete Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
