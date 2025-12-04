import React, { useState, useEffect, useRef } from 'react';
import { 
  Linkedin, 
  ChevronDown, 
  Brain, 
  Cpu, 
  Eye, 
  BookOpen, 
  Network,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  ScrollText
} from 'lucide-react';

const PROFILE = {
  name: "Dr. Steven Landgraf",
  title: "Senior AI Engineer & Researcher",
  institution: "Karlsruhe Institute of Technology (KIT).",
  tagline: "First-Principles Thinking to Transform Research into Solutions.",
  about: "I'm an AI engineer, researcher, and tech enthusiast living at the intersection of computer vision and metrology. My focus is on making AI systems more reliable, interpretable, and safer—across domains like remote sensing, robotics, and autonomous driving. Whether debugging a stubborn model or guiding a thesis, I love pushing the boundaries of what machines can do.",
  email: "steven.landgraf@kit.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/steven-landgraf-1a781321a/?locale=en-US",
    scholar: "https://scholar.google.com/citations?user=7DOqcXkAAAAJ&hl=en",
    dissertation: "https://publikationen.bibliothek.kit.edu/1000183395",
  }
};

const PHILOSOPHY = [
  {
    title: "Reliability & Robustness",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "In a world of chasing state-of-the-art results on benchmarks, I focus on the messy reality. My work centers on reliability and robustness — building systems that know when they don't know. I believe AI should be safe, interpretable, and trustworthy before it is deployed."
  },
  {
    title: "Full-Stack Efficiency",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "Great research shouldn't stay a proof of concept. I bridge the gap between mathematical theory and production code. From optimizing model architectures to building reproducible Docker pipelines, I ensure that cutting-edge algorithms run efficiently in the real world."
  },
  {
    title: "Teamwork as a Multiplier",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    description: "Having successfully supervised over a dozen of theses and managed multiple industry projects, I have learned that collaboration is key. I empower students and peers to take ownership, turning individual potential into collective innovation."
  }
];

const EDUCATION = [
  {
    degree: "Dr.-Ing. in Machine VIsion",
    school: "Karlsruhe Institute of Technology (KIT)",
    year: "Defended: 07/2025",
  },
  {
    degree: "M.Sc. in Geomatics",
    school: "Karlsruhe Institute of Technology (KIT)",
    year: "10/2018 - 08/2020",
  },
  {
    degree: "B.Sc. in Geomatics",
    school: "Karlsruhe Institute of Technology (KIT)",
    year: "10/2015 - 08/2018",
  }
];

const EXPERIENCE = [
  {
    role: "Senior Researcher",
    company: "Machine Vision Metrology Group (KIT)",
    year: "07/2025 - Present",
  },
  {
    role: "Visiting Researcher",
    company: "The Ohio State University (USA)",
    year: "06/2024 - 09/2024",
  },
  {
    role: "Researcher (PhD Student)",
    company: "Machine Vision Metrology Group (KIT)",
    year: "01/2022 - 06/2025",
  },
  {
    role: "Lecturer & Software Engineer",
    company: "Geoinformatics Group (KIT)",
    year: "09/2020 - 10/2024",
  },
  {
    role: "Personal Trainer",
    company: "Boulderwelt GmbH",
    year: "04/2023 - 01/2024",
  },
  {
    role: "Student Assistant",
    company: "Karlsruhe Institute of Technology (KIT)",
    year: "04/2016 - 09/2020",
  }
];

const PUBLICATIONS = [
  {
    title: "Rethinking Semi-supervised Segmentation Beyond Accuracy: Reliability and Robustness",
    venue: "Conference",
    date: "2025",
    link: "https://stevenlandgraf.github.io/Rethinking_Semi-supervised_Segmentation_Website/"
  },
  {
    title: "Efficient Multi-task Uncertainties for Joint Semantic Segmentation and Monocular Depth Estimation",
    venue: "Conference / Journal",
    date: "2025",
    link: "https://stevenlandgraf.github.io/EMUFormer_Website/"
  },
  {
    title: "A Comparative Study on Multi-task Uncertainty Quantification in Semantic Segmentation and Monocular Depth Estimation",
    venue: "Conference / Journal",
    date: "2025",
    link: "https://stevenlandgraf.github.io/Multi-task_Uncertainties_Website/"
  },
  {
    title: "A Critical Synthesis of Uncertainty Quantification and Foundation Models in Monocular Depth Estimation",
    venue: "Journal",
    date: "2025",
    link: "https://stevenlandgraf.github.io/FoundationDepthUQ_Website/"
  },
  {
    title: "U-CE: Uncertainty-aware Cross-Entropy for Semantic Segmentation",
    venue: "Conference",
    date: "2024",
    link: "https://stevenlandgraf.github.io/U-CE_Website/"
  },
  {
    title: "DUDES: Deep Uncertainty Distillation using Ensembles for Semantic Segmentation",
    venue: "Journal",
    date: "2024",
    link: "https://stevenlandgraf.github.io/DUDES_Website/"
  }
];

const MeshBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: null, y: null };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.1})`; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            const directionX = forceDirectionX * force * 0.5;
            const directionY = forceDirectionY * force * 0.5;
            this.vx += directionX * 0.05;
            this.vy += directionY * 0.05;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            let opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      if (mouse.x != null) {
         particles.forEach(particle => {
            let dx = mouse.x - particle.x;
            let dy = mouse.y - particle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouseDistance) {
                ctx.beginPath();
                let opacity = 1 - distance / mouseDistance;
                ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.4})`;
                ctx.lineWidth = 1.5;
                ctx.moveTo(mouse.x, mouse.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
            }
         });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-950"
    />
  );
};

const navLinks = [
  { name: 'About Me', href: '#about' },
  { name: 'Experience & Education', href: '#cv' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Publications', href: '#publications' },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          SL
        </a>
        <div className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-slate-300 hover:text-cyan-400 font-medium transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
            <a href={PROFILE.links.scholar} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><BookOpen size={20}/></a>
            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20}/></a>
        </div>
      </div>
    </nav>
  );
};

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`py-20 md:py-32 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && (
        <h2 className="text-3xl md:text-5xl font-bold mb-16 flex items-center gap-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {title}
          </span>
          <div className="h-px bg-slate-800 flex-grow max-w-xs ml-4"></div>
        </h2>
      )}
      {children}
    </div>
  </section>
);

const GlassCard = ({ children, className = "", hoverEffect = true }) => (
  <div className={`
    relative overflow-hidden
    bg-slate-900/40 backdrop-blur-md 
    border border-slate-700/50 
    rounded-2xl p-6 md:p-8 
    ${hoverEffect ? 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] transition-all duration-300 group' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const FloatingElement = ({ icon: Icon, delay, x, y, size = 40, color = "text-cyan-500" }) => (
  <div 
    className={`absolute ${color} opacity-20 animate-float`}
    style={{ 
      top: y, 
      left: x, 
      animationDelay: `${delay}s`,
      zIndex: 0 
    }}
  >
    <Icon size={size} />
  </div>
);

