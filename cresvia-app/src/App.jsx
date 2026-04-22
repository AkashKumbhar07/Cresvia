import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const showTab = (id) => {
    setActiveTab(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="hero">
        <div className="badge">System Architecture Plan — v1.0</div>
        <h1>CRESVIA<br/><span>PLATFORM</span></h1>
        <p className="hero-sub">A real-time, AI-powered career intelligence platform — from resume creation to job match confidence scoring and interview preparation.</p>
        <div className="hero-stats">
          <div className="stat"><span className="stat-val">7</span><span className="stat-label">Core Modules</span></div>
          <div className="stat"><span className="stat-val">4</span><span className="stat-label">AI Pipelines</span></div>
          <div className="stat"><span className="stat-val">3</span><span className="stat-label">DB Layers</span></div>
          <div className="stat"><span className="stat-val">∞</span><span className="stat-label">API Key Configs</span></div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => showTab('overview')}>Overview</button>
        <button className={`tab ${activeTab === 'architecture' ? 'active' : ''}`} onClick={() => showTab('architecture')}>Architecture</button>
        <button className={`tab ${activeTab === 'userflow' ? 'active' : ''}`} onClick={() => showTab('userflow')}>User Flow</button>
        <button className={`tab ${activeTab === 'database' ? 'active' : ''}`} onClick={() => showTab('database')}>Database Design</button>
        <button className={`tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => showTab('ai')}>AI Pipelines</button>
        <button className={`tab ${activeTab === 'tech' ? 'active' : ''}`} onClick={() => showTab('tech')}>Tech Stack</button>
        <button className={`tab ${activeTab === 'api' ? 'active' : ''}`} onClick={() => showTab('api')}>API Design</button>
        <button className={`tab ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => showTab('roadmap')}>Roadmap</button>
      </div>

      <div className={`section ${activeTab === 'overview' ? 'active' : ''}`} id="tab-overview">
        <div className="section-title">PRODUCT OVERVIEW</div>
        <p className="section-desc">Cresvia is a 7-module platform that guides users from profile creation to job landing.</p>

        <div className="alert">
          <span className="alert-icon">💡</span>
          <div>The platform is designed as a <strong>microservice-friendly monolith</strong> to start — allowing rapid iteration while keeping service boundaries clean for future extraction into independent services.</div>
        </div>

        <div className="grid-3">
          <div className="card">
            <div className="card-icon green">🔐</div>
            <h3>Auth Module</h3>
            <p>Multi-provider auth via Google OAuth2, magic link email, and OTP phone. JWT + refresh tokens with session management.</p>
          </div>
          <div className="card">
            <div className="card-icon purple">🧠</div>
            <h3>Profile Intelligence</h3>
            <p>Conversational onboarding collects work history, skills, education. AI structures and enriches the data into a canonical profile.</p>
          </div>
          <div className="card">
            <div className="card-icon orange">📄</div>
            <h3>Resume Engine</h3>
            <p>Generates ATS-optimized resumes tailored per role + country. Supports PDF export and multiple template styles.</p>
          </div>
          <div className="card">
            <div className="card-icon red">📊</div>
            <h3>Salary Intelligence</h3>
            <p>Estimates compensation range based on role, location, experience, and current market data via AI + scraped datasets.</p>
          </div>
          <div className="card">
            <div className="card-icon green">🔍</div>
            <h3>Job Matching</h3>
            <p>Matches user profile to live job listings using vector similarity + graph relationships. Shows confidence score per job.</p>
          </div>
          <div className="card">
            <div className="card-icon purple">🎯</div>
            <h3>Prep Planner</h3>
            <p>Auto-generates interview preparation plans per job — DSA, system design, behavioral, domain-specific topics.</p>
          </div>
          <div className="card">
            <div className="card-icon orange">⚙️</div>
            <h3>Settings & API Keys</h3>
            <p>Users configure their own LLM API keys (OpenAI, Gemini, Anthropic, Ollama). Platform uses them for AI features.</p>
          </div>
        </div>
      </div>

      <div className={`section ${activeTab === 'architecture' ? 'active' : ''}`} id="tab-architecture">
        <div className="section-title">SYSTEM ARCHITECTURE</div>
        <p className="section-desc">Layered architecture with clear separation between client, API gateway, services, and data stores.</p>

        <div className="wide-card">
          <h3>🖥️ Frontend Layer</h3>
          <p>Single-page application built with <strong>Next.js 14</strong> (App Router) with React Server Components for fast initial load. Real-time updates via WebSockets for the conversational onboarding. TypeScript throughout. Deployed on Vercel or self-hosted via Docker.</p>
        </div>

        <div className="wide-card">
          <h3>🔀 API Gateway</h3>
          <p><strong>Go (Golang)</strong> — a single binary API gateway using the Gin or Chi router. Handles authentication middleware, rate limiting, request logging, and routes to internal service handlers. Exposes REST + WebSocket endpoints. GraphQL optional layer via gqlgen for flexible client queries.</p>
        </div>

        <div className="wide-card">
          <h3>⚙️ Core Service Modules (Go)</h3>
          <p>Each feature domain is a Go package within the monolith. Clean interfaces allow extracting to microservices later. Uses goroutines + channels for concurrent AI pipeline calls. Worker pool pattern for resume generation and job indexing.</p>
          <div className="code-block">
            <span className="comment">// Internal package structure</span><br/>
            <span className="key">cmd/</span>        → <span className="str">main entry, wire injection</span><br/>
            <span className="key">internal/</span><br/>
            &nbsp;&nbsp;<span className="key">auth/</span>       → <span className="str">OAuth, JWT, session</span><br/>
            &nbsp;&nbsp;<span className="key">profile/</span>    → <span className="str">conversational intake, enrichment</span><br/>
            &nbsp;&nbsp;<span className="key">resume/</span>     → <span className="str">generation engine, templates</span><br/>
            &nbsp;&nbsp;<span className="key">salary/</span>     → <span className="str">package estimator</span><br/>
            &nbsp;&nbsp;<span className="key">jobs/</span>       → <span className="str">scraper, vector match, confidence</span><br/>
            &nbsp;&nbsp;<span className="key">prep/</span>       → <span className="str">interview plan generator</span><br/>
            &nbsp;&nbsp;<span className="key">ai/</span>         → <span className="str">LLM adapter (OpenAI/Gemini/Anthropic)</span><br/>
            &nbsp;&nbsp;<span className="key">settings/</span>   → <span className="str">API key vault, user preferences</span><br/>
            <span className="key">pkg/</span>        → <span className="str">shared: db, logger, config, errors</span>
          </div>
        </div>

        <div className="wide-card">
          <h3>🗄️ Data Layer (Three-tier)</h3>
          <div className="grid-3">
            <div className="db-box">
              <div className="db-title">POSTGRESQL</div>
              <p>Users, auth sessions, subscriptions, settings, API key vault (encrypted). Relational integrity.</p>
            </div>
            <div className="db-box">
              <div className="db-title">MONGODB</div>
              <p>Profiles, resumes, job listings, prep plans. Flexible schema for AI-generated structured docs.</p>
            </div>
            <div className="db-box">
              <div className="db-title">NEO4J (Graph)</div>
              <p>Skill → Role → Company relationships. Powers "what skills to learn next" and career path graph.</p>
            </div>
          </div>
        </div>

        <div className="wide-card">
          <h3>🔴 Real-time Layer</h3>
          <p><strong>Redis</strong> for pub/sub (WebSocket fan-out), session cache, rate limit counters, and job queue backing store. <strong>WebSockets</strong> via Gorilla/websocket for live conversational onboarding, resume generation progress, and job match streaming results.</p>
        </div>

        <div className="wide-card">
          <h3>📦 Background Workers</h3>
          <p><strong>Asynq</strong> (Redis-backed Go task queue) for: job scraping & indexing (scheduled), embedding generation (post-profile save), salary data refresh, email/SMS notifications. Separate worker binary, same repo.</p>
        </div>
      </div>

      <div className={`section ${activeTab === 'userflow' ? 'active' : ''}`} id="tab-userflow">
        <div className="section-title">USER FLOW</div>
        <p className="section-desc">End-to-end journey from first visit to interview ready.</p>

        <div className="flow-section">
          <div className="flow-label">Step 1 — Authentication</div>
          <div className="flow">
            <div className="flow-step"><div className="flow-box"><span className="step-num">01</span>Landing Page</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">02</span>Choose Auth</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">03</span>Google OAuth</div></div>
            <div className="flow-arrow">/</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">03b</span>Email Magic Link</div></div>
            <div className="flow-arrow">/</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">03c</span>Phone OTP</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">04</span>JWT Issued</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">05</span>Dashboard</div></div>
          </div>
        </div>

        <div className="flow-section">
          <div className="flow-label">Step 2 — Conversational Profile Intake</div>
          <div className="flow">
            <div className="flow-step"><div className="flow-box"><span className="step-num">01</span>Target Role</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">02</span>Target Country</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">03</span>Work History</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">04</span>Skills</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">05</span>Education</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">06</span>Certifications</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">07</span>AI Enrichment</div></div>
          </div>
          <div className="alert">
            <span className="alert-icon">💬</span>
            <div>The intake is <strong>conversational via WebSocket</strong> — the AI asks follow-up questions dynamically. For example, if the user says "3 years at Google as SWE", it asks "what was your primary tech stack?" automatically. This is powered by a streaming LLM call using their configured API key.</div>
          </div>
        </div>

        <div className="flow-section">
          <div className="flow-label">Step 3 — Resume Generation</div>
          <div className="flow">
            <div className="flow-step"><div className="flow-box"><span className="step-num">01</span>Profile Ready</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">02</span>Template Select</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">03</span>AI Writes Resume</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">04</span>ATS Score Check</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">05</span>Live Preview</div></div>
            <div className="flow-arrow">→</div>
            <div className="flow-step"><div className="flow-box"><span className="step-num">06</span>PDF Export</div></div>
          </div>
        </div>

        <div className="flow-section">
          <div className="flow-label">Step 4 — Intelligence Dashboard</div>
          <div className="grid-2">
            <div className="card">
              <div className="card-icon orange">💰</div>
              <h3>Salary Intelligence</h3>
              <p>Shows min/median/max package for the role + country combination. Breakdown by company tier (startup vs FAANG vs MNC). Gap analysis: "You're currently at ₹X, market median is ₹Y."</p>
            </div>
            <div className="card">
              <div className="card-icon purple">📈</div>
              <h3>Profile Gap Analysis</h3>
              <p>Compares user's skills against top-hired profiles for target role. Shows: missing skills, certifications that boost hirability, projects to build.</p>
            </div>
          </div>
        </div>

        <div className="flow-section">
          <div className="flow-label">Step 5 — Job Match + Prep</div>
          <div className="grid-2">
            <div className="card">
              <div className="card-icon green">🔍</div>
              <h3>Job Listings with Confidence Score</h3>
              <p>Each job card shows a % confidence score (e.g., "87% match"). Score is computed via: skill overlap vector similarity + experience level fit + location preference + company culture graph match.</p>
            </div>
            <div className="card">
              <div className="card-icon red">🎯</div>
              <h3>Interview Prep Plan</h3>
              <p>Per-job prep plan generated by AI: DSA topics to revise, system design domains to study, behavioral questions to prep, company-specific insider tips from community data.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`section ${activeTab === 'database' ? 'active' : ''}`} id="tab-database">
        <div className="section-title">DATABASE DESIGN</div>
        <p className="section-desc">Three-tier data storage: PostgreSQL for relational integrity, MongoDB for flexible AI-generated documents, Neo4j for career graph.</p>

        <div className="db-label">▶ POSTGRESQL — Relational Core</div>
        <div className="grid-2">
          <div className="schema-box">
            <div className="schema-header">users <span>table</span></div>
            <div className="schema-body">
              <div className="schema-field"><span className="sf-pk">PK</span><span className="sf-name">id</span><span className="sf-type">UUID</span><span className="sf-desc">primary key</span></div>
              <div className="schema-field"><span className="sf-name">email</span><span className="sf-type">TEXT</span><span className="sf-desc">unique, nullable</span></div>
              <div className="schema-field"><span className="sf-name">phone</span><span className="sf-type">TEXT</span><span className="sf-desc">unique, nullable</span></div>
              <div className="schema-field"><span className="sf-name">auth_provider</span><span className="sf-type">ENUM</span><span className="sf-desc">google|email|phone</span></div>
              <div className="schema-field"><span className="sf-name">provider_id</span><span className="sf-type">TEXT</span><span className="sf-desc">external OAuth id</span></div>
              <div className="schema-field"><span className="sf-name">name</span><span className="sf-type">TEXT</span><span className="sf-desc"></span></div>
              <div className="schema-field"><span className="sf-name">avatar_url</span><span className="sf-type">TEXT</span><span className="sf-desc"></span></div>
              <div className="schema-field"><span className="sf-name">created_at</span><span className="sf-type">TIMESTAMPTZ</span><span className="sf-desc"></span></div>
              <div className="schema-field"><span className="sf-name">onboarded</span><span className="sf-type">BOOLEAN</span><span className="sf-desc">profile complete flag</span></div>
            </div>
          </div>
          <div className="schema-box">
            <div className="schema-header">user_api_keys <span>table (encrypted)</span></div>
            <div className="schema-body">
              <div className="schema-field"><span className="sf-pk">PK</span><span className="sf-name">id</span><span className="sf-type">UUID</span><span className="sf-desc"></span></div>
              <div className="schema-field"><span className="sf-pk">FK</span><span className="sf-name">user_id</span><span className="sf-type">UUID</span><span className="sf-desc">→ users.id</span></div>
              <div className="schema-field"><span className="sf-name">provider</span><span className="sf-type">ENUM</span><span className="sf-desc">openai|gemini|anthropic|ollama</span></div>
              <div className="schema-field"><span className="sf-name">encrypted_key</span><span className="sf-type">BYTEA</span><span className="sf-desc">AES-256-GCM encrypted</span></div>
              <div className="schema-field"><span className="sf-name">key_hint</span><span className="sf-type">TEXT</span><span className="sf-desc">last 4 chars for display</span></div>
              <div className="schema-field"><span className="sf-name">model_override</span><span className="sf-type">TEXT</span><span className="sf-desc">e.g. gpt-4o, gemini-2.0</span></div>
              <div className="schema-field"><span className="sf-name">is_active</span><span className="sf-type">BOOLEAN</span><span className="sf-desc">which key to use</span></div>
              <div className="schema-field"><span className="sf-name">created_at</span><span className="sf-type">TIMESTAMPTZ</span><span className="sf-desc"></span></div>
            </div>
          </div>
        </div>

        <div className="db-label">▶ MONGODB — Document Store</div>
        <div className="grid-2">
          <div className="card">
            <h3>📋 profiles collection</h3>
            <div className="code-block">
              <pre>{`// profiles collection
{
  "_id": ObjectId,
  "user_id": "uuid", // ref to PG users
  "target_role": "Senior Backend Engineer",
  "experience_years": 4,
  "work_history": [...],
  "skills": [{ "name": "", "level": "" }],
  "embeddings": [0.12, ...], // 1536-dim
  "last_enriched_at": ISODate
}`}</pre>
            </div>
          </div>
          <div className="card">
            <h3>📝 resumes collection</h3>
            <div className="code-block">
              <pre>{`// resumes collection
{
  "_id": ObjectId,
  "user_id": "uuid",
  "version": 3, // versioned
  "target_role": "...",
  "template_id": "modern-clean",
  "sections": {...},
  "ats_score": 82,
  "pdf_url": "s3://...",
  "created_at": ISODate
}`}</pre>
            </div>
          </div>
        </div>

        <div className="db-label">▶ NEO4J — Career Knowledge Graph</div>
        <div className="wide-card">
          <h3>Graph Node Types & Relationships</h3>
          <div className="code-block">
            <pre>{`// Nodes
(Skill {name, category, demand_score})
(Role {title, level, domain})
(Company {name, size, industry, tier})

// Relationships
(Role)-[REQUIRES]→(Skill)
(Role)-[LEADS_TO]→(Role) // career paths
(Skill)-[COMPLEMENTS]→(Skill)
(Company)-[HIRES_FOR]→(Role)`}</pre>
          </div>
        </div>
      </div>

      <div className={`section ${activeTab === 'ai' ? 'active' : ''}`} id="tab-ai">
        <div className="section-title">AI PIPELINES</div>
        <p className="section-desc">Four distinct AI pipelines, each using the user's configured API key via the LLM Adapter interface.</p>

        <div className="alert">
          <span className="alert-icon">🔑</span>
          <div>All AI calls go through a single <strong>LLM Adapter</strong> interface in Go. At request time, the adapter fetches the user's active API key from the vault, decrypts it, and routes to the appropriate provider (OpenAI / Gemini / Anthropic / Ollama). Zero platform keys are used for inference.</div>
        </div>

        <div className="grid-2">
          <div className="wide-card">
            <h3>🧠 Pipeline 1 — Profile Enrichment</h3>
            <div className="code-block">
              Input:  Raw conversational intake messages<br/>
              Step 1: Extract structured JSON (work, skills, edu)<br/>
              Step 2: Infer implied skills from job titles<br/>
              Step 3: Generate ATS keyword list<br/>
              Step 4: Compute profile embedding<br/>
              Output: Enriched profile doc → MongoDB
            </div>
          </div>
          <div className="wide-card">
            <h3>📄 Pipeline 2 — Resume Generation</h3>
            <div className="code-block">
              Input:  Enriched profile + target role + country<br/>
              Step 1: Pull country-specific resume conventions<br/>
              Step 2: LLM writes each section with STAR format<br/>
              Step 3: ATS keyword injection & scoring<br/>
              Step 4: Render to HTML → Puppeteer → PDF<br/>
              Output: Versioned resume doc + S3 PDF URL
            </div>
          </div>
          <div className="wide-card">
            <h3>💰 Pipeline 3 — Salary Intelligence</h3>
            <div className="code-block">
              Input:  role + country + yoe + company_tier<br/>
              Step 1: Pull cached salary dataset<br/>
              Step 2: LLM synthesizes realistic range estimate<br/>
              Step 3: Breakdown by tier: startup / MNC / FAANG<br/>
              Step 4: Gap analysis: current vs market<br/>
              Output: JSON salary card + suggestions
            </div>
          </div>
          <div className="wide-card">
            <h3>🔍 Pipeline 4 — Job Matching</h3>
            <div className="code-block">
              Input:  User profile embedding + job listings<br/>
              Step 1: Vector cosine similarity (pgvector)<br/>
              Step 2: Graph score: skill coverage<br/>
              Step 3: Experience range fit score<br/>
              Step 4: LLM explains gap in plain English<br/>
              Confidence = 0.5*vector + 0.3*graph + 0.2*exp<br/>
              Output: Ranked job list with scores
            </div>
          </div>
        </div>

        <div className="wide-card">
          <h3>⚙️ LLM Adapter Interface (Go)</h3>
          <div className="code-block">
            <pre>{`type LLMAdapter interface {
  Complete(ctx context.Context, req CompletionRequest) (CompletionResponse, error)
  Stream(ctx context.Context, req CompletionRequest) (<-chan StreamChunk, error)
  Embed(ctx context.Context, text string) ([]float32, error)
}

// Implementations: OpenAIAdapter, GeminiAdapter, AnthropicAdapter, OllamaAdapter
// Selected at runtime based on user's active API key provider`}</pre>
          </div>
        </div>
      </div>

      <div className={`section ${activeTab === 'tech' ? 'active' : ''}`} id="tab-tech">
        <div className="section-title">TECH STACK</div>
        <p className="section-desc">Every technology chosen for a specific reason — no cargo-culting.</p>

        <div className="card">
          <table className="tech-table">
            <thead>
              <tr><th>Layer</th><th>Technology</th><th>Why</th></tr>
            </thead>
            <tbody>
              <tr><td><span className="pill pill-green">Frontend</span></td><td><strong>Next.js 14 + TypeScript</strong></td><td>App Router, RSC, streaming UI, great DX. Vercel deploys in seconds.</td></tr>
              <tr><td><span className="pill pill-green">Realtime</span></td><td><strong>WebSockets</strong></td><td>Low-latency bidirectional for conversational intake + streaming resume.</td></tr>
              <tr><td><span className="pill pill-purple">API</span></td><td><strong>Go + Chi Router</strong></td><td>Fast, low memory, great concurrency for parallel AI calls.</td></tr>
              <tr><td><span className="pill pill-purple">Task Queue</span></td><td><strong>Asynq (Go + Redis)</strong></td><td>Reliable background jobs: profile enrichment, job indexing.</td></tr>
              <tr><td><span className="pill pill-orange">Primary DB</span></td><td><strong>PostgreSQL + pgvector</strong></td><td>Relational integrity for users/auth. pgvector for embedding similarity.</td></tr>
              <tr><td><span className="pill pill-orange">Document DB</span></td><td><strong>MongoDB</strong></td><td>Flexible schema for AI-generated profiles, resumes, job listings.</td></tr>
              <tr><td><span className="pill pill-orange">Graph DB</span></td><td><strong>Neo4j</strong></td><td>Career graph: skills→roles→companies. Cypher queries.</td></tr>
              <tr><td><span className="pill pill-red">Cache</span></td><td><strong>Redis</strong></td><td>Pub/sub for WS fan-out, session cache, rate limiting.</td></tr>
              <tr><td><span className="pill pill-red">PDF</span></td><td><strong>Puppeteer</strong></td><td>Pixel-perfect PDF from HTML templates.</td></tr>
              <tr><td><span className="pill pill-green">File Storage</span></td><td><strong>AWS S3 / Cloudflare R2</strong></td><td>Store generated PDFs and user avatars.</td></tr>
              <tr><td><span className="pill pill-purple">Infra</span></td><td><strong>Docker + GitHub Actions</strong></td><td>Containerized deployment. CI/CD on PR merge.</td></tr>
              <tr><td><span className="pill pill-orange">Monitoring</span></td><td><strong>OpenTelemetry + Grafana</strong></td><td>Traces, metrics, logs. Prometheus for Go runtime.</td></tr>
              <tr><td><span className="pill pill-red">Email</span></td><td><strong>Resend</strong></td><td>Magic link emails. Great developer API.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={`section ${activeTab === 'api' ? 'active' : ''}`} id="tab-api">
        <div className="section-title">API DESIGN</div>
        <p className="section-desc">RESTful API with WebSocket endpoints. Versioned under /api/v1.</p>

        <div className="grid-2">
          <div>
            <div className="api-label">AUTH ENDPOINTS</div>
            <div className="code-block">
              <span className="key">POST</span>  /api/v1/auth/google          <span className="comment">OAuth callback</span><br/>
              <span className="key">POST</span>  /api/v1/auth/email/send      <span className="comment">magic link</span><br/>
              <span className="key">POST</span>  /api/v1/auth/email/verify    <span className="comment">verify token</span><br/>
              <span className="key">POST</span>  /api/v1/auth/phone/send      <span className="comment">OTP via SMS</span><br/>
              <span className="key">POST</span>  /api/v1/auth/phone/verify    <span className="comment">verify OTP</span><br/>
              <span className="key">POST</span>  /api/v1/auth/refresh         <span className="comment">new access token</span><br/>
              <span className="key">DELETE</span> /api/v1/auth/session         <span className="comment">logout</span>
            </div>

            <div className="api-label">PROFILE ENDPOINTS</div>
            <div className="code-block">
              <span className="key">GET</span>    /api/v1/profile              <span className="comment">get my profile</span><br/>
              <span className="key">PUT</span>    /api/v1/profile              <span className="comment">update profile</span><br/>
              <span className="key">POST</span>   /api/v1/profile/enrich       <span className="comment">trigger AI enrichment</span><br/>
              <span className="type">WS</span>     /api/v1/profile/intake       <span className="comment">conversational intake</span>
            </div>

            <div className="api-label">RESUME ENDPOINTS</div>
            <div className="code-block">
              <span className="key">GET</span>    /api/v1/resume               <span className="comment">list my resumes</span><br/>
              <span className="key">POST</span>   /api/v1/resume/generate      <span className="comment">trigger generation</span><br/>
              <span className="key">GET</span>    /api/v1/resume/:id           <span className="comment">get resume</span><br/>
              <span className="key">PUT</span>    /api/v1/resume/:id           <span className="comment">edit sections</span><br/>
              <span className="key">GET</span>    /api/v1/resume/:id/pdf       <span className="comment">download PDF</span><br/>
              <span className="type">WS</span>     /api/v1/resume/stream        <span className="comment">live generation stream</span>
            </div>
          </div>

          <div>
            <div className="api-label">JOBS & MATCHING</div>
            <div className="code-block">
              <span className="key">GET</span>    /api/v1/jobs                 <span className="comment">paginated job list</span><br/>
              <span className="key">GET</span>    /api/v1/jobs/:id             <span className="comment">job detail</span><br/>
              <span className="key">GET</span>    /api/v1/jobs/:id/confidence  <span className="comment">my match score</span><br/>
              <span className="key">POST</span>   /api/v1/jobs/:id/save        <span className="comment">save to tracker</span>
            </div>

            <div className="api-label">SALARY & INSIGHTS</div>
            <div className="code-block">
              <span className="key">GET</span>    /api/v1/salary               <span className="comment">my salary estimate</span><br/>
              <span className="key">GET</span>    /api/v1/insights/gaps        <span className="comment">skill gap analysis</span><br/>
              <span className="key">GET</span>    /api/v1/insights/path        <span className="comment">career path graph</span>
            </div>

            <div className="api-label">PREP PLANS</div>
            <div className="code-block">
              <span className="key">POST</span>   /api/v1/prep                 <span className="comment">generate for job_id</span><br/>
              <span className="key">GET</span>    /api/v1/prep/:id             <span className="comment">get prep plan</span><br/>
              <span className="key">PATCH</span>  /api/v1/prep/:id/progress    <span className="comment">mark topics done</span>
            </div>

            <div className="api-label">SETTINGS & API KEYS</div>
            <div className="code-block">
              <span className="key">GET</span>    /api/v1/settings/keys        <span className="comment">list keys (hints only)</span><br/>
              <span className="key">POST</span>   /api/v1/settings/keys        <span className="comment">add API key</span><br/>
              <span className="key">DELETE</span> /api/v1/settings/keys/:id    <span className="comment">remove key</span><br/>
              <span className="key">POST</span>   /api/v1/settings/keys/:id/activate  <span className="comment">set active</span><br/>
              <span className="key">POST</span>   /api/v1/settings/keys/test   <span className="comment">validate key works</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`section ${activeTab === 'roadmap' ? 'active' : ''}`} id="tab-roadmap">
        <div className="section-title">BUILD ROADMAP</div>
        <p className="section-desc">8-week phased build from zero to a fully working v1.</p>

        <div className="timeline">
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-phase">Week 1–2</div>
            <div className="tl-title">Foundation & Auth</div>
            <ul className="tl-items">
              <li>Go project setup, package structure, DI wiring</li>
              <li>PostgreSQL schema + migrations (golang-migrate)</li>
              <li>JWT auth: Google OAuth + Email magic link + Phone OTP</li>
              <li>Next.js app shell + auth pages + protected routes</li>
              <li>Redis setup + session caching</li>
              <li>Docker Compose for local dev</li>
            </ul>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{background: 'var(--accent2)', boxShadow: '0 0 12px var(--accent2)'}}></div>
            <div className="tl-phase">Week 3</div>
            <div className="tl-title">Settings & API Key Vault</div>
            <ul className="tl-items">
              <li>AES-256-GCM encryption for API key storage</li>
              <li>LLM Adapter interface + implementations</li>
              <li>Settings UI: add/remove/test API keys</li>
              <li>Validate key against provider before saving</li>
            </ul>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{background: 'var(--accent4)', boxShadow: '0 0 12px var(--accent4)'}}></div>
            <div className="tl-phase">Week 4</div>
            <div className="tl-title">Profile Intake & AI Enrichment</div>
            <ul className="tl-items">
              <li>WebSocket conversational intake server</li>
              <li>MongoDB profile schema + repository</li>
              <li>AI enrichment pipeline (Asynq background job)</li>
              <li>Embedding generation + storage</li>
              <li>Profile dashboard UI</li>
            </ul>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{background: 'var(--accent3)', boxShadow: '0 0 12px var(--accent3)'}}></div>
            <div className="tl-phase">Week 5</div>
            <div className="tl-title">Resume Engine</div>
            <ul className="tl-items">
              <li>Resume generation pipeline (streaming LLM)</li>
              <li>HTML resume templates (3 styles)</li>
              <li>Puppeteer PDF rendering</li>
              <li>ATS score calculation</li>
              <li>Resume editor UI with live preview</li>
            </ul>
          </div>
          <div className="tl-item">
            <div className="tl-dot"></div>
            <div className="tl-phase">Week 6</div>
            <div className="tl-title">Job Matching & Salary Intelligence</div>
            <ul className="tl-items">
              <li>Job scraper workers (LinkedIn, Naukri, Indeed)</li>
              <li>Vector similarity matching + confidence</li>
              <li>Neo4j graph seeding</li>
              <li>Salary dataset loading</li>
              <li>Jobs list UI with confidence scores</li>
            </ul>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{background: 'var(--accent2)', boxShadow: '0 0 12px var(--accent2)'}}></div>
            <div className="tl-phase">Week 7</div>
            <div className="tl-title">Prep Planner & Application Tracker</div>
            <ul className="tl-items">
              <li>Per-job prep plan generation</li>
              <li>Prep plan UI with week-by-week view</li>
              <li>Application tracker Kanban board</li>
              <li>Career path visualization</li>
            </ul>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{background: 'var(--accent4)', boxShadow: '0 0 12px var(--accent4)'}}></div>
            <div className="tl-phase">Week 8</div>
            <div className="tl-title">Polish, Security & Deploy</div>
            <ul className="tl-items">
              <li>Rate limiting on AI-calling endpoints</li>
              <li>OpenTelemetry tracing + Grafana</li>
              <li>End-to-end testing</li>
              <li>GitHub Actions CI/CD pipeline</li>
              <li>Production deployment</li>
              <li>OWASP security sweep</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App