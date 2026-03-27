const createResource = ({
  audience,
  category,
  fields = [],
  keywords = [],
  previewPoints = [],
  ratings = [],
  status = 'placeholder',
  targetUrl = '',
  ...rest
}) => ({
  audience,
  category,
  fields,
  keywords,
  previewPoints,
  ratings,
  status,
  targetUrl,
  ...rest,
})

export const branding = {
  appName: 'Phonics Hub',
  logoSrc: '/branding/logo.png',
  tagline: 'Empowering Roslyn Literacy: Closing the 38% Gap.',
  mission:
    'A professional oasis where teachers, mentors, and administration can open shared instructional and evaluation supports in one place.',
}

export const homeCards = [
  {
    id: 'evaluation-support',
    title: 'Evaluation Support',
    icon: 'evaluation',
    path: '/evaluation-support',
    accent: 'teal',
    summary:
      'A shared evaluation portal for teachers, mentors, and administration with observation supports, job aids, and walkthrough materials.',
    bullets: ['Teachers', 'Mentors', 'Administration'],
  },
  {
    id: 'instructional-support',
    title: 'Instructional Support',
    icon: 'instructional',
    path: '/instructional-support',
    accent: 'orange',
    summary:
      'A shared instructional portal for teachers, mentors, and administration with Canva-based coaching tools and classroom resources.',
    bullets: ['Teachers', 'Mentors', 'Administration'],
  },
  {
    id: 'feedback-form',
    title: 'Feedback Form',
    icon: 'feedback',
    path: '/feedback-form',
    accent: 'green',
    summary:
      'A shared feedback form portal for teachers, mentors, and administration where your forms can be embedded by stakeholder section.',
    bullets: ['Teachers', 'Mentors', 'Administration'],
  },
]

