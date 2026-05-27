'use client';

import { useState } from 'react';

const LEVELS = ['Advanced', 'Intermediate', 'Beginner'];

const emptyForm = {
  categoryTitle: '',
  icon: '',
  order: '',
  skillsText: '',
};

function parseSkillsText(text) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split('|').map(p => p.trim());
      return {
        name: parts[0] || '',
        level: LEVELS.includes(parts[1]) ? parts[1] : 'Intermediate',
        pct: Math.min(100, Math.max(0, parseInt(parts[2], 10) || 70)),
      };
    })
    .filter(s => s.name);
}

function skillsToText(skills) {
  return (skills || []).map(s => `${s.name} | ${s.level} | ${s.pct}`).join('\n');
}

export default function SkillTable({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [expandedId, setExpandedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // ── Helpers ───────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingCat(null);
    setForm(emptyForm);
    setErrors({});
    setApiError('');
    setDrawerOpen(true);
  };

  const openEdit = (cat) => {
    setEditingCat(cat);
    setForm({
      categoryTitle: cat.categoryTitle,
      icon: cat.icon,
      order: cat.order ?? '',
      skillsText: skillsToText(cat.skills),
    });
    setErrors({});
    setApiError('');
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingCat(null);
    setForm(emptyForm);
    setErrors({});
    setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.categoryTitle.trim()) e.categoryTitle = 'Category title is required.';
    if (!form.icon.trim()) e.icon = 'Icon emoji is required.';
    return e;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSaving(true);
    setApiError('');

    const payload = {
      categoryTitle: form.categoryTitle.trim(),
      icon: form.icon.trim(),
      order: form.order !== '' ? Number(form.order) : 0,
      skills: parseSkillsText(form.skillsText),
    };

    try {
      const url = editingCat
        ? `/api/admin/skills?id=${editingCat._id}`
        : '/api/admin/skills';
      const method = editingCat ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!data.success) { setApiError(data.error || 'Failed to save skill category.'); return; }

      if (editingCat) {
        setCategories(prev => prev.map(c => c._id === data.data._id ? data.data : c));
      } else {
        setCategories(prev => [...prev, data.data]);
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
    if (!confirm('Are you sure you want to delete this skill category?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCategories(prev => prev.filter(c => c._id !== id));
      } else {
        alert(data.error || 'Failed to delete skill category.');
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
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p className="admin-body-text" style={{ fontSize: '0.85rem' }}>
          {categories.length} {categories.length === 1 ? 'category' : 'categories'} total
        </p>
        <button id="skill-add-btn" className="btn-add" onClick={openAdd}>
          + Add Skill Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="msg-empty">
          <div className="msg-empty-icon">⚙️</div>
          <p className="msg-empty-text">No skill categories yet. Add your first one!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {categories.map((cat) => (
            <div key={cat._id} className="skill-admin-card">
              {/* Card header */}
              <div className="skill-admin-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div className="skill-admin-icon-box">{cat.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: 'var(--foreground)', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cat.categoryTitle}
                    </p>
                    <p className="admin-body-text" style={{ fontSize: '0.75rem', marginTop: '1px' }}>
                      {(cat.skills || []).length} skills
                      {cat.order !== undefined ? ` · Order ${cat.order}` : ''}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                  <button
                    className="btn-ghost"
                    style={{ padding: '5px 12px', fontSize: '0.78rem' }}
                    onClick={() => setExpandedId(expandedId === cat._id ? null : cat._id)}
                    id={`skill-expand-${cat._id}`}
                  >
                    {expandedId === cat._id ? '▲ Hide' : '▼ View Skills'}
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => openEdit(cat)}
                    id={`skill-edit-${cat._id}`}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(cat._id)}
                    disabled={deletingId === cat._id}
                    id={`skill-delete-${cat._id}`}
                    style={{ padding: '6px 10px' }}
                    title="Delete category"
                  >
                    {deletingId === cat._id ? '⏳' : '🗑️'}
                  </button>
                </div>
              </div>

              {/* Expanded skill list */}
              {expandedId === cat._id && (
                <div className="skill-admin-card-body">
                  {(cat.skills || []).length === 0 ? (
                    <p className="admin-body-text" style={{ fontSize: '0.85rem' }}>No skills listed yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {cat.skills.map((skill, idx) => (
                        <div key={idx} className="skill-admin-row">
                          <span style={{ color: 'var(--foreground)', fontWeight: 500, fontSize: '0.875rem', flex: 1 }}>
                            {skill.name}
                          </span>
                          <span className={`level-badge level-${skill.level.toLowerCase()}`}>
                            {skill.level}
                          </span>
                          {/* Mini progress bar */}
                          <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: 'rgba(59,117,151,0.25)', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%',
                              width: `${skill.pct}%`,
                              borderRadius: '3px',
                              background: skill.level === 'Advanced'
                                ? 'var(--color-mint)'
                                : skill.level === 'Intermediate'
                                  ? 'var(--color-teal)'
                                  : 'var(--color-steel)',
                            }} />
                          </div>
                          <span style={{ color: 'var(--color-mint)', fontWeight: 700, fontSize: '0.8rem', minWidth: '34px', textAlign: 'right' }}>
                            {skill.pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Side Drawer ────────────────────────────────────────────────────── */}
      {drawerOpen && (
        <>
          <div className="drawer-overlay" onClick={closeDrawer} />

          <div className="drawer-panel drawer-panel-large" role="dialog" aria-modal="true" aria-label={editingCat ? 'Edit Skill Category' : 'Add Skill Category'}>

            {/* Sticky header */}
            <div className="drawer-header">
              <div>
                <p className="drawer-title">
                  {editingCat ? '✏️ Edit Skill Category' : '⚙️ Add Skill Category'}
                </p>
                <p className="drawer-subtitle">
                  {editingCat ? `Editing: ${editingCat.categoryTitle}` : 'Fill in the details below'}
                </p>
              </div>
              <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Close">✕</button>
            </div>

            {/* Scrollable form body */}
            <div className="drawer-body">
              <form onSubmit={handleSubmit} noValidate id="skill-form">

                {/* Title & Icon */}
                <div className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="skill-title">
                      Category Title <span style={{ color: 'var(--color-mint)' }}>*</span>
                    </label>
                    <input
                      id="skill-title"
                      className="form-input"
                      value={form.categoryTitle}
                      onChange={e => { setForm({ ...form, categoryTitle: e.target.value }); if (errors.categoryTitle) setErrors({ ...errors, categoryTitle: '' }); }}
                      placeholder="e.g. Frontend Development"
                    />
                    {errors.categoryTitle && <p className="form-field-error">⚠ {errors.categoryTitle}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="skill-icon">
                      Icon <span style={{ color: 'var(--color-mint)' }}>*</span>
                      <span className="form-hint"> (emoji)</span>
                    </label>
                    <input
                      id="skill-icon"
                      className="form-input"
                      value={form.icon}
                      onChange={e => { setForm({ ...form, icon: e.target.value }); if (errors.icon) setErrors({ ...errors, icon: '' }); }}
                      placeholder="🎨"
                    />
                    {errors.icon && <p className="form-field-error">⚠ {errors.icon}</p>}
                  </div>
                </div>

                {/* Order */}
                <div className="form-group">
                  <label className="form-label" htmlFor="skill-order">Display Order</label>
                  <input
                    id="skill-order"
                    className="form-input"
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={e => setForm({ ...form, order: e.target.value })}
                    placeholder="1"
                    style={{ maxWidth: '160px' }}
                  />
                </div>

                {/* Skills text */}
                <div className="form-group">
                  <label className="form-label" htmlFor="skill-items">Skills</label>
                  <div className="form-hint-box">
                    <p style={{ fontWeight: 600, color: 'var(--color-teal)', fontSize: '0.8rem', marginBottom: '4px' }}>
                      Format: <code style={{ color: 'var(--color-mint)' }}>Skill Name | Level | Percentage</code>
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Levels: <strong style={{ color: 'var(--color-mint)' }}>Advanced</strong>, <strong style={{ color: 'var(--color-teal)' }}>Intermediate</strong>, <strong style={{ color: 'var(--color-steel)' }}>Beginner</strong>. One skill per line.
                    </p>
                  </div>
                  <textarea
                    id="skill-items"
                    className="form-textarea"
                    rows={10}
                    value={form.skillsText}
                    onChange={e => setForm({ ...form, skillsText: e.target.value })}
                    placeholder={`HTML & CSS | Advanced | 92\nJavaScript | Advanced | 88\nReact.js | Intermediate | 80`}
                    style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '0.82rem' }}
                  />
                </div>

                {apiError && (
                  <div className="form-msg-error" style={{ marginTop: '8px' }}>
                    ❌ {apiError}
                  </div>
                )}
              </form>
            </div>

            {/* Sticky footer */}
            <div className="drawer-footer">
              <button type="button" className="btn-ghost" onClick={closeDrawer}>
                Cancel
              </button>
              <button
                type="submit"
                form="skill-form"
                className="btn-primary"
                disabled={saving}
                style={{ width: 'auto', minWidth: '160px' }}
              >
                {saving
                  ? '⏳ Saving...'
                  : editingCat
                    ? '✅ Update Category'
                    : '⚙️ Add Category'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
