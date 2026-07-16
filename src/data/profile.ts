/** Public profile copy — sync roles on LinkedIn manually when they change. */
export const profile = {
  name: 'Mehul Sain',
  /** Monogram for header / footer */
  initials: 'MS',
  shortTitle: 'Full-stack developer',
  location: 'Punjab, India',
  headline: 'Building reliable, AI-ready web products.',
  /** Hero title lines (after comma → gradient) */
  heroLead: 'Building reliable,',
  heroAccent: 'AI-ready web products.',
  subhead:
    'MCA at Lovely Professional University. I focus on full-stack delivery, thoughtful UI, and integrations that feel effortless—motion and polish included.',
  badge: 'Full-stack · Modern web products',
  heroStatTitle: 'Open to opportunities',
  heroStatSubtitle: 'Internships · freelance · collaboration',

  /**
   * Hero portrait: place your file at frontend/public/profile-photo.jpg (same folder as favicon).
   * If missing or broken, GitHub avatar is used next; then initials placeholder.
   */
  heroPhoto: '/profile-photo.jpg',
  heroPhotoRemote: 'https://unavatar.io/github/Mehul1311',
  heroPhotoAlt: 'Mehul Sain — portrait',

  links: {
    linkedin: 'https://www.linkedin.com/in/mehulsain/',
    github: 'https://github.com/Mehul1311',
    githubRepos: 'https://github.com/Mehul1311?tab=repositories',
  },

  about: `I'm a passionate Full Stack Developer specializing in the MERN stack—crafting modern, scalable, and user-first web applications that solve complex real-world problems.

Recently, I architected an AI-powered KYC Verification System, integrating EasyOCR to automate intelligent data extraction from identity documents. It's a perfect intersection of robust full-stack engineering and practical artificial intelligence.

I'm constantly pushing my boundaries in web development, algorithms, and AI integrations. My ultimate goal is simple: to build high-impact, efficient software solutions that feel effortless to use.`,

  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'HTML & CSS',
    'Python',
    'UI / UX',
    'REST APIs',
    'MongoDB',
    'Git',
  ],

  marquee: [
    'Full-stack',
    'React',
    'AI-ready UX',
    'REST APIs',
    'MongoDB',
    'Python',
    'UI polish',
    'GitHub',
    'Performance',
    'Motion',
  ],

  experience: [
    {
      role: 'MCA — Computer Applications',
      company: 'Lovely Professional University',
      time: 'Pursuing',
      bullets: [
        'Master’s coursework in software engineering, systems, and application development.',
        'Building portfolio-grade full-stack and AI-integrated web projects alongside studies.',
        'Active on GitHub with shipped UI builds, tooling, and assistant-style experiments.',
      ],
    },
    {
      role: 'Projects & freelance-style delivery',
      company: 'Independent / client work',
      time: 'Ongoing',
      bullets: [
        'Delivered frontend-focused sites to brief—including rapid turnaround deliverables.',
        'Cloned and extended popular product UIs to practice scalable layout and interaction patterns.',
        'Maintains clear READMEs, demos, and iterative improvements across repositories.',
      ],
    },
  ],

  projects: [
    {
      title: 'JARVIS',
      subtitle: 'Python-based virtual assistant experiment.',
      tags: ['Python', 'Assistant', 'Automation'],
      href: 'https://github.com/Mehul1311/JARVIS',
      kind: 'repo',
    },
    {
      title: 'Spotify clone',
      subtitle: 'Pixel-faithful streaming UI in HTML, CSS, and JavaScript.',
      tags: ['HTML', 'CSS', 'JavaScript', 'UI'],
      href: 'https://github.com/Mehul1311/Spotify-Clone',
      kind: 'repo',
    },
    {
      title: 'Lightning Garage',
      subtitle: 'Office marketing site—frontend delivered to client spec, fast turnaround.',
      tags: ['Frontend', 'CSS', 'Responsive'],
      href: 'https://github.com/Mehul1311/Ligntning-Garadge',
      kind: 'repo',
    },
    {
      title: 'Portfolio (this website)',
      subtitle: 'MERN portfolio with motion-first UI and contact API.',
      tags: ['React', 'Vite', 'Node.js', 'MongoDB'],
      href: 'https://github.com/Mehul1311/Portfolio-Main',
      kind: 'repo',
    },
    {
      title: 'CampusNest',
      subtitle: 'Student-first campus marketplace (buy & sell on campus).',
      tags: ['Marketplace', 'Web app', 'Product'],
      href: 'https://campusnest.in/',
      kind: 'live',
    },
    {
      title: 'To-do app',
      subtitle: 'Task app to strengthen JavaScript and state patterns.',
      tags: ['JavaScript', 'CSS', 'Productivity'],
      href: 'https://github.com/Mehul1311/To-Do-App',
      kind: 'repo',
    },
  ],
} as const