export const portals = {
  evaluationSupport: {
    id: 'evaluationSupport',
    title: 'Evaluation Support',
    path: '/evaluation-support',
    accent: 'teal',
    eyebrow: 'Shared Stakeholder Portal',
    description:
      'A shared evaluation support portal for teachers, mentors, and administration. This is where evaluation-facing Canva resources, job aids, and checklist materials will live.',
    highlights: ['Teachers', 'Mentors', 'Administration'],
    sections: [
      {
        id: 'evaluation-materials',
        label: 'Evaluation Support',
        type: 'resource-list',
        callout: 'Shared evaluation resources',
        description:
          'A single shared space for evaluation support materials that can be updated with Canva links, PDFs, and Microsoft Form embeds.',
        resources: [
          createResource({
            id: 'shared-evaluation-job-aid',
            title: 'Evaluation Support Job Aid',
            audience: 'Teachers, Mentors, Administration',
            category: 'Evaluation Support',
            summary:
              'A shared evaluation support resource placeholder for your Canva-based materials, observation guidance, and reference documents.',
            type: 'pdf',
            keywords: ['evaluation', 'job aid', 'canva', 'shared support'],
            previewPoints: [
              'Shared evaluation support for all stakeholders',
              'Ready for Canva links or exported PDFs',
              'Can be updated from the in-app editor',
            ],
          }),
          createResource({
            id: 'shared-evaluation-checklist',
            title: 'Evaluation Observation Checklist',
            audience: 'Teachers, Mentors, Administration',
            category: 'Evaluation Support',
            summary:
              'A shared checklist and observation support placeholder for walkthroughs, look-fors, and reference documents.',
            type: 'pdf',
            keywords: ['checklist', 'observation', 'evaluation', 'shared'],
            previewPoints: [
              'Observation-ready evaluation reference',
              'Supports leadership and coaching conversations',
              'Can be replaced with final Canva-generated assets',
            ],
          }),
        ],
      },
    ],
  },
  instructionalSupport: {
    id: 'instructionalSupport',
    title: 'Instructional Support',
    path: '/instructional-support',
    accent: 'orange',
    eyebrow: 'Shared Stakeholder Portal',
    description:
      'A shared instructional support portal for teachers, mentors, and administration. This is where instructional Canva resources and support materials will live.',
    highlights: ['Teachers', 'Mentors', 'Administration'],
    sections: [
      {
        id: 'instructional-materials',
        label: 'Instructional Support',
        type: 'resource-list',
        callout: 'Shared instructional resources',
        description:
          'A single shared space for instructional support materials that can be updated with Canva links, PDFs, and visual document resources.',
        resources: [
          createResource({
            id: 'shared-instructional-toolkit',
            title: 'Instructional Support Toolkit',
            audience: 'Teachers, Mentors, Administration',
            category: 'Instructional Support',
            summary:
              'A shared instructional support toolkit placeholder for Canva-based resources, anchor materials, and coaching supports.',
            type: 'pdf',
            keywords: ['instructional', 'toolkit', 'canva', 'shared support'],
            previewPoints: [
              'Shared instructional support for all stakeholders',
              'Ready for Canva links or exported PDFs',
              'Can be updated from the in-app editor',
            ],
          }),
          createResource({
            id: 'shared-instructional-reference',
            title: 'Instructional Reference Materials',
            audience: 'Teachers, Mentors, Administration',
            category: 'Instructional Support',
            summary:
              'A shared placeholder for instructional references, scaffolds, word lists, and other classroom-facing supports.',
            type: 'pdf',
            keywords: ['instructional', 'reference', 'scaffolds', 'word lists'],
            previewPoints: [
              'Flexible home for shared instructional documents',
              'Supports classroom, coaching, and leadership use',
              'Designed for easy Canva content replacement',
            ],
          }),
        ],
      },
    ],
  },
  feedbackForm: {
    id: 'feedbackForm',
    title: 'Feedback Form',
    path: '/feedback-form',
    accent: 'green',
    eyebrow: 'Shared Stakeholder Portal',
    description:
      'A shared feedback form portal for teachers, mentors, and administration. This is where your form links will be embedded by stakeholder section.',
    highlights: [],
    sections: [
      {
        id: 'teacher-feedback-form',
        label: 'Teachers',
        type: 'resource-list',
        callout: 'Three Teacher Feedback Sections',
        description:
          'Teachers have three feedback sections here: Peer Snapshot, Leadership Support, and Self-Reflection.',
        resources: [
          createResource({
            id: 'teacher-feedback-form-day-1',
            title: 'UFLI Feedback Form (Day 1)',
            audience: 'Teachers',
            category: 'Peer Snapshot',
            groupLabel: 'Peer Snapshot',
            groupPrompt: 'What did I see in my colleague?',
            summary:
              'Use this form to provide evidence-based feedback on UFLI Day 1 instruction. Teachers, mentors, and administrators may complete this form after observing a lesson. Respond only to the observed lesson steps; align feedback with UFLI expectations.',
            type: 'form',
            keywords: ['feedback', 'teacher', 'day 1', 'ufli', 'peer snapshot', 'colleague'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQ0JWOEtGMFdRSTZIU1hKRllWUkEzTTlWVi4u',
            fields: [
              'Name',
              'Role',
              'Specific Wins',
              'Actionable Next Steps',
            ],
            ratings: ['Adherence', 'Pacing', 'Student Response'],
            previewPoints: [
              'Peer Snapshot for teachers',
              'Form for Day 1',
              'What did I see in my colleague?',
            ],
          }),
          createResource({
            id: 'teacher-feedback-form-day-2',
            title: 'UFLI Feedback Form (Day 2)',
            audience: 'Teachers',
            category: 'Peer Snapshot',
            groupLabel: 'Peer Snapshot',
            groupPrompt: 'What did I see in my colleague?',
            summary:
              'Teachers observing other teachers on Day 2. What did I see in my colleague?',
            type: 'form',
            keywords: ['feedback', 'teacher', 'day 2', 'ufli', 'peer snapshot', 'colleague'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQ1VXWlI3V1c4REs0TFJEMzJYNEZWMkVWTy4u',
            fields: [
              'Name',
              'Role',
              'Specific Wins',
              'Actionable Next Steps',
            ],
            ratings: ['Adherence', 'Pacing', 'Student Response'],
            previewPoints: [
              'Peer Snapshot for teachers',
              'Form for Day 2',
              'What did I see in my colleague?',
            ],
          }),
          createResource({
            id: 'teacher-feedback-form-leadership-support',
            title: 'Leadership Support',
            audience: 'Teachers',
            category: 'Leadership Support',
            groupLabel: 'Leadership Support',
            groupPrompt: "Was the admin's observation helpful or accurate?",
            summary: "Was the admin's observation helpful or accurate?",
            linkLabel: 'Meeting Teachers Observing Admin',
            type: 'form',
            keywords: ['feedback', 'teacher', 'leadership support', 'admin observation'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUNEgxUzIwN0NRVEdFVFIxTjBGUFFFMkFFOC4u',
            fields: [
              'Name',
              'Role',
              'Observation Feedback',
              'Helpful Next Steps',
            ],
            ratings: ['Helpfulness', 'Accuracy', 'Clarity'],
            previewPoints: [
              'Teacher feedback for administration',
              'Leadership support reflection form',
              'Can be updated from the in-app editor',
            ],
          }),
          createResource({
            id: 'teacher-feedback-form-self-reflection',
            title: 'UFLI Day 1 Teacher Self-Reflection Form',
            audience: 'Teachers',
            category: 'Self-Reflection',
            groupLabel: 'Self-Reflection',
            groupPrompt: 'How did I perform today?',
            summary: 'UFLI Day 1 self-reflection for teachers reflecting on their own teaching.',
            type: 'form',
            keywords: ['feedback', 'teacher', 'self-reflection', 'own teaching'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUNDBBT1ZUOTg3VElZQ0xUSTUyRDNKRURETC4u',
            fields: [
              'Name',
              'Role',
              'Instructional Wins',
              'Reflection and Next Steps',
            ],
            ratings: ['Confidence', 'Clarity', 'Growth'],
            previewPoints: [
              'Teacher self-reflection section',
              'UFLI Day 1 self-reflection',
              'Reflecting on my own teaching',
              'Embedded form ready',
            ],
          }),
          createResource({
            id: 'teacher-feedback-form-self-reflection-day-2',
            title: 'UFLI Day 2: Teacher Self-Reflection Form',
            audience: 'Teachers',
            category: 'Self-Reflection',
            groupLabel: 'Self-Reflection',
            groupPrompt: 'How did I perform today?',
            summary: 'UFLI Day 2 self-reflection for teachers reflecting on their own teaching.',
            type: 'form',
            keywords: ['feedback', 'teacher', 'self-reflection', 'day 2', 'own teaching'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUNTY3S1FZODJWTjJFS0o0TFM5UlFXUTZLQy4u',
            fields: [
              'Name',
              'Role',
              'Instructional Wins',
              'Reflection and Next Steps',
            ],
            ratings: ['Confidence', 'Clarity', 'Growth'],
            previewPoints: [
              'UFLI Day 2 self-reflection',
              'Reflecting on my own teaching',
              'Embedded form ready',
            ],
          }),
        ],
      },
      {
        id: 'mentor-feedback-form',
        label: 'Mentors',
        type: 'resource-list',
        callout: 'Three Mentor Feedback Sections',
        description:
          'Mentors have three feedback sections here: Peer Snapshot, Leadership Support, and Self-Reflection.',
        resources: [
          createResource({
            id: 'mentor-feedback-form-peer-snapshot',
            title: 'Mentor Peer Snapshot Form',
            audience: 'Mentors',
            category: 'Peer Snapshot',
            groupLabel: 'Peer Snapshot',
            groupPrompt: 'What did I see in my colleague?',
            summary:
              'Use this feedback form for mentor after the mentoring session with the teacher is complete.',
            type: 'form',
            keywords: ['feedback', 'mentor', 'peer snapshot', 'colleague'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUM1Y1RFY3NUxMUTNMTllQWktLS1FORzdGMS4u',
            fields: [
              'Name',
              'Role',
              'Specific Wins',
              'Actionable Next Steps',
            ],
            ratings: ['Adherence', 'Pacing', 'Student Response'],
            previewPoints: [
              'Mentor peer snapshot section',
              'What did I see in my colleague?',
              'Embedded form ready',
            ],
          }),
          createResource({
            id: 'mentor-feedback-form-leadership-support',
            title: 'Mentor Leadership Support Form',
            audience: 'Mentors',
            category: 'Leadership Support',
            groupLabel: 'Leadership Support',
            groupPrompt: "Was the admin's observation helpful or accurate?",
            summary:
              'Mentors providing feedback connected to leadership support and observation accuracy.',
            type: 'form',
            keywords: ['feedback', 'mentor', 'leadership support', 'admin observation'],
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQlIyUzhBSFZCWVBONzhRRVFQWUM1SjlWMi4u',
            fields: [
              'Name',
              'Role',
              'Observation Feedback',
              'Helpful Next Steps',
            ],
            ratings: ['Helpfulness', 'Accuracy', 'Clarity'],
            previewPoints: [
              'Mentor leadership support section',
              "Was the admin's observation helpful or accurate?",
              'Embedded form ready',
            ],
          }),
          createResource({
            id: 'mentor-feedback-form-self-reflection',
            title: 'Mentor Self-Reflection Form',
            audience: 'Mentors',
            category: 'Self-Reflection',
            groupLabel: 'Self-Reflection',
            groupPrompt: 'How did I perform today?',
            summary: 'Mentors reflecting on their own support and coaching work.',
            type: 'form',
            keywords: ['feedback', 'mentor', 'self-reflection', 'coaching'],
            fields: [
              'Name',
              'Role',
              'Coaching Wins',
              'Reflection and Next Steps',
            ],
            ratings: ['Confidence', 'Clarity', 'Growth'],
            previewPoints: [
              'Mentor self-reflection section',
              'How did I perform today?',
              'Ready for your form URL',
            ],
          }),
        ],
      },
      {
        id: 'administration-feedback-form',
        label: 'Administration',
        type: 'resource-list',
        callout: 'Three Administration Feedback Sections',
        description:
          'Administration has three feedback sections here: Teacher Snapshot, Mentor Snapshot, and Admin Self-Assessment.',
        resources: [
          createResource({
            id: 'administration-feedback-form-teacher-snapshot',
            title: 'Teacher Snapshot Form',
            audience: 'Administration',
            category: 'Teacher Snapshot',
            groupLabel: 'Teacher Snapshot',
            summary:
              'Use this section for administration feedback connected to teacher observations and classroom snapshots.',
            type: 'form',
            keywords: ['feedback', 'administration', 'teacher snapshot', 'observation'],
            fields: [
              'Name',
              'Role',
              'Specific Wins',
              'Actionable Next Steps',
            ],
            ratings: ['Adherence', 'Pacing', 'Student Response'],
            previewPoints: [
              'Administration teacher snapshot section',
              'Ready for your form URL',
              'Can be updated from the in-app editor',
            ],
          }),
          createResource({
            id: 'administration-feedback-form-mentor-snapshot',
            title: 'Mentor Snapshot Form',
            audience: 'Administration',
            category: 'Mentor Snapshot',
            groupLabel: 'Mentor Snapshot',
            summary:
              'Use this section for administration feedback connected to mentor support, coaching, and observation snapshots.',
            type: 'form',
            keywords: ['feedback', 'administration', 'mentor snapshot', 'coaching'],
            fields: [
              'Name',
              'Role',
              'Specific Wins',
              'Actionable Next Steps',
            ],
            ratings: ['Support', 'Clarity', 'Next Steps'],
            previewPoints: [
              'Administration mentor snapshot section',
              'Ready for your form URL',
              'Can be updated from the in-app editor',
            ],
          }),
          createResource({
            id: 'administration-feedback-form-self-assessment',
            title: 'Admin Self-Assessment Form',
            audience: 'Administration',
            category: 'Admin Self-Assessment',
            groupLabel: 'Admin Self-Assessment',
            summary:
              'Use this section for administration self-assessment and reflection after observations, walkthroughs, or support cycles.',
            type: 'form',
            keywords: ['feedback', 'administration', 'self-assessment', 'reflection'],
            fields: [
              'Name',
              'Role',
              'Leadership Wins',
              'Reflection and Next Steps',
            ],
            ratings: ['Confidence', 'Clarity', 'Growth'],
            previewPoints: [
              'Administration self-assessment section',
              'Ready for your form URL',
              'Can be updated from the in-app editor',
            ],
          }),
        ],
      },
    ],
  },
}

function buildPortalHref({ path, sectionId, dayId, resourceId }) {
  const params = new URLSearchParams()

  if (sectionId) {
    params.set('section', sectionId)
  }

  if (dayId) {
    params.set('day', dayId)
  }

  if (resourceId) {
    params.set('resource', resourceId)
  }

  const query = params.toString()

  return query ? `${path}?${query}` : path
}

function collectSearchEntriesForSection(portal, section) {
  if (section.type === 'resource-list') {
    return section.resources.map((resource) => ({
      id: resource.id,
      href: buildPortalHref({
        path: portal.path,
        sectionId: section.id,
        resourceId: resource.id,
      }),
      portalLabel: portal.title,
      sectionLabel: section.label,
      category: resource.category,
      title: resource.title,
      summary: resource.summary,
      type: resource.type,
      keywords: resource.keywords,
      dayLabel: resource.dayLabel ?? '',
      audience: resource.audience,
    }))
  }

  if (section.type === 'day-groups') {
    return section.days.flatMap((day) =>
      day.resources.map((resource) => ({
        id: resource.id,
        href: buildPortalHref({
          path: portal.path,
          sectionId: section.id,
          dayId: day.id,
          resourceId: resource.id,
        }),
        portalLabel: portal.title,
        sectionLabel: section.label,
        category: resource.category,
        title: resource.title,
        summary: resource.summary,
        type: resource.type,
        keywords: resource.keywords,
        dayLabel: day.label,
        audience: resource.audience,
      })),
    )
  }

  if (section.type === 'form') {
    return [
      {
        id: section.resource.id,
        href: buildPortalHref({
          path: portal.path,
          sectionId: section.id,
          resourceId: section.resource.id,
        }),
        portalLabel: portal.title,
        sectionLabel: section.label,
        category: section.resource.category,
        title: section.resource.title,
        summary: section.resource.summary,
        type: section.resource.type,
        keywords: section.resource.keywords,
        dayLabel: '',
        audience: section.resource.audience,
      },
    ]
  }

  if (section.type === 'dual') {
    return [section.reference, section.form].map((resource) => ({
      id: resource.id,
      href: buildPortalHref({
        path: portal.path,
        sectionId: section.id,
        resourceId: resource.id,
      }),
      portalLabel: portal.title,
      sectionLabel: section.label,
      category: resource.category,
      title: resource.title,
      summary: resource.summary,
      type: resource.type,
      keywords: resource.keywords,
      dayLabel: '',
      audience: resource.audience,
    }))
  }

  return []
}

export const defaultAppContent = {
  branding,
  homeCards,
  portals,
}

const featuredSearchDefinitions = [
  {
    id: 'shared-evaluation-job-aid',
    summary: 'Open the shared evaluation support portal.',
  },
  {
    id: 'shared-instructional-toolkit',
    summary: 'Open the shared instructional support portal.',
  },
  {
    id: 'teacher-feedback-form-day-1',
    summary: 'Open the shared stakeholder feedback form portal.',
  },
]

export function createInitialAppContent() {
  return JSON.parse(JSON.stringify(defaultAppContent))
}

export function buildSearchIndex(content = defaultAppContent) {
  return Object.values(content.portals).flatMap((portal) =>
    portal.sections.flatMap((section) => collectSearchEntriesForSection(portal, section)),
  )
}

export function buildFeaturedSearches(content = defaultAppContent) {
  const entriesById = new Map(
    buildSearchIndex(content).map((entry) => [entry.id, entry]),
  )

  return featuredSearchDefinitions
    .map((definition) => {
      const entry = entriesById.get(definition.id)

      if (!entry) {
        return null
      }

      return {
        title: entry.title,
        summary: definition.summary,
        href: entry.href,
      }
    })
    .filter(Boolean)
}

export const searchIndex = buildSearchIndex(defaultAppContent)
export const featuredSearches = buildFeaturedSearches(defaultAppContent)
