import { useEffect, useRef, useState } from 'react'
import {
  buildFeaturedSearches,
  buildSearchIndex,
  createInitialAppContent,
} from '../data/content.js'
import { AppContentContext } from './appContentContext.js'
import {
  clearPdfAssets,
  deletePdfAsset,
  listPdfAssets,
  savePdfAsset,
} from '../lib/pdfAssetStore.js'

const STORAGE_KEY = 'phonics-hub-content-v6'

const SELF_REFLECTION_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUNDBBT1ZUOTg3VElZQ0xUSTUyRDNKRURETC4u'
const MENTOR_PEER_SNAPSHOT_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUM1Y1RFY3NUxMUTNMTllQWktLS1FORzdGMS4u'
const MENTOR_LEADERSHIP_SUPPORT_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQlIyUzhBSFZCWVBONzhRRVFQWUM1SjlWMi4u'

function migrateLegacyResource(resource) {
  if (resource.id === 'administration-feedback-form-teacher-snapshot') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Administration Feedback Form'
          ? 'Teacher Snapshot Form'
          : resource.title,
      category:
        !resource.category || resource.category === 'Feedback Form'
          ? 'Teacher Snapshot'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'Feedback Form'
          ? 'Teacher Snapshot'
          : resource.groupLabel,
      summary:
        !resource.summary ||
        resource.summary ===
          'An administration-facing form placeholder for leadership feedback, communication, wins, and next steps.'
          ? 'Use this section for administration feedback connected to teacher observations and classroom snapshots.'
          : resource.summary,
    }
  }

  if (resource.id === 'teacher-feedback-form-self-reflection') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Self-Reflection'
          ? 'Teacher Self-Reflection Form'
          : resource.title,
      summary:
        !resource.summary || resource.summary === 'Teachers reflecting on their own teaching.'
          ? 'UFLI Day 1 self-reflection for teachers reflecting on their own teaching.'
          : resource.summary,
      targetUrl: resource.targetUrl || SELF_REFLECTION_FORM_URL,
    }
  }

  if (resource.id === 'mentor-feedback-form-peer-snapshot') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Mentor Feedback Form'
          ? 'Mentor Peer Snapshot Form'
          : resource.title,
      category:
        !resource.category || resource.category === 'Feedback Form'
          ? 'Peer Snapshot'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'Feedback Form'
          ? 'Peer Snapshot'
          : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt ? 'What did I see in my colleague?' : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'A mentor-facing form placeholder for feedback, communication, wins, and next steps.'
          ? 'Mentors observing others. Use this section to capture what was observed and what stands out.'
          : resource.summary,
      targetUrl: resource.targetUrl || MENTOR_PEER_SNAPSHOT_FORM_URL,
    }
  }

  if (resource.id === 'mentor-feedback-form-leadership-support') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Mentor Feedback Form'
          ? 'Mentor Leadership Support Form'
          : resource.title,
      category:
        !resource.category || resource.category === 'Feedback Form'
          ? 'Leadership Support'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'Feedback Form'
          ? 'Leadership Support'
          : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt
          ? "Was the admin's observation helpful or accurate?"
          : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'A mentor-facing form placeholder for feedback, communication, wins, and next steps.'
          ? 'Mentors providing feedback connected to leadership support and observation accuracy.'
          : resource.summary,
      targetUrl: resource.targetUrl || MENTOR_LEADERSHIP_SUPPORT_FORM_URL,
    }
  }

  return resource
}

function mergeResource(defaultResource, storedResource) {
  if (!storedResource) {
    return migrateLegacyResource(defaultResource)
  }

  return migrateLegacyResource({
    ...defaultResource,
    ...storedResource,
  })
}

function mergeResources(defaultResources = [], storedResources = []) {
  const storedById = new Map(storedResources.map((resource) => [resource.id, resource]))

  return defaultResources.map((resource) =>
    mergeResource(resource, storedById.get(resource.id)),
  )
}

