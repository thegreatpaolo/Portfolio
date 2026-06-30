import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { Mail, Github, ExternalLink, X, MapPin, Download, Menu, Briefcase, Code, Compass, Layers, Server, Database, Wrench, Video, ShieldCheck } from 'lucide-react';
import profilePic from '../assets/profile for prtfolio.png';
import { courtImage, webImage1, webImage2, Kaboooom, webImage3, webImage4 } from '../assets';
import resumePDF from '../assets/OGA_RESUME.pdf';

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

const techEcosystem = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3']
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    skills: ['Python', 'Node.js', 'Express.js', 'Firebase', 'Supabase']
  },
  {
    id: 'database',
    title: 'Database',
    icon: <Database className="w-5 h-5 text-purple-400" />,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB']
  },
  {
    id: 'va-automation',
    title: 'Automation & VA Tools',
    icon: <Wrench className="w-5 h-5 text-amber-400" />,
    skills: [
      'Asana', 'Trello', 'ClickUp', 'Notion', 
      'Slack', 'Microsoft Teams', 'Zoom', 'Google Meet', 'Loom', 
      'Google Workspace (Docs, Sheets, Drive)', 'Microsoft 365 (Word, Excel, Outlook)', 
      'Calendly', 'Google Calendar', 'Outlook Scheduling', 
      '1Password', 'LastPass', 
      'Toggl Track', 'Hubstaff', 'Time Doctor', 
      'Canva', 'Hootsuite', 'Buffer', 'Later', 
      'Mailchimp', 'ConvertKit', 'ActiveCampaign', 
      'QuickBooks', 'FreshBooks', 'Wave', 
      'Zapier', 'Make'
    ]
  },
  {
    id: 'creative-ai',
    title: 'Video Editing & AI Labs',
    icon: <Video className="w-5 h-5 text-rose-400" />,
    skills: ['CapCut Video Editing', 'Figma UI/UX', 'Claude AI Integration', 'Gemini AI Labs', 'OpenRouter APIs', 'Apollo', 'VAPI Voice AI', 'Google Cloud']
  }
];
 
const otherSkills = [
  {
    icon: '💻',
    title: 'Front-end Development',
    desc: 'Building responsive and interactive user interfaces using React, Next.js, and Tailwind CSS to create seamless web experiences.'
  },
  {
    icon: '📱',
    title: 'Video-editing & Content Production',
    desc: 'Creating high-energy, custom short-form video layouts via CapCut, tracking retention metrics, and structuring high VA market conversion reels.'
  },
  {
    icon: '🗄️',
    title: 'Figma UX/UI',
    desc: 'Creating high-fidelity wireframes and interactive prototypes in Figma to streamline the handoff from design to development.'
  },
  {
    icon: '🔧',
    title: 'Business Workflow Automation',
    desc: 'Designing conditional logic automations on n8n, Make, and Zapier alongside CRM handling via GoHighLevel to optimize operational bandwidth.'
  },
];

const uniqueServices = [
  {
    id: 'fullstack',
    badge: 'Core Architecture',
    title: 'Full-Stack Development',
    description: 'Engineering resilient, scalable web products from initial mockups up to complex database queries. Writing clean front-end systems with React and Next.js paired alongside robust API designs.',
    highlight: 'React • Next.js • Database Logic • Cloud Deployments',
    icon: <Code className="w-6 h-6 text-cyan-400" />
  },
  {
    id: 'va-ops',
    badge: 'Operational Efficiency',
    title: 'Virtual Assistant Solutions',
    description: 'Optimizing commercial operations by decoupling manual loops. Handling system tasks, schedule calendars, project tools, and writing multi-app workflow pipelines to optimize delivery windows.',
    highlight: 'Workflow Automation • Project Mapping • Inbox/CRM Management • Bookkeeping',
    icon: <Wrench className="w-6 h-6 text-amber-400" />
  },
  {
    id: 'editing',
    badge: 'Creative Production',
    title: 'Video Editing & Assets',
    description: 'Polishing raw frames into dynamic storytelling products. Tailored optimization layouts for high short-form user retention via transitions, typography styling, and clean technical timelines.',
    highlight: 'CapCut Pipelines • Retention Transitions • Dynamic Content Structures',
    icon: <Video className="w-6 h-6 text-rose-400" />
  }
];
 
