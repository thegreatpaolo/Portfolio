import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Mail, Github, ExternalLink, X, MapPin, Phone, Download, Menu } from 'lucide-react';
import profilePic from '../assets/profile for prtfolio.png';
import { courtImage, webImage1, webImage2, Kaboooom, webImage3, webImage4  } from '../assets';
import resumePDF from '../assets/Gian Paolo Oga - Resume.pdf';
interface Project {
  id: number;
  title: string;
  description: string;
  about: string;
  image: string;
  tags: string[];
  websiteUrl: string;
  screenshots: string[];
}
 
const projects: Project[] = [
  {
    id: 1,
    title: 'basketball-court-reservation',
    description: 'A real-time sports facility scheduling platform with automated slot validation and interactive booking.',
    about: 'Built with React and Node.js, this platform handles thousands of transactions daily. Features include real-time inventory management, secure payment processing, and advanced analytics dashboard.',
    image: courtImage,
    tags: ['React', 'Node.js', 'Tailwind'],
    websiteUrl: 'https://basketball-court-reservation.vercel.app/',
    screenshots: [
      webImage1,
      webImage2,
    ]
  },
  {
    id: 2,
    title: 'Kaboooom!',
    description: 'is a high-energy, multiplayer word-based game designed for 2 to 8 players. Developed using React and Vite, it challenges players with fast-paced "bomb-word" mechanics.',
    about: 'is a fast-paced, multiplayer word-bomb game built for 2–8 players. Challenge your friends in a race against time to type words matching specific prompts before the bomb explodes!',
    image: Kaboooom,
    tags: ['React', 'Node.js', 'Tailwind'],
    websiteUrl: 'https://kabooooom.vercel.app/',
    screenshots: [
      webImage3,
      webImage4,
    ]
  },
  
  
  
 
];
 
const programmingSkills = [
  { name: 'Html', percent: 80, color: '#4B8BBE' },
  { name: 'Css', percent: 80, color: '#F7DF1E' },
  { name: 'React', percent: 85, color: '#61DAFB' },
  { name: 'Javascript', percent: 70, color: '#54C5F8' },
  { name: 'Node.js', percent: 80, color: '#3C873A' },
  { name: 'Back-end', percent: 50, color: '#4DB33D' },
  { name: 'Git', percent: 90, color: '#F05032' },
  { name: 'Firebase', percent: 65, color: '#FFA611' },
];
 
const otherSkills = [
  {
    icon: '💻',
    title: 'Front-end Development',
    desc: 'Building responsive and interactive user interfaces using React, Next.js, and Tailwind CSS to create seamless web experiences.'
  },
  {
    icon: '📱',
    title: 'Video-editing',
    desc: 'Creating high-energy short-form content using CapCut, specialized in trendy transitions and engaging Reels to maximize social media reach.'
  },
  {
    icon: '🗄️',
    title: 'Figma UX/UI',
    desc: 'Creating high-fidelity wireframes and interactive prototypes in Figma to streamline the handoff from design to development.'
  },
  {
    icon: '🔧',
    title: 'Dev Tools & Git',
    desc: 'Proficient in version control with Git and GitHub, ensuring clean collaborative workflows and code history.'
  },
];
 
