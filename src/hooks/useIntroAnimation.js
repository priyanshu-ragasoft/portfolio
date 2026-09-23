import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsapConfig'
import { playIntroAnimation, shouldRunIntro } from '../animations/introAnimation'

export function useIntroAnimation(rootRef, onDone) {
  const onDoneRef = useRef(onDone)
  const [active, setActive] = useState(() => shouldRunIntro())

  useLayoutEffect(() => {
    onDoneRef.current = onDone
  })

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!active || !root) return undefined

    let release = () => {}
    const context = gsap.context(() => {
      release = playIntroAnimation(root, {
        onComplete: () => {
          setActive(false)
          onDoneRef.current?.()
        },
      })
    }, root)

    return () => {
      release()
      context.revert()
    }
  }, [active, rootRef])

  return active
}
