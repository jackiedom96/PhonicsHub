import {
  ArrowRight,
  BookOpenText,
  ClipboardList,
  ChartColumnIncreasing,
  Compass,
  LayoutGrid,
  MessageSquareShare,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContent } from '../hooks/useAppContent.js'

const iconMap = {
  instructional: BookOpenText,
  evaluation: ClipboardList,
  feedback: MessageSquareShare,
}

const accentClass = {
  orange: 'card-icon--orange',
  teal: 'card-icon--teal',
  green: 'card-icon--green',
}

export function HomePage() {
  const { branding, homeCards } = useAppContent()

  return (
    <div className="page home-page">
      <section className="hero-card surface-card home-hero home-hero--enhanced">
        <div className="home-hero__content">
          <div className="home-hero__heading">
            <span className="eyebrow">
              <Sparkles aria-hidden="true" size={16} strokeWidth={2} />
              Professional Oasis
            </span>
            <div className="home-wordmark" aria-label={branding.appName} role="heading">
              <span className="home-wordmark__top">Phonics</span>
              <span className="home-wordmark__bottom">Hub</span>
            </div>
            <p className="subhead">{branding.tagline}</p>
            <p className="subhead route-blurb">{branding.mission}</p>
          </div>
          <div className="home-hero__intro-strip">
            <article className="home-hero__intro-card">
              <span className="home-hero__intro-icon" aria-hidden="true">
                <Compass size={18} strokeWidth={2} />
              </span>
              <div>
                <strong>Start in under a minute</strong>
                <p>Choose a portal, open a form, or search exactly what you need.</p>
              </div>
            </article>
            <article className="home-hero__intro-card">
              <span className="home-hero__intro-icon" aria-hidden="true">
                <LayoutGrid size={18} strokeWidth={2} />
              </span>
              <div>
                <strong>Built for all stakeholders</strong>
                <p>Teachers, mentors, and administration can move across the same hub.</p>
              </div>
            </article>
          </div>

          <div className="hero-actions" style={{ marginTop: '1.4rem' }}>
            <Link className="hero-button" to="/instructional-support">
              Open Instructional Support
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </Link>
            <Link className="hero-button hero-button--accent" to="/search">
              Search Resources
            </Link>
            <Link className="ghost-button" to="/editor">
              Manage Content
            </Link>
          </div>

          <div className="hero-pills">
            <span className="pill pill--teal">Open role switching</span>
            <span className="pill pill--accent">Embedded Microsoft Forms</span>
            <span className="pill pill--green">Visual PDF-style viewers</span>
          </div>
        </div>

        <div className="home-hero__aside">
          <div className="logo-panel">
            <img alt="DLEngage logo" src={branding.logoSrc} />
            <div className="logo-panel__divider" aria-hidden="true" />
            <p className="logo-panel__credit">
              Presented by <strong>DLE Engage</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="home-section-heading">
        <span className="eyebrow">
          <Compass aria-hidden="true" size={16} strokeWidth={2} />
          Start Here
        </span>
        <h2>Everything important is one click away</h2>
        <p>
          The homepage is designed to help you choose the right space quickly without
          guessing where things live.
        </p>
      </section>

      <section className="stat-grid stat-grid--home">
        <article className="surface-card stat-card">
          <h3>Shared Evaluation Portal</h3>
          <p>
            Teachers, mentors, and administration all access evaluation support from one
            shared portal.
          </p>
        </article>
        <article className="surface-card stat-card">
          <h3>Shared Instructional Portal</h3>
          <p>
            Teachers, mentors, and administration all access instructional support from
            one shared portal.
          </p>
        </article>
        <article className="surface-card stat-card stat-card--supportive">
          <h3>Shared Feedback Portal</h3>
          <p>
            Feedback forms, peer snapshots, leadership reflections, and self-reflection
            all stay in one clear place.
          </p>
        </article>
      </section>

      <section className="home-section-heading home-section-heading--compact">
        <span className="eyebrow">
          <LayoutGrid aria-hidden="true" size={16} strokeWidth={2} />
          Main Portals
        </span>
        <h2>Choose the workspace you need today</h2>
        <p>
          Each portal below opens a focused area with shared materials, embedded forms,
          and stakeholder-friendly navigation.
        </p>
      </section>

      <section className="role-grid">
        {homeCards.map((card) => {
          const Icon = iconMap[card.icon] ?? ChartColumnIncreasing

          return (
            <Link
              key={card.id}
              className={`role-card surface-card${
                card.accent ? ` role-card--${card.accent}` : ''
              }`}
              to={card.path}
            >
              <div className="role-card__header">
                <div className={`card-icon ${accentClass[card.accent]}`} aria-hidden="true">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className={`pill ${card.accent === 'orange' ? 'pill--accent' : card.accent === 'green' ? 'pill--green' : 'pill--teal'}`}>
                  {card.title === 'Feedback Form' ? 'Most interactive' : 'Shared workspace'}
                </span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              <div className="viewer-pill-row">
                {card.bullets.map((bullet) => (
                  <span key={bullet} className="tag">
                    {bullet}
                  </span>
                ))}
              </div>
              <span className="role-card__footer">
                <span className="text-link">Open workspace</span>
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </span>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
