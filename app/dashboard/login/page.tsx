import type { Metadata } from 'next';
import Icon from '@/components/ui/Icon';
import PasswordField from '@/components/dashboard/PasswordField';
import { login } from '../actions';

export const metadata: Metadata = { title: 'Dashboard login', robots: { index: false, follow: false } };

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <section className="cs-section">
      <div className="cs-container" style={{ maxWidth: 440 }}>
        <div className="cs-card">
          <div className="cs-icon">
            <Icon name="shield" />
          </div>
          <h1 style={{ fontSize: 26 }}>Dashboard login</h1>
          <p style={{ color: 'var(--cs-muted)', marginBottom: 18 }}>Enter the admin password to manage the site.</p>
          {searchParams?.error && (
            <div className="cs-form__status cs-form__status--err" role="alert" style={{ marginBottom: 14 }}>
              Incorrect password.
            </div>
          )}
          <form className="cs-form" action={login}>
            <div className="cs-field">
              <label htmlFor="pw">Password</label>
              <PasswordField id="pw" name="password" placeholder="••••••••" autoFocus />
            </div>
            <button className="cs-btn cs-btn--primary" type="submit">
              <Icon name="arrow" /> Log in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