function SkillBar({ name, percent, color, index }: { name: string; percent: number; color: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });
 
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
          transition={{ duration: 1.2, delay: index * 0.05, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}88` }}
        />
      </div>
    </div>
  );
}
 
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const slideUpFadeItem = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.610, 0.355, 1.000]
    }
  }
};

function LiveWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < Math.min(particleCount, 100); i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Boosted floating velocity from 0.35 to 0.75 to make the background animation more active
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 1.8 + 0.6,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 180) {
          p1.x += (dxMouse / distMouse) * 0.25; // Snappier mouse interactive response
          p1.y += (dyMouse / distMouse) * 0.25;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)'; // Slightly cleaner star transparency contrast
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
 
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTechCategory, setActiveTechCategory] = useState('frontend');
 
  useEffect(() => {
    const container = document.getElementById('scroll-container');
    if (!container) return;
    const handleScroll = () => {
      if (Math.abs((container.scrollHeight - container.scrollTop) - container.clientHeight) < 5) {
        setActiveNav('connect');
        return;
      }

      const sections = ['home', 'about', 'services', 'skills', 'projects', 'connect'];
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
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'connect', label: 'Connect' },
  ];
 
  return (
    <div className="relative min-h-screen bg-[#060a15] text-white overflow-hidden font-sans">
      
      {/* ─── LIVE ANIMATED WALLPAPER BACKGROUND LAYER ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <LiveWallpaper />
        
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] opacity-5"
          style={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, transparent 60%)',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5"
          style={{
            background: 'linear-gradient(315deg, #1e3a8a 0%, transparent 60%)',
            clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
          }}
        />

        {/* Scaled down drift duration from 16s/20s down to 10s/12s to match the faster star movements */}
        <motion.div 
          animate={{ x: [0, 25, -15, 0], y: [0, -35, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-20 w-80 h-80 rounded-full bg-blue-600/5 blur-[120px]" 
        />

        <motion.div 
          animate={{ x: [0, -30, 15, 0], y: [0, 35, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-cyan-500/5 blur-[140px]" 
        />
      </div>
 
      {/* Main scroll container */}
      <div id="scroll-container" className="relative z-10 h-screen overflow-y-auto">
 
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#060a15]/90">
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

            {/* Desktop nav links */}
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

            <button
              onClick={() => scrollTo('connect')}
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </button>

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
                className="md:hidden overflow-hidden bg-[#060a15]/95"
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
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-10 md:py-16"
          >
            {/* Mobile Image */}
            <motion.div variants={slideUpFadeItem} className="flex justify-center md:hidden">
              <div className="relative">
                <div
                  className="absolute inset-0 scale-110 opacity-30"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  }}
                />
                <div
                  className="w-[220px] h-[250px] overflow-hidden relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: '#1e3a8a',
                  }}
                >
                  <img src={profilePic} alt="Gian Paolo Oga" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </motion.div>

            {/* Left Texts Staggered Entry */}
            <div className="col-span-1 md:col-span-7 text-center md:text-left space-y-4">
              <motion.p variants={slideUpFadeItem} className="text-2xl md:text-4xl font-light text-white">Hi!</motion.p>
              <motion.h1 variants={slideUpFadeItem} className="text-3xl md:text-6xl font-bold">
                I'm <span className="text-cyan-400">Gian Paolo</span>
              </motion.h1>
              <motion.h2 variants={slideUpFadeItem} className="text-2xl md:text-5xl font-extrabold text-white">
                A Full Stack Developer & Virtual Assistant
              </motion.h2>
              <motion.p variants={slideUpFadeItem} className="text-gray-400 italic text-base md:text-lg max-w-lg mx-auto md:mx-0">
                "I'm motivated by a profound passion for technology and a strong willingness to learn."
              </motion.p>

              <motion.div variants={slideUpFadeItem} className="space-y-3 border-l-4 border-cyan-500/40 pl-6 text-left inline-block">
                <div className="flex items-center gap-3 text-base md:text-lg text-gray-300">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                  Cagayan de Oro City, Philippines
                </div>
                <div className="flex items-center gap-3 text-base md:text-lg text-gray-300">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  gpdoga@gmail.com
                </div>
              </motion.div>

              <motion.div variants={slideUpFadeItem} className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <a
                  href={resumePDF}
                  download="OGA_RESUME.pdf"
                  className="flex items-center gap-2 px-5 md:px-7 py-3 md:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-sm md:text-base font-medium transition-all"
                >
                  <Download className="w-5 h-5" /> Download Resume
                </a>
                <button
                  onClick={() => scrollTo('about')}
                  className="flex items-center gap-2 px-5 md:px-7 py-3 md:py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#0d1630] text-sm md:text-base font-bold transition-all"
                >
                  View About Me ↓
                </button>
              </motion.div>
            </div>

            {/* Desktop Hexagon Photo */}
            <motion.div variants={slideUpFadeItem} className="hidden md:flex col-span-5 justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 scale-110 opacity-30"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  }}
                />
                <div
                  className="w-[450px] h-[500px] overflow-hidden relative"
                  style={{
                    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
                    background: '#1e3a8a',
                  }}
                >
                  <img src={profilePic} alt="Gian Paolo Oga" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── ABOUT ME SECTION ─── */}
        <section id="about" className="max-w-7xl mx-auto px-4 md:px-6 min-h-[calc(100vh-70px)] flex flex-col justify-center py-12 md:py-16">
          <div className="w-full">
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 lg:mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
              <p className="text-gray-400 text-sm md:text-base tracking-wide">My background, path, and purpose</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
                className="lg:col-span-7 space-y-6 md:space-y-8 text-gray-300 text-lg md:text-xl leading-relaxed text-justify"
              >
                <motion.p variants={slideUpFadeItem}>
                  Currently, I focus on building fast, clean, and responsive websites. I specialize in front-end development and creating user-friendly interfaces that look great on both desktop and mobile screens.
                </motion.p>
                <motion.p variants={slideUpFadeItem}>
                  I have a strong foundation in computer science and core web technologies. This training helps me write clean logic, connect front-end designs to back-end systems, troubleshoot code efficiently, and solve technical problems smoothly.
                </motion.p>
                <motion.p variants={slideUpFadeItem} className="italic text-cyan-300/90 bg-cyan-500/5 border border-cyan-500/10 p-6 md:p-8 rounded-2xl shadow-inner leading-relaxed">
                  My goal is to build digital solutions that work perfectly. Having handled both front-end systems and data workflows in my past roles, I am fully ready to apply my coding skills, attention to detail, and technical knowledge to help teams succeed.
                </motion.p>
              </motion.div>

              {/* Right Column */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 space-y-6 shadow-xl backdrop-blur-sm h-full flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-cyan-400 pb-2 flex items-center gap-2">
                  <Compass className="w-6 h-6" /> Quick Facts
                </h3>
                
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false }}
                  className="space-y-5 md:space-y-6"
                >
                  <motion.div variants={slideUpFadeItem}>
                    <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase block mb-1">Location</span>
                    <span className="text-white font-medium flex items-center gap-2 text-base">
                      <MapPin className="w-5 h-5 text-cyan-400" /> Cagayan de Oro City, PH
                    </span>
                  </motion.div>

                  <motion.div variants={slideUpFadeItem}>
                    <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase block mb-1">Core Stack</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {['React', 'Next.js', 'Node.js', 'Python', 'Flutter'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm font-mono text-cyan-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={slideUpFadeItem}>
                    <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase block mb-1">Experience</span>
                    <div className="space-y-3 mt-1 text-sm md:text-base">
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-medium text-base">Front-End Intern</p>
                          <p className="text-gray-400 text-sm">Wela • 6 Months</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Briefcase className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-medium text-base">Web Developer</p>
                          <p className="text-gray-400 text-sm">USTP Registrar • Mar - Dec</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={slideUpFadeItem}>
                    <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase block mb-1">Focus</span>
                    <span className="text-white font-medium flex items-center gap-2 text-base">
                      <Code className="w-5 h-5 text-cyan-400" /> Full-Stack Web Development & VA Automations
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── SERVICES SECTION ─── */}
        <section id="services" className="max-w-7xl mx-auto px-4 md:px-6 min-h-screen flex flex-col justify-center py-12 md:py-16 border-t border-white/5">
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Services</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">
                An explicit view of core functions I handle, executing production logic alongside strict professional tracking.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.15 }}
              className="space-y-12 max-w-5xl mx-auto"
            >
              {uniqueServices.map((srv, index) => (
                <motion.div
                  key={srv.id}
                  variants={slideUpFadeItem}
                  className={`flex flex-col md:flex-row items-start gap-6 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/20 hover:bg-white/[0.07] transition-all backdrop-blur-sm relative overflow-hidden ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="p-4 rounded-2xl bg-[#0a1124] border border-white/10 shrink-0 text-cyan-400 shadow-inner">
                    {srv.icon}
                  </div>

                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-md">
                        {srv.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-wide">{srv.title}</h3>
                    <p className="text-gray-300 text-base leading-relaxed md:text-lg text-justify">{srv.description}</p>
                    
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-gray-400">
                      <span className="text-cyan-300 font-semibold uppercase tracking-wide mr-1">Focus Metrics:</span>
                      {srv.highlight}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── TECH ECOSYSTEM SECTION ─── */}
        <section id="skills" className="max-w-7xl mx-auto px-4 md:px-6 min-h-screen flex flex-col justify-center py-12 md:py-16 border-t border-white/5">
          <div className="w-full">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Tech Architecture</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base">
                An interactive mapping of my programming environments, creative platforms, and workflow automation machinery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 space-y-3"
              >
                {techEcosystem.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTechCategory(cat.id)}
                    onMouseEnter={() => setActiveTechCategory(cat.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${
                      activeTechCategory === cat.id
                        ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${
                      activeTechCategory === cat.id ? 'bg-cyan-500/20' : 'bg-white/5'
                    }`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg transition-colors">{cat.title}</h4>
                    </div>
                  </button>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 min-h-[340px] flex flex-col justify-between backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {techEcosystem.map((cat) => cat.id === activeTechCategory && (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="text-xs font-mono uppercase text-cyan-400 tracking-widest px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                          Ecosystem Engine
                        </span>
                        <h3 className="text-3xl font-extrabold text-white mt-4">{cat.title} Stack</h3>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        {cat.skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="px-4 py-2 bg-[#0a1124] border border-white/10 rounded-xl text-sm font-medium text-gray-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-all flex items-center gap-2 shadow-inner"
                          >
                            <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="text-xs text-gray-500 border-t border-white/5 pt-4 mt-6 italic">
                  * Hover or tap left cards to pivot structural tech stack components dynamically.
                </div>
              </motion.div>
            </div>

            {/* Other high conversion skills display matrix */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-white/5">
                Core Value Implementations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherSkills.map((skill, i) => (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
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
            </div>

          </div>
        </section>
 
        {/* ─── PROJECTS SECTION ─── */}
        <section id="projects" className="max-w-7xl mx-auto px-4 md:px-6 min-h-screen flex flex-col justify-center py-12 md:py-16 border-t border-white/5">
          <div className="w-full">
            
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
              <p className="text-gray-400 text-base">A selection of things I've built</p>
            </motion.div>
   
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={slideUpFadeItem}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
            </motion.div>
          </div>
        </section>
 
        {/* ─── CONNECT SECTION ─── */}
        <section id="connect" className="max-w-7xl mx-auto px-4 md:px-6 min-h-[75vh] flex flex-col justify-center py-12 md:py-16 border-t border-white/5">
          <div className="w-full max-w-2xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's Connect</h2>
              <p className="text-gray-400 text-base mb-12">Have a project in mind or want to collaborate? Reach out!</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="flex justify-center items-center gap-10 flex-wrap"
            >
              <motion.a variants={slideUpFadeItem} href="https://github.com/thegreatpaolo" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-purple-400/60 group-hover:bg-purple-400/10 transition-all">
                  <Github className="w-7 h-7 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <span className="text-xs text-gray-500">GitHub</span>
              </motion.a>

              <motion.a variants={slideUpFadeItem} href="https://www.linkedin.com/in/gian-paolo-69a2992b7/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-blue-500/60 group-hover:bg-blue-500/10 transition-all">
                  <svg className="w-7 h-7 text-gray-400 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <span className="text-xs text-gray-500">LinkedIn</span>
              </motion.a>

              <motion.a variants={slideUpFadeItem} href="mailto:gpdoga@gmail.com" className="group flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-rose-500/60 group-hover:bg-rose-500/10 transition-all">
                  <Mail className="w-7 h-7 text-gray-400 group-hover:text-rose-400 transition-colors" />
                </div>
                <span className="text-xs text-gray-500">Gmail</span>
              </motion.a>

              <motion.a variants={slideUpFadeItem} href="https://www.onlinejobs.ph/jobseekers/info/4562938" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full border border-white/10 group-hover:border-green-500/60 group-hover:bg-green-500/10 transition-all">
                  <span className="text-lg font-bold text-gray-400 group-hover:text-green-400 transition-colors">OJ</span>
                </div>
                <span className="text-xs text-gray-500">OnlineJobs.ph</span>
              </motion.a>
            </motion.div>
          </div>
        </section>
 
        <footer className="text-center py-8 text-gray-600 text-xs">
          © 2026 Gian Paolo Oga. All rights reserved.
        </footer>
      </div>
 
      {/* ─── PROJECT MODAL ─── */}
      <Dialog.Root open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <AnimatePresence>
          {selectedProject && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
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