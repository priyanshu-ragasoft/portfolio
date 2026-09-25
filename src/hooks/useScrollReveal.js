import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Timing defaults
 * ---------------
 * duration  0.8s   — long enough to read the rise, short enough to feel snappy
 * ease      power3.out — fast start, soft landing (no bounce)
 * stagger   0.06s  — desktop word gap; mobile is scaled down in matchMedia
 * y         60     — only `transform` is animated (never top/left)
 *
 * Tweak chunk size later:
 *   options.chunk = "word"  → one span per word (finest, default on desktop)
 *   options.chunk = "line"  → group words that share a line (default on mobile)
 *   options.clump = 3       → force N sibling words into one chunk
 */

const DEFAULT_DURATION = 0.8
const DEFAULT_EASE = 'power3.out'
const DEFAULT_STAGGER = 0.06
const DEFAULT_Y = 60
const DEFAULT_START = 'top 85%'
const BATCH_MIN = 4
const WILL_CHANGE_CLASS = 'will-change-transform'
const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'TEXTAREA',
  'INPUT',
  'SELECT',
  'SVG',
  'CANVAS',
  'CODE',
  'PRE',
])

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function markWillChange(nodes, on) {
  nodes.forEach((node) => {
    if (on) node.classList.add(WILL_CHANGE_CLASS)
    else node.classList.remove(WILL_CHANGE_CLASS)
    node.style.willChange = on ? 'transform, opacity' : 'auto'
  })
}

function isSkippable(node) {
  if (!node) return true
  if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.TEXT_NODE) return true
  const el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement
  if (!el) return true
  if (SKIP_TAGS.has(el.tagName)) return true
  if (el.closest('[data-sr-ignore], [data-sr-chunk]')) return true
  return false
}

/**
 * Lightweight SplitText stand-in: wrap each word in an inline-block span.
 * Original HTML is restored by the caller on cleanup so React remounts stay clean.
 */
function splitWords(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT
      if (isSkippable(node)) return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)

  const words = []
  textNodes.forEach((node) => {
    const parts = node.textContent.split(/(\s+)/)
    const fragment = document.createDocumentFragment()
    parts.forEach((part) => {
      if (!part) return
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part))
        return
      }
      const span = document.createElement('span')
      span.className = 'sr-chunk inline-block'
      span.dataset.srChunk = 'word'
      // Keep the trailing space inside the span so inline-block words don't jam together.
      span.textContent = `${part}\u00A0`
      fragment.appendChild(span)
      words.push(span)
    })
    node.parentNode.replaceChild(fragment, node)
  })

  return words
}

function wrapRun(els, kind) {
  if (els.length === 1) return els[0]
  const wrap = document.createElement('span')
  wrap.className = 'sr-chunk sr-line inline-block'
  wrap.dataset.srChunk = kind
  const first = els[0]
  first.parentNode.insertBefore(wrap, first)
  els.forEach((el) => {
    const space = el.nextSibling
    wrap.appendChild(el)
    if (space && space.nodeType === Node.TEXT_NODE && /^\s+$/.test(space.textContent)) {
      wrap.appendChild(space)
    }
  })
  return wrap
}

function clumpSiblings(words, size) {
  if (size <= 1) return words
  const chunks = []
  let i = 0
  while (i < words.length) {
    const first = words[i]
    const run = [first]
    let j = i + 1
    while (j < words.length && run.length < size && words[j].parentNode === first.parentNode) {
      run.push(words[j])
      j += 1
    }
    chunks.push(wrapRun(run, 'clump'))
    i = j
  }
  return chunks
}

function groupByLine(words) {
  if (!words.length) return []
  const lines = []
  let run = [words[0]]
  let top = words[0].offsetTop
  let parent = words[0].parentNode

  for (let i = 1; i < words.length; i += 1) {
    const word = words[i]
    const sameParent = word.parentNode === parent
    const sameLine = sameParent && Math.abs(word.offsetTop - top) <= 2
    if (sameLine) {
      run.push(word)
    } else {
      lines.push(wrapRun(run, 'line'))
      run = [word]
      top = word.offsetTop
      parent = word.parentNode
    }
  }
  lines.push(wrapRun(run, 'line'))
  return lines
}

function collectTextChunks(root, { chunk, clump, mobile }) {
  const words = splitWords(root)
  if (!words.length) return []

  const mode = chunk || (mobile ? 'line' : 'word')
  if (typeof clump === 'number' && clump > 1) return clumpSiblings(words, clump)
  if (mode === 'line') return groupByLine(words)
  return words
}

function isMediaNode(node) {
  if (!node?.matches) return false
  if (node.hasAttribute('data-sr-ignore')) return true
  if (node.matches('img, video, canvas, [data-image-reveal], [data-about-visual], [data-edu-visual], [data-feature-visual], [data-project-media]')) {
    return true
  }
  return Boolean(node.querySelector?.('img, video, canvas, [data-image-reveal]'))
}

