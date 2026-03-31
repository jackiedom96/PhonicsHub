import { Download, RefreshCcw, Upload } from 'lucide-react'
import { useState } from 'react'
import { useAppContent } from '../hooks/useAppContent.js'

function joinLines(values = []) {
  return values.join('\n')
}

function parseLines(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function collectResourceGroups(resources = []) {
  const groups = []
  const groupsByLabel = new Map()

  resources.forEach((resource) => {
    if (!resource.groupLabel) {
      return
    }

    if (!groupsByLabel.has(resource.groupLabel)) {
      const nextGroup = {
        label: resource.groupLabel,
        prompt: resource.groupPrompt ?? '',
        resourceIds: [resource.id],
      }

      groupsByLabel.set(resource.groupLabel, nextGroup)
      groups.push(nextGroup)
      return
    }

    groupsByLabel.get(resource.groupLabel).resourceIds.push(resource.id)
  })

  return groups
}

function TextField({ label, onChange, placeholder = '', value }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input
        className="editor-input"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value ?? ''}
      />
    </label>
  )
}

function NumberField({ label, onChange, value }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <input
        className="editor-input"
        onChange={(event) => onChange(Number(event.target.value))}
        type="number"
        value={value ?? 0}
      />
    </label>
  )
}

function TextAreaField({ label, onChange, rows = 4, value }) {
  return (
    <label className="editor-field">
      <span>{label}</span>
      <textarea
        className="editor-textarea"
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        value={value ?? ''}
      />
    </label>
  )
}

function ResourceEditor({
  onRemovePdfForResource,
  onUpdateResourceField,
  onUploadPdfForResource,
  resource,
}) {
  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0]

    if (file) {
      await onUploadPdfForResource(resource.id, file)
    }

    event.target.value = ''
  }

  return (
    <details className="editor-accordion editor-accordion--child">
      <summary>
        <span>{resource.title}</span>
        <span className="editor-summary-meta">
          {resource.type === 'form' ? 'Microsoft Form' : 'PDF Resource'}
        </span>
      </summary>

      <div className="editor-grid">
        <TextField
          label="Title"
          onChange={(value) => onUpdateResourceField(resource.id, 'title', value)}
          value={resource.title}
        />
        <TextField
          label="Audience"
          onChange={(value) => onUpdateResourceField(resource.id, 'audience', value)}
          value={resource.audience}
        />
        <TextField
          label="Category"
          onChange={(value) => onUpdateResourceField(resource.id, 'category', value)}
          value={resource.category}
        />
        <TextField
          label={resource.type === 'form' ? 'Microsoft Form URL' : 'PDF or document URL'}
          onChange={(value) => onUpdateResourceField(resource.id, 'targetUrl', value)}
          placeholder={
            resource.type === 'form'
              ? 'Paste the published Microsoft Form URL'
              : 'Paste a PDF, Canva export, or shareable document URL'
          }
          value={resource.targetUrl}
        />

        <TextAreaField
          label="Summary"
          onChange={(value) => onUpdateResourceField(resource.id, 'summary', value)}
          rows={4}
          value={resource.summary}
        />
        <TextAreaField
          label="Preview points (one per line)"
          onChange={(value) =>
            onUpdateResourceField(resource.id, 'previewPoints', parseLines(value))
          }
          rows={4}
          value={joinLines(resource.previewPoints)}
        />
        <TextAreaField
          label="Search keywords (one per line)"
          onChange={(value) =>
            onUpdateResourceField(resource.id, 'keywords', parseLines(value))
          }
          rows={4}
          value={joinLines(resource.keywords)}
        />

        {resource.type === 'form' ? (
          <TextAreaField
            label="Form fields / prompts (one per line)"
            onChange={(value) =>
              onUpdateResourceField(resource.id, 'fields', parseLines(value))
            }
            rows={4}
            value={joinLines(resource.fields)}
          />
        ) : null}

        {resource.ratings?.length ? (
          <TextAreaField
            label="Rating categories (one per line)"
            onChange={(value) =>
              onUpdateResourceField(resource.id, 'ratings', parseLines(value))
            }
            rows={3}
            value={joinLines(resource.ratings)}
          />
        ) : null}
      </div>

      {resource.type === 'pdf' ? (
        <div className="editor-upload-row">
          <label className="editor-upload">
            <Upload aria-hidden="true" size={16} strokeWidth={2} />
            <span>Upload PDF from this device</span>
            <input accept="application/pdf" onChange={handlePdfUpload} type="file" />
          </label>

          {resource.hasUploadedPdf ? (
            <button
              className="editor-danger"
              onClick={() => onRemovePdfForResource(resource.id)}
              type="button"
            >
              Remove uploaded PDF
            </button>
          ) : null}
        </div>
      ) : null}

      <p className="editor-help">
        {resource.hasUploadedPdf
          ? 'An uploaded PDF is currently overriding the URL for this resource in this browser.'
          : 'If you add a URL, the viewer will load it directly. Uploaded PDFs stay local to this browser.'}
      </p>
    </details>
  )
}

