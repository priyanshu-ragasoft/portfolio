import { Link } from 'react-router-dom'
import { navLinks, profile, socials } from '../data/profile'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
        <div data-footer-col className="md:col-span-5">
          <Link to="/" aria-label={profile.name} className="inline-flex rounded-lg bg-[#070b16] p-3">
            <Logo className="h-36 w-auto sm:h-44" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
            {profile.name}. Humanitarian leader, international consultant, and volunteer, working
            for dignity-based care and sustainable social impact.
          </p>
        </div>

        <div data-footer-col className="md:col-span-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-paper/85 transition-colors hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-footer-col className="md:col-span-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/85">
            <li>{profile.location}</li>
            <li>
              <a href={profile.phoneHref} className="transition-colors hover:text-paper">
                {profile.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="transition-colors hover:text-paper">
                {profile.email}
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-paper/75 transition-colors hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div data-footer-base className="border-t border-white/10">
        <p className="mx-auto max-w-[1180px] px-5 py-5 text-xs tracking-wide text-mist sm:px-8">
          © 2026 Gilbert Kevin Jimmy Kwizera
        </p>
      </div>
    </footer>
  )
}
