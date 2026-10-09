type Level = {
  /** Short label under the XP bar. */
  tag: string
  period: string
  role: string
  company: string
  place: string
  points: string[]
  /** Shown only where there is room for them. */
  extraPoints?: string[]
  unlocked: string[]
  sideQuest: string
}

/** Experience, oldest first. Each entry is one level on the home page. */
const levels: Level[] = [
  {
    tag: "Hirable",
    period: "Jun – Aug 2022",
    role: "Frontend web developer",
    company: "Hirable",
    place: "remote",
    points: [
      "Developed the front end of 5 landing pages in React, Tailwind CSS, Redux and Next.js.",
      "Reduced image rendering time on the landing page from 200 ms to 79 ms with Next Image optimisations.",
    ],
    extraPoints: [
      "Built 2 admin dashboards in React, Tailwind CSS and Next.js.",
    ],
    unlocked: ["React", "Next.js", "Tailwind CSS", "Redux"],
    sideQuest: "Started writing about what I was learning.",
  },
  {
    tag: "DevCode",
    period: "Apr – May 2023",
    role: "Full stack developer",
    company: "DevCode",
    place: "remote",
    points: [
      "Integrated the REST APIs into the front end built on React.",
      "Managed the state of the application while keeping the UI clean.",
    ],
    unlocked: ["REST APIs", "State management"],
    sideQuest:
      "Built five full-stack apps of my own that year, including Petcom, Animal Heaven and the ACM PDEU site.",
  },
  {
    tag: "IMD",
    period: "Jun – Aug 2023",
    role: "Radar research intern",
    company: "India Meteorological Department",
    place: "remote",
    points: [
      "Contributed to rainfall estimation for Bhopal using a customised dynamic Z-R relationship based on echo top.",
      "Visualised and segregated clouds from the radar image and estimated rainfall with the Marshall-Palmer equation.",
    ],
    extraPoints: [
      "Wrote a function to find wind velocity at any given point in radar range.",
    ],
    unlocked: ["Radar data", "Image segmentation"],
    sideQuest: "B.Tech in computer science at PDEU, Gandhinagar, 2020 – 2024.",
  },
  {
    tag: "Thinkbyte",
    period: "Apr – Jul 2024",
    role: "AI software developer",
    company: "Thinkbyte Technologies",
    place: "remote",
    points: [
      "Created LangChain-based models for SEO writing and content writing.",
      "Worked on an SEO lead-generation product that uses the Serper and ChatGPT APIs to return structured leads on a pay-per-use basis.",
    ],
    extraPoints: [
      "Maintained and optimised the company website for page performance and SEO score using Google Search Analytics data.",
    ],
    unlocked: ["LangChain", "LLM APIs", "SEO"],
    sideQuest:
      "Four papers published, a master’s at BITS Pilani, Goa, and a win at LogiTHON 2025.",
  },
  {
    tag: "MediaTek",
    period: "Jan – Oct 2026",
    role: "Senior Engineer",
    company: "MediaTek",
    place: "Bengaluru",
    points: [
      "Systems software for MediaTek’s PC platform in C and C++, across UEFI, USB and the Windows driver stack. Joined as an intern in January, Senior Engineer from July.",
      "Architected custom-dl-optimizer, published on PyPI, which cuts inference latency by an average of 2.1x across CNN architectures.",
      "Built Claude skills for triaging incoming issues, improving the speed and quality of bug resolution.",
      "Won MediaTek Techon 2026, the internal hackathon.",
    ],
    extraPoints: [
      "Worked on AI inference performance: profiling PyTorch models and writing and tuning OpenAI Triton kernels.",
    ],
    unlocked: ["C", "C++", "Python", "PyTorch", "OpenAI Triton", "Linux"],
    sideQuest:
      "Maintaining npx-vibe, ResearchPlot and Custom DL Optimizer in the open.",
  },
  {
    tag: "Cisco",
    period: "Oct 2026 – now",
    role: "SWE II",
    company: "Cisco",
    place: "Bengaluru",
    points: [
      "This level has only just opened. The details get written as the work happens.",
    ],
    unlocked: [],
    sideQuest: "Keep shipping the open-source tools, and keep writing here.",
  },
]

const education = [
  {
    when: "2026",
    what: "Winner, MediaTek Techon",
    where: "Internal hackathon",
  },
  { when: "2025", what: "Winner, LogiTHON 2025", where: "IIT Bombay" },
  {
    when: "2024 – 26",
    what: "Master of Engineering, Computer Science",
    where: "BITS Pilani, K. K. Birla Goa Campus",
  },
  {
    when: "2020 – 24",
    what: "B.Tech, Computer Science and Engineering",
    where: "Pandit Deendayal Energy University, Gandhinagar",
  },
] as const

export { education, levels }
export type { Level }
