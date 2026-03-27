import { FileText, FormInput, Search as SearchIcon, Sparkles } from 'lucide-react'
import { useDeferredValue, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContent } from '../hooks/useAppContent.js'

function matchesQuery(query, item) {
  const haystack = [
    item.title,
    item.summary,
    item.portalLabel,
    item.sectionLabel,
    item.category,
    item.dayLabel,
    item.audience,
    ...(item.keywords ?? []),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

export function SearchPage() {
  const [query, setQuery] = useState('')
  const { featuredSearches, searchIndex } = useAppContent()
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())
  const results = deferredQuery
    ? searchIndex.filter((item) => matchesQuery(deferredQuery, item))
    : []

  return (
    <div className="page">
      <section className="hero-card surface-card">
        <span className="eyebrow">
          <SearchIcon aria-hidden="true" size={16} strokeWidth={2} />
          Resource Search
        </span>
        <h1 className="headline">Find the right support fast</h1>
        <p className="subhead">
          Search across teacher, mentor, and admin resources, including job aids,
          leadership documents, and embedded form destinations.
        </p>
      </section>

      <section className="search-panel surface-card">
        <label className="search-field" htmlFor="resource-search">
          <SearchIcon aria-hidden="true" size={20} strokeWidth={2} />
          <input
            id="resource-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Day 1, toolkit, feedback form, pacing, or leadership"
            type="search"
            value={query}
          />
        </label>

        <div className="search-tags">
          <span className="tag">Instructional Support</span>
          <span className="tag">Evaluation Support</span>
          <span className="tag">Teachers</span>
          <span className="tag">Mentors</span>
          <span className="tag">Administration</span>
        </div>
      </section>

      {deferredQuery ? (
        results.length ? (
          <section className="search-grid">
            {results.map((result) => (
              <Link key={result.id} className="search-result surface-card" to={result.href}>
                <div className="search-result__top">
                  <div>
                    <h3>{result.title}</h3>
                    <p>{result.summary}</p>
                  </div>
                  <span className="card-icon card-icon--teal" aria-hidden="true">
                    {result.type === 'form' ? (
                      <FormInput size={22} strokeWidth={2} />
                    ) : (
                      <FileText size={22} strokeWidth={2} />
                    )}
                  </span>
                </div>

                <div className="result-meta">
                  <span>{result.portalLabel}</span>
                  <span>{result.sectionLabel}</span>
                  {result.dayLabel ? <span>{result.dayLabel}</span> : null}
                </div>

                <div className="viewer-pill-row">
                  <span className="pill pill--teal">{result.audience}</span>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <section className="search-empty surface-card">
            <span className="eyebrow">
              <Sparkles aria-hidden="true" size={16} strokeWidth={2} />
              No exact match yet
            </span>
            <h3>Nothing matched “{query}”</h3>
            <p>
              Try a role name, a section like “Evaluation Support”, or a keyword such as
              “job aid”, “checklist”, or “toolkit”.
            </p>
          </section>
        )
      ) : (
        <section className="featured-search-grid">
          {featuredSearches.map((item) => (
            <Link key={item.title} className="featured-card surface-card" to={item.href}>
              <div className="featured-card__top">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <span className="card-icon card-icon--orange" aria-hidden="true">
                  <SearchIcon size={22} strokeWidth={2} />
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  )
}
