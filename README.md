# Phonics Hub

Phonics Hub is a responsive React web app for DLEngage that centers around shared support portals for all stakeholders. The experience is designed as a calm, professional workspace with a bottom navigation shell, rounded cards, branded navy/teal/orange/green accents, and a subtle topographic background.

## Product Summary

- Home screen with the DLEngage logo, the message `Empowering Roslyn Literacy: Closing the 38% Gap.`, and quick-entry cards for the shared support portals.
- Persistent bottom navigation with `Home`, `Search`, `Instructional`, `Evaluation`, `Feedback`, and `Editor`.
- Three main portals:
  - `Instructional Support` for teachers, mentors, and administration
  - `Evaluation Support` for teachers, mentors, and administration
  - `Feedback Form` for teachers, mentors, and administration
- These portals are designed as shared spaces where you can place Canva links, PDF resources, and Microsoft Forms using the in-app editor.

## Visual Direction

- Base colors:
  - Deep Navy `#1B2B48`
  - Teal `#2D8B8B`
- Accent colors:
  - Vibrant Orange `#F58220`
  - Apple Green `#8DC63F`
- Rounded cards and containers with a 12px baseline radius
- Line-art iconography
- Low-opacity topographic wave background using the provided branding image

## Current App Structure

- `/` Home
- `/search` Resource search across the app
- `/instructional-support` Shared instructional support portal
- `/evaluation-support` Shared evaluation support portal
- `/feedback-form` Shared stakeholder feedback form portal
- `/editor` Content manager route

The app now includes an in-app editor inside the Admin portal so content can be changed without touching the codebase.

## In-App Editor

- Open `/editor` to reach `Admin Content Manager`.
- Edit:
  - branding text
  - home card text
  - portal titles, descriptions, and section copy
  - resource titles, summaries, keywords, and form fields
  - Microsoft Form URLs
  - PDF/document URLs
- Upload local PDFs directly from the editor for PDF-based resources.
- Use `Download Settings` to export the current text/link configuration.
- Use `Restore Defaults` to clear saved edits and uploaded PDFs.

Important persistence note:

- Text and links are stored in browser local storage.
- Uploaded PDFs are stored in the browser with IndexedDB.
- These edits are local to the browser/device unless you also add shareable URLs.

## Content Model

The default app content lives in [`src/data/content.js`](/Users/jackelynejauregui/Documents/Phonics Hub/src/data/content.js), and runtime editing is managed by [`src/context/AppContentContext.jsx`](/Users/jackelynejauregui/Documents/Phonics Hub/src/context/AppContentContext.jsx).

It defines:

- branding data
- home cards
- portal configuration for `teachers`, `mentors`, and `admin`
- section definitions
- evaluation day groups
- resource metadata
- search index data

Each resource can be modeled as a PDF-style viewer item or an embedded Microsoft Form placeholder, and the admin editor can override those values in the browser at runtime.

## Development

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

Lint the code:

```bash
npm run lint
```

## Placeholder Strategy

- Microsoft Forms are embedded in concept, but v1 uses placeholder content until final form URLs are provided.
- Canva-derived PDFs are represented with visual document viewer placeholders until final exported files, URLs, or local uploaded PDFs are available.
- Search is resource-focused and does not store or query submission data.

## Source Inputs

- Product brief: `Literacy Hub by DLEngage.docx`
- Branding assets:
  - `logo.png`
  - `theme_colors_idea.png`
  - `colors.png`
