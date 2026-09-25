import { Link } from 'react-router-dom'
import LegalPage from '../components/LegalPage'
import { profile } from '../data/profile'

const sections = [
  {
    title: '1. Acceptance',
    body: `These terms apply to your use of the website of ${profile.name}. If you do not agree, please do not use the site.`,
  },
  {
    title: '2. Purpose of the site',
    body: 'The pages describe published humanitarian, educational, and advisory work. They are provided for general information. They are not medical advice, legal advice, or an offer of services.',
  },
  {
    title: '3. Use of content',
    body: 'You may read the site for personal reference. You may not copy text, photographs, or the name in a way that implies a partnership or endorsement that has not been given in writing.',
  },
  {
    title: '4. Contact messages',
    body: `The contact form opens an email to ${profile.email}. Sending a message does not create a contract or a professional relationship. Do not include medical records, identity documents, or another person’s private details in a first message.`,
  },
  {
    title: '5. External links',
    body: 'Links to other websites, including social channels, are provided for convenience. Those sites have their own terms. A link is not an endorsement.',
  },
  {
    title: '6. Liability',
    body: 'Content may be updated. We are not liable for decisions made only from reading this site, or for any interruption of access.',
  },
  {
    title: '7. Contact',
    body: `Questions about these terms: ${profile.email}.`,
  },
]

export default function TermsConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="The terms for using this website."
    >
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-base font-medium text-ink">{section.title}</h2>
          <p className="mt-2">{section.body}</p>
        </section>
      ))}
      <p className="text-sm">
        See also the <Link to="/privacy" className="font-medium text-ink hover:text-bronze">Privacy Policy</Link>.
      </p>
    </LegalPage>
  )
}
