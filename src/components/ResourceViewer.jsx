import { ExternalLink, Star } from 'lucide-react'

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

export function ResourceViewer({ compact = false, onSelect, resource }) {
  if (!resource) {
    return null
  }

  const sourceLabel = resource.type === 'form' ? 'Open Full Form' : resource.linkLabel ?? 'Open Source'

  return (
    <article className="viewer-card">
      <div className="viewer-card__header">
        <div className="viewer-card__header-copy">
          <h3>{resource.title}</h3>
          <p className="viewer-card__summary">{resource.summary}</p>
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
            className="link-button"
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
              ? 'This viewer is using a PDF uploaded from the admin editor in this browser.'
              : 'Add a form link, document URL, or uploaded PDF from the admin editor.'}
          </p>
        )}
      </div>
    </article>
  )
}
