import { createElement, useId } from 'react'
import { useAppContent } from '../hooks/useAppContent.js'

export function InlineEditableText({
  as = 'span',
  className = '',
  label,
  multiline = false,
  onChange,
  placeholder = '',
  rows = 3,
  value,
}) {
  const { isInlineEditing } = useAppContent()
  const fieldId = useId()

  if (!isInlineEditing) {
    return createElement(as, { className }, value)
  }

  return createElement(
    as,
    { className: `${className} inline-editable inline-editable--active`.trim() },
    (
      <label className="inline-editable__control" htmlFor={fieldId}>
        <span className="sr-only">{label}</span>
        {multiline ? (
          <textarea
            id={fieldId}
            className="inline-editable__field inline-editable__field--multiline"
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            rows={rows}
            value={value ?? ''}
          />
        ) : (
          <input
            id={fieldId}
            className="inline-editable__field"
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            type="text"
            value={value ?? ''}
          />
        )}
      </label>
    ),
  )
}
