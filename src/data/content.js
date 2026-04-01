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
  logoOffsetY: 0,
  logoPanelOffsetY: -24,
  logoWidth: 304,
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
    accent: 'orange',
    summary:
      'A shared evaluation portal for teachers, mentors, and administration with observation supports, job aids, and walkthrough materials.',
    bullets: ['Teachers', 'Mentors', 'Administration'],
  },
  {
    id: 'instructional-support',
    title: 'Instructional Support',
    icon: 'instructional',
    path: '/instructional-support',
    accent: 'teal',
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
    accent: 'orange',
    eyebrow: 'Shared Stakeholder Portal',
    description:
      'A shared evaluation support portal for teachers, mentors, and administration. This is where evaluation-facing Canva resources, job aids, and checklist materials will live.',
    highlights: ['Teachers', 'Mentors', 'Administration'],
    sections: [
      {
        id: 'evaluation-materials',
        label: 'Evaluation Support',
        type: 'resource-list',
        callout: 'Observation and log sections',
        description:
          'A single evaluation support space with grouped sections for observation checklists and observation logs.',
        resources: [
          createResource({
            id: 'shared-evaluation-checklist',
            title: 'UFLI Summative Observation Checklist',
            audience: 'Teachers, Mentors, Administration',
            category: 'Evaluation Support',
            groupLabel: 'UFLI Summative Observation Checklist',
            summary:
              'Use this section for the UFLI summative observation checklist.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEZxojatw/256iqWJhgkUGZgyebyrsQA/edit?utm_content=DAHEZxojatw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['checklist', 'observation', 'evaluation', 'summative', 'ufli'],
            previewPoints: [
              'Summative observation checklist section',
              'Linked to your Canva design',
              'Supports leadership and coaching conversations',
            ],
          }),
          createResource({
            id: 'evaluation-observation-notes-checklist',
            title: 'UFLI Fidelity Observation Log: Day 1 and 2',
            audience: 'Teachers, Mentors, Administration',
            category: 'Evaluation Support',
            groupLabel: 'UFLI Observation Notes Checklist',
            summary:
              'Use this section for the UFLI fidelity observation log for Day 1 and Day 2.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHFSHoi4zo/YU1IViFHIEty4FIYXbaBkw/edit?utm_content=DAHFSHoi4zo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['checklist', 'observation notes', 'evaluation', 'ufli'],
            previewPoints: [
              'Observation notes checklist section',
              'Linked to your Canva design',
              'Supports observation documentation',
            ],
          }),
        ],
      },
      {
        id: 'mentor-evaluation-materials',
        label: 'Mentors',
        type: 'resource-list',
        callout: 'Mentor-only section',
        description:
          'A mentor-only evaluation space for mentor-facing observation tools, coaching notes, and support materials.',
        resources: [
          createResource({
            id: 'mentor-evaluation-placeholder',
            title: 'Mentor Evaluation Support',
            audience: 'Mentors',
            category: 'Mentor Evaluation',
            summary:
              'Use this section for mentor-only evaluation resources. Add a Canva or form link here when you are ready.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEszUCQ_w/NUvP2vak3JbYo4geC9syPA/edit?utm_content=DAHEszUCQ_w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['mentor', 'evaluation', 'coaching', 'support'],
            previewPoints: [
              'Mentor-only evaluation section',
              'Linked to your Canva design',
              'Supports mentor coaching and observation follow-up',
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
    accent: 'teal',
    eyebrow: 'Shared Stakeholder Portal',
    description:
      'A shared instructional support portal for teachers, mentors, and administration. This is where instructional Canva resources and support materials will live.',
    highlights: ['Teachers', 'Mentors', 'Administration'],
    sections: [
      {
        id: 'instructional-materials',
        label: 'Instructional Support',
        type: 'resource-list',
        callout: 'Daily Guide',
        description:
          'A single instructional support space with daily guide sections for materials, fidelity, and reference supports.',
        resources: [
          createResource({
            id: 'daily-guide-day-1-materials-check',
            title: 'Instructional Materials Check (Day 1)',
            audience: 'Teachers',
            category: 'Daily Guide Day 1',
            groupLabel: 'Materials Check',
            groupPrompt: 'Do I have my tools?',
            summary:
              'Use this section for the instructional materials check. Add your Canva link here for teachers to quickly confirm their Day 1 materials.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEn2X8Qig/TATL7KzmALauZa0UvU0GwQ/edit?utm_content=DAHEn2X8Qig&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 1', 'materials check', 'canva'],
            previewPoints: [
              'Day 1 materials check section',
              'Linked to your Canva design',
              'Helps teachers confirm tools before instruction',
            ],
          }),
          createResource({
            id: 'daily-guide-day-2-materials-check',
            title: 'Instructional Materials Check (Day 2)',
            audience: 'Teachers',
            category: 'Daily Guide Day 2',
            groupLabel: 'Materials Check',
            groupPrompt: 'Do I have my tools?',
            summary:
              'Use this section for the instructional materials check. Add your Canva link here for teachers to quickly confirm their Day 2 materials.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEsUMkZyw/fBtpKjGhgO0X2MrRLwcmqQ/edit?utm_content=DAHEsUMkZyw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 2', 'materials check', 'canva'],
            previewPoints: [
              'Day 2 materials check section',
              'Linked to your Canva design',
              'Helps teachers confirm tools before instruction',
            ],
          }),
          createResource({
            id: 'daily-guide-day-1-fidelity-checklist',
            title: 'UFLI Fidelity Checklist Day 1',
            audience: 'Teachers',
            category: 'Daily Guide Day 1',
            groupLabel: 'UFLI Fidelity Checklist',
            groupPrompt: 'Am I following the lesson steps with fidelity?',
            summary:
              'Use this section for the Day 1 UFLI fidelity checklist. Add your Canva link here so teachers can quickly check alignment to the lesson.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHElpQVjoM/x7yqENsNCqqqxJD51vu8Wg/edit?utm_content=DAHElpQVjoM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 1', 'ufli', 'fidelity checklist', 'canva'],
            previewPoints: [
              'Day 1 fidelity checklist section',
              'Linked to your Canva design',
              'Supports lesson fidelity and step-by-step implementation',
            ],
          }),
          createResource({
            id: 'daily-guide-day-2-fidelity-checklist',
            title: 'UFLI Fidelity Checklist Day 2',
            audience: 'Teachers',
            category: 'Daily Guide Day 2',
            groupLabel: 'UFLI Fidelity Checklist',
            groupPrompt: 'Am I following the lesson steps with fidelity?',
            summary:
              'Use this section for the Day 2 UFLI fidelity checklist. Add your Canva link here so teachers can quickly check alignment to the lesson.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEocMNPjw/lExaCClFLqhoEaNlcXEp9g/edit?utm_content=DAHEocMNPjw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 2', 'ufli', 'fidelity checklist', 'canva'],
            previewPoints: [
              'Day 2 fidelity checklist section',
              'Linked to your Canva design',
              'Supports lesson fidelity and step-by-step implementation',
            ],
          }),
          createResource({
            id: 'daily-guide-day-1-reference-toolkit',
            title: 'Response Methods',
            audience: 'Teachers',
            category: 'Daily Guide Day 1',
            groupLabel: 'Reference Toolkit',
            groupPrompt: 'How do I handle a specific step in the UFLI?',
            summary:
              'Use this section for response methods that support specific UFLI steps during Day 1 instruction.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEcW_e2HE/uOekkUXoN3vbA-zkdv9bcw/edit?utm_content=DAHEcW_e2HE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 1', 'reference toolkit', 'response methods'],
            previewPoints: [
              'Response methods live here',
              'Linked to your Canva design',
              'Supports step-specific instructional moves',
            ],
          }),
          createResource({
            id: 'daily-guide-day-1-high-frequency-words',
            title: 'High-Frequency Words Routine ❤️',
            audience: 'Teachers',
            category: 'Daily Guide Day 1',
            groupLabel: 'Reference Toolkit',
            groupPrompt: 'How do I handle a specific step in the UFLI?',
            summary:
              'Use this section for high-frequency word references that support Day 1 instruction.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEZgXCH28/KIKGkDI8kRj9IkWRCHIrVw/edit?utm_content=DAHEZgXCH28&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 1', 'reference toolkit', 'high-frequency words'],
            previewPoints: [
              'High-frequency word references live here',
              'Linked to your Canva design',
              'Supports step-specific instructional moves',
            ],
          }),
          createResource({
            id: 'daily-guide-day-1-word-chain-templates',
            title: 'Templates for Word Chains',
            audience: 'Teachers',
            category: 'Daily Guide Day 1',
            groupLabel: 'Reference Toolkit',
            groupPrompt: 'How do I handle a specific step in the UFLI?',
            summary:
              'Use this section for word-chain templates that support specific UFLI steps during Day 1 instruction.',
            type: 'link',
            targetUrl:
              'https://www.canva.com/design/DAHEZrR7Eh4/xn0ZCUlVuRRxV-2toAu_Tw/edit?utm_content=DAHEZrR7Eh4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
            keywords: ['instructional support', 'daily guide', 'day 1', 'reference toolkit', 'word chains', 'templates'],
            previewPoints: [
              'Word-chain templates live here',
              'Linked to your Canva design',
              'Supports step-specific instructional moves',
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
    guidanceResource: createResource({
      id: 'feedback-guidance-multi-source',
      title: 'Multi-Source Feedback System',
      audience: 'Teachers, Mentors, Administration',
      category: 'Feedback Guidance',
      summary:
        'Use this guidance resource before opening the stakeholder forms so everyone is aligned to the same multi-source feedback process.',
      type: 'link',
      targetUrl:
        'https://www.canva.com/design/DAHEZ0qxLXs/xZJmEybblBCBLZ-80KGruQ/edit?utm_content=DAHEZ0qxLXs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      keywords: ['feedback', 'guidance', 'multi-source feedback', 'canva', 'shared support'],
      previewPoints: [
        'Guidance resource for all stakeholders',
        'Linked to your Canva design',
        'Use before opening the forms below',
      ],
    }),
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
              'Embedded form ready',
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
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUQjdBME9OV1pQMlRQSTA0UlQwUlhKR0RVUi4u',
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
            title: 'UFLI Feedback Form (Day 1)',
            audience: 'Administration',
            category: 'Teacher Snapshot',
            groupLabel: 'Teacher Snapshot',
            summary:
              'Use this section for administration feedback connected to teacher observations and classroom snapshots.',
            type: 'form',
            keywords: ['feedback', 'administration', 'teacher snapshot', 'observation'],
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
              'Administration teacher snapshot section',
              'Ready for your form URL',
              'Observation feedback form',
            ],
          }),
          createResource({
            id: 'administration-feedback-form-teacher-snapshot-day-2',
            title: 'UFLI Feedback Form (Day 2)',
            audience: 'Administration',
            category: 'Teacher Snapshot',
            groupLabel: 'Teacher Snapshot',
            summary:
              'Use this section for administration feedback connected to teacher observations and classroom snapshots.',
            type: 'form',
            keywords: [
              'feedback',
              'administration',
              'teacher snapshot',
              'observation',
              'day 2',
            ],
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
              'Administration teacher snapshot section',
              'Day 2 observation form',
              'Observation feedback form',
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
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUM1Y1RFY3NUxMUTNMTllQWktLS1FORzdGMS4u',
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
              'Coaching support reflection form',
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
            targetUrl:
              'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6N3cle9jXfdDiub7_GFF_hxUMVFVTTVQRE9SRE9GTERCSFlSRzAzMzZRQi4u',
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
              'Leadership reflection form',
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
