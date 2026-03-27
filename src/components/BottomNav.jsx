import {
  BookOpen,
  ClipboardList,
  House,
  MessageSquareShare,
  Search,
  Settings,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  {
    to: '/',
    label: 'Home',
    end: true,
    renderIcon: () => <House size={20} strokeWidth={2.1} />,
  },
  {
    to: '/search',
    label: 'Search',
    renderIcon: () => <Search size={20} strokeWidth={2.1} />,
  },
  {
    to: '/instructional-support',
    label: 'Instructional',
    renderIcon: () => <BookOpen size={20} strokeWidth={2.1} />,
  },
  {
    to: '/evaluation-support',
    label: 'Evaluation',
    renderIcon: () => <ClipboardList size={20} strokeWidth={2.1} />,
  },
  {
    to: '/feedback-form',
    label: 'Feedback',
    renderIcon: () => <MessageSquareShare size={20} strokeWidth={2.1} />,
  },
  {
    to: '/editor',
    label: 'Editor',
    renderIcon: () => <Settings size={20} strokeWidth={2.1} />,
  },
]

export function BottomNav() {
  return (
    <nav
      className="bottom-nav"
      aria-label="Primary navigation"
      style={{ gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))` }}
    >
      {navItems.map(({ to, label, renderIcon, end }) => (
        <NavLink
          key={to}
          className={({ isActive }) =>
            `bottom-nav__link${isActive ? ' is-active' : ''}`
          }
          end={end}
          to={to}
        >
          <span className="nav-icon" aria-hidden="true">{renderIcon()}</span>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
