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
import { InlineEditableText } from './InlineEditableText.jsx'
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

function FeedbackLaunchCard({ accent, onUpdateResourceField, resource }) {
  const Icon = selectorIconMap[resource.type] ?? FileText
  const href = resource.resolvedUrl || resource.targetUrl || ''
  const { isInlineEditing } = useAppContent()

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
        <InlineEditableText
          as="h3"
          label={`${resource.title} title`}
          onChange={(value) => onUpdateResourceField(resource.id, 'title', value)}
          value={resource.title}
        />
        <InlineEditableText
          as="p"
          label={`${resource.title} summary`}
          multiline
          onChange={(value) => onUpdateResourceField(resource.id, 'summary', value)}
          rows={3}
          value={resource.summary}
        />
        <p className="selector-card__helper">
          {resource.type === 'form'
            ? 'Add a form link in the editor to open it here.'
            : 'Add a resource link in the editor to open it here.'}
        </p>
      </article>
    )
  }

  if (isInlineEditing) {
    return (
      <article className={`selector-card selector-card--${accent} selector-card--editing`}>
        <div className="selector-card__top">
          <div className="selector-card__title-wrap">
            <span className="selector-icon" aria-hidden="true">
              <Icon size={20} strokeWidth={2} />
            </span>
          </div>
          <ExternalLink aria-hidden="true" size={18} strokeWidth={2} />
        </div>
        <InlineEditableText
          as="h3"
          label={`${resource.title} title`}
          onChange={(value) => onUpdateResourceField(resource.id, 'title', value)}
          value={resource.title}
        />
        <InlineEditableText
          as="p"
          label={`${resource.title} summary`}
          multiline
          onChange={(value) => onUpdateResourceField(resource.id, 'summary', value)}
          rows={3}
          value={resource.summary}
        />
        <p className="selector-card__helper">
          {resource.type === 'form'
            ? 'Link stays attached while you edit the wording.'
            : 'Resource link stays attached while you edit the wording.'}
        </p>
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
      <p className="selector-card__helper">
        {resource.type === 'form' ? 'Open Full Form' : resource.linkLabel ?? 'Open Resource'}
      </p>
    </a>
  )
}

function GuidanceLaunchCard({ accent, resource }) {
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
        <p className="selector-card__helper">Add a guidance link to open it here.</p>
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
      <p className="selector-card__helper">{resource.linkLabel ?? 'Open Guidance'}</p>
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
        resourceIds: [],
        resources: [],
      }
      groupsByLabel.set(groupLabel, nextGroup)
      groups.push(nextGroup)
    }

    groupsByLabel.get(groupLabel).resourceIds.push(resource.id)
    groupsByLabel.get(groupLabel).resources.push(resource)
  })

  return groups
}

