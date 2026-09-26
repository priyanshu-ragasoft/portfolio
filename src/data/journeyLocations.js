import formalPortrait from '../assets/images/gilbert-kwizera-lounge-armchair.jpg'
import lobbyPortrait from '../assets/images/gilbert-kwizera-marble-lobby.jpg'
import officePortrait from '../assets/images/gilbert-kwizera-office-standing.jpg'
import dubaiWalking from '../assets/images/gilbert-kwizera-dubai-walking.jpg'
import executivePortrait from '../assets/images/gilbert-kwizera-executive.jpg'
import ccfCare from '../assets/images/ccf-cancer-care-compassion.jpg'
import yachtPortrait from '../assets/images/gilbert-kwizera-dubai-marina-yacht.jpg'
import { arc, project } from '../assets/maps/projection'
import { journey } from './profile'

// Primary Chapter Milestones
const uganda = { id: 'uganda', label: 'Uganda', note: 'Born 1971', align: 'up', ...project(32.5825, 2.2) }
const india = { id: 'india', label: 'India', note: 'Studies (1993-2012)', align: 'left', ...project(74.8560, 14.5) }
const eastAfrica = { id: 'east-africa', label: 'East Africa', note: 'Gold 2010', align: 'right', ...project(43.5, 4.5) }
const panAfrica = { id: 'pan-africa', label: 'Pan-Africa', note: 'Charity 2014', align: 'left', ...project(25.0, -28.0) }
const dubai = { id: 'dubai', label: 'Dubai', note: 'Base 2016', align: 'up', ...project(55.2708, 25.2048) }

// 18 Individual Destination Countries (Cleanly positioned with zero overlap)
const qatar = { id: 'qatar', label: 'Qatar', mini: true, align: 'left', ...project(51.53, 25.28) }
const turkey = { id: 'turkey', label: 'Turkey', mini: true, align: 'up', ...project(32.85, 39.93) }
const france = { id: 'france', label: 'France', mini: true, align: 'up', ...project(2.35, 48.86) }
const spain = { id: 'spain', label: 'Spain', mini: true, align: 'left', ...project(-3.70, 40.42) }
const italy = { id: 'italy', label: 'Italy', mini: true, align: 'right', ...project(12.49, 41.90) }
const thailand = { id: 'thailand', label: 'Thailand', mini: true, align: 'right', ...project(100.50, 13.75) }
const singapore = { id: 'singapore', label: 'Singapore', mini: true, align: 'right', ...project(103.82, 1.35) }
const indonesia = { id: 'indonesia', label: 'Indonesia', mini: true, align: 'down', ...project(106.84, -6.21) }
const hongkong = { id: 'hongkong', label: 'Hong Kong', mini: true, align: 'right', ...project(114.16, 22.32) }
const china = { id: 'china', label: 'China', mini: true, align: 'up', ...project(116.40, 39.90) }
const kenya = { id: 'kenya', label: 'Kenya', mini: true, align: 'right', ...project(38.50, -0.80) }
const rwanda = { id: 'rwanda', label: 'Rwanda', mini: true, align: 'right', ...project(31.20, -1.80) }
const burundi = { id: 'burundi', label: 'Burundi', mini: true, align: 'left', ...project(28.80, -4.50) }
const congo = { id: 'congo', label: 'Congo', mini: true, align: 'left', ...project(17.00, -2.50) }
const tanzania = { id: 'tanzania', label: 'Tanzania', mini: true, align: 'right', ...project(37.50, -6.50) }
const sudan = { id: 'sudan', label: 'Sudan', mini: true, align: 'up', ...project(31.50, 16.50) }
const ethiopia = { id: 'ethiopia', label: 'Ethiopia', mini: true, align: 'right', ...project(40.00, 9.50) }
const southAfrica = { id: 'south-africa', label: 'South Africa', mini: true, align: 'right', ...project(29.00, -26.00) }

export const journeyPins = [uganda, india, eastAfrica, panAfrica, dubai]

export const journeyPlaces = [
  qatar, turkey, france, spain, italy,
  thailand, singapore, indonesia, hongkong, china,
  kenya, rwanda, burundi, congo, tanzania, sudan, ethiopia, southAfrica
]

