'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
    if (!formData.password) errs.password = 'Password is required.';
    else if (formData.password.length < 5) errs.password = 'Password must be at least 5 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
    if (status === 'error') { setStatus(null); setErrorMsg(''); }
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
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Invalid credentials. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Connection error. Please try again.');
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">

        {/* Brand Logo */}
        <div className="login-logo">
          <span className="login-logo-bracket">&lt;</span>
          S<span className="login-logo-accent">C</span>
          <span className="login-logo-bracket">/&gt;</span>
        </div>
        <p className="login-tagline">Portfolio Admin Panel</p>

        {/* Card heading */}
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to manage your portfolio messages.</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} id="admin-login-form" noValidate>

          <div className="form-group">
            <label htmlFor="login-email" className="form-label">Email Address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="admin@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
            {errors.email && (
              <p id="login-email-error" className="form-field-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            {errors.password && (
              <p id="login-password-error" className="form-field-error">{errors.password}</p>
            )}
          </div>

          {status === 'error' && (
            <div className="form-msg-error" role="alert" id="login-error-msg">
              🔒 {errorMsg}
            </div>
          )}

          <button
            type="submit"
            id="login-submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ marginTop: '22px' }}
          >
            {status === 'loading' ? (
              <>
                <span className="btn-spinner" aria-hidden="true" style={{ marginRight: '10px' }} />
                Signing In...
              </>
            ) : (
              'Sign In →'
            )}
          </button>
        </form>

        {/* Footer note */}
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Secure admin access only. Unauthorized access is prohibited.
        </p>
      </div>
    </main>
  );
}
