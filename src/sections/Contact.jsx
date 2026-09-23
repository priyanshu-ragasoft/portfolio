import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { gsap } from '../animations/gsapConfig'
import Button from '../components/Button'
import Container from '../components/Container'
import { profile } from '../data/profile'
import { useGSAP } from '../hooks/useGSAP'

const initial = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Use an email address we can reply to.'
  }
  if (values.message.trim().length < 12) {
    errors.message = 'Add a few lines about how you would like to connect.'
  }
  return errors
}

export default function Contact({ standalone = false }) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useGSAP(() => {
    if (!sent) return undefined
    const node = document.getElementById('contact-thanks')
    if (!node) return undefined
    gsap.fromTo(node, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
    return undefined
  }, [sent])

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const subject = encodeURIComponent(`Note from ${values.name.trim()}`)
    const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const fieldClass = (name) =>
    `w-full border bg-ivory px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 ${
      errors[name] ? 'border-bronze' : 'border-line focus:border-ink'
    }`

  return (
    <section
      id="contact"
      data-scene="contact"
      className={standalone ? 'bg-paper pt-32 pb-20 md:pt-40 md:pb-32' : 'bg-paper py-20 md:py-32'}
    >
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-contact-intro className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            Contact
          </p>
          {standalone ? (
            <h1 data-contact-intro className="display mt-4 text-4xl text-ink sm:text-6xl">
              Let&apos;s Create Meaningful Impact.
            </h1>
          ) : (
            <h2 data-contact-intro className="display mt-4 text-4xl text-ink sm:text-6xl">
              Let&apos;s Create Meaningful Impact.
            </h2>
          )}
          <p data-contact-intro className="mt-5 max-w-md text-base leading-relaxed text-muted">
            For conversations about the foundations, education support, or a collaboration, write
            directly. A short note is enough.
          </p>
          <ul className="mt-10 space-y-5 text-sm text-ink">
            <li data-contact-item className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
            <li data-contact-item className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
              <a href={profile.phoneHref} className="hover:text-bronze">
                {profile.phone}
              </a>
            </li>
            <li data-contact-item className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
              <a href={`mailto:${profile.email}`} className="hover:text-bronze">
                {profile.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="border border-line bg-ivory p-6 sm:p-8 lg:col-span-6 lg:col-start-7">
          {sent ? (
            <div id="contact-thanks">
              <h3 className="display text-4xl text-ink">Thank you.</h3>
              <p className="mt-4 text-muted">
                Your email app should open with this note addressed to {profile.email}. If it does
                not, you can call {profile.phone}.
              </p>
              <Button className="mt-8" onClick={() => setSent(false)}>
                Write another note
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="space-y-5">
                <div data-field>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={fieldClass('name')}
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-sm text-bronze">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div data-field>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={fieldClass('email')}
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-2 text-sm text-bronze">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div data-field>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={onChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={fieldClass('message')}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-sm text-bronze">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <Button type="submit" data-submit className="mt-6">
                Submit
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
