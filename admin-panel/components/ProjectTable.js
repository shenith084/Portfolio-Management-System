'use client';

import { useState } from 'react';

const CATEGORIES = ['AI/ML', 'Web', 'IoT', 'Data', 'General'];

const emptyForm = {
  title: '',
  date: '',
  description: '',
  tags: '',
  link: '',
  category: 'General',
  order: '',
};

export default function ProjectTable({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // ── Helpers ───────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setErrors({});
    setApiError('');
    setDrawerOpen(true);
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      date: project.date,
      description: Array.isArray(project.description)
        ? project.description.join('\n')
        : project.description,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
      link: project.link || '',
      category: project.category || 'General',
      order: project.order ?? '',
    });
    setErrors({});
    setApiError('');
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingProject(null);
    setForm(emptyForm);
    setErrors({});
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    if (!form.date.trim()) e.date = 'Date is required.';
    if (!form.description.trim()) e.description = 'At least one description bullet is required.';
    return e;
  };

  // ── Submit (create or update) ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSaving(true);
    setApiError('');

    const payload = {
      title: form.title.trim(),
      date: form.date.trim(),
      description: form.description.split('\n').map(s => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      link: form.link.trim() || '#',
      category: form.category,
      order: form.order !== '' ? Number(form.order) : 0,
    };

    try {
      const url = editingProject
        ? `/api/admin/projects?id=${editingProject._id}`
        : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) { setApiError(data.error || 'Failed to save project.'); return; }

      if (editingProject) {
        setProjects(prev => prev.map(p => p._id === data.data._id ? data.data : p));
      } else {
        setProjects(prev => [data.data, ...prev]);
      }
      closeDrawer();
    } catch {
      setApiError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProjects(prev => prev.filter(p => p._id !== id));
      } else {
        alert(data.error || 'Failed to delete project.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p className="admin-body-text" style={{ fontSize: '0.85rem' }}>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'} total
        </p>
        <button id="project-add-btn" className="btn-add" onClick={openAdd}>
          + Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="msg-empty">
          <div className="msg-empty-icon">🚀</div>
          <p className="msg-empty-text">No projects yet. Add your first one!</p>
        </div>
      ) : (
        <div className="msg-table-wrap">
          <table className="msg-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Tags</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td className="msg-td-name" style={{ maxWidth: '240px', whiteSpace: 'normal', lineHeight: '1.4' }}>
                    {project.title}
                  </td>
                  <td>
                    <span className="category-badge">{project.category || 'General'}</span>
                  </td>
                  <td className="msg-td-date">{project.date}</td>
                  <td style={{ maxWidth: '160px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(project.tags || []).slice(0, 3).map(tag => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                      {(project.tags || []).length > 3 && (
                        <span className="tag-chip">+{project.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        className="btn-edit"
                        onClick={() => openEdit(project)}
                        id={`project-edit-${project._id}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(project._id)}
                        disabled={deletingId === project._id}
                        id={`project-delete-${project._id}`}
                      >
                        {deletingId === project._id ? '⏳' : '🗑️'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Side Drawer ────────────────────────────────────────────────────── */}
      {drawerOpen && (
        <>
          {/* Overlay — click outside to close */}
          <div className="drawer-overlay" onClick={closeDrawer} />

          {/* Drawer panel */}
          <div className="drawer-panel" role="dialog" aria-modal="true" aria-label={editingProject ? 'Edit Project' : 'Add Project'}>

            {/* Sticky header */}
            <div className="drawer-header">
              <div>
                <p className="drawer-title">
                  {editingProject ? '✏️ Edit Project' : '🚀 Add New Project'}
                </p>
                <p className="drawer-subtitle">
                  {editingProject ? `Editing: ${editingProject.title.substring(0, 40)}…` : 'Fill in the details below'}
                </p>
              </div>
              <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Close">✕</button>
            </div>

            {/* Scrollable form body */}
            <div className="drawer-body">
              <form onSubmit={handleSubmit} noValidate id="project-form">

                {/* Title */}
                <div className="form-group">
                  <label className="form-label" htmlFor="proj-title">
                    Project Title <span style={{ color: 'var(--color-mint)' }}>*</span>
                  </label>
                  <input
                    id="proj-title"
                    className="form-input"
                    value={form.title}
                    onChange={e => { setForm({ ...form, title: e.target.value }); if (errors.title) setErrors({ ...errors, title: '' }); }}
                    placeholder="e.g. Brain Tumor Detection System"
                  />
                  {errors.title && <p className="form-field-error">⚠ {errors.title}</p>}
                </div>

                {/* Date & Category */}
                <div className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="proj-date">
                      Date <span style={{ color: 'var(--color-mint)' }}>*</span>
                    </label>
                    <input
                      id="proj-date"
                      className="form-input"
                      value={form.date}
                      onChange={e => { setForm({ ...form, date: e.target.value }); if (errors.date) setErrors({ ...errors, date: '' }); }}
                      placeholder="e.g. Jan 2026"
                    />
                    {errors.date && <p className="form-field-error">⚠ {errors.date}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="proj-category">Category</label>
                    <select
                      id="proj-category"
                      className="form-input"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label" htmlFor="proj-desc">
                    Description Bullets <span style={{ color: 'var(--color-mint)' }}>*</span>
                  </label>
                  <p className="form-hint" style={{ marginBottom: '6px' }}>One bullet point per line</p>
                  <textarea
                    id="proj-desc"
                    className="form-textarea"
                    rows={5}
                    value={form.description}
                    onChange={e => { setForm({ ...form, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: '' }); }}
                    placeholder={'Built a CNN model using TensorFlow...\nDeveloped a React + Flask web app...'}
                  />
                  {errors.description && <p className="form-field-error">⚠ {errors.description}</p>}
                </div>

                {/* Tags */}
                <div className="form-group">
                  <label className="form-label" htmlFor="proj-tags">Tags</label>
                  <p className="form-hint" style={{ marginBottom: '6px' }}>Comma-separated (e.g. Python, TensorFlow)</p>
                  <input
                    id="proj-tags"
                    className="form-input"
                    value={form.tags}
                    onChange={e => setForm({ ...form, tags: e.target.value })}
                    placeholder="Python, TensorFlow, React"
                  />
                </div>

                {/* Link & Order */}
                <div className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="proj-link">Repository / Live URL</label>
                    <input
                      id="proj-link"
                      className="form-input"
                      value={form.link}
                      onChange={e => setForm({ ...form, link: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="proj-order">Display Order</label>
                    <input
                      id="proj-order"
                      className="form-input"
                      type="number"
                      min="0"
                      value={form.order}
                      onChange={e => setForm({ ...form, order: e.target.value })}
                      placeholder="1"
                    />
                  </div>
                </div>

                {apiError && (
                  <div className="form-msg-error" style={{ marginTop: '8px' }}>
                    ❌ {apiError}
                  </div>
                )}
              </form>
            </div>

            {/* Sticky footer with action buttons */}
            <div className="drawer-footer">
              <button type="button" className="btn-ghost" onClick={closeDrawer}>
                Cancel
              </button>
              <button
                type="submit"
                form="project-form"
                className="btn-primary"
                disabled={saving}
                style={{ width: 'auto', minWidth: '140px' }}
              >
                {saving
                  ? '⏳ Saving...'
                  : editingProject
                    ? '✅ Update Project'
                    : '🚀 Add Project'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
