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
import { isEditorEnabled } from '../config/runtime.js'

const SELF_REFLECTION_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUNDBBT1ZUOTg3VElZQ0xUSTUyRDNKRURETC4u'
const MENTOR_PEER_SNAPSHOT_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUM1Y1RFY3NUxMUTNMTllQWktLS1FORzdGMS4u'
const MENTOR_LEADERSHIP_SUPPORT_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQlIyUzhBSFZCWVBONzhRRVFQWUM1SjlWMi4u'
const MENTOR_SELF_REFLECTION_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQjdBME9OV1pQMlRQSTA0UlQwUlhKR0RVUi4u'
const ADMIN_MENTOR_SNAPSHOT_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUM1Y1RFY3NUxMUTNMTllQWktLS1FORzdGMS4u'
const ADMIN_TEACHER_SNAPSHOT_DAY_1_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQ0JWOEtGMFdRSTZIU1hKRllWUkEzTTlWVi4u'
const ADMIN_TEACHER_SNAPSHOT_DAY_2_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQ1VXWlI3V1c4REs0TFJEMzJYNEZWMkVWTy4u'
const ADMIN_SELF_ASSESSMENT_FORM_URL =
  'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUMVFVTTVQRE9SRE9GTERCSFlSRzAzMzZRQi4u'
const INSTRUCTIONAL_MATERIALS_DAY_1_URL =
  'https://www.canva.com/design/DAHEn2X8Qig/TATL7KzmALauZa0UvU0GwQ/edit?utm_content=DAHEn2X8Qig&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const UFLI_DAY_1_FIDELITY_CHECKLIST_URL =
  'https://www.canva.com/design/DAHElpQVjoM/x7yqENsNCqqqxJD51vu8Wg/edit?utm_content=DAHElpQVjoM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const INSTRUCTIONAL_MATERIALS_DAY_2_URL =
  'https://www.canva.com/design/DAHEsUMkZyw/fBtpKjGhgO0X2MrRLwcmqQ/edit?utm_content=DAHEsUMkZyw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const UFLI_DAY_2_FIDELITY_CHECKLIST_URL =
  'https://www.canva.com/design/DAHEocMNPjw/lExaCClFLqhoEaNlcXEp9g/edit?utm_content=DAHEocMNPjw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const EVALUATION_SUPPORT_JOB_AID_URL =
  'https://www.canva.com/design/DAHEZ0qxLXs/xZJmEybblBCBLZ-80KGruQ/edit?utm_content=DAHEZ0qxLXs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const UFLI_SUMMATIVE_OBSERVATION_CHECKLIST_URL =
  'https://www.canva.com/design/DAHEZxojatw/256iqWJhgkUGZgyebyrsQA/edit?utm_content=DAHEZxojatw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const UFLI_FIDELITY_OBSERVATION_LOG_URL =
  'https://www.canva.com/design/DAHFSHoi4zo/YU1IViFHIEty4FIYXbaBkw/edit?utm_content=DAHFSHoi4zo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const MENTOR_EVALUATION_SUPPORT_URL =
  'https://www.canva.com/design/DAHEszUCQ_w/NUvP2vak3JbYo4geC9syPA/edit?utm_content=DAHEszUCQ_w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const RESPONSE_METHODS_URL =
  'https://www.canva.com/design/DAHEcW_e2HE/uOekkUXoN3vbA-zkdv9bcw/edit?utm_content=DAHEcW_e2HE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const HIGH_FREQUENCY_WORDS_URL =
  'https://www.canva.com/design/DAHEZgXCH28/KIKGkDI8kRj9IkWRCHIrVw/edit?utm_content=DAHEZgXCH28&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
const WORD_CHAIN_TEMPLATES_URL =
  'https://www.canva.com/design/DAHEZrR7Eh4/xn0ZCUlVuRRxV-2toAu_Tw/edit?utm_content=DAHEZrR7Eh4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'

