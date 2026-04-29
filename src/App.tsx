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
  FileCode2,
  Zap,
  AlertCircle,
  Users2
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  results: string[];
  roles?: string[];
  troubleshooting?: string;
  collaboration?: string;
  link?: string;
  images?: string[];
}

interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

// --- Data ---
const SKILLS: Skill[] = [
  {
    category: "Backend",
    icon: <Server className="w-5 h-5 text-emerald-500" />,
    items: ["Java", "Spring", "RESTful API", "PostgreSQL", "MySQL", "MongoDB", "Redis"]
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
    title: "High-tension(C2C 기반 물류 이커머스 시스템)",
    description: "MSA 환경에서 일관성 있는 주문-결제 흐름을 위해 Saga 오케스트레이션을 적용한 백엔드 프로젝트입니다.",
    longDescription: "단일 트랜잭션으로 처리할 수 없는 주문-결제-재고-쿠폰 흐름을 MSA 환경에서 일관성 있게 처리하기 위해 Saga 오케스트레이션으로 설계되었습니다. 결제 도메인의 안정성과 멱등성을 확보하는 데 중점을 둔 프로젝트입니다.",
    tags: ["Java", "Spring Boot", "MSA", "Redis", "Saga Pattern", "Kafka", "PostgreSQL", "AWS"],
    link: "https://github.com/sharedeffort/high-tension",
    roles: [
      "Payment Service 전체 아키텍처 설계 및 구현",
      "Saga 기반 결제 생성 및 실패 보상 트랜잭션 로직 구현",
      "주문 서비스 연동 및 내부 결제 데이터 검증 로직 개발",
      "Kafka 기반 결제 이벤트 Consumer & Producer 구축",
      "멱등성 처리 및 중복 결제 방지 구조 설계"
    ],
    results: [
      "Saga 기반 결제 생성 자동화: 주문 후 재고 차감 성공 시 결제가 자동 생성되는 이벤트 기반 구조로 개선",
      "결제 Saga 멱등성 보장: DB UNIQUE 제약 및 Saga 상태 관리를 통해 Kafka의 중복 메시지 전달 이슈 방어",
      "시스템 안정성 확보: 결제 누락 및 중복 결제 발생 가능성을 원천적으로 차단하는 견고한 로직 구축"
    ],
    troubleshooting: "동일 sagaId로 결제가 중복 생성되는 이슈를 발견했습니다. 원인은 동일 Kafka 토픽을 서로 다른 Consumer Group이 동시에 구독하여 중복 소비가 발생한 것이었습니다. 이를 해결하기 위해 결제 서비스 내 Consumer를 단일화하고, Saga 멱등성 처리 로직을 강화하여 시스템의 원자성을 확보했습니다.",
    collaboration: "결제 생성 시점을 직접 호출로 할지 이벤트 기반으로 할지에 대한 팀 내 의견 충돌이 있었습니다. MSA 원칙과 Saga Pattern의 기술적 장점을 정리하여 공유했고, 도메인 간의 결합도를 낮추어야 한다는 근거로 팀원들을 설득하여 이벤트 기반의 Saga 구조를 도입하는 합의를 이끌어냈습니다."
  },
  {
    id: 2,
    title: "Gabom-Project (위치 기반 탐험 플랫폼)",
    description: "위치 인증을 게임처럼 즐기고, 방문 경험이 보상이 되는 탐험 플랫폼입니다.",
    longDescription: "실제 서비스로 확장 가능한 수준의 위치 기반 인증 플랫폼입니다. 탐험 장소를 확인하고 실제 위치에서 인증글을 남기면 즉시 결과를 확인할 수 있으며, 사용자 행동이 리워드로 전환되는 위치 기반 서비스를 목표로 했습니다.",
    tags: ["Java", "Spring", "MySQL", "WebSocket", "STOMP", "Git"],
    link: "https://github.com/final-gabom/gabom-project",
    roles: [
      "탐험 장소 등록/조회 및 실시간 위치 정합성 검증 API 개발",
      "미션 인증글 CRUD 및 사용자 생성 콘텐츠(UGC) 구조 설계",
      "WebSocket & STOMP 기반 실시간 알림 시스템 구축",
      "MySQL Bounding Box 최적화를 통한 위치 데이터 검색 성능 향성"
    ],
    results: [
      "거리 계산 최적화: MySQL 하버사인 공식과 Bounding Box를 활용하여 응답 시간을 300ms 수준으로 단축",
      "실시간 알림 안정화: 구독 경로 분석 및 재구조화를 통해 메시지 수신 이슈를 해결하고 알림 전송 성공률 확보",
      "협업 프로세스 수립: 커밋 단위 세분화 및 Git 브랜치 전략 도입으로 6인 협업 환경의 충돌과 병목 현상 최소화"
    ],
    troubleshooting: "초기 서버 레벨에서 수행하던 거리 계산으로 인해 조회 지연이 발생했습니다. 이를 해결하기 위해 MySQL의 하버사인 공식을 DB 레벨에서 호출하도록 개선하고, Bounding Box 영역 검색 최적화를 추가 적용하여 대량의 위치 데이터 조회 성능을 비약적으로 개선했습니다.",
    collaboration: "프로젝트 방향성을 두고 '확장성'과 '속도' 사이의 팀 내 갈등이 있었으나, 목표를 '안정적인 시연'으로 재정의하여 협의점을 찾았습니다. 또한 복잡한 머지 충돌 문제를 해결하기 위해 커밋 단위를 최소화하고 정기적인 동기화 원칙을 세워 팀원 모두가 신뢰할 수 있는 개발 효율을 이끌어냈습니다."
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
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-end items-center h-full">
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
          <Terminal className="w-4 h-4" /> Backend Developer
        </div>
        <h1 className="text-7xl md:text-9xl font-bold text-editorial mb-8 leading-none">
          Kim <br />
          <span className="text-brand-accent">Hyunsu</span>
        </h1>
        <p className="text-xl md:text-3xl text-brand-secondary max-w-2xl font-sans font-bold tracking-tight mb-12 leading-tight opacity-90">
          데이터의 실체를 구현하고, <br />
          사용자에게 가치 있는 <span className="text-brand-primary">경험</span>을 전달하는 <br />
          개발자 김현수입니다.
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
            <a href="https://github.com/kinhyunsu" className="opacity-60 hover:opacity-100 transition-opacity"><Github className="w-6 h-6" /></a>
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

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
        <div className="space-y-6 md:mt-0">
          <div className="p-8 md:p-10 rounded-3xl bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/30 transition-all duration-500">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Cpu className="text-brand-accent h-5 w-5" /> Problem Solver
            </h3>
            <p className="text-brand-secondary leading-relaxed break-keep">
              문제의 본질을 끝까지 파고드는 개발자입니다. 단순한 증상 해결이 아닌 로그, 흐름, 데이터 단위까지 추적하여 문제의 근본 원인을 분석하고 구조적으로 개선합니다.
            </p>
          </div>
        </div>
        <div className="space-y-6 md:mt-16">
          <div className="p-8 md:p-10 rounded-3xl bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/30 transition-all duration-500">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Layout className="text-emerald-500 h-5 w-5" /> Identity
            </h3>
            <p className="text-brand-secondary leading-relaxed break-keep">
              기능이 아닌 '가치'를 만드는 개발을 지향합니다. 사용자 흐름과 문제를 이해하고, 단순 구현을 넘어 서비스 성장에 기여하는 방향으로 설계합니다.
            </p>
          </div>
        </div>
        <div className="space-y-6 md:mt-32">
          <div className="p-8 md:p-10 rounded-3xl bg-brand-surface border border-brand-primary/5 hover:border-brand-accent/30 transition-all duration-500">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <ArrowUpRight className="text-purple-500 h-5 w-5" /> Adaptive
            </h3>
            <p className="text-brand-secondary leading-relaxed break-keep">
              변화하는 기술 환경에 빠르게 적응하는 개발자입니다. 새로운 기술을 학습하고 프로젝트에 적용하며, 코드 구조 개선과 자동화를 통해 팀 생산성을 높입니다.
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
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

const ProjectModal = ({ 
  project, 
  onClose 
}: { 
  project: Project; 
  onClose: () => void 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 z-[60] bg-brand-primary/40 backdrop-blur-sm flex items-center justify-center px-6 py-12"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.9, y: 20, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-[2.5rem] w-full max-w-3xl max-h-full overflow-y-auto p-8 md:p-12 shadow-2xl relative"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-2 hover:bg-brand-surface rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mono-label text-brand-accent mb-4">Project Details</div>
      <h3 className="text-4xl font-bold mb-6 tracking-tight">{project.title}</h3>
      
      <div className="flex flex-wrap gap-2 mb-12">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-brand-surface text-brand-secondary text-xs rounded-full font-mono uppercase tracking-wider font-semibold">
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-16">
        <div>
          <h4 className="flex items-center gap-2 mono-label mb-6 text-brand-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            Project Goal
          </h4>
          <div className="p-8 bg-brand-surface rounded-[2.5rem] border border-brand-primary/5">
            <p className="text-xl text-brand-primary leading-relaxed font-semibold break-keep">
              {project.longDescription || project.description}
            </p>
          </div>
        </div>

        {project.roles && (
          <div>
            <h4 className="flex items-center gap-2 mono-label mb-6 text-blue-500">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Responsibilities
            </h4>
            <div className="grid gap-3">
              {project.roles.map((role, i) => (
                <div key={i} className="flex gap-4 p-5 items-center bg-white border border-brand-primary/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-brand-primary font-medium">{role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="flex items-center gap-2 mono-label mb-6 text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Key Achievements
          </h4>
          <div className="grid gap-4">
            {project.results.map((result, i) => {
              const [title, ...desc] = result.split(':');
              return (
                <div key={i} className="flex gap-5 p-7 bg-emerald-50/30 rounded-3xl border border-emerald-500/10">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Zap className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    {desc.length > 0 ? (
                      <>
                        <h5 className="font-bold text-brand-primary mb-1 text-lg">{title}</h5>
                        <p className="text-brand-secondary leading-relaxed break-keep">{desc.join(':').trim()}</p>
                      </>
                    ) : (
                      <p className="text-brand-primary font-bold leading-relaxed text-lg break-keep">{result}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {project.troubleshooting && (
          <div>
            <h4 className="flex items-center gap-2 mono-label mb-6 text-orange-500">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Technical Challenge
            </h4>
            <div className="p-8 bg-orange-50/40 border border-orange-500/10 rounded-[2.5rem]">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-brand-primary leading-relaxed break-keep text-lg font-medium">
                  {project.troubleshooting}
                </p>
              </div>
            </div>
          </div>
        )}

        {project.collaboration && (
          <div>
            <h4 className="flex items-center gap-2 mono-label mb-6 text-indigo-500">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Team Collaboration
            </h4>
            <div className="p-8 bg-indigo-50/40 border border-indigo-500/10 rounded-[2.5rem]">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                  <Users2 className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-brand-primary leading-relaxed break-keep text-lg font-medium">
                  {project.collaboration}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-brand-primary/5 flex justify-between items-center">
        <span className="mono-label">© 2024 KIM HYUNSU</span>
        {project.link && (
          <a href={project.link} className="flex items-center gap-2 font-bold text-brand-accent hover:underline">
            View Live <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="group p-10 rounded-[3rem] bg-white border border-brand-primary/5 flex flex-col h-full cursor-pointer hover:shadow-xl transition-all duration-500"
  >
    <div className="flex justify-between items-start mb-12">
      <div className="p-4 bg-brand-surface rounded-2xl group-hover:bg-brand-accent/5 transition-colors">
        <FileCode2 className="w-8 h-8 text-brand-accent" />
      </div>
      <div className="p-4 bg-brand-surface rounded-full opacity-40 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-5 h-5" />
      </div>
    </div>
    
    <div className="flex-grow">
      <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-brand-accent transition-colors">{project.title}</h3>
      <p className="text-brand-secondary mb-8 leading-relaxed opacity-80 line-clamp-2">
        {project.description}
      </p>
      
      <div className="mono-label text-brand-accent mb-2">Click to see details</div>
    </div>

    <div className="flex flex-wrap gap-2 pt-8 border-t border-brand-primary/5">
      {project.tags.slice(0, 3).map(tag => (
        <span key={tag} className="mono-label px-2 py-1 bg-brand-surface rounded uppercase text-[9px]">
          {tag}
        </span>
      ))}
      {project.tags.length > 3 && (
        <span className="mono-label px-2 py-1 bg-brand-surface rounded uppercase text-[9px]">
          +{project.tags.length - 3}
        </span>
      )}
    </div>
  </motion.div>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Selected Works" subtitle="03 / Projects" />
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};


const Education = () => (
  <section id="education" className="py-32 px-6 bg-white border-y border-brand-primary/5">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Academic & More" subtitle="04 / Education" />
      
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          {/* University */}
          <div className="flex gap-6 items-start">
            <div className="p-4 bg-brand-surface rounded-2xl font-mono font-bold text-brand-accent">UNI</div>
            <div>
              <h4 className="font-bold text-xl">우송대학교</h4>
              <p className="text-brand-secondary font-medium">스마트IT 보안전공, 학사 졸업</p>
            </div>
          </div>

          {/* Bootcamp */}
          <div className="flex gap-6 items-start">
            <div className="p-4 bg-brand-surface rounded-2xl font-mono font-bold text-emerald-500">EDU</div>
            <div className="space-y-4">
              <h4 className="font-bold text-xl">스파르타 클럽</h4>
              <div className="space-y-2">
                <p className="text-brand-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  심화 Java 과정 (5개월)
                </p>
                <p className="text-brand-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Kotlin & Spring 과정 (5개월)
                </p>
              </div>
            </div>
          </div>

          {/* Research/Activity */}
          <div className="flex gap-6 items-start">
            <div className="p-4 bg-brand-surface rounded-2xl font-mono font-bold text-purple-500">ACT</div>
            <div>
              <h4 className="font-bold text-xl">실무 인력 양성 연구보조</h4>
              <p className="text-brand-secondary leading-relaxed">바이오헬스 산업 실무 인력 양성을 위한 맞춤형 교과목 개발 연구 (3개월)</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 md:p-12 bg-brand-surface rounded-[3rem]">
            <h4 className="mono-label mb-8">Quick Facts</h4>
            <ul className="space-y-6">
              <li className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
                <span className="text-brand-secondary">Awards</span>
                <span className="font-medium">Co-show (입상)</span>
              </li>
              <li className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
                <span className="text-brand-secondary">Global Experience</span>
                <span className="font-medium">중국 해외연수</span>
              </li>
              <li className="flex justify-between items-center border-b border-brand-primary/10 pb-4">
                <span className="text-brand-secondary">Availability</span>
                <span className="font-medium text-emerald-500">Open for Collaborations</span>
              </li>
            </ul>
            
            <div className="mt-12">
              <motion.a 
                href="https://github.com/kinhyunsu"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-brand-primary text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-brand-primary/20"
              >
                <Github className="w-5 h-5" />
                Visit GitHub profile
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <SectionHeader title="Get In Touch" subtitle="05 / Contact" />
      <div className="text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-20">
            <a 
              href="mailto:kimhyunsoo0720@gmail.com" 
              className="group text-2xl md:text-5xl font-bold flex items-center gap-4 hover:text-brand-accent transition-colors tracking-tighter"
            >
              <Mail className="w-8 h-8 md:w-16 md:h-16" /> kimhyunsoo0720@gmail.com
              <div className="w-16 h-[2px] bg-brand-primary group-hover:bg-brand-accent hidden md:block" />
            </a>
          </div>

          <div className="flex justify-center">
            <a href="https://github.com/kinhyunsu" className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 hover:text-brand-accent transition-all group">
              <div className="p-5 border border-brand-primary/10 rounded-full group-hover:border-brand-accent transition-colors bg-brand-surface">
                <Github className="w-8 h-8" />
              </div>
              <span className="mono-label lowercase font-bold">GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-brand-primary/5 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="mono-label">© 2024 KIM HYUNSU. All rights reserved.</div>
      <div className="flex gap-8 mono-label">
        <a href="#" className="hover:text-brand-accent">Github</a>
        <a href="#" className="hover:text-brand-accent">Resume</a>
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
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