function mergeSection(defaultSection, storedSection) {
  if (!storedSection) {
    return defaultSection
  }

  const shouldPreferDefaultCopy =
    defaultSection.id === 'administration-feedback-form' && storedSection.type === 'form'

  const mergedSection = {
    ...defaultSection,
    ...storedSection,
    ...(shouldPreferDefaultCopy
      ? {
          callout: defaultSection.callout,
          description: defaultSection.description,
        }
      : {}),
  }

  if (defaultSection.type === 'resource-list') {
    const storedResources =
      storedSection.resources ??
      (storedSection.resource && defaultSection.resources[0]
        ? [{ ...storedSection.resource, id: defaultSection.resources[0].id }]
        : [])

    return {
      ...mergedSection,
      type: defaultSection.type,
      resources: mergeResources(defaultSection.resources, storedResources),
    }
  }

  if (defaultSection.type === 'day-groups') {
    const storedDaysById = new Map((storedSection.days ?? []).map((day) => [day.id, day]))

    return {
      ...mergedSection,
      type: defaultSection.type,
      days: defaultSection.days.map((day) => {
        const storedDay = storedDaysById.get(day.id)

        if (!storedDay) {
          return day
        }

        return {
          ...day,
          ...storedDay,
          resources: mergeResources(day.resources, storedDay.resources),
        }
      }),
    }
  }

  if (defaultSection.type === 'form') {
    return {
      ...mergedSection,
      type: defaultSection.type,
      resource: mergeResource(defaultSection.resource, storedSection.resource),
    }
  }

  if (defaultSection.type === 'dual') {
    return {
      ...mergedSection,
      type: defaultSection.type,
      reference: mergeResource(defaultSection.reference, storedSection.reference),
      form: mergeResource(defaultSection.form, storedSection.form),
    }
  }

  return mergedSection
}

function mergePortal(defaultPortal, storedPortal) {
  if (!storedPortal) {
    return defaultPortal
  }

  const storedSectionsById = new Map(
    (storedPortal.sections ?? []).map((section) => [section.id, section]),
  )

  return {
    ...defaultPortal,
    ...storedPortal,
    sections: defaultPortal.sections.map((section) =>
      mergeSection(section, storedSectionsById.get(section.id)),
    ),
  }
}

function mergeStoredContent(defaultContent, storedContent) {
  if (!storedContent) {
    return defaultContent
  }

  const storedHomeCardsById = new Map(
    (storedContent.homeCards ?? []).map((card) => [card.id, card]),
  )
  const portalEntries = Object.entries(defaultContent.portals).map(([portalId, portal]) => [
    portalId,
    mergePortal(portal, storedContent.portals?.[portalId]),
  ])

  return {
    ...defaultContent,
    ...storedContent,
    branding: {
      ...defaultContent.branding,
      ...storedContent.branding,
    },
    homeCards: defaultContent.homeCards.map((card) => ({
      ...card,
      ...(storedHomeCardsById.get(card.id) ?? {}),
    })),
    portals: Object.fromEntries(portalEntries),
  }
}

function loadStoredContent() {
  const defaultContent = createInitialAppContent()

  if (typeof window === 'undefined') {
    return defaultContent
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return defaultContent
    }

    return mergeStoredContent(defaultContent, JSON.parse(storedValue))
  } catch {
    return defaultContent
  }
}

function hydrateResource(resource, pdfAssetUrls) {
  const uploadedPdfUrl = resource.type === 'pdf' ? pdfAssetUrls[resource.id] ?? '' : ''
  const resolvedUrl = uploadedPdfUrl || resource.targetUrl || ''

  return {
    ...resource,
    hasUploadedPdf: Boolean(uploadedPdfUrl),
    resolvedUrl,
    status: resolvedUrl ? 'ready' : 'placeholder',
  }
}

