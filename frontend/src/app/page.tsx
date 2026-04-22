import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main className="page-container">
      <section className="hero">
        <div className="badge">System Architecture Plan — v1.0</div>
        <h1>CRESVIA<br /><span>PLATFORM</span></h1>
        <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 560, marginBottom: 32 }}>
          A real-time, AI-powered career intelligence platform — from resume creation to job match confidence scoring and interview preparation.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/login" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="/dashboard" className="btn btn-secondary">
            Dashboard
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 60 }}>
        <div className="grid-3">
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(0,229,160,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>🔐</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Auth Module</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Multi-provider auth via Google OAuth2, magic link email, and OTP phone.</p>
          </div>
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(124,109,250,0.1)', color: 'var(--accent2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>🧠</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Profile Intelligence</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Conversational onboarding collects work history, skills, education.</p>
          </div>
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,169,77,0.1)', color: 'var(--accent4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>📄</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Resume Engine</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Generates ATS-optimized resumes tailored per role + country.</p>
          </div>
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,107,107,0.1)', color: 'var(--accent3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>📊</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Salary Intelligence</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Estimates compensation range based on role, location, experience.</p>
          </div>
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(0,229,160,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Job Matching</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Matches user profile to live job listings with confidence scores.</p>
          </div>
          <div className="card">
            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(124,109,250,0.1)', color: 'var(--accent2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>🎯</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Prep Planner</h3>
            <p style={{ fontSize: 13, color: 'var(--muted)' }}>Auto-generates interview preparation plans per job.</p>
          </div>
        </div>
      </section>
    </main>
  );
}