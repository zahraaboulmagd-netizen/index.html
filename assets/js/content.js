/*
  ============================================================
  SITE CONTENT — edit this file to update the portfolio.
  ============================================================

  Adding photos to a project:
    1. Put image files in  assets/img/<project-folder>/
    2. Add them to that project's `images` list below:
         { src: 'assets/img/armor/look-01.jpg', caption: 'Look 01, front' }
    3. Optional: `wide: true` makes an image span the full width.
    4. The first image (or `cover`) is used on the home page.

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

  // Put a PDF at this path to show a "Download CV" button. Leave '' to hide.
  cvPdf: '',

  // Put a photo at this path to show it on the About page. Leave '' for none.
  portrait: '',

  intro:
    'Egyptian-American multidisciplinary designer working between clothing, ' +
    'objects and space. Currently studying at Parsons School of Design.',

  quote: {
    text: 'The ultimate hidden truth of the world is that it is something that we make, and could just as easily make differently.',
    author: 'David Graeber'
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

  cv: [
    {
      heading: 'Education',
      items: [
        { title: 'Parsons School of Design', meta: 'New York City', note: 'Design' }
      ]
    },
    {
      heading: 'Areas of Practice',
      items: [
        { title: 'Clothing Design' },
        { title: 'Architecture & Spatial Exploration' },
        { title: 'Conceptual Design' },
        { title: 'Form & Material Studies' }
      ]
    },
    {
      heading: 'Selected Projects',
      items: [
        { title: 'Armor as Everyday Fashion', meta: 'Clothing' },
        { title: 'Shoulder Pads', meta: 'Clothing' },
        { title: 'The Sculptor’s Rest', meta: 'Architecture' }
      ]
    }
  ],

  projects: [
    {
      slug: 'armor',
      title: 'Armor as Everyday Fashion',
      discipline: 'Clothing',
      year: '',          // e.g. '2025'
      type: 'Individual project',
      tags: ['Protection', 'Structure', 'Silhouette'],
      note: 'protection as expression',
      paper: 'pattern',
      summary: 'What would it mean to dress for protection every day?',
      description: [
        'Armor as Everyday Fashion explores the relationship between protection, identity and wearable design.',
        'The project considers how elements traditionally associated with armor — plates, overlaps, ' +
        'reinforced edges — can be translated into the language of everyday clothing, structure and silhouette.'
      ],
      images: [
        { src: 'assets/img/armor/plate-01.svg', caption: 'Plate study — protection', wide: true },
        { src: 'assets/img/armor/plate-02.svg', caption: 'Overlap & articulation' },
        { src: 'assets/img/armor/plate-03.svg', caption: 'Pattern pieces, cut 2' }
      ]
    },
    {
      slug: 'shoulders',
      title: 'Shoulder Pads',
      discipline: 'Clothing',
      year: '',          // e.g. '2025'
      type: 'Individual project',
      tags: ['Volume', 'Form', 'Body'],
      note: 'form follows feeling',
      paper: 'pattern',
      summary: 'The shoulder as a sculptural space.',
      description: [
        'Shoulder Pads is a design study investigating the shoulder as a sculptural space.',
        'The work explores exaggerated volume, silhouette, and the shifting relationship between ' +
        'a garment and the body underneath it.'
      ],
      images: [
        { src: 'assets/img/shoulders/plate-01.svg', caption: 'Volume study 01', wide: true },
        { src: 'assets/img/shoulders/plate-02.svg', caption: 'Volume study 02' },
        { src: 'assets/img/shoulders/plate-03.svg', caption: 'Silhouette, front & side' }
      ]
    },
    {
      slug: 'sculptors-rest',
      title: 'The Sculptor’s Rest',
      discipline: 'Architecture',
      year: '',          // e.g. '2025'
      type: 'Studio project',
      tags: ['Studio', 'Workshop', 'Gallery'],
      note: 'space for making',
      paper: 'drafting',
      summary: 'A place to make, show, and rest.',
      description: [
        'The Sculptor’s Rest is an exploration of architecture as creative infrastructure — ' +
        'a building organised around the rhythm of an artist’s day.',
        'Studio, workshop, gallery and a quiet place to rest are arranged so that making and ' +
        'showing work sit side by side, connected by light and circulation.'
      ],
      images: [
        { src: 'assets/img/sculptors-rest/plate-01.svg', caption: 'Elevation', wide: true },
        { src: 'assets/img/sculptors-rest/plate-02.svg', caption: 'Ground floor plan, 1:100' },
        { src: 'assets/img/sculptors-rest/plate-03.svg', caption: 'Section A–A' }
      ]
    }
  ]
};
