import formalPortrait from '../assets/images/about-kevin.jpg'
import dubaiOffice from '../assets/images/PIO-System-and-Gilbert-Kevin-Jimmy-Kwizeras-Innovation-Role.jpg'
import salim from '../assets/images/He-Battled-Cancer-for-24-Years.jpg'
import haven from '../assets/images/havenwelfare.jpg'
import schoolyard from '../assets/images/Supporting-Education-Empowering-Futures.jpg'
import { arc, project } from '../assets/maps/projection'
import { journey } from './profile'

const uganda = { id: 'uganda', label: 'Uganda', note: 'Born', ...project(32.5825, 0.3476) }
const bangalore = { id: 'bangalore', label: 'Bangalore', note: 'Study', align: 'right', ...project(77.5946, 12.9716) }
const ethiopia = { id: 'ethiopia', label: 'Ethiopia', note: 'Mine', align: 'up', ...project(40.5, 9.15) }
const dubai = { id: 'dubai', label: 'Dubai', note: 'Business', align: 'up', ...project(55.2708, 25.2048) }
const southAfrica = { id: 'south-africa', label: 'South Africa', note: 'Travelled', align: 'down', ...project(26.2, -29.0) }
const russia = { id: 'russia', label: 'Russia', note: 'Travelled', align: 'down', ...project(37.6, 55.75) }

export const journeyPins = [uganda, dubai]

export const journeyPlaces = [bangalore, ethiopia, southAfrica, russia]

const DRAW = 0.68
const legs = [
  [uganda, bangalore, 14, 'Study in Bangalore', 0],
  [bangalore, uganda, -12, 'Mine in Uganda', 0],
  [uganda, ethiopia, 10, 'Mine in Ethiopia', 0],
  [ethiopia, dubai, 18, 'Business in Dubai', 0],
  [dubai, southAfrica, 12, 'Travelled in South Africa', -36],
  [southAfrica, russia, 8, 'Travelled in Russia', -28],
]

export const journeyRoutes = legs.map(([from, to, lift, caption, side], index) => ({
  id: `${from.id}-${to.id}`,
  fromId: from.id,
  toId: to.id,
  d: arc(from, to, lift, side),
  from: from.label,
  to: to.label,
  caption,
  at: 0.4 + index * DRAW,
  duration: DRAW,
}))

const links = [
  { href: '/about', cta: 'Read the profile' },
  { href: '/about', cta: 'Read the profile' },
  { href: '/about', cta: 'Read the profile' },
  { href: '/projects/he-battled-cancer-for-24-years', cta: 'Read the story' },
  { href: '/#impact', cta: 'See the work' },
  { href: '/projects/supporting-education-empowering-futures', cta: 'Read the project' },
]

const extras = [
  {
    id: 'kampala',
    pin: 'uganda',
    year: '1971',
    shortLocation: 'Kampala',
    location: 'Kampala, Uganda',
    image: formalPortrait,
    imageAlt: 'Portrait of Gilbert Kevin Jimmy Kwizera',
    camera: uganda,
  },
  {
    id: 'studies',
    pin: 'uganda',
    year: 'Studies',
    shortLocation: 'Kampala',
    location: 'Kampala, Uganda',
    image: formalPortrait,
    imageAlt: 'Portrait of Gilbert Kevin Jimmy Kwizera',
    camera: uganda,
  },
  {
    id: 'emirates',
    pin: 'dubai',
    year: 'Emirates',
    shortLocation: 'UAE',
    location: 'United Arab Emirates',
    image: dubaiOffice,
    imageAlt: 'Gilbert Kevin Jimmy Kwizera seated in an office overlooking Dubai',
    camera: dubai,
    route: 'ethiopia-dubai',
  },
  {
    id: 'care',
    pin: 'uganda',
    year: '2006',
    shortLocation: 'Uganda',
    location: 'Uganda',
    image: salim,
    imageAlt: 'Portrait of Salim Bwagu, published with his cancer-care story',
    camera: uganda,
    route: 'uganda-ethiopia',
  },
  {
    id: 'foundations',
    pin: 'uganda',
    year: 'Foundations',
    shortLocation: 'Uganda',
    location: 'Uganda',
    image: haven,
    imageAlt: 'A caregiver speaking with a man during a moment of support',
    camera: uganda,
  },
  {
    id: 'fort-portal',
    pin: 'uganda',
    year: '2026',
    shortLocation: 'Fort Portal',
    location: 'Fort Portal, Uganda',
    image: schoolyard,
    imageAlt: 'Primary pupils holding new exercise books outside their school',
    camera: uganda,
  },
]

export const journeyChapters = extras.map((extra, index) => {
  const source = journey[index]
  return {
    ...extra,
    index: String(index + 1).padStart(2, '0'),
    date: source.date,
    title: source.title,
    description: source.text,
    href: links[index].href,
    cta: links[index].cta,
  }
})

export const JOURNEY_SPAN = journeyChapters.length
