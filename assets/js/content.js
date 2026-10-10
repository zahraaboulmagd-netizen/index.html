/*
  ============================================================
  SITE CONTENT — edit this file to update the portfolio.
  ============================================================

  Photo of yourself (landing + About page):
    Put the file in assets/img/ and set  portrait: 'assets/img/me.jpg'

  Project photos (3 per project):
    1. Put image files in  assets/img/<project-folder>/
    2. List them in that project's `images` (3 per project):
         { src: 'assets/img/armor/look-01.jpg', caption: 'Look 01, front' }
    3. The first image is the large cover; images 2 and 3 sit side by side.

  Adding a new project: copy one { ... } block in `projects`,
  give it a unique `slug` (used in the URL, e.g. #/work/my-project).
*/

window.SITE = {
  name: 'Zahra Aboul-Magd',
  firstName: 'Zahra',
  lastName: 'Aboul-Magd',
  role: 'Multidisciplinary Designer',
  location: 'New York City',
  school: 'Parsons School of Design',
  email: 'zahra.aboulmagd@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zahra-aboul-magd-b73965349/' }
    // { label: 'Instagram', href: 'https://instagram.com/...' },
  ],

  // Photo of yourself. Leave '' to show the monogram placeholder.
  portrait: 'assets/img/portrait.jpg',

  intro:
    'Egyptian-American multidisciplinary designer working between clothing, ' +
    'objects and space. Currently studying at Parsons School of Design.',

  quote: {
    text: 'The ultimate hidden truth of the world is that it is something that we make, and could just as easily make differently.',
    author: 'David Graeber'
  },

  // Names shown for each discipline in the table of contents.
  disciplineNames: {
    Clothing: 'Clothing Design',
    Architecture: 'Architecture'
  },

  about: {
    statement: 'Design as a way of questioning the world around us.',
    paragraphs: [
      "I'm Zahra Aboul-Magd, an Egyptian-American multidisciplinary designer based in New York City.",
      'My practice moves between clothing, objects, spatial exploration and material experimentation. ' +
      'I am interested in how the things we wear and the spaces we move through shape how we feel and how we present ourselves.',
      'This portfolio brings together selected projects across disciplines.'
    ],
    details: [
      ['Education', 'Parsons School of Design'],
      ['Based in', 'New York City, NY'],
      ['Practice', 'Clothing, Architecture, Objects']
    ]
  },

  experience: [
    {
      org: 'Sidste Mole & Sidste Skole',
      role: 'Creative Collective Volunteer',
      location: 'Copenhagen, Denmark',
      date: '2026'
    },
    {
      org: 'Pa Den Anden Side',
      role: 'Exhibition and Artist Support Volunteer',
      location: 'Vestamon, Denmark',
      date: '2026'
    },
    {
      org: 'Watt Pictures',
      role: 'Production Intern',
      location: 'New York, NY',
      date: 'January 2025 – May 2025'
    },
    {
      org: 'Hirshhorn Museum and Sculpture Garden, The Smithsonian',
      role: 'Intern',
      location: 'Washington, DC',
      roles: [
        { title: 'Teen Council Intern, ARTLAB', date: 'August 2021 – June 2023' },
        { title: 'Rep My City Intern', date: 'August 2020 – June 2021' }
      ]
    },
    {
      org: 'Camp Anokijig',
      role: 'Volunteer Camp Counselor & Store Manager',
      location: 'Plymouth, Wisconsin',
      date: 'Summers 2019 – 2022'
    }
  ],

  accomplishments: [
    {
      title: '“First Things” Parsons Exhibition',
      date: 'February 2024',
      text: 'My sculpture was selected for the first ever Parsons First-Year Student Exhibition, ' +
            'showcased at the Aronson Gallery and the Anna-Maria and Stephen Kellen Gallery.'
    }
  ],

  // Every project uses the same layout: keywords, title, subtitle,
  // credit line, summary, and three images.
  projects: [
    {
      slug: 'armor',
      title: 'Armor as Everyday Fashion',
      discipline: 'Clothing',
      subtitle: 'To let people exist freely, without constantly looking over their shoulder.',
      credit: ['Parsons School of Design', 'Integrated Design Studio 2', 'Prof. Daniela Jacobs', '2025'],
      keywords: ['Fashion', 'Photography', 'Adobe Premiere Pro', 'Jewelry Design'],
      note: 'protection as expression',
      paper: 'pattern',
      summary: [
        'This project explored how individuals can protect themselves amid growing mistrust in the police. ' +
        'I imagined a world where fashion and protection coexist, allowing people to feel safe through what they wear.',
        'Beginning with a mood board, I developed a visual universe inspired by Ancient Egyptian protective symbols ' +
        'and everyday accessories, such as rings, headscarves, and necklaces. These references informed a collection ' +
        'of wearable pieces that reimagine protection through personal style.',
        'The final pieces were presented through an animated-style advertisement, illustrating their function and ' +
        'bringing the imagined world to life.'
      ],
      images: [
        { src: 'assets/img/armor/01.jpg', caption: 'Mood board' },
        { src: 'assets/img/armor/02.jpg', caption: 'Final piece' },
        { src: 'assets/img/armor/03.jpg', caption: 'Final piece' }
      ]
    },
    {
      slug: 'shoulders',
      title: 'Shoulder Pads',
      discipline: 'Clothing',
      subtitle: 'Unisex garment aimed to release tension.',
      credit: ['Parsons School of Design', 'Integrated Design Studio 3', 'Prof. Daniela Jacobs', '2025'],
      keywords: ['Fashion', 'Photography', 'Modular'],
      note: 'form follows feeling',
      paper: 'pattern',
      summary: [
        'Building on my exploration of armor as wearable garments, this project focused on designing for the needs ' +
        'of others. Through a study of body tension among my peers, I identified the shoulders as a key area of focus.',
        'Inspired by football pads and traditional corsets, I created a leather garment that challenges ideas of ' +
        'masculinity, femininity, strength, and delicacy. Using muslin draping and leather construction, I explored ' +
        'the relationship between protection and constraint while challenging myself to work with a new material.',
        'Designed to adjust to different body sizes, the final piece also considers sustainability by encouraging ' +
        'versatility and reducing the need for new clothing.'
      ],
      images: [
        { src: 'assets/img/shoulders/01.jpg', caption: 'Front, on the dress form' },
        { src: 'assets/img/shoulders/02.jpg', caption: 'Back, on the dress form' },
        { src: 'assets/img/shoulders/03.jpg', caption: 'Worn' }
      ]
    },
    {
      slug: 'sculptors-rest',
      title: 'The Sculptor’s Rest',
      discipline: 'Architecture',
      subtitle: 'Transforming the Neo Folklore Chair by Rasmus Baekkel from an object into a space.',
      credit: ['DIS — Study Abroad in Denmark', 'Interior Architecture Studio', 'Prof. Tina Midtgaard', '2026'],
      keywords: ['Architecture', 'Interior Design', 'Prototyping'],
      note: 'space for making',
      paper: 'drafting',
      summary: [
        'Based at the Church of the Holy Spirit in Copenhagen, this project explored how to translate a chair from ' +
        'the Chair Makers Exhibition into a spatial installation.',
        'Inspired by the chair’s craftsmanship, curves, and blend of Classicism and Modernism, I designed an immersive ' +
        'wooden structure featuring a Modernist-inspired conversation pit and curved entrances that create an illusion ' +
        'of a flat wall.',
        'As my first Interior Architecture project, it introduced me to spatial design through conceptual drawings, ' +
        'architectural plans, and a hand-built 1:20 scale model. The project explored how to reinterpret an existing ' +
        'design while preserving its original character and visual language.'
      ],
      images: [
        { src: 'assets/img/sculptors-rest/01.jpg', caption: '1:20 scale model' },
        { src: 'assets/img/sculptors-rest/02.jpg', caption: '1:20 scale model, interior' },
        { src: 'assets/img/sculptors-rest/03.jpg', caption: 'Conceptual drawing' }
      ]
    }
  ]
};