function collectBlockChunks(root) {
  if (isMediaNode(root)) return []
  const kids = Array.from(root.children).filter((child) => !isMediaNode(child))
  // <ScrollReveal type="block"><div className="grid">cards</div></ScrollReveal>
  // → animate the cards, not the lone wrapper.
  if (kids.length === 1 && kids[0].children.length > 1) {
    return Array.from(kids[0].children).filter((child) => !isMediaNode(child))
  }
  return kids
}

function playChunks(chunks, { y, duration, ease, stagger, onDone }) {
  markWillChange(chunks, true)
  return gsap.to(chunks, {
    y: 0,
    opacity: 1,
    duration,
    ease,
    stagger,
    overwrite: 'auto',
    onComplete: () => {
      markWillChange(chunks, false)
      onDone?.()
    },
  })
}

function reverseChunks(chunks, { y, duration, ease, stagger }) {
  markWillChange(chunks, true)
  return gsap.to(chunks, {
    y,
    opacity: 0,
    duration: duration * 0.75,
    ease,
    stagger: stagger * 0.5,
    overwrite: 'auto',
    onComplete: () => markWillChange(chunks, false),
  })
}

/**
 * Scroll-triggered chunk reveal.
 * @param {React.RefObject<HTMLElement>} ref
 * @param {object} options
 * @param {"text"|"block"} [options.type="text"]
 * @param {number} [options.stagger=0.06]
 * @param {number} [options.duration=0.8]
 * @param {string} [options.ease="power3.out"]
 * @param {number} [options.y=60]
 * @param {string} [options.start="top 85%"]
 * @param {boolean} [options.debug=false] — ScrollTrigger markers
 * @param {boolean} [options.batch] — force/disable ScrollTrigger.batch
 * @param {"word"|"line"} [options.chunk]
 * @param {number} [options.clump]
 */
export function useScrollReveal(ref, options = {}) {
  const type = options.type === 'block' ? 'block' : 'text'
  const stagger = options.stagger ?? DEFAULT_STAGGER
  const duration = options.duration ?? DEFAULT_DURATION
  const ease = options.ease ?? DEFAULT_EASE
  const y = options.y ?? DEFAULT_Y
  const start = options.start ?? DEFAULT_START
  const debug = Boolean(options.debug)
  const batchOpt = options.batch
  const chunk = options.chunk
  const clump = options.clump

  useLayoutEffect(() => {
    const root = ref?.current
    if (!root) return undefined

    if (prefersReducedMotion()) {
      root.setAttribute('data-reveal-ready', '')
      return undefined
    }

    // Split once. Re-splitting on breakpoint changes would replace React-owned
    // DOM (links, clicks) with raw HTML and drop event handlers.
    const snapshot = root.innerHTML
    const mobileInit = window.matchMedia('(max-width: 767px)').matches
    const chunks =
      type === 'text'
        ? collectTextChunks(root, { chunk, clump, mobile: mobileInit })
        : collectBlockChunks(root)

    if (!chunks.length) {
      root.setAttribute('data-reveal-ready', '')
      return undefined
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions

          if (reduceMotion) {
            gsap.set(chunks, { clearProps: 'transform,opacity' })
            root.setAttribute('data-reveal-ready', '')
            return undefined
          }

          // Mobile: shorter travel + tighter stagger (fewer, cheaper tweens).
          const fromY = isMobile ? Math.min(36, y) : y
          const amount = isMobile ? stagger * 0.55 : stagger

          gsap.set(chunks, { y: fromY, opacity: 0 })
          root.setAttribute('data-reveal-ready', '')

          const useBatch = batchOpt ?? (type === 'block' && chunks.length >= BATCH_MIN)
          const tween = { y: fromY, duration, ease, stagger: amount }

          if (useBatch) {
            ScrollTrigger.batch(chunks, {
              start,
              markers: debug,
              interval: 0.12,
              batchMax: isMobile ? 4 : 8,
              onEnter: (els) => playChunks(els, tween),
              onEnterBack: (els) => playChunks(els, tween),
              onLeave: (els) => reverseChunks(els, tween),
              onLeaveBack: (els) => reverseChunks(els, tween),
            })
          } else {
            gsap.to(chunks, {
              y: 0,
              opacity: 1,
              duration,
              ease,
              stagger: amount,
              overwrite: 'auto',
              onStart: () => markWillChange(chunks, true),
              onComplete: () => markWillChange(chunks, false),
              onReverseComplete: () => markWillChange(chunks, false),
              scrollTrigger: {
                trigger: root,
                start,
                // play on enter / enter-back, reverse on leave / leave-back
                toggleActions: 'play reverse play reverse',
                markers: debug,
              },
            })
          }

          return undefined
        },
      )
    }, root)

    return () => {
      ctx.revert()
      if (type === 'text') root.innerHTML = snapshot
      root.removeAttribute('data-reveal-ready')
    }
  }, [ref, type, stagger, duration, ease, y, start, debug, batchOpt, chunk, clump])
}