function getFeedbackGroupToneClass(label) {
  if (label === 'Peer Snapshot') {
    return 'peer'
  }

  if (label === 'Materials Check') {
    return 'materials'
  }

  if (label === 'Multi-Source Feedback System') {
    return 'multi-source'
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

  if (label === 'UFLI Fidelity Checklist') {
    return 'fidelity'
  }

  if (label === 'UFLI Summative Observation Checklist') {
    return 'summative'
  }

  if (label === 'Admin Self-Assessment') {
    return 'admin-self'
  }

  if (label === 'UFLI Observation Notes Checklist') {
    return 'notes'
  }

  if (label === 'Formative Observation') {
    return 'formative'
  }

  if (label === 'Reference Toolkit') {
    return 'reference'
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

  if (label === 'Materials Check') {
    return ClipboardList
  }

  if (label === 'Multi-Source Feedback System') {
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

  if (label === 'UFLI Fidelity Checklist') {
    return FileText
  }

  if (label === 'UFLI Summative Observation Checklist') {
    return ClipboardList
  }

  if (label === 'Admin Self-Assessment') {
    return ClipboardList
  }

  if (label === 'UFLI Observation Notes Checklist') {
    return FileSearch
  }

  if (label === 'Formative Observation') {
    return ShieldCheck
  }

  if (label === 'Reference Toolkit') {
    return Presentation
  }

  if (label === 'Self-Reflection') {
    return FileText
  }

  return FileText
}

function getStakeholderToneClass(portalId, sectionId) {
  if (sectionId === 'teacher-feedback-form') {
    return 'teachers'
  }

  if (
    sectionId === 'mentor-feedback-form' ||
    (portalId === 'evaluationSupport' && sectionId === 'mentor-evaluation-materials')
  ) {
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
  onUpdateResourceField,
  onUpdateResourcesField,
  onResourceChange,
}) {
  if (
    portal.id === 'feedbackForm' ||
    (portal.id === 'instructionalSupport' &&
      activeSection.id === 'instructional-materials' &&
      resources.some((resource) => resource.groupLabel)) ||
    (portal.id === 'evaluationSupport' &&
      (activeSection.id === 'evaluation-materials' ||
        activeSection.id === 'mentor-evaluation-materials') &&
      resources.some((resource) => resource.groupLabel))
  ) {
    const feedbackResources =
      activeSection.type === 'form' ? [activeSection.resource] : resources
    const groupedListClass =
      portal.id === 'evaluationSupport'
        ? 'selector-list selector-list--feedback selector-list--evaluation'
        : 'selector-list selector-list--feedback'

    return (
      <div className={groupedListClass}>
        {groupResources(feedbackResources).map((group) => (
          <div
            key={group.label}
            className={`selector-group selector-group--feedback selector-group--${getFeedbackGroupToneClass(group.label)}`}
          >
            <div className="selector-group__header">
              {(() => {
                const GroupIcon = getFeedbackGroupIcon(group.label)

                return (
                  <span className="selector-group__badge" aria-hidden="true">
                    <GroupIcon size={18} strokeWidth={2} />
                  </span>
                )
              })()}
              <p className="selector-group__label">
                <InlineEditableText
                  as="span"
                  className="selector-group__label-text"
                  label={`${group.label} section label`}
                  onChange={(value) => onUpdateResourcesField(group.resourceIds, 'groupLabel', value)}
                  value={group.label}
                />
                {group.prompt ? (
                  <InlineEditableText
                    as="span"
                    className="selector-group__prompt"
                    label={`${group.label} section prompt`}
                    onChange={(value) => onUpdateResourcesField(group.resourceIds, 'groupPrompt', value)}
                    value={group.prompt}
                  />
                ) : null}
              </p>
            </div>
            <div className="selector-group__items">
              {group.resources.map((resource) => (
                <FeedbackLaunchCard
                  key={resource.id}
                  accent={portal.accent}
                  onUpdateResourceField={onUpdateResourceField}
                  resource={resource}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (portal.id === 'evaluationSupport' && activeSection.id === 'mentor-evaluation-materials') {
    return (
      <div className="selector-list selector-list--feedback">
        {resources.map((resource) => (
          <FeedbackLaunchCard
            key={resource.id}
            accent={portal.accent}
            onUpdateResourceField={onUpdateResourceField}
            resource={resource}
          />
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
  const {
    portals,
    updatePortalField,
    updateResourceField,
    updateResourcesField,
    updateSectionField,
  } = useAppContent()
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
          portal.id === 'feedbackForm'
            ? ' portal-hero--feedback'
            : portal.id === 'instructionalSupport'
              ? ' portal-hero--instructional'
              : portal.id === 'evaluationSupport'
                ? ' portal-hero--evaluation'
              : ''
        }`}
      >
        <div className="portal-hero__top">
          <div>
            <span className="eyebrow">{portal.eyebrow}</span>
            <InlineEditableText
              as="h1"
              className="headline"
              label={`${portal.title} portal title`}
              onChange={(value) => updatePortalField(portal.id, 'title', value)}
              value={portal.title}
            />
            <InlineEditableText
              as="p"
              className="portal-hero__description"
              label={`${portal.title} portal description`}
              multiline
              onChange={(value) => updatePortalField(portal.id, 'description', value)}
              rows={3}
              value={portal.description}
            />
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

      {portal.id === 'feedbackForm' && portal.guidanceResource ? (
        <section className="guidance-shell surface-card">
          <div className="guidance-shell__copy">
            <span className="eyebrow">Guidance</span>
            <h2 className="guidance-shell__title">Multi-Source Guidance</h2>
            <p className="guidance-shell__description">
              Start here before choosing a stakeholder section below.
            </p>
          </div>
          <GuidanceLaunchCard accent={portal.accent} resource={portal.guidanceResource} />
        </section>
      ) : null}

      <section className="nav-shell surface-card">
        <div
          className={`section-nav${
            portal.id === 'evaluationSupport' ? ' section-nav--evaluation' : ''
          }`}
          aria-label={`${portal.title} section navigation`}
        >
          {portal.sections.map((section) => (
            <button
              key={section.id}
              className={`section-nav__button${
                getStakeholderToneClass(portal.id, section.id)
                  ? ` section-nav__button--${getStakeholderToneClass(portal.id, section.id)}`
                  : portal.id === 'evaluationSupport' && section.id === 'mentor-evaluation-materials'
                    ? ' section-nav__button--mentors'
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
            <InlineEditableText
              as="h2"
              className="section-shell__title"
              label={`${portalState.activeSection.label} section title`}
              onChange={(value) =>
                updateSectionField(portal.id, portalState.activeSection.id, 'label', value)
              }
              value={portalState.activeSection.label}
            />
            <InlineEditableText
              as="p"
              className="section-copy"
              label={`${portalState.activeSection.label} section description`}
              multiline
              onChange={(value) =>
                updateSectionField(portal.id, portalState.activeSection.id, 'description', value)
              }
              rows={3}
              value={portalState.activeSection.description}
            />
          </div>
          <div className="viewer-pill-row">
            <InlineEditableText
              as="span"
              className="pill pill--teal"
              label={`${portalState.activeSection.label} section callout`}
              onChange={(value) =>
                updateSectionField(portal.id, portalState.activeSection.id, 'callout', value)
              }
              value={portalState.activeSection.callout}
            />
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
          onUpdateResourceField={updateResourceField}
          onUpdateResourcesField={updateResourcesField}
          onResourceChange={handleResourceChange}
          portal={portal}
          resources={portalState.resources}
        />
      </section>
    </div>
  )
}
