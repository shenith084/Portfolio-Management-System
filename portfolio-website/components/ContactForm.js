'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.phone && !/^[\d\s\+\-\(\)]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error on change
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} id="contact-form" noValidate>
      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">
          Full Name <span style={{ color: 'var(--color-mint)' }}>*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="e.g. John Smith"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="form-field-error">{errors.name}</p>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">
          Email Address <span style={{ color: 'var(--color-mint)' }}>*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="form-field-error">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label htmlFor="contact-phone" className="form-label">
          Phone Number <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="+94 71 234 5678"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="form-field-error">{errors.phone}</p>}
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Message <span style={{ color: 'var(--color-mint)' }}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Tell me about your project or just say hello..."
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="form-field-error">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        id="contact-submit"
        disabled={status === 'loading'}
        className="btn-primary"
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? (
          <>
            <span className="form-spinner" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send Message 📬'
        )}
      </button>

      {status === 'success' && (
        <div className="form-msg-success" role="alert">
          ✅ Your message was sent successfully! I&apos;ll get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className="form-msg-error" role="alert">
          ❌ Something went wrong. Please try again or email me directly.
        </div>
      )}
    </form>
  );
}
