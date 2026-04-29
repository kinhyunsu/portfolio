import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Database, 
  Layout, 
  Server, 
  Cpu, 
  Terminal, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  ArrowUpRight,
  Menu,
  X,
  FileCode2
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  results: string[];
  link?: string;
}

interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

// --- Data ---
const SKILLS: Skill[] = [
  {
    category: "Frontend",
    icon: <Layout className="w-5 h-5 text-blue-500" />,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React Query"]
  },
  {
    category: "Backend",
    icon: <Server className="w-5 h-5 text-emerald-500" />,
    items: ["Node.js (NestJS)", "Python (FastAPI)", "RESTful API", "GraphQL", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "DevOps",
    icon: <Cpu className="w-5 h-5 text-purple-500" />,
    items: ["AWS (EC2, S3, RDS)", "Lambda", "Docker", "GitHub Actions", "CI/CD", "Git"]
  }
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Microservices Transformation",
    description: "Legacy monolith system migration to a scalable microservices architecture.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Docker", "AWS"],
    results: [
      "Reduced server maintenance costs by 30%",
      "Implemented concurrency control for 1,000+ simultaneous requests",
      "Built data visualization dashboards for client decision support"
    ]
  },
  {
    id: 2,
    title: "MVP Rapid Launch",
    description: "Successfully validated market fit by launching a clean MVP within a tight 4-week deadline.",
    tags: ["React", "Firebase", "Python"],
    results: [
      "Launched MVP in only 4 weeks",
      "Optimized user feedback loop through rapid UI/UX iterations",
      "Achieved 1.5x increase in user session duration post-개편"
    ]
  }
];

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <div className="mono-label mb-2">{subtitle}</div>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary">{title}</h2>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono font-bold text-xl tracking-tighter"
        >
          SIREAL<span className="text-brand-accent">.</span>ENG
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-brand-accent transition-colors opacity-80 hover:opacity-100"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-morphism py-8 flex flex-col items-center gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden">
    {/* Background Decorative Element */}
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-brand-accent/3 rounded-full blur-2xl pointer-events-none" />

    <div className="max-w-7xl mx-auto w-full pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mono-label mb-4 flex items-center gap-2">
          <Terminal className="w-4 h-4" /> [SIREAL] Backend Developer
        </div>
        <h1 className="text-7xl md:text-9xl font-bold text-editorial mb-8 leading-none">
          Kim <br />
          <span className="text-brand-accent">Hyunsu</span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-secondary max-w-2xl font-sans font-bold tracking-tight mb-12 leading-relaxed opacity-90">
          "데이터의 실체를 구현하고, 사용자에게 가치 있는 경험을 전달하는 개발자 김현수입니다."
        </p>
        
        <div className="flex gap-4">
          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brand-primary text-white font-medium flex items-center gap-2 rounded-full"
          >
            See Projects <ChevronRight className="w-4 h-4" />
          </motion.a>
          <div className="flex gap-4 items-center px-4">
            <a href="https://github.com/kimhyunsu" className="opacity-60 hover:opacity-100 transition-opacity"><Github className="w-6 h-6" /></a>
            <a href="https://linkedin.com/in/kimhyunsu" className="opacity-60 hover:opacity-100 transition-opacity"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 mono-label flex flex-col items-center gap-2"
    >
      <div className="w-[1px] h-12 bg-brand-primary/20 animate-pulse" />
      Scroll Down
    </motion.div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 px-6 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Expertise" subtitle="01 / About Me" />
      
      <div className="mb-24">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-medium tracking-tight leading-[1.1] text-brand-secondary"
        >
          <span className="text-brand-primary">문제의 원인을 끝까지 추적하는</span> 개발자, 김현수
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/30 transition-colors">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Cpu className="text-brand-accent h-5 w-5" /> Problem Solver
            </h3>
            <p className="text-brand-secondary leading-relaxed">
              복잡한 비즈니스 로직을 효율적인 코드로 설계하고 해결하는 것을 즐깁니다. 단순 작업보다는 구조적인 해결책을 고민합니다.
            </p>
          </div>
        </div>
        <div className="space-y-6 mt-8 md:mt-0">
          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/30 transition-colors">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Layout className="text-emerald-500 h-5 w-5" /> SIREAL Identity
            </h3>
            <p className="text-brand-secondary leading-relaxed">
              'Real'한 가치를 창출하는 전문가로서, 단순 개발을 넘어 비즈니스 성장을 함께 고민하는 Product Mindset을 가지고 있습니다.
            </p>
          </div>
        </div>
        <div className="space-y-6 mt-8 md:mt-16">
          <div className="p-8 rounded-3xl bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/30 transition-colors">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <ArrowUpRight className="text-purple-500 h-5 w-5" /> Multi-Layered
            </h3>
            <p className="text-brand-secondary leading-relaxed">
              빠르게 변하는 기술 스택에 유연하게 대응하며, 팀의 생산성을 높이는 도구와 방법론을 적극적으로 탐색하고 도입합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Stack" subtitle="02 / Tech Stack" />
      
      <div className="grid md:grid-cols-3 gap-8">
        {SKILLS.map((skill) => (
          <div key={skill.category} className="group p-8 rounded-[2rem] bg-white border border-transparent hover:border-brand-primary/5 shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-8">
              {skill.icon}
              <h3 className="font-bold text-lg">{skill.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item) => (
                <span key={item} className="px-4 py-2 bg-brand-surface text-brand-secondary text-sm rounded-full font-medium group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="py-32 px-6 bg-brand-primary text-white">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <div className="mono-label mb-2 opacity-50">03 / Experience</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Professional Journey</h2>
      </div>

      <div className="space-y-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="md:w-1/3">
            <div className="mono-label text-brand-accent mb-2">202X.XX — PRESENT</div>
            <h3 className="text-3xl font-bold mb-1">SIREAL</h3>
            <div className="text-white/60 font-medium">Main Developer / Project Manager</div>
          </div>
          <div className="md:w-2/3 space-y-8">
            <div>
              <h4 className="mono-label mb-4 text-white/40">Core Responsibility</h4>
              <p className="text-xl text-white/80 leading-relaxed">
                프로젝트 아키텍처 설계 및 백엔드 개발 리딩. 비즈니스 리전과 기술 스택의 가교 역할을 수행합니다.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-6 border border-white/10 rounded-2xl">
                <div className="text-brand-accent text-3xl font-bold mb-2">30%</div>
                <p className="text-white/60 text-sm">Server cost reduction via MSA transformation</p>
              </div>
              <div className="p-6 border border-white/10 rounded-2xl">
                <div className="text-emerald-400 text-3xl font-bold mb-2">20%</div>
                <p className="text-white/60 text-sm">Improved dev speed with internal UI library</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group p-10 rounded-[3rem] bg-white border border-brand-primary/5 flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-12">
      <div className="p-4 bg-brand-surface rounded-2xl">
        <FileCode2 className="w-8 h-8 text-brand-accent" />
      </div>
      <a href={project.link} className="p-4 bg-brand-surface rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-5 h-5" />
      </a>
    </div>
    
    <div className="flex-grow">
      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
      <p className="text-brand-secondary mb-8 leading-relaxed italic opacity-80">
        {project.description}
      </p>
      
      <div className="space-y-4 mb-8">
        {project.results.map((result, i) => (
          <div key={i} className="flex gap-3 text-sm">
            <ChevronRight className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
            <span className="text-brand-secondary">{result}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-wrap gap-2 pt-8 border-t border-brand-primary/5">
      {project.tags.map(tag => (
        <span key={tag} className="mono-label px-2 py-1 bg-brand-surface rounded">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Selected Works" subtitle="04 / Projects" />
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {PROJECTS.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Education = () => (
  <section className="py-32 px-6 bg-white border-y border-brand-primary/5">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Academic & More" subtitle="05 / Education" />
      
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="p-4 bg-brand-surface rounded-2xl font-mono font-bold text-brand-accent">SCH</div>
            <div>
              <h4 className="font-bold text-xl">[대학교 명]</h4>
              <p className="text-brand-secondary">[전공], 학사 졸업</p>
            </div>
          </div>
          <div className="flex gap-6 items-start opacity-70">
            <div className="p-4 bg-brand-surface rounded-2xl font-mono font-bold">BLOG</div>
            <div>
              <h4 className="font-bold text-xl">Technical Blogging</h4>
              <p className="text-brand-secondary">Open source contribution & Tech talk presenter</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-brand-surface rounded-[3rem]">
          <h4 className="mono-label mb-8">Quick Facts</h4>
          <ul className="space-y-6">
            <li className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
              <span className="text-brand-secondary">Current Focus</span>
              <span className="font-medium">Product Engineering</span>
            </li>
            <li className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
              <span className="text-brand-secondary">Location</span>
              <span className="font-medium">Seoul, Korea</span>
            </li>
            <li className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
              <span className="text-brand-secondary">Availability</span>
              <span className="font-medium text-emerald-500">Open for Collaborations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mono-label mb-8">Ready to talk?</div>
        <h2 className="text-5xl md:text-8xl font-bold mb-16 tracking-tighter">
          Let's create <br /> something <span className="text-brand-accent italic">"Real"</span>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-24">
          <a 
            href="mailto:kimhyunsoo0720@gmail.com" 
            className="group text-2xl md:text-4xl font-medium flex items-center gap-3 hover:text-brand-accent transition-colors"
          >
            <Mail className="w-8 h-8 md:w-12 md:h-12" /> kimhyunsoo0720@gmail.com
            <div className="w-12 h-[1px] bg-brand-primary group-hover:bg-brand-accent hidden md:block" />
          </a>
        </div>

        <div className="flex justify-center gap-12">
          {[
            { icon: <Github />, label: 'GitHub', href: 'https://github.com/kimhyunsu' },
            { icon: <Linkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/kimhyunsu' },
            { icon: <ExternalLink />, label: 'Notion', href: '#' }
          ].map((item) => (
            <a key={item.label} href={item.href} className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 hover:text-brand-accent transition-all group">
              <div className="p-4 border border-brand-primary/10 rounded-full group-hover:border-brand-accent transition-colors">
                {item.icon}
              </div>
              <span className="mono-label lowercase">{item.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-brand-primary/5 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="mono-label">© 2024 KIM HYUNSU. All rights reserved.</div>
      <div className="flex gap-8 mono-label">
        <a href="#" className="hover:text-brand-accent">Terms</a>
        <a href="#" className="hover:text-brand-accent">Privacy</a>
        <a href="#" className="hover:text-brand-accent">Local Time: 16:48</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="selection:bg-brand-accent selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