const legs = [
  // Stages 1–6 Routes (Each has its single clean popup)
  [uganda, india, 18, 'Higher Studies in India (1993–1999)', -10, 0.25, 0.65, true],
  [india, uganda, 16, 'Internet Pioneer & Enterprise in Uganda (2000)', 8, 1.25, 0.65, true],
  [uganda, eastAfrica, 14, 'Gold Operations & Regional Trade (2010)', 6, 2.25, 0.65, true],
  [eastAfrica, panAfrica, 18, 'Cancer Charity & Haven Welfare (2014)', -10, 3.25, 0.65, true],
  [panAfrica, dubai, 20, 'Settled in Dubai (2016)', 8, 4.25, 0.65, true],

  // Stage 7: Individual Direct Routes from Dubai to all 18 Countries
  // Single master popup badge for Stage 7 to prevent cluttering
  [dubai, qatar, 10, 'Global Travels: 18 Countries across Asia, Europe & Africa', 4, 6.05, 0.65, true],
  [dubai, turkey, 16, 'Travels to Turkey', 6, 6.08, 0.45, false],
  [dubai, italy, 20, 'Travels to Italy', 8, 6.12, 0.45, false],
  [dubai, france, 22, 'Travels to France', 10, 6.15, 0.45, false],
  [dubai, spain, 22, 'Travels to Spain', 12, 6.18, 0.45, false],
  [dubai, sudan, 14, 'Travels to Sudan', -6, 6.22, 0.45, false],
  [dubai, ethiopia, 14, 'Travels to Ethiopia', -6, 6.25, 0.45, false],
  [dubai, kenya, 16, 'Travels to Kenya', -8, 6.28, 0.45, false],
  [dubai, rwanda, 18, 'Travels to Rwanda', -10, 6.32, 0.45, false],
  [dubai, burundi, 18, 'Travels to Burundi', -10, 6.35, 0.45, false],
  [dubai, tanzania, 18, 'Travels to Tanzania', -10, 6.38, 0.45, false],
  [dubai, congo, 20, 'Travels to Congo', -12, 6.42, 0.45, false],
  [dubai, southAfrica, 22, 'Travels to South Africa', -12, 6.45, 0.45, false],
  [dubai, thailand, 20, 'Travels to Thailand', -10, 6.48, 0.45, false],
  [dubai, singapore, 22, 'Travels to Singapore', -12, 6.52, 0.45, false],
  [dubai, indonesia, 22, 'Travels to Indonesia', -14, 6.55, 0.45, false],
  [dubai, hongkong, 24, 'Travels to Hong Kong', -14, 6.58, 0.45, false],
  [dubai, china, 26, 'Travels to China', -16, 6.62, 0.45, false],
]

export const journeyRoutes = legs.map(([from, to, lift, caption, side, at, duration, hasPopup = true]) => ({
  id: `${from.id}-${to.id}`,
  fromId: from.id,
  toId: to.id,
  d: arc(from, to, lift, side),
  from: from.label,
  to: to.label,
  caption,
  at,
  duration,
  hasPopup,
}))

const links = [
  { href: '/about', cta: 'Read the profile' },
  { href: '/about', cta: 'View education notes' },
  { href: '/projects', cta: 'See enterprise ventures' },
  { href: '/about', cta: 'Read mineral & gold story' },
  { href: '/#impact', cta: 'Explore CCF & Haven' },
  { href: '/about', cta: 'Dubai headquarters' },
  { href: '/projects', cta: 'Explore PIO & Blockchain' },
]

const extras = [
  {
    id: 'born-uganda',
    pin: 'uganda',
    year: '1971',
    shortLocation: 'Uganda',
    location: 'Kampala, Uganda',
    image: formalPortrait,
    imageAlt: 'Portrait of Gilbert Kevin Jimmy Kwizera, Born in Uganda in 1971',
    camera: uganda,
  },
  {
    id: 'studies-india',
    pin: 'india',
    year: '1993–1999',
    shortLocation: 'India',
    location: 'Mahaveera & Mangalore, India',
    image: lobbyPortrait,
    imageAlt: 'Gilbert Kevin Jimmy Kwizera, Higher Studies at Mahaveera College and Mangalore University',
    camera: india,
    route: 'uganda-india',
  },
  {
    id: 'enterprise-uganda',
    pin: 'uganda',
    year: '2000',
    shortLocation: 'Uganda',
    location: 'Kampala, Uganda',
    image: officePortrait,
    imageAlt: 'Pioneering early internet café and multi-sector enterprise growth in Uganda',
    camera: uganda,
    route: 'india-uganda',
  },
  {
    id: 'gold-uganda',
    pin: 'east-africa',
    year: '2010',
    shortLocation: 'Gold Mine',
    location: 'Uganda & East Africa',
    image: executivePortrait,
    imageAlt: 'Responsible gold business and mineral trading initiatives in Uganda',
    camera: eastAfrica,
    route: 'uganda-east-africa',
  },
  {
    id: 'foundations-ccf',
    pin: 'pan-africa',
    year: '2014',
    shortLocation: 'Charity',
    location: 'Pan-African Outreach',
    image: ccfCare,
    imageAlt: 'Cancer Charity Foundation and Haven Welfare founded in 2014',
    camera: panAfrica,
    route: 'east-africa-pan-africa',
  },
  {
    id: 'dubai-headquarters',
    pin: 'dubai',
    year: '2016+',
    shortLocation: 'Dubai',
    location: 'Dubai, UAE',
    image: dubaiWalking,
    imageAlt: 'Gilbert Kevin Jimmy Kwizera, settled in Dubai for gold sales, consulting, and asset management',
    camera: dubai,
    route: 'pan-africa-dubai',
  },
  {
    id: 'global-blockchain',
    pin: 'dubai',
    year: '2022–26',
    shortLocation: '18 Nations',
    location: 'Global (18 Countries)',
    image: yachtPortrait,
    imageAlt: 'Blockchain projects, PIO Ecosystem, and travels across 18 countries: Singapore, Indonesia, Hong Kong, China, Turkey, Qatar, South Africa, Spain, France, Italy, Kenya, Rwanda, Sudan, Ethiopia, Tanzania, Congo, Burundi, and Thailand',
    camera: dubai,
    route: 'dubai-qatar',
  },
]

export const journeyChapters = extras.map((extra, index) => {
  const source = journey[index] || {}
  return {
    ...extra,
    index: String(index + 1).padStart(2, '0'),
    date: source.date || extra.year,
    title: source.title || '',
    description: source.text || '',
    href: links[index]?.href || '/about',
    cta: links[index]?.cta || 'Read the profile',
  }
})

export const JOURNEY_SPAN = journeyChapters.length