function ResourceGroupEditor({ group, onUpdateResourcesField }) {
  return (
    <details className="editor-accordion editor-accordion--child">
      <summary>{group.label}</summary>

      <div className="editor-grid">
        <TextField
          label="Tab name"
          onChange={(value) => onUpdateResourcesField(group.resourceIds, 'groupLabel', value)}
          value={group.label}
        />
        <TextField
          label="Prompt text"
          onChange={(value) => onUpdateResourcesField(group.resourceIds, 'groupPrompt', value)}
          value={group.prompt}
        />
      </div>
    </details>
  )
}

function PortalEditor({
  onRemovePdfForResource,
  onUpdateDayField,
  onUpdatePortalField,
  onUpdateResourceField,
  onUpdateResourcesField,
  onUpdateSectionField,
  onUploadPdfForResource,
  portal,
}) {
  return (
    <details className="editor-accordion">
      <summary>{portal.title}</summary>

      <div className="editor-grid">
        <TextField
          label="Portal title"
          onChange={(value) => onUpdatePortalField(portal.id, 'title', value)}
          value={portal.title}
        />
        <TextField
          label="Eyebrow"
          onChange={(value) => onUpdatePortalField(portal.id, 'eyebrow', value)}
          value={portal.eyebrow}
        />
        <TextAreaField
          label="Portal description"
          onChange={(value) => onUpdatePortalField(portal.id, 'description', value)}
          rows={4}
          value={portal.description}
        />
        <TextAreaField
          label="Highlight pills (one per line)"
          onChange={(value) => onUpdatePortalField(portal.id, 'highlights', parseLines(value))}
          rows={3}
          value={joinLines(portal.highlights)}
        />
      </div>

      <div className="editor-stack">
        {portal.sections.map((section) => (
          <details key={section.id} className="editor-accordion editor-accordion--child">
            <summary>{section.label}</summary>

            <div className="editor-grid">
              <TextField
                label="Section label"
                onChange={(value) =>
                  onUpdateSectionField(portal.id, section.id, 'label', value)
                }
                value={section.label}
              />
              <TextField
                label="Callout pill"
                onChange={(value) =>
                  onUpdateSectionField(portal.id, section.id, 'callout', value)
                }
                value={section.callout}
              />
              <TextAreaField
                label="Section description"
                onChange={(value) =>
                  onUpdateSectionField(portal.id, section.id, 'description', value)
                }
                rows={4}
                value={section.description}
              />
            </div>

            {section.type === 'day-groups' ? (
              <div className="editor-stack">
                {section.days.map((day) => (
                  <details key={day.id} className="editor-accordion editor-accordion--child">
                    <summary>{day.label}</summary>

                    <div className="editor-grid">
                      <TextField
                        label="Day label"
                        onChange={(value) =>
                          onUpdateDayField(portal.id, section.id, day.id, 'label', value)
                        }
                        value={day.label}
                      />
                    </div>

                    <div className="editor-stack">
                      {day.resources.map((resource) => (
                        <ResourceEditor
                          key={resource.id}
                          onRemovePdfForResource={onRemovePdfForResource}
                          onUpdateResourceField={onUpdateResourceField}
                          onUploadPdfForResource={onUploadPdfForResource}
                          resource={resource}
                        />
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            ) : null}

            {section.type === 'resource-list' ? (
              <div className="editor-stack">
                {collectResourceGroups(section.resources).length ? (
                  <details className="editor-accordion editor-accordion--child">
                    <summary>Tab Labels and Prompts</summary>

                    <div className="editor-stack">
                      {collectResourceGroups(section.resources).map((group) => (
                        <ResourceGroupEditor
                          key={group.label}
                          group={group}
                          onUpdateResourcesField={onUpdateResourcesField}
                        />
                      ))}
                    </div>
                  </details>
                ) : null}

                {section.resources.map((resource) => (
                  <ResourceEditor
                    key={resource.id}
                    onRemovePdfForResource={onRemovePdfForResource}
                    onUpdateResourceField={onUpdateResourceField}
                    onUploadPdfForResource={onUploadPdfForResource}
                    resource={resource}
                  />
                ))}
              </div>
            ) : null}

            {section.type === 'form' ? (
              <ResourceEditor
                onRemovePdfForResource={onRemovePdfForResource}
                onUpdateResourceField={onUpdateResourceField}
                onUploadPdfForResource={onUploadPdfForResource}
                resource={section.resource}
              />
            ) : null}

            {section.type === 'dual' ? (
              <div className="editor-stack">
                <ResourceEditor
                  onRemovePdfForResource={onRemovePdfForResource}
                  onUpdateResourceField={onUpdateResourceField}
                  onUploadPdfForResource={onUploadPdfForResource}
                  resource={section.reference}
                />
                <ResourceEditor
                  onRemovePdfForResource={onRemovePdfForResource}
                  onUpdateResourceField={onUpdateResourceField}
                  onUploadPdfForResource={onUploadPdfForResource}
                  resource={section.form}
                />
              </div>
            ) : null}
          </details>
        ))}
      </div>
    </details>
  )
}

export function AdminEditorPanel() {
  const {
    buildNotes,
    content,
    rawContent,
    resetContent,
    updateBrandingField,
    updateHomeCardField,
    updatePortalField,
    updateSectionField,
    updateDayField,
    updateResourceField,
    updateResourcesField,
    uploadPdfForResource,
    removePdfForResource,
  } = useAppContent()
  const [isResetting, setIsResetting] = useState(false)

  const handleExport = () => {
    const exportBlob = new Blob([JSON.stringify(rawContent, null, 2)], {
      type: 'application/json',
    })
    const downloadUrl = URL.createObjectURL(exportBlob)
    const link = document.createElement('a')

    link.href = downloadUrl
    link.download = 'phonics-hub-content.json'
    link.click()

    window.setTimeout(() => {
      URL.revokeObjectURL(downloadUrl)
    }, 0)
  }

  const handleReset = async () => {
    setIsResetting(true)

    try {
      await resetContent()
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <section className="surface-card admin-editor">
      <div className="admin-editor__header">
        <div>
          <p className="section-shell__eyebrow">Admin Content Manager</p>
          <h2 className="section-shell__title">Edit the app from inside the app</h2>
          <p className="section-copy">{buildNotes}</p>
        </div>

        <div className="admin-editor__actions">
          <button className="ghost-button" onClick={handleExport} type="button">
            <Download aria-hidden="true" size={16} strokeWidth={2} />
            Download Settings
          </button>
          <button
            className="ghost-button"
            disabled={isResetting}
            onClick={handleReset}
            type="button"
          >
            <RefreshCcw aria-hidden="true" size={16} strokeWidth={2} />
            {isResetting ? 'Resetting...' : 'Restore Defaults'}
          </button>
        </div>
      </div>

      <div className="editor-stack">
        <details className="editor-accordion" open>
          <summary>Branding and Home Screen</summary>

          <div className="editor-grid">
            <TextField
              label="App name"
              onChange={(value) => updateBrandingField('appName', value)}
              value={content.branding.appName}
            />
            <NumberField
              label="DLE logo width (px)"
              onChange={(value) => updateBrandingField('logoWidth', value)}
              value={content.branding.logoWidth}
            />
            <NumberField
              label="DLE box vertical position (px)"
              onChange={(value) => updateBrandingField('logoPanelOffsetY', value)}
              value={content.branding.logoPanelOffsetY}
            />
            <NumberField
              label="DLE logo vertical position (px)"
              onChange={(value) => updateBrandingField('logoOffsetY', value)}
              value={content.branding.logoOffsetY}
            />
            <TextField
              label="Tagline"
              onChange={(value) => updateBrandingField('tagline', value)}
              value={content.branding.tagline}
            />
            <TextAreaField
              label="Mission / intro"
              onChange={(value) => updateBrandingField('mission', value)}
              rows={4}
              value={content.branding.mission}
            />
          </div>

          <div className="editor-stack">
            {content.homeCards.map((card) => (
              <details key={card.id} className="editor-accordion editor-accordion--child">
                <summary>{card.title}</summary>

                <div className="editor-grid">
                  <TextField
                    label="Card title"
                    onChange={(value) => updateHomeCardField(card.id, 'title', value)}
                    value={card.title}
                  />
                  <TextAreaField
                    label="Card summary"
                    onChange={(value) => updateHomeCardField(card.id, 'summary', value)}
                    rows={4}
                    value={card.summary}
                  />
                  <TextAreaField
                    label="Card bullets (one per line)"
                    onChange={(value) =>
                      updateHomeCardField(card.id, 'bullets', parseLines(value))
                    }
                    rows={4}
                    value={joinLines(card.bullets)}
                  />
                </div>
              </details>
            ))}
          </div>
        </details>

        {Object.values(content.portals).map((portal) => (
          <PortalEditor
            key={portal.id}
            onRemovePdfForResource={removePdfForResource}
            onUpdateDayField={updateDayField}
            onUpdatePortalField={updatePortalField}
            onUpdateResourceField={updateResourceField}
            onUpdateResourcesField={updateResourcesField}
            onUpdateSectionField={updateSectionField}
            onUploadPdfForResource={uploadPdfForResource}
            portal={portal}
          />
        ))}
      </div>
    </section>
  )
}