const TimelineItem = ({ title, place, year, children, last = false }) => (
  <div className={`relative ${!last ? 'pb-12' : 'pb-0'}`}>
    {!last && (
      <div className="absolute top-2 left-[11px] md:left-[10px] w-0.5 h-full bg-slate-800/50 -z-10"></div>
    )}
    
    <div className="flex gap-6 md:gap-10">
      <div className="relative mt-2 flex-shrink-0">
        <div className="h-6 w-6 rounded-full border-4 border-slate-950 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"></div>
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-baseline flex-wrap gap-x-4">
          <h3 className="text-xl font-bold text-white order-1">{title}</h3>
          <span className="text-cyan-400 font-mono text-sm whitespace-nowrap order-2">
            {year}
          </span>
          <p className="text-purple-300 font-medium order-3 w-full mt-1 mb-2">{place}</p>
        </div>
        
        <div className="text-slate-400 text-sm leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
    const [typedText, setTypedText] = useState('');
    const fullText = PROFILE.tagline; 

    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.substring(0, index));
        index++;
        if (index > fullText.length) clearInterval(interval);
      }, 50); 
      return () => clearInterval(interval);
    }, [fullText]); 

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <MeshBackground /> 
      <NavBar />

      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <FloatingElement icon={Brain} delay={0} x="15%" y="20%" size={64} color="text-purple-500" />
          <FloatingElement icon={Cpu} delay={2} x="80%" y="30%" size={50} color="text-cyan-500" />
          <FloatingElement icon={Eye} delay={4} x="70%" y="75%" size={56} color="text-emerald-500" />
          <FloatingElement icon={Network} delay={1.5} x="10%" y="70%" size={48} color="text-blue-500" />
        </div>

        <div className="max-w-5xl w-full relative z-10">
          <p className="text-slate-300 font-mono mb-4 animate-fade-in-up">Hi, I'm</p>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_auto] animate-shimmer">
              {PROFILE.name}.
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl text-slate-400 mb-8 max-w-2xl animate-fade-in-up delay-200">
            {PROFILE.title} <span className="text-slate-600">at</span><br />
            <span className="text-slate-300">{PROFILE.institution}</span>
          </h2>
          
          <div className="h-8 md:h-12 mb-12 flex items-center">
             <span className="text-xl md:text-2xl font-mono text-purple-400 border-r-2 border-purple-400 pr-2 animate-pulse-cursor">
               {typedText}
             </span>
          </div>

          <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300 max-w-3xl">
            <a href="#about" className="group relative px-8 py-3 bg-cyan-600/10 border border-cyan-500/50 text-cyan-400 rounded-full font-medium overflow-hidden transition-all duration-300 hover:bg-cyan-500 hover:text-slate-900 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <span className="relative z-10">About Me</span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
            </a>
            
            <a href="#cv" className="px-8 py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full font-medium hover:bg-slate-700 transition-all duration-300 hover:scale-105">
              Experience & Education
            </a>

            <a href="#philosophy" className="px-8 py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full font-medium hover:bg-slate-700 transition-all duration-300 hover:scale-105">
              Philosophy
            </a>

            <a href="#publications" className="px-8 py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full font-medium hover:bg-slate-700 transition-all duration-300 hover:scale-105">
              Publications
            </a>

            <a href={PROFILE.links.scholar} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3 bg-purple-600/10 border border-purple-500/50 text-purple-400 rounded-full font-medium hover:bg-purple-700/20 transition-all duration-300 hover:scale-[1.02]">
              <BookOpen size={18} /> Google Scholar
            </a>

            <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3 bg-purple-600/10 border border-purple-500/50 text-purple-400 rounded-full font-medium hover:bg-purple-700/20 transition-all duration-300 hover:scale-[1.02]">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>

        <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 hover:text-cyan-400 transition-colors">
          <ChevronDown size={32} />
        </a>
      </section>

      <Section id="about" title="About Me">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed text-justify">
            <p>
              I'm an AI engineer, researcher, and tech enthusiast living at the intersection of <strong className="text-cyan-300">computer vision</strong> and <strong className="text-cyan-300">metrology</strong>.
              My focus is on making AI systems more reliable, efficient, interpretable, and safer — across domains like <strong className="text-cyan-300">remote sensing</strong>, <strong className="text-cyan-300">robotics</strong>, <strong className="text-cyan-300">medical imaging</strong>, <strong className="text-cyan-300">autonomous driving</strong>, and <strong className="text-cyan-300">industrial inspection</strong>.
            </p>
            <p>
              I'm passionate about bridging the gap between <strong className="text-purple-300">cutting-edge research</strong> and <strong className="text-purple-300">real-world impact</strong>. Whether debugging a stubborn model, optimizing deployment pipelines, or guiding a thesis to the finish line, I genuinely <strong className="text-purple-300">love to collaborate</strong> to push the boundaries of what machines can do for us.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <GlassCard className="flex flex-col items-center text-center p-12">
                <div className="w-32 h-32 rounded-full bg-slate-800 mb-6 flex items-center justify-center border-2 border-cyan-500/30 overflow-hidden relative">
                  <img
                    src="/Website/me.jpg"
                    alt="Dr. Steven Landgraf"
                    className="w-full h-full object-cover"
                  />
                </div>
               <h3 className="text-2xl font-bold text-white mb-2">{PROFILE.name}</h3>
               <p className="text-cyan-400 mb-6">{PROFILE.title}</p>
               <div className="flex gap-4">
                 <a href={PROFILE.links.scholar} className="p-2 bg-slate-800 rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-all"><BookOpen size={20}/></a>
                 <a href={PROFILE.links.linkedin} className="p-2 bg-slate-800 rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-all"><Linkedin size={20}/></a>
               </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section id="cv" title="Experience & Education">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="order-2 md:order-1">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
              <Briefcase className="text-cyan-500" size={28} />
              Professional Experience
            </h3>
            <div className="ml-3">
              {EXPERIENCE.map((exp, idx) => (
                <TimelineItem 
                  key={idx} 
                  title={exp.role} 
                  place={exp.company} 
                  year={exp.year}
                  last={idx === EXPERIENCE.length - 1}
                >
                  {exp.focus && (
                    <p className="mb-2 text-slate-300 font-medium text-justify">
                      <span className="text-cyan-500/80 mr-2">Focus:</span>
                      {exp.focus}
                    </p>
                  )}
                  {exp.details && exp.details.length > 0 && (
                     <ul className="list-disc list-outside ml-4 space-y-1 marker:text-cyan-500">
                        {exp.details.map((detail, i) => <li key={i}>{detail}</li>)}
                     </ul>
                  )}
                </TimelineItem>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2 mb-16 md:mb-0"> 
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
              <GraduationCap className="text-cyan-500" size={28} />
              Education
            </h3>
            <div className="ml-3">
              {EDUCATION.map((edu, idx) => (
                <TimelineItem 
                  key={idx} 
                  title={edu.degree} 
                  place={edu.school} 
                  year={edu.year}
                  last={idx === EDUCATION.length - 1} 
                >
                  {edu.details && edu.details.length > 0 && (
                     <ul className="list-disc list-outside ml-4 space-y-1 marker:text-cyan-500 text-justify">
                        {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                     </ul>
                  )}
                </TimelineItem>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="philosophy" title="My Core Philosophy">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY.map((item, idx) => (
            <GlassCard key={idx} className={`flex flex-col gap-4 group ${item.border} hover:bg-slate-800/60`}>
              <div className={`p-3 w-fit rounded-lg ${item.bg} ${item.color}`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm text-justify">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section id="publications" title="Selected Publications">
        <div className="grid md:grid-cols-2 gap-6">
          {PUBLICATIONS.map((pub, idx) => (
            <GlassCard key={idx} className="flex flex-col h-full group relative hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    <span className="text-cyan-400 text-sm font-mono">{pub.date}</span>
                 </div>
                 <span className="px-2 py-1 text-xs font-semibold text-purple-300 bg-purple-500/10 rounded border border-purple-500/20">
                    {pub.venue}
                 </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-6 group-hover:text-white transition-colors leading-tight">
                {pub.title}
              </h3>

              <div className="mt-auto flex items-center pt-4 border-t border-slate-700/50">
                <a 
                   href={pub.link} 
                   target="_blank" 
                   rel="noreferrer"
                   className="flex items-center gap-2 text-sm font-medium text-slate-400 group-hover:text-cyan-400 transition-colors"
                >
                   View Project <ArrowRight size={16} />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a 
              href={PROFILE.links.dissertation} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600/10 border border-purple-500/50 text-purple-400 rounded-full font-medium hover:bg-purple-700/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <ScrollText size={18} /> View Dissertation
            </a>
            
            <a 
              href={PROFILE.links.scholar} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600/10 border border-purple-500/50 text-purple-400 rounded-full font-medium hover:bg-purple-700/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <BookOpen size={18} /> All Publications
            </a>
        </div>
      </Section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="relative overflow-hidden text-center p-12 border-cyan-500/30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Let's Connect
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-lg">
              Interested in collaboration, AI discussions, or want to say hi?<br />
              My inbox is always open!
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-3 bg-purple-600/10 border border-purple-500/50 text-purple-400 rounded-full font-medium hover:bg-purple-700/20 transition-all duration-300 hover:scale-[1.02]">
                  <Linkedin size={18} /> LinkedIn
                </a>
            </div>

            <div className="text-slate-600 text-sm border-t border-slate-800/50 pt-8">
              <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            </div>
          </GlassCard>
        </div>
      </section>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: #a855f7; }
        }
        .animate-pulse-cursor { animation: blink 1s step-end infinite; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </div>
  );
}