// Animated skill bar component
function SkillBar({ name, percent, color, index }: { name: string; percent: number; color: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
 
  return (
    <div ref={ref} className="mb-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-semibold text-gray-200 w-24">{name}</span>
        <span className="text-xs text-gray-400 ml-auto">{percent}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}88` }}
        />
      </div>
    </div>
  );
}
 
// Animated section wrapper
function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
 
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  // Track active nav on scroll
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'connect'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
 
  const scrollTo = (id: string) => {
    const container = document.getElementById('scroll-container');
    const el = document.getElementById(id);
    if (container && el) {
      container.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };
 
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'connect', label: 'Connect' },
  ];
 
  return (
    <div className="relative min-h-screen bg-[#0d1630] text-white overflow-hidden font-sans">
      {/* Background geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] opacity-10"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, transparent 60%)',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-10"
          style={{
            background: 'linear-gradient(315deg, #1e3a8a 0%, transparent 60%)',
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          }}
        />
        {/* Diagonal accent lines */}
        <div className="absolute top-[30%] right-[10%] w-[2px] h-[300px] bg-gradient-to-b from-cyan-500/30 to-transparent rotate-[20deg]" />
        <div className="absolute top-[20%] right-[15%] w-[1px] h-[200px] bg-gradient-to-b from-blue-400/20 to-transparent rotate-[20deg]" />
        {/* Glows */}
        <div className="absolute top-10 left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>
 
      {/* Main scroll container */}
      <div id="scroll-container" className="relative z-10 h-screen overflow-y-auto">
 
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0d1630]/90 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded bg-white/10 border border-white/20 flex items-center justify-center text-sm font-bold text-cyan-400">
                GP
              </div>
              <span className="text-lg font-bold tracking-wide text-white">GIAN PAOLO</span>
            </motion.div>

            {/* Desktop nav links — hidden on mobile */}
            <div className="hidden md:flex gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeNav === item.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop contact button — hidden on mobile */}
            <button
              onClick={() => scrollTo('connect')}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>

            {/* Mobile hamburger button — visible only on mobile */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden bg-[#0d1630]/95 border-t border-white/5"
              >
                <div className="flex flex-col px-6 py-4 gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeNav === item.id
                          ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollTo('connect')}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all mt-1"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
 
        {/* ─── HERO SECTION ─── */}
        <section id="home" className="max-w-7xl mx-auto px-4 md:px-6 min-h-[calc(100vh-70px)] flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-10 md:py-16">

            {/* Mobile: Image first (on top), Desktop: Image on right (col-span-5) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex justify-center md:hidden"
            >
              <div className="relative">
                {/* Outer hex glow ring */}
                <div
                  className="absolute inset-0 scale-110 opacity-30"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  }}
                />
                {/* Mobile hexagon image — smaller size */}
                <div
                  className="w-[220px] h-[250px] overflow-hidden relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: '#1e3a8a',
                  }}
                >
                  <img
                    src={profilePic}
                    alt="Gian Paolo Oga"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* CS Student badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -left-6 bg-[#0d1630] border border-cyan-500/40 rounded-2xl px-4 py-2 shadow-2xl"
                >
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-sm font-bold text-cyan-400">CS Student @ USTP</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Left: Text — full width on mobile, 7 cols on desktop */}
            <div className="col-span-1 md:col-span-7 text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-4xl font-light text-white mb-2"
              >
                Hi!
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-6xl font-bold mb-2"
              >
                I'm{' '}
                <span className="text-cyan-400">Gian Paolo</span>
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-5xl font-extrabold text-white mb-6"
              >
                A Front-end Developer
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 italic mb-8 text-base md:text-lg max-w-lg mx-auto md:mx-0"
              >
                "I'm motivated by a profound passion for technology and a strong willingness to learn."
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3 mb-8 border-l-4 border-cyan-500/40 pl-6 text-left"
              >
                <div className="flex items-center gap-3 text-base md:text-lg text-gray-300">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                  Cagayan de Oro City, Philippines
                </div>
                <div className="flex items-center gap-3 text-base md:text-lg text-gray-300">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  gpdoga@gmail.com
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <a
                  href={resumePDF}
                  download="Gian_Paolo_Oga_Resume.pdf"
                  className="flex items-center gap-2 px-5 md:px-7 py-3 md:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-sm md:text-base font-medium transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
                <button
                  onClick={() => scrollTo('skills')}
                  className="flex items-center gap-2 px-5 md:px-7 py-3 md:py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0d1630] text-sm md:text-base font-bold transition-all"
                >
                  View Skills ↓
                </button>
              </motion.div>
            </div>

            {/* Right: Hexagon Photo — desktop only (hidden on mobile, shown above) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden md:flex col-span-5 justify-center"
            >
              <div className="relative">
                {/* Outer hex glow ring */}
                <div
                  className="absolute inset-0 scale-110 opacity-30"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  }}
                />
                {/* Main hexagon image - INCREASED SIZE HERE */}
                <div
                  className="w-[450px] h-[500px] overflow-hidden relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: '#1e3a8a',
                  }}
                >
                  <img
                    src={profilePic}
                    alt="Gian Paolo Oga"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* CS Student badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-6 -left-10 bg-[#0d1630] border border-cyan-500/40 rounded-2xl px-6 py-3 shadow-2xl"
                >
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-lg font-bold text-cyan-400">CS Student @ USTP</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
 
        {/* ─── SKILLS SECTION ─── */}
        <section id="skills" className="py-10 md:py-20 px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">What I do</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              I'm a Computer Science student and aspiring full-stack developer with a strong desire to broaden my technological knowledge and a keen interest in crafting both visually appealing designs and seamless functionality.
            </p>
          </AnimatedSection>
 
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left: Programming Skills */}
            <AnimatedSection>
              <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                Programming / Library Skills
              </h3>
              <div>
                {programmingSkills.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </AnimatedSection>
 
            {/* Divider */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" style={{ marginLeft: '-20px' }} />
              {/* Right: Other Skills */}
              <AnimatedSection>
                <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                  Other Skills
                </h3>
                <div className="space-y-5">
                  {otherSkills.map((skill, i) => (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: i * 0.12 }}
                      className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/8 transition-all"
                    >
                      <div className="text-2xl mt-1">{skill.icon}</div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{skill.title}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">{skill.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
 
        {/* ─── PROJECTS SECTION ─── */}
        <section id="projects" className="py-10 md:py-20 px-4 md:px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Projects</h2>
            <p className="text-gray-400 text-sm">A selection of things I've built</p>
          </AnimatedSection>
 
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-cyan-500/15 text-cyan-400 text-xs rounded-md border border-cyan-500/25">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
 
        {/* ─── CONNECT SECTION ─── */}
        <section id="connect" className="py-10 md:py-20 px-4 md:px-6">
          <AnimatedSection className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Let's Connect</h2>
            <p className="text-gray-400 text-sm mb-12">Have a project in mind or want to collaborate? Reach out!</p>
            <div className="flex justify-center items-center gap-10 flex-wrap">
              {/* Telegram */}

              <a 
              href="https://t.me/GianPaolo_Dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3">

                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-sky-400/60 group-hover:bg-sky-400/10 transition-all">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-sky-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.206 16.561c-.19.605-.838.835-1.391.564l-4.512-2.193-2.028 1.956c-.347.335-.91.135-.91-.341V13.88l6.194-5.836c.154-.145-.045-.224-.226-.1l-7.658 4.821-3.693-1.157c-.59-.185-.603-.984.013-1.188l13.14-5.06c.556-.214 1.106.214.935.795l-1.974 9.406z"/></svg>
                </div>
                <span className="text-xs text-gray-500">Telegram</span>
              </a>

              {/* LinkedIn */}
              <a 
              href="https://www.linkedin.com/in/gian-paolo-69a2992b7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3">

                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-blue-500/60 group-hover:bg-blue-500/10 transition-all">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <span className="text-xs text-gray-500">LinkedIn</span>
              </a>
 
              <a
                href="https://www.onlinejobs.ph/jobseekers/info/4562938"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-green-500/60 group-hover:bg-green-500/10 transition-all">
                  <span className="text-lg font-bold text-gray-400 group-hover:text-green-400 transition-colors">OJ</span>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">OnlineJobs.ph</span>
              </a>
            </div>
          </AnimatedSection>
        </section>
 
        <footer className="text-center py-8 text-gray-600 text-xs border-t border-white/5">
          © 2026 Gian Paolo Oga. All rights reserved.
        </footer>
      </div>
 
      {/* ─── PROJECT MODAL ─── */}
      <Dialog.Root open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <AnimatePresence>
          {selectedProject && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a2540] to-[#0d1630] rounded-2xl border border-white/20 shadow-2xl z-50"
                >
                  <Dialog.Close className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
                    <X className="w-5 h-5" />
                  </Dialog.Close>
                  <div className="p-4 md:p-8 space-y-6">
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                    </div>
                    <Dialog.Title className="text-xl md:text-2xl font-bold">{selectedProject.title}</Dialog.Title>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Dialog.Description className="text-gray-300 leading-relaxed">{selectedProject.about}</Dialog.Description>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.screenshots.map((s, i) => (
                        <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10">
                          <img src={s} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <a
                      href={selectedProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0d1630] rounded-xl font-bold transition-all"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
}