import schoolyard from '../assets/images/Supporting-Education-Empowering-Futures.jpg'
import classroom from '../assets/images/Gilbert-Kwizera-Charity-Support-for-Uganda-Students-Drive.jpg'
import salim from '../assets/images/He-Battled-Cancer-for-24-Years.jpg'
import institute from '../assets/images/ccf-uci.jpg'

export const projects = [
  {
    slug: 'supporting-education-empowering-futures',
    title: 'Supporting Education, Empowering Futures',
    category: 'Community development',
    date: '19 March 2026',
    image: schoolyard,
    imageAlt: 'Primary pupils holding new exercise books outside their school',
    summary:
      'Scholastic materials for Divine Mercy Nursery & Primary School in Kiko, Fort Portal: books, pens, pencils, rulers, rubbers, and learning charts.',
    paragraphs: [
      'On 19 March 2026, Divine Mercy Nursery & Primary School in Kiko, along Kamwenge Road in Fort Portal, received a donation of scholastic materials from Gilbert Kevin Jimmy Kwizera. The gift was part of his ongoing support for education and community development.',
      'The materials were everyday tools that change a classroom: exercise books, pens, pencils, rulers, rubbers, and learning charts. He was not present in person. The pupils’ response was. School director Rev. Fr. Christopher Mukidi said, “I was also surprised by how happy the children were. I believe the parents are just as glad.”',
      'The published account of the gift is straightforward. Access to a decent education should not stop because basic tools are missing. The support is practical, and it goes directly to learners and the community around them.',
    ],
    tags: ['Education', 'Empowering', 'Supporting'],
    gallery: [
      {
        src: classroom,
        alt: 'Staff and pupils with donated scholastic materials inside a classroom',
      },
    ],
  },
  {
    slug: 'he-battled-cancer-for-24-years',
    title: 'He Battled Cancer for 24 Years',
    category: 'Cancer care',
    date: '2006–2007',
    image: salim,
    imageAlt: 'Portrait of Salim Bwagu, published with his cancer-care story',
    summary:
      'Salim Bwagu lived with Hodgkin’s lymphoma from childhood. In 2006, support from Gilbert’s charity helped him complete treatment. He was cleared in 2007.',
    paragraphs: [
      'Salim Bwagu was four when his illness began. In 1987, swellings appeared on his neck and wrist. His father, Mzee Sengoba Bwagu, first thought they were boils. A private clinic could not explain them. Mulago Hospital could: a biopsy identified Hodgkin’s lymphoma.',
      'Chemotherapy started in 1988. The treatment was physically punishing, and it worked quickly enough that the family stopped it four months early. The cancer returned in 1996. For years after that, Salim moved between relapse and partial recovery. His family, peasant farmers from Iganga, struggled to raise the Shs 500,000 needed each month for medication.',
      'In 2006, nearly twenty years after the first diagnosis, Salim met Gilbert Kevin Jimmy Kwizera. Through Gilbert’s charity, he received the financial support required to finish the full dosage. In 2007 he was cleared by the National Cancer Institute.',
      'Salim later founded the Chronic Disease Support Organisation to help other patients with the two barriers he knew well: money, and a lack of clear information. The story, as published, leaves three lessons: detect illness early, finish the course of treatment, and remember that community matters.',
    ],
    tags: ['Cancer', 'Care'],
    gallery: [
      {
        src: institute,
        alt: 'Uganda Cancer Institute, where specialised cancer treatment is centred in Kampala',
      },
    ],
  },
]
