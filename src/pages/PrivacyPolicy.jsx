import LegalPage from '../components/LegalPage'
import { profile } from '../data/profile'

const sections = [
  {
    title: '1. Introduction',
    body: `This policy explains how personal information is handled on the website of ${profile.name}, ${profile.location}. The site publishes information about humanitarian work. It does not sell products or take payments.`,
  },
  {
    title: '2. Information we receive',
    body: `If you use the contact form, we receive the name, email address, and message you submit. The form opens an email to ${profile.email}. We do not store those messages in a separate database on this site. The host may keep standard technical logs, such as browser type and pages visited, to operate the site.`,
  },
  {
    title: '3. How information is used',
    body: 'Messages are used only to reply. They are not sold, rented, or added to a mailing list. Information about a person receiving care is kept confidential and is not published.',
  },
  {
    title: '4. Retention',
    body: `Correspondence is kept only for as long as needed to respond. You may request deletion by emailing ${profile.email}.`,
  },
  {
    title: '5. Your requests',
    body: `You may browse without sending a message. To ask what is held about an exchange, or to request a correction or deletion, write to ${profile.email}.`,
  },
  {
    title: '6. Contact',
    body: `Questions about this policy: ${profile.email}.`,
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How this website handles information sent through the contact form."
    >
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-base font-medium text-ink">{section.title}</h2>
          <p className="mt-2">{section.body}</p>
        </section>
      ))}
    </LegalPage>
  )
}
