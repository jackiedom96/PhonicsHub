import { useContext } from 'react'
import { AppContentContext } from '../context/appContentContext.js'

export function useAppContent() {
  const contextValue = useContext(AppContentContext)

  if (!contextValue) {
    throw new Error('useAppContent must be used within AppContentProvider')
  }

  return contextValue
}
