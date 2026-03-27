import {
  ArrowRight,
  BookOpenText,
  ClipboardList,
  ExternalLink,
  FileSearch,
  FileText,
  FormInput,
  Presentation,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useAppContent } from '../hooks/useAppContent.js'
import { ResourceViewer } from './ResourceViewer.jsx'

const iconMap = {
  admin: ShieldCheck,
  teachers: BookOpenText,
  mentors: UsersRound,
}

const selectorIconMap = {
  pdf: FileText,
  form: FormInput,
  placeholder: FileSearch,
  link: Presentation,
}

function getSectionResources(section, activeDay) {
  if (section.type === 'resource-list') {
    return section.resources
  }

  if (section.type === 'day-groups') {
    return activeDay?.resources ?? []
  }

  if (section.type === 'form') {
    return [section.resource]
  }

  if (section.type === 'dual') {
    return [section.reference, section.form]
  }

  return []
}

function resolvePortalState(portal, sectionId, dayId, resourceId) {
  const activeSection =
    portal.sections.find((section) => section.id === sectionId) ?? portal.sections[0]

  const activeDay =
    activeSection.type === 'day-groups'
      ? activeSection.days.find((day) => day.id === dayId) ?? activeSection.days[0]
      : null

  const resources = getSectionResources(activeSection, activeDay)
  const activeResource =
    resources.find((resource) => resource.id === resourceId) ?? resources[0] ?? null

  return { activeSection, activeDay, resources, activeResource }
}

function buildParams(portal, nextSectionId, nextDayId, nextResourceId) {
  const nextState = resolvePortalState(portal, nextSectionId, nextDayId, nextResourceId)
  const params = new URLSearchParams()
  params.set('section', nextState.activeSection.id)

  if (nextState.activeDay) {
    params.set('day', nextState.activeDay.id)
  }

  if (nextState.activeResource) {
    params.set('resource', nextState.activeResource.id)
  }

  return params
}

