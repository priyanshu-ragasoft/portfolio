import formalPortrait from '../assets/images/gilbert-kwizera-lounge-armchair.jpg'
import lobbyPortrait from '../assets/images/gilbert-kwizera-marble-lobby.jpg'
import officePortrait from '../assets/images/gilbert-kwizera-office-standing.jpg'
import dubaiWalking from '../assets/images/gilbert-kwizera-dubai-walking.jpg'
import hotelPortrait from '../assets/images/gilbert-kwizera-hotel-entrance.jpg'
import executivePortrait from '../assets/images/gilbert-kwizera-executive.jpg'
import yachtPortrait from '../assets/images/gilbert-kwizera-dubai-marina-yacht.jpg'
import { arc, project } from '../assets/maps/projection'
import { journey } from './profile'

const uganda = { id: 'uganda', label: 'Uganda', note: 'Born', align: 'left', ...project(32.5825, 0.3476) }
const bangalore = { id: 'bangalore', label: 'Bangalore', note: 'Study', align: 'right', ...project(77.5946, 12.9716) }
const ugandaMine = { id: 'uganda-mine', label: 'Uganda', note: 'Mine', align: 'left', ...project(30.2744, 0.6545) }
const ethiopia = { id: 'ethiopia', label: 'Ethiopia', note: 'Mine', align: 'up', ...project(40.5, 9.15) }
const dubai = { id: 'dubai', label: 'Dubai', note: 'Business', align: 'up', ...project(55.2708, 25.2048) }
const southAfrica = { id: 'south-africa', label: 'South Africa', note: 'Travel', align: 'down', ...project(26.2, -29.0) }
const russia = { id: 'russia', label: 'Russia', note: 'Travel', align: 'up', ...project(37.6, 55.75) }

export const journeyPins = [uganda, bangalore, ugandaMine, ethiopia, dubai, southAfrica, russia]

export const journeyPlaces = []

const legs = [
  [uganda, bangalore, 18, 'Studies in Bangalore', -10],
  [bangalore, ugandaMine, 16, 'Mining in Uganda', 8],
  [ugandaMine, ethiopia, 14, 'Mining in Ethiopia', 6],
  [ethiopia, dubai, 15, 'Business in Dubai', 0],
  [dubai, southAfrica, 20, 'Traveled in South Africa', 12],
  [southAfrica, russia, 26, 'Traveled in Russia', -18],
]

export const journeyRoutes = legs.map(([from, to, lift, caption, side], index) => ({
  id: `${from.id}-${to.id}`,
  fromId: from.id,
  toId: to.id,
  d: arc(from, to, lift, side),
  from: from.label,
  to: to.label,
  caption,
  at: index + 0.25,
  duration: 0.65,
}))

const links = [
  { href: '/about', cta: 'Read the profile' },
  { href: '/about', cta: 'Read the profile' },
  { href: '/projects', cta: 'See the work' },
  { href: '/projects', cta: 'See the work' },
  { href: '/about', cta: 'Read the profile' },
  { href: '/about', cta: 'Read the story' },
  { href: '/about', cta: 'Read the profile' },
]

const extras = [
  {
    id: 'born-uganda',
    pin: 'uganda',
    year: '1971',
    shortLocation: 'Uganda',
    location: 'Kampala, Uganda',
    image: formalPortrait,
    imageAlt: 'Portrait of Gilbert Kevin Jimmy Kwizera, Born in Uganda',
    camera: uganda,
  },
  {
    id: 'study-bangalore',
    pin: 'bangalore',
    year: 'Studies',
    shortLocation: 'Bangalore',
    location: 'Bangalore, India',
    image: lobbyPortrait,
    imageAlt: 'Gilbert Kevin Jimmy Kwizera, academic and business studies in Bangalore',
    camera: bangalore,
    route: 'uganda-bangalore',
  },
  {
    id: 'mine-uganda',
    pin: 'uganda-mine',
    year: 'Mining',
    shortLocation: 'Uganda',
    location: 'Uganda',
    image: officePortrait,
    imageAlt: 'Responsible mining initiatives and community empowerment in Uganda',
    camera: ugandaMine,
    route: 'bangalore-uganda-mine',
  },
  {
    id: 'mine-ethiopia',
    pin: 'ethiopia',
    year: 'Mining',
    shortLocation: 'Ethiopia',
    location: 'Ethiopia',
    image: executivePortrait,
    imageAlt: 'Gilbert Kevin Jimmy Kwizera, mining initiatives and developmental leadership in Ethiopia',
    camera: ethiopia,
    route: 'uganda-mine-ethiopia',
  },
  {
    id: 'business-dubai',
    pin: 'dubai',
    year: 'Dubai',
    shortLocation: 'Dubai',
    location: 'Dubai, UAE',
    image: dubaiWalking,
    imageAlt: 'Gilbert Kevin Jimmy Kwizera, international business consulting in Dubai',
    camera: dubai,
    route: 'ethiopia-dubai',
  },
  {
    id: 'travel-south-africa',
    pin: 'south-africa',
    year: 'Travel',
    shortLocation: 'S. Africa',
    location: 'South Africa',
    image: yachtPortrait,
    imageAlt: 'Pan-African diplomatic travels and alliances in South Africa',
    camera: southAfrica,
    route: 'dubai-south-africa',
  },
  {
    id: 'travel-russia',
    pin: 'russia',
    year: 'Travel',
    shortLocation: 'Russia',
    location: 'Moscow, Russia',
    image: hotelPortrait,
    imageAlt: 'International diplomacy and global relations in Russia',
    camera: russia,
    route: 'south-africa-russia',
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
