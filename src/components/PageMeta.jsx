import { useEffect } from 'react'

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title
    if (!description) return undefined
    const tag = document.querySelector('meta[name="description"]')
    const previous = tag?.getAttribute('content')
    if (tag) tag.setAttribute('content', description)
    return () => {
      if (tag && previous) tag.setAttribute('content', previous)
    }
  }, [title, description])

  return null
}
