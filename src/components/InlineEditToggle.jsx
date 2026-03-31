import { Check, PencilLine } from 'lucide-react'
import { useAppContent } from '../hooks/useAppContent.js'

export function InlineEditToggle() {
  const { isInlineEditing, toggleInlineEditing } = useAppContent()

  return (
    <div className="inline-edit-panel surface-card">
      <button className="ghost-button inline-edit-panel__button" onClick={toggleInlineEditing} type="button">
        {isInlineEditing ? (
          <Check aria-hidden="true" size={16} strokeWidth={2} />
        ) : (
          <PencilLine aria-hidden="true" size={16} strokeWidth={2} />
        )}
        {isInlineEditing ? 'Done Editing' : 'Edit Wording'}
      </button>
      <p>{isInlineEditing ? 'Click any visible title or description to update it.' : 'Turn on edit mode to change wording directly in the app.'}</p>
    </div>
  )
}