function migrateLegacyResource(resource) {
  if (resource.id === 'shared-evaluation-job-aid') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Evaluation Support Job Aid'
          ? 'Multi-Source Feedback System'
          : resource.title,
      groupLabel:
        !resource.groupLabel ? 'Multi-Source Feedback System' : resource.groupLabel,
      summary:
        !resource.summary ||
        resource.summary ===
          'A shared evaluation support resource placeholder for your Canva-based materials, observation guidance, and reference documents.'
          ? 'Use this section for the multi-source feedback system and related evaluation guidance.'
          : resource.summary,
      targetUrl: resource.targetUrl || EVALUATION_SUPPORT_JOB_AID_URL,
    }
  }

  if (resource.id === 'shared-evaluation-checklist') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Evaluation Observation Checklist'
          ? 'UFLI Summative Observation Checklist'
          : resource.title,
      groupLabel:
        !resource.groupLabel ? 'UFLI Summative Observation Checklist' : resource.groupLabel,
      summary:
        !resource.summary ||
        resource.summary ===
          'A shared checklist and observation support placeholder for walkthroughs, look-fors, and reference documents.'
          ? 'Use this section for the UFLI summative observation checklist.'
          : resource.summary,
      targetUrl: resource.targetUrl || UFLI_SUMMATIVE_OBSERVATION_CHECKLIST_URL,
    }
  }

  if (resource.id === 'evaluation-observation-notes-checklist') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'UFLI Observation Notes Checklist'
          ? 'UFLI Fidelity Observation Log: Day 1 and 2'
          : resource.title,
      groupLabel:
        !resource.groupLabel ? 'UFLI Observation Notes Checklist' : resource.groupLabel,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for UFLI observation notes and checklist documentation.'
          ? 'Use this section for the UFLI fidelity observation log for Day 1 and Day 2.'
          : resource.summary,
      targetUrl: resource.targetUrl || UFLI_FIDELITY_OBSERVATION_LOG_URL,
    }
  }

  if (resource.id === 'mentor-evaluation-placeholder') {
    return {
      ...resource,
      title:
        !resource.title ? 'Mentor Evaluation Support' : resource.title,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for mentor-only evaluation resources. Add a Canva or form link here when you are ready.'
          ? 'Use this section for mentor-only evaluation resources.'
          : resource.summary,
      type: resource.type === 'placeholder' ? 'link' : resource.type,
      targetUrl: resource.targetUrl || MENTOR_EVALUATION_SUPPORT_URL,
    }
  }

  if (resource.id === 'daily-guide-day-1-materials-check') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Instructional Materials Check'
          ? 'Instructional Materials Check (Day 1)'
          : resource.title,
      category:
        !resource.category ? 'Daily Guide Day 1' : resource.category,
      groupLabel: !resource.groupLabel ? 'Materials Check' : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt ? 'Do I have my tools?' : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for the instructional materials check. Add your Canva link here for teachers to quickly confirm their Day 1 materials.'
          ? 'Use this section for the instructional materials check. Add your Canva link here for teachers to quickly confirm their Day 1 materials.'
          : resource.summary,
      targetUrl: resource.targetUrl || INSTRUCTIONAL_MATERIALS_DAY_1_URL,
    }
  }

  if (resource.id === 'daily-guide-day-1-fidelity-checklist') {
    return {
      ...resource,
      title:
        !resource.title ||
        resource.title === 'U5 Fidelity Checklist A1' ||
        resource.title === 'UFLI Fidelity Checklist Day 1'
          ? 'UFLI Fidelity Checklist Day 1'
          : resource.title,
      category:
        !resource.category ? 'Daily Guide Day 1' : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'UFLI Fidelity Checklist Day 1'
          ? 'UFLI Fidelity Checklist'
          : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt
          ? 'Am I following the lesson steps with fidelity?'
          : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for the Day 1 UFLI fidelity checklist. Add your Canva link here so teachers can quickly check alignment to the lesson.'
          ? 'Use this section for the Day 1 UFLI fidelity checklist. Add your Canva link here so teachers can quickly check alignment to the lesson.'
          : resource.summary,
      targetUrl: resource.targetUrl || UFLI_DAY_1_FIDELITY_CHECKLIST_URL,
    }
  }

  if (resource.id === 'daily-guide-day-2-fidelity-checklist') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'UFLI Fidelity Checklist'
          ? 'UFLI Fidelity Checklist Day 2'
          : resource.title,
      category:
        !resource.category || resource.category === 'Daily Guide Day 1'
          ? 'Daily Guide Day 2'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'UFLI Fidelity Checklist Day 1'
          ? 'UFLI Fidelity Checklist'
          : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt
          ? 'Am I following the lesson steps with fidelity?'
          : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for the Day 2 UFLI fidelity checklist. Add your Canva link here so teachers can quickly check alignment to the lesson.'
          ? 'Use this section for the Day 2 UFLI fidelity checklist. Add your Canva link here so teachers can quickly check alignment to the lesson.'
          : resource.summary,
      targetUrl: resource.targetUrl || UFLI_DAY_2_FIDELITY_CHECKLIST_URL,
    }
  }

  if (resource.id === 'daily-guide-day-1-reference-toolkit') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Reference Toolkit'
          ? 'Response Methods'
          : resource.title,
      groupLabel: !resource.groupLabel ? 'Reference Toolkit' : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt
          ? 'How do I handle a specific step in the UFLI?'
          : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for posters, templates, and reference tools that support specific UFLI steps during Day 1 instruction.'
          ? 'Use this section for response methods that support specific UFLI steps during Day 1 instruction.'
          : resource.summary,
      targetUrl: resource.targetUrl || RESPONSE_METHODS_URL,
    }
  }

  if (resource.id === 'daily-guide-day-1-high-frequency-words') {
    return {
      ...resource,
      title: 'High-Frequency Words Routine ❤️',
      groupLabel: !resource.groupLabel ? 'Reference Toolkit' : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt
          ? 'How do I handle a specific step in the UFLI?'
          : resource.groupPrompt,
      summary:
        !resource.summary
          ? 'Use this section for high-frequency word references that support Day 1 instruction.'
          : resource.summary,
      targetUrl: resource.targetUrl || HIGH_FREQUENCY_WORDS_URL,
    }
  }

  if (resource.id === 'daily-guide-day-1-word-chain-templates') {
    return {
      ...resource,
      title:
        !resource.title ? 'Templates for Word Chains' : resource.title,
      groupLabel: !resource.groupLabel ? 'Reference Toolkit' : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt
          ? 'How do I handle a specific step in the UFLI?'
          : resource.groupPrompt,
      summary:
        !resource.summary
          ? 'Use this section for word-chain templates that support specific UFLI steps during Day 1 instruction.'
          : resource.summary,
      targetUrl: resource.targetUrl || WORD_CHAIN_TEMPLATES_URL,
    }
  }

  if (resource.id === 'daily-guide-day-2-materials-check') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Instructional Materials Check'
          ? 'Instructional Materials Check (Day 2)'
          : resource.title,
      category:
        !resource.category || resource.category === 'Daily Guide Day 1'
          ? 'Daily Guide Day 2'
          : resource.category,
      groupLabel:
        !resource.groupLabel ? 'Materials Check' : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt ? 'Do I have my tools?' : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'Use this section for the instructional materials check. Add your Canva link here for teachers to quickly confirm their Day 2 materials.'
          ? 'Use this section for the instructional materials check. Add your Canva link here for teachers to quickly confirm their Day 2 materials.'
          : resource.summary,
      targetUrl: resource.targetUrl || INSTRUCTIONAL_MATERIALS_DAY_2_URL,
    }
  }

  if (resource.id === 'ufli-day-1-fidelity-checklist-resource') {
    return {
      ...resource,
      title:
        !resource.title ||
        resource.title === 'Fidelity Checklist' ||
        resource.title === 'UFLI Day 1 Fidelity Checklist' ||
        resource.title === 'U5 Fidelity Checklist A1'
          ? 'UFLI Fidelity Checklist Day 1'
          : resource.title,
      category:
        !resource.category || resource.category === 'Evaluation Support'
          ? 'Fidelity Checklist'
          : resource.category,
      summary:
        !resource.summary ||
        resource.summary ===
          'This section will hold the Canva-based UFLI Day 1 Fidelity Checklist once the link is added.' ||
        resource.summary ===
          'This section opens the Canva-based UFLI Day 1 Fidelity Checklist from Instructional Support.' ||
        resource.summary ===
          'This section opens the Canva-based U5 Fidelity Checklist A1 from Instructional Support.'
          ? 'This section opens the Canva-based UFLI Fidelity Checklist Day 1 from Instructional Support.'
          : resource.summary,
      targetUrl: resource.targetUrl || '',
    }
  }

  if (resource.id === 'administration-feedback-form-teacher-snapshot') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Administration Feedback Form'
          ? 'UFLI Feedback Form (Day 1)'
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
      targetUrl: resource.targetUrl || ADMIN_TEACHER_SNAPSHOT_DAY_1_FORM_URL,
    }
  }

  if (resource.id === 'administration-feedback-form-teacher-snapshot-day-2') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Administration Feedback Form'
          ? 'UFLI Feedback Form (Day 2)'
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
      targetUrl: resource.targetUrl || ADMIN_TEACHER_SNAPSHOT_DAY_2_FORM_URL,
    }
  }

  if (resource.id === 'administration-feedback-form-mentor-snapshot') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Administration Feedback Form'
          ? 'Mentor Snapshot Form'
          : resource.title,
      category:
        !resource.category || resource.category === 'Feedback Form'
          ? 'Mentor Snapshot'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'Feedback Form'
          ? 'Mentor Snapshot'
          : resource.groupLabel,
      summary:
        !resource.summary ||
        resource.summary ===
          'An administration-facing form placeholder for leadership feedback, communication, wins, and next steps.'
          ? 'Use this section for administration feedback connected to mentor support, coaching, and observation snapshots.'
          : resource.summary,
      targetUrl: resource.targetUrl || ADMIN_MENTOR_SNAPSHOT_FORM_URL,
    }
  }

  if (resource.id === 'administration-feedback-form-self-assessment') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Administration Feedback Form'
          ? 'Admin Self-Assessment Form'
          : resource.title,
      category:
        !resource.category || resource.category === 'Feedback Form'
          ? 'Admin Self-Assessment'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'Feedback Form'
          ? 'Admin Self-Assessment'
          : resource.groupLabel,
      summary:
        !resource.summary ||
        resource.summary ===
          'An administration-facing form placeholder for leadership feedback, communication, wins, and next steps.'
          ? 'Use this section for administration self-assessment and reflection after observations, walkthroughs, or support cycles.'
          : resource.summary,
      targetUrl: resource.targetUrl || ADMIN_SELF_ASSESSMENT_FORM_URL,
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

  if (resource.id === 'mentor-feedback-form-self-reflection') {
    return {
      ...resource,
      title:
        !resource.title || resource.title === 'Self-Reflection'
          ? 'Mentor Self-Reflection Form'
          : resource.title,
      category:
        !resource.category || resource.category === 'Feedback Form'
          ? 'Self-Reflection'
          : resource.category,
      groupLabel:
        !resource.groupLabel || resource.groupLabel === 'Feedback Form'
          ? 'Self-Reflection'
          : resource.groupLabel,
      groupPrompt:
        !resource.groupPrompt ? 'How did I perform today?' : resource.groupPrompt,
      summary:
        !resource.summary ||
        resource.summary ===
          'A mentor-facing form placeholder for feedback, communication, wins, and next steps.'
          ? 'Mentors reflecting on their own support and coaching work.'
          : resource.summary,
      targetUrl: resource.targetUrl || MENTOR_SELF_REFLECTION_FORM_URL,
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
    (defaultSection.id === 'administration-feedback-form' && storedSection.type === 'form') ||
    defaultSection.id === 'ufli-day-1-fidelity-checklist' ||
    defaultSection.id === 'instructional-materials' ||
    defaultSection.id === 'evaluation-materials'

  const mergedSection = {
    ...defaultSection,
    ...storedSection,
    ...(shouldPreferDefaultCopy
      ? {
          label: defaultSection.label,
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
      logoOffsetY:
        typeof storedContent.branding?.logoOffsetY === 'number'
          ? storedContent.branding.logoOffsetY
          : defaultContent.branding.logoOffsetY,
      logoPanelOffsetY:
        typeof storedContent.branding?.logoPanelOffsetY === 'number'
          ? storedContent.branding.logoPanelOffsetY
          : defaultContent.branding.logoPanelOffsetY,
      logoWidth:
        typeof storedContent.branding?.logoWidth === 'number'
          ? storedContent.branding.logoWidth
          : defaultContent.branding.logoWidth,
    },
    homeCards: defaultContent.homeCards.map((card) => ({
      ...card,
      ...(storedHomeCardsById.get(card.id) ?? {}),
      accent: card.accent,
    })),
    portals: Object.fromEntries(portalEntries),
  }
}

function loadInitialContent() {
  return mergeStoredContent(createInitialAppContent(), null)
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
  const [content, setContent] = useState(loadInitialContent)
  const [isInlineEditing, setInlineEditingState] = useState(false)
  const [pdfAssetUrls, setPdfAssetUrls] = useState({})
  const pdfAssetUrlsRef = useRef({})

  useEffect(() => {
    pdfAssetUrlsRef.current = pdfAssetUrls
  }, [pdfAssetUrls])

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
  }

  const setInlineEditing = (nextValue) => {
    if (!isEditorEnabled) {
      setInlineEditingState(false)
      return
    }

    setInlineEditingState(nextValue)
  }

  const toggleInlineEditing = () => {
    if (!isEditorEnabled) {
      setInlineEditingState(false)
      return
    }

    setInlineEditingState((currentValue) => !currentValue)
  }

  const contextValue = {
    branding: hydratedContent.branding,
    buildNotes:
      'Text and link edits apply only in this session. Refresh to reload defaults from content.js. Uploaded PDFs still stay local to this device unless you also add a shareable URL.',
    content: hydratedContent,
    isEditorEnabled,
    featuredSearches: buildFeaturedSearches(hydratedContent),
    homeCards: hydratedContent.homeCards,
    isInlineEditing: isEditorEnabled ? isInlineEditing : false,
    portals: hydratedContent.portals,
    rawContent: content,
    resetContent,
    searchIndex: buildSearchIndex(hydratedContent),
    setInlineEditing,
    toggleInlineEditing,
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