function SelectorCard({ accent, isActive, onClick, resource }) {
  const Icon = selectorIconMap[resource.type] ?? FileText
  const showFormMeta = resource.type !== 'form'

  return (
    <button
      className={`selector-card selector-card--${accent}${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="selector-card__top">
        <div className="selector-card__title-wrap">
          <span className="selector-icon" aria-hidden="true">
            <Icon size={20} strokeWidth={2} />
          </span>
          {showFormMeta ? (
            <div className="selector-meta">
              <span className={`status-badge status-badge--${resource.status}`}>
                {resource.status === 'placeholder' ? 'Placeholder' : 'Ready'}
              </span>
            </div>
          ) : null}
        </div>
        <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
      </div>
      <h3>{resource.title}</h3>
      <p>{resource.summary}</p>
      {showFormMeta ? (
        <div className="selector-meta">
          <span className="tag">{resource.category}</span>
          {resource.dayLabel ? <span className="tag">{resource.dayLabel}</span> : null}
        </div>
      ) : null}
    </button>
  )
}

function FeedbackLaunchCard({ accent, resource }) {
  const Icon = selectorIconMap[resource.type] ?? FileText
  const href = resource.resolvedUrl || resource.targetUrl || ''

  if (!href) {
    return (
      <article className={`selector-card selector-card--${accent}`}>
        <div className="selector-card__top">
          <div className="selector-card__title-wrap">
            <span className="selector-icon" aria-hidden="true">
              <Icon size={20} strokeWidth={2} />
            </span>
          </div>
        </div>
        <h3>{resource.title}</h3>
        <p>{resource.summary}</p>
        <p className="selector-card__helper">Add a form link in the editor to open it here.</p>
      </article>
    )
  }

  return (
    <a
      className={`selector-card selector-card--${accent} selector-card--launch`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="selector-card__top">
        <div className="selector-card__title-wrap">
          <span className="selector-icon" aria-hidden="true">
            <Icon size={20} strokeWidth={2} />
          </span>
        </div>
        <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
      </div>
      <h3>{resource.title}</h3>
      <p>{resource.summary}</p>
      <p className="selector-card__helper">Open Full Form</p>
    </a>
  )
}

function groupResources(resources) {
  const groups = []
  const groupsByLabel = new Map()

  resources.forEach((resource) => {
    const groupLabel = resource.groupLabel ?? resource.category ?? 'Resources'

    if (!groupsByLabel.has(groupLabel)) {
      const nextGroup = {
        label: groupLabel,
        prompt: resource.groupPrompt ?? '',
        resources: [],
      }
      groupsByLabel.set(groupLabel, nextGroup)
      groups.push(nextGroup)
    }

    groupsByLabel.get(groupLabel).resources.push(resource)
  })

  return groups
}

function getFeedbackGroupToneClass(label) {
  if (label === 'Peer Snapshot') {
    return 'peer'
  }

  if (label === 'Teacher Snapshot') {
    return 'teacher-snapshot'
  }

  if (label === 'Mentor Snapshot') {
    return 'mentor-snapshot'
  }

  if (label === 'Leadership Support') {
    return 'leadership'
  }

  if (label === 'Admin Self-Assessment') {
    return 'admin-self'
  }

  if (label === 'Self-Reflection') {
    return 'self'
  }

  return 'default'
}

function getFeedbackGroupIcon(label) {
  if (label === 'Peer Snapshot') {
    return UsersRound
  }

  if (label === 'Teacher Snapshot') {
    return BookOpenText
  }

  if (label === 'Mentor Snapshot') {
    return UsersRound
  }

  if (label === 'Leadership Support') {
    return ShieldCheck
  }

  if (label === 'Admin Self-Assessment') {
    return ClipboardList
  }

  if (label === 'Self-Reflection') {
    return FileText
  }

  return FileText
}

function getStakeholderToneClass(portalId, sectionId) {
  if (portalId !== 'feedbackForm') {
    return ''
  }

  if (sectionId === 'teacher-feedback-form') {
    return 'teachers'
  }

  if (sectionId === 'mentor-feedback-form') {
    return 'mentors'
  }

  if (sectionId === 'administration-feedback-form') {
    return 'administration'
  }

  return ''
}

function SectionSurface({
  portal,
  activeSection,
  activeDay,
  activeResource,
  resources,
  onDayChange,
  onResourceChange,
}) {
  if (portal.id === 'feedbackForm') {
    const feedbackResources =
      activeSection.type === 'form' ? [activeSection.resource] : resources

    return (
      <div className="selector-list selector-list--feedback">
        {groupResources(feedbackResources).map((group) => (
          <div
            key={group.label}
            className={`selector-group selector-group--feedback selector-group--${getFeedbackGroupToneClass(group.label)}`}
          >
            {(() => {
              const GroupIcon = getFeedbackGroupIcon(group.label)

              return (
                <span className="selector-group__badge" aria-hidden="true">
                  <GroupIcon size={18} strokeWidth={2} />
                </span>
              )
            })()}
            <p className="selector-group__label">
              <span>{group.label}</span>
              {group.prompt ? (
                <span className="selector-group__prompt">{group.prompt}</span>
              ) : null}
            </p>
            <div className="selector-group__items">
              {group.resources.map((resource) => (
                <FeedbackLaunchCard
                  key={resource.id}
                  accent={portal.accent}
                  resource={resource}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (activeSection.type === 'form') {
    return <ResourceViewer accent={portal.accent} resource={activeSection.resource} />
  }

  if (activeSection.type === 'dual') {
    const secondaryResources = resources.filter(
      (resource) => resource.id !== activeResource?.id,
    )

    return (
      <div className="detail-grid">
        <ResourceViewer accent={portal.accent} resource={activeResource} />
        <div className="dual-viewers">
          {secondaryResources.map((resource) => (
            <ResourceViewer
              key={resource.id}
              accent={portal.accent}
              compact
              onSelect={() => onResourceChange(resource.id)}
              resource={resource}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {activeSection.type === 'day-groups' ? (
        <div className="day-nav" aria-label="Evaluation day navigation">
          {activeSection.days.map((day) => (
            <button
              key={day.id}
              className={`day-nav__button${day.id === activeDay?.id ? ' is-active' : ''}`}
              onClick={() => onDayChange(day.id)}
              type="button"
            >
              {day.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="content-panel content-panel--split">
        <div className="selector-list">
          {groupResources(resources).map((group) => (
            <div key={group.label} className="selector-group">
              <p className="selector-group__label">
                <span>{group.label}</span>
                {group.prompt ? (
                  <span className="selector-group__prompt">{group.prompt}</span>
                ) : null}
              </p>
              <div className="selector-group__items">
                {group.resources.map((resource) => (
                  <SelectorCard
                    key={resource.id}
                    accent={portal.accent}
                    isActive={resource.id === activeResource?.id}
                    onClick={() => onResourceChange(resource.id)}
                    resource={resource}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <ResourceViewer accent={portal.accent} resource={activeResource} />
      </div>
    </>
  )
}

export function PortalPage({ portalId }) {
  const { portals } = useAppContent()
  const [searchParams, setSearchParams] = useSearchParams()
  const portal = portals[portalId]

  if (!portal) {
    return null
  }
  const portalState = resolvePortalState(
    portal,
    searchParams.get('section'),
    searchParams.get('day'),
    searchParams.get('resource'),
  )

  const PortalIcon = iconMap[portal.id] ?? ClipboardList
  const sectionQuery = searchParams.get('section')
  const dayQuery = searchParams.get('day')
  const activeToneClass = getStakeholderToneClass(portal.id, portalState.activeSection.id)

  const handleSectionChange = (sectionId) => {
    setSearchParams(buildParams(portal, sectionId))
  }

  const handleDayChange = (dayId) => {
    setSearchParams(
      buildParams(portal, portalState.activeSection.id, dayId),
    )
  }

  const handleResourceChange = (resourceId) => {
    setSearchParams(buildParams(portal, sectionQuery, dayQuery, resourceId))
  }

  return (
    <div className="page portal-layout">
      <section
        className={`hero-card surface-card portal-hero${
          portal.id === 'feedbackForm' ? ' portal-hero--feedback' : ''
        }`}
      >
        <div className="portal-hero__top">
          <div>
            <span className="eyebrow">{portal.eyebrow}</span>
            <h1 className="headline">{portal.title}</h1>
            <p className="portal-hero__description">{portal.description}</p>
          </div>
          <div className="portal-hero__icon" aria-hidden="true">
            <PortalIcon size={32} strokeWidth={1.9} />
          </div>
        </div>

        <div className="portal-highlights">
          {portal.highlights.map((highlight) => (
            <span key={highlight} className="pill">
              {highlight}
            </span>
          ))}
        </div>
      </section>

      <section className="nav-shell surface-card">
        <div className="section-nav" aria-label={`${portal.title} section navigation`}>
          {portal.sections.map((section) => (
            <button
              key={section.id}
              className={`section-nav__button${
                getStakeholderToneClass(portal.id, section.id)
                  ? ` section-nav__button--${getStakeholderToneClass(portal.id, section.id)}`
                  : ''
              }${
                section.id === portalState.activeSection.id ? ' is-active' : ''
              }`}
              onClick={() => handleSectionChange(section.id)}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>
      </section>

      <section
        className={`section-shell surface-card${
          activeToneClass ? ` section-shell--${activeToneClass}` : ''
        }`}
      >
        <div className="section-shell__header">
          <div className="section-shell__copy">
            <p className="section-shell__eyebrow">{portal.title}</p>
            <h2 className="section-shell__title">{portalState.activeSection.label}</h2>
            <p className="section-copy">{portalState.activeSection.description}</p>
          </div>
          <div className="viewer-pill-row">
            <span className="pill pill--teal">{portalState.activeSection.callout}</span>
            {portalState.activeSection.type === 'day-groups' ? (
              <span className="pill pill--accent">Day-based Job Aids</span>
            ) : null}
          </div>
        </div>

        <SectionSurface
          activeDay={portalState.activeDay}
          activeResource={portalState.activeResource}
          activeSection={portalState.activeSection}
          onDayChange={handleDayChange}
          onResourceChange={handleResourceChange}
          portal={portal}
          resources={portalState.resources}
        />
      </section>
    </div>
  )
}
