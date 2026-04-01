import { ExternalLink, Star } from 'lucide-react'
import { isEditorEnabled } from '../config/runtime.js'
import { useAppContent } from '../hooks/useAppContent.js'
import { InlineEditableText } from './InlineEditableText.jsx'

function PlaceholderDocument({ resource }) {
  return (
    <div className="document-preview">
      <div className="document-preview__toolbar">
        <span>{resource.type === 'form' ? 'Form Placeholder' : 'Canva / PDF Preview'}</span>
        <span>{resource.status === 'placeholder' ? 'Awaiting final link' : 'Ready to open'}</span>
      </div>

      <div className="document-preview__paper">
        <div className="document-preview__header">
          <span>{resource.category}</span>
          <span>{resource.audience}</span>
        </div>
        <h4>{resource.title}</h4>
        <p className="viewer-card__summary">{resource.summary}</p>
        <ul className="document-preview__list">
          {resource.previewPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PlaceholderForm({ resource }) {
  return (
    <div className="form-preview">
      <div className="form-preview__toolbar">
        <span>Embedded Form</span>
        <span>Submission stays in the source form</span>
      </div>

      <div className="form-preview__paper">
        <div className="form-preview__header">
          <span>{resource.category}</span>
          <span>{resource.audience}</span>
        </div>
        <h4>{resource.title}</h4>
        <p className="viewer-card__summary">{resource.summary}</p>
        <ul className="form-preview__list">
          {resource.fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>

        {resource.ratings?.length ? (
          <div className="rating-grid">
            {resource.ratings.map((rating) => (
              <div key={rating} className="rating-row">
                <span>{rating}</span>
                <span className="stars" aria-label={`${rating} five star scale`}>
                  {[...Array(5)].map((_, index) => (
                    <Star key={`${rating}-${index + 1}`} fill="currentColor" size={15} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function EmbeddedContent({ resource }) {
  if (!resource.resolvedUrl) {
    return resource.type === 'form' ? (
      <PlaceholderForm resource={resource} />
    ) : (
      <PlaceholderDocument resource={resource} />
    )
  }

  return (
    <iframe
      loading="lazy"
      src={resource.resolvedUrl}
      title={resource.title}
    />
  )
}

export function ResourceViewer({ accent = 'teal', compact = false, onSelect, resource }) {
  const { updateResourceField } = useAppContent()

  if (!resource) {
    return null
  }

  const sourceLabel = resource.type === 'form' ? 'Open Full Form' : resource.linkLabel ?? 'Open Source'

  return (
    <article className="viewer-card">
      <div className="viewer-card__header">
        <div className="viewer-card__header-copy">
          <InlineEditableText
            as="h3"
            label={`${resource.title} title`}
            onChange={(value) => updateResourceField(resource.id, 'title', value)}
            value={resource.title}
          />
          <InlineEditableText
            as="p"
            className="viewer-card__summary"
            label={`${resource.title} summary`}
            multiline
            onChange={(value) => updateResourceField(resource.id, 'summary', value)}
            rows={3}
            value={resource.summary}
          />
        </div>

        {compact && onSelect ? (
          <button className="ghost-button" onClick={onSelect} type="button">
            Focus Resource
          </button>
        ) : null}
      </div>

      <div className={`viewer-stage${resource.type === 'form' ? ' viewer-stage--form' : ''}`}>
        <EmbeddedContent resource={resource} />
      </div>

      <div className="viewer-actions">
        <div className="viewer-meta">
          <span className="tag">{resource.category}</span>
          {resource.dayLabel ? <span className="tag">{resource.dayLabel}</span> : null}
          <span className="tag">{resource.audience}</span>
        </div>

        {resource.resolvedUrl ? (
          <a
            className={`link-button link-button--${accent}`}
            href={resource.resolvedUrl}
            rel="noreferrer"
            target="_blank"
          >
            {sourceLabel}
            <ExternalLink aria-hidden="true" size={16} strokeWidth={2} />
          </a>
        ) : (
          <p className="note-text">
            {resource.hasUploadedPdf
              ? isEditorEnabled
                ? 'This viewer is using a PDF uploaded from the admin editor in this browser.'
                : 'This viewer is using a PDF stored on this device.'
              : isEditorEnabled
                ? 'Add a form link, document URL, or uploaded PDF from the admin editor.'
                : 'This resource link is not available yet.'}
          </p>
        )}
      </div>
    </article>
  )
}