function hydrateSection(section, pdfAssetUrls) {
  if (section.type === 'resource-list') {
    return {
      ...section,
      resources: section.resources.map((resource) =>
        hydrateResource(resource, pdfAssetUrls),
      ),
    }
  }

  if (section.type === 'day-groups') {
    return {
      ...section,
      days: section.days.map((day) => ({
        ...day,
        resources: day.resources.map((resource) =>
          hydrateResource(resource, pdfAssetUrls),
        ),
      })),
    }
  }

  if (section.type === 'form') {
    return {
      ...section,
      resource: hydrateResource(section.resource, pdfAssetUrls),
    }
  }

  if (section.type === 'dual') {
    return {
      ...section,
      reference: hydrateResource(section.reference, pdfAssetUrls),
      form: hydrateResource(section.form, pdfAssetUrls),
    }
  }

  return section
}

function hydrateContent(content, pdfAssetUrls) {
  return {
    ...content,
    portals: Object.fromEntries(
      Object.entries(content.portals).map(([portalId, portal]) => [
        portalId,
        {
          ...portal,
          sections: portal.sections.map((section) =>
            hydrateSection(section, pdfAssetUrls),
          ),
        },
      ]),
    ),
  }
}

function mapResourcesInSection(section, updater) {
  if (section.type === 'resource-list') {
    return {
      ...section,
      resources: section.resources.map((resource) => updater(resource)),
    }
  }

  if (section.type === 'day-groups') {
    return {
      ...section,
      days: section.days.map((day) => ({
        ...day,
        resources: day.resources.map((resource) => updater(resource)),
      })),
    }
  }

  if (section.type === 'form') {
    return {
      ...section,
      resource: updater(section.resource),
    }
  }

  if (section.type === 'dual') {
    return {
      ...section,
      reference: updater(section.reference),
      form: updater(section.form),
    }
  }

  return section
}

function updateResourceTree(currentContent, resourceId, field, value) {
  return {
    ...currentContent,
    portals: Object.fromEntries(
      Object.entries(currentContent.portals).map(([portalId, portal]) => [
        portalId,
        {
          ...portal,
          sections: portal.sections.map((section) =>
            mapResourcesInSection(section, (resource) =>
              resource.id === resourceId ? { ...resource, [field]: value } : resource,
            ),
          ),
        },
      ]),
    ),
  }
}

function updateResourcesTree(currentContent, resourceIds, field, value) {
  const resourceIdSet = new Set(resourceIds)

  return {
    ...currentContent,
    portals: Object.fromEntries(
      Object.entries(currentContent.portals).map(([portalId, portal]) => [
        portalId,
        {
          ...portal,
          sections: portal.sections.map((section) =>
            mapResourcesInSection(section, (resource) =>
              resourceIdSet.has(resource.id) ? { ...resource, [field]: value } : resource,
            ),
          ),
        },
      ]),
    ),
  }
}

