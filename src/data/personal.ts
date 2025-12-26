export type Experience = {
  company: string;
  role: string;
  summary: string;
  timeframe: string;
  location: string;
  type: "industry" | "research" | "other" | "harvard";
  status?: "current" | "upcoming";
  link?: string;
};

export type Research = {
  title: string;
  role: string;
  summary: string;
  timeframe: string;
  location: string;
};

export const personalInfo = {
  name: "Juliana Li",
  title: " Studying CS and Math at Harvard University.",
  oneLiner: "I'm exploring how intelligent systems work, why they fail, and what responsibility we hold when building them.",
  location: "San Jose, CA · Cambridge, MA",
  contact: {
    email: "julianali@college.harvard.edu",
    linkedin: "https://www.linkedin.com/in/julianali-ai/",
    resume: "/resume.pdf",
  },
  highlights: [
    "Incoming SDE Intern @ Amazon AGI",
    "GenAI + video + education internships",
    "Research: genomics, respiratory dynamics, imaging",
  ],
  experience: [
    {
      company: "Amazon AGI",
      role: "Incoming ML Software Development Intern",
      summary: "Incoming SDE intern on the Amazon Artificial General Intelligence (AGI) team.",
      timeframe: "May–Aug 2026",
      location: "Sunnyvale, CA",
      type: "industry",
      status: "upcoming",
      link: "https://labs.amazon.science/",
    },
    {
      company: "Abaka AI",
      role: "AI Engineer Intern",
      summary: "Researched temporal video models and optical flow techniques for AI detection of slow-played video data.",
      timeframe: "Jun–Sep 2025",
      location: "Palo Alto, CA",
      type: "industry",
      link: "https://www.abaka.ai/"
    },
    {
      company: "Bleu",
      role: "Full Stack SWE Intern",
      summary: "Developed a robust GenAI product visualization application with a multi-step AI model workflow.",
      timeframe: "Jul–Sep 2025",
      location: "Stanford, CA",
      type: "industry",
      link: "https://buildbleu.com/"
    },
    {
      company: "AI Safety Team",
      role: "Member & Technical Fellow",
      summary: "Exploring safe and robust AI systems, critically evaluating risks of frontier AI research,.",
      timeframe: "Sep 2025 – Present",
      location: "Cambridge, MA",
      type: "harvard",
      status: "current",
      link: "https://aisst.ai/"
    },
    {
      company: "Harvard Tech for Social Good",
      role: "Senior Software Engineer",
      summary: "Developed key features of Code.org’s mobile-friendly web platform, increasing accessibility for global learners.",
      timeframe: "Sep 2025 – Present",
      location: "Cambridge, MA",
      type: "harvard",
      status: "current",
      link: "https://socialgood.hcs.harvard.edu/"
    },
    {
      company: "Harvard Data Analytics Group",
      role: "Data Analyst",
      summary: "Applied AI & NLP techniques to build a RAG pipeline for a banking company's analytics platform.",
      timeframe: "Sep 2025 – Present",
      location: "Cambridge, MA",
      type: "harvard",
      status: "current",
      link: "https://harvardanalytics.org/"
    },
    {
      company: "ParagonX Academy",
      role: "Executive Director",
      summary: "Led free advanced STEM programs reaching 700+ students in 20+ countries.",
      timeframe: "Jan 2023 – Jun 2025",
      location: "San Jose, CA",
      type: "other",
      link: "https://paragonx.academy/"
    },
    {
      company: "Stanford Robinson Lab",
      role: "Research Intern",
      summary: "Conducted RNAseq analysis on immunosuppression and inflammatory phenotypes, mapped 122 genetic biomarkers of lung cancer, proposed diagnosis probe and novel therapeutic strategies.",
      timeframe: "Jun–Dec 2024",
      location: "Stanford, CA",
      type: "research",
      link: "https://robinsonlab.stanford.edu/"
    },
    {
      company: "University of Iowa Respiratory Dynamics Lab",
      role: "Research Intern",
      summary: "Developed algorithm to generate patient-personalized 3D reconstructions of human branching airway networks, identified applications in gas mixing, fluid distribution, and ventilation mechanics.",
      timeframe: "Jun–Aug 2023",
      location: "Iowa City, IA",
      type: "research",
      link: "https://herrmann.lab.uiowa.edu/"
    },
    {
      company: "Institute of Electrical and Electronics Engineers",
      role: "Two-Time First Author & Presenter",
      summary: "“Deep Learning Modeling and Increasing Interpretability of Lung Nodule Classification” • presented at The 16th IEEE Conference on Electronic Computers & Artificial Intelligence (ECAI)\n“AI-Based Detection of Autism Spectrum Disorder Using Linguistic Features” • presented at The 3rd International Conference on Computing & Machine Intelligence (ICMI-2024)",
      timeframe: "Feb–Aug 2023",
      location: "San Jose, CA",
      type: "research",
      link: "https://www.ieee.org/"
    },
  ] as Experience[],
  socials: {
    github: "https://github.com/lijuliana",
    spotify: "https://open.spotify.com/user/sp6zplaxu7nj5gsdg7oedi82r?si=842ce387474a4c62",
    instagram: "https://www.instagram.com/juls.li_/",
    scholar: "https://scholar.google.com/citations?user=oMNOH3wAAAAJ&hl=en",
  },
  classes: [
    "Data Structures & Algorithms",
    "Probability",
    "Statistical Inference",
    "Vector Calculus",
    "Linear Algebra",
    "Neural Networks",
    "Compilers & Interpreters",
    "Computer Architecture",
    "Expert Systems",
    "Multivariate Calculus",
    "Differential Equations",
    "Discrete Mathematics",
    "History of Technology Seminar",
  ],
  organizations: [
    { name: "Harvard Financial Analysts Club (Quantitative Track)", link: "https://www.harvardfac.org/" },
    { name: "Harvard University Quantitative Traders", link: "https://www.harvarduqt.com/" },
    { name: "Women in Computer Science", link: "https://www.huwics.com/" },
    { name: "Harvard Machine Intelligence Community", link: "https://www.humic.ai/" },
  ],
  skillsByCategory: {
    "Languages": ["Python", "C++", "Java", "R"],
    "ML / AI": ["PyTorch", "TensorFlow", "NLP/RAG", "GenAI Pipelines", "Model Training & Evals", "CNNs", "Transformers"],
    "Data": ["PostgreSQL", "Supabase", "Data Analysis & Visualization"],
    "Systems / Other": ["Full Stack", "Compilers", "Algorithmic Problem Solving", "Technical Project Leadership"],
  },
  interests: [
    {
      name: "Dance",
      details: {
        styles: ["ballet", "contemporary", "Chinese traditional"],
        organizations: [
          { name: "Harvard Asian American Dance Troupe", url: "https://www.harvardaadt.org/" },
          { name: "Jun Lu Performing Arts", url: "https://www.jludance.com/" },
        ],
        awards: ["YAGP Semifinals 2nd Place", "Spotlight Dance Cup 1st Place + Title", "KAR Dance Competition 1st Place + Title", "Industry Dance Awards Nominee & Performer"],
      },
    },
    {
      name: "Bouldering",
    },
    {
      name: "Figure Skating",
    },
    {
      name: "Crocheting",
    },
    {
      name: "Puzzle-solving",
    },
    {
      name: "Food runs!",
    },
  ],
  listening: {
    songs: [
      { title: "Margaret", artist: "Lana Del Rey", album: "Did you know that there's a tunnel under Ocean Blvd", url: "https://open.spotify.com/track/1o82DwNisONAd2mu1RcGE6?si=9b2a0053b99146fd" },
      { title: "Toronto 2014", artist: "Daniel Caesar", album: "NEVER ENOUGH", url: "https://open.spotify.com/track/4t9R5rbtovdvya28uMODDz?si=b6220e66239a45cc" },
      { title: "My Fun", artist: "Suki Waterhouse", album: "Memoir of a Sparklemuffin", url: "https://open.spotify.com/track/3nPifd7hjanGVp02REhtlH?si=8a7510e9664144ce" }
    ],
  },
};

