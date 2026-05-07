import { useEffect, useState } from 'react'

export function useTypewriter(texts: string[], speed = 75, pause = 2200) {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && charIndex === 0) {
      setDeleting(false)
      setTextIndex((i) => (i + 1) % texts.length)
      return
    }
    const t = setTimeout(
      () => setCharIndex((i) => (deleting ? i - 1 : i + 1)),
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(t)
  }, [charIndex, deleting, textIndex, texts, speed, pause])

  return texts[textIndex].slice(0, charIndex)
}