export function AppContentProvider({ children }) {
  const [content, setContent] = useState(loadStoredContent)
  const [pdfAssetUrls, setPdfAssetUrls] = useState({})
  const pdfAssetUrlsRef = useRef({})

  useEffect(() => {
    pdfAssetUrlsRef.current = pdfAssetUrls
  }, [pdfAssetUrls])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  useEffect(() => {
    let isMounted = true

    async function loadPdfAssetUrls() {
      const records = await listPdfAssets()
      const nextUrls = {}

      records.forEach((record) => {
        nextUrls[record.id] = URL.createObjectURL(record.blob)
      })

      if (!isMounted) {
        Object.values(nextUrls).forEach((url) => URL.revokeObjectURL(url))
        return
      }

      setPdfAssetUrls(nextUrls)
    }

    loadPdfAssetUrls().catch(() => {})

    return () => {
      isMounted = false
      Object.values(pdfAssetUrlsRef.current).forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  const hydratedContent = hydrateContent(content, pdfAssetUrls)

  const updateBrandingField = (field, value) => {
    setContent((currentContent) => ({
      ...currentContent,
      branding: {
        ...currentContent.branding,
        [field]: value,
      },
    }))
  }

  const updateHomeCardField = (cardId, field, value) => {
    setContent((currentContent) => ({
      ...currentContent,
      homeCards: currentContent.homeCards.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card,
      ),
    }))
  }

  const updatePortalField = (portalId, field, value) => {
    setContent((currentContent) => ({
      ...currentContent,
      portals: {
        ...currentContent.portals,
        [portalId]: {
          ...currentContent.portals[portalId],
          [field]: value,
        },
      },
    }))
  }

  const updateSectionField = (portalId, sectionId, field, value) => {
    setContent((currentContent) => ({
      ...currentContent,
      portals: {
        ...currentContent.portals,
        [portalId]: {
          ...currentContent.portals[portalId],
          sections: currentContent.portals[portalId].sections.map((section) =>
            section.id === sectionId ? { ...section, [field]: value } : section,
          ),
        },
      },
    }))
  }

  const updateDayField = (portalId, sectionId, dayId, field, value) => {
    setContent((currentContent) => ({
      ...currentContent,
      portals: {
        ...currentContent.portals,
        [portalId]: {
          ...currentContent.portals[portalId],
          sections: currentContent.portals[portalId].sections.map((section) => {
            if (section.id !== sectionId || section.type !== 'day-groups') {
              return section
            }

            return {
              ...section,
              days: section.days.map((day) =>
                day.id === dayId ? { ...day, [field]: value } : day,
              ),
            }
          }),
        },
      },
    }))
  }

  const updateResourceField = (resourceId, field, value) => {
    setContent((currentContent) =>
      updateResourceTree(currentContent, resourceId, field, value),
    )
  }

  const updateResourcesField = (resourceIds, field, value) => {
    setContent((currentContent) =>
      updateResourcesTree(currentContent, resourceIds, field, value),
    )
  }

  const uploadPdfForResource = async (resourceId, file) => {
    if (!file) {
      return
    }

    await savePdfAsset(resourceId, file)

    setPdfAssetUrls((currentUrls) => {
      const nextUrls = { ...currentUrls }

      if (nextUrls[resourceId]) {
        URL.revokeObjectURL(nextUrls[resourceId])
      }

      nextUrls[resourceId] = URL.createObjectURL(file)
      return nextUrls
    })
  }

  const removePdfForResource = async (resourceId) => {
    await deletePdfAsset(resourceId)

    setPdfAssetUrls((currentUrls) => {
      if (!currentUrls[resourceId]) {
        return currentUrls
      }

      const nextUrls = { ...currentUrls }
      URL.revokeObjectURL(nextUrls[resourceId])
      delete nextUrls[resourceId]
      return nextUrls
    })
  }

  const resetContent = async () => {
    await clearPdfAssets()
    Object.values(pdfAssetUrlsRef.current).forEach((url) => URL.revokeObjectURL(url))
    setPdfAssetUrls({})
    setContent(createInitialAppContent())
    window.localStorage.removeItem(STORAGE_KEY)
  }

  const contextValue = {
    branding: hydratedContent.branding,
    buildNotes:
      'Changes save automatically in this browser. Uploaded PDFs stay local to this device unless you also add a shareable URL.',
    content: hydratedContent,
    featuredSearches: buildFeaturedSearches(hydratedContent),
    homeCards: hydratedContent.homeCards,
    portals: hydratedContent.portals,
    rawContent: content,
    resetContent,
    searchIndex: buildSearchIndex(hydratedContent),
    updateBrandingField,
    updateDayField,
    updateHomeCardField,
    updatePortalField,
    updateResourceField,
    updateResourcesField,
    updateSectionField,
    uploadPdfForResource,
    removePdfForResource,
  }

  return (
    <AppContentContext.Provider value={contextValue}>
      {children}
    </AppContentContext.Provider>
  )
}
