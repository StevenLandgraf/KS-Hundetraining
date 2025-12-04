import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  ChevronDown, 
  Brain, 
  Cpu, 
  Eye, 
  Layers, 
  BookOpen, 
  Award,
  ExternalLink,
  Code
} from 'lucide-react';

// --- Assets & Data ---

const PROFILE = {
  name: "Dr. Steven Landgraf",
  title: "AI Engineer & Researcher",
  institution: "Karlsruhe Institute of Technology (KIT)",
  tagline: "Bridging Research and Real-World Impact in Machine Vision.",
  about: "I'm an AI engineer, researcher, and tech enthusiast living at the intersection of computer vision and metrology. My focus is on making AI systems more reliable, interpretable, and safer—across domains like remote sensing, robotics, and autonomous driving. Whether debugging a stubborn model or guiding a thesis, I love pushing the boundaries of what machines can do.",
  email: "steven.landgraf@kit.edu", // Placeholder based on institution
  links: {
    linkedin: "https://www.linkedin.com/in/steven-landgraf-1a781321a/?locale=en-US",
    scholar: "https://scholar.google.com/citations?user=7DOqcXkAAAAJ&hl=en",
  }
};

const EDUCATION = [
  {
    degree: "Dr.-Ing. Machine Vision Metrology",
    school: "Karlsruhe Institute of Technology (KIT)",
    year: "2025",
    desc: "Dissertation on Efficient Estimation and Exploitation of Predictive Uncertainties in Deep Learning-based Machine Vision."
  },
  {
    degree: "M.Sc. Geomatics",
    school: "Karlsruhe Institute of Technology (KIT)",
    year: "2020",
    desc: "Specialized in Computer Vision and Geoinformatics."
  },
  {
    degree: "B.Sc. Geomatics",
    school: "Karlsruhe Institute of Technology (KIT)",
    year: "2018",
    desc: "Foundational studies in geomatics."
  }
];

const SKILLS = [
  { name: "Computer Vision", icon: Eye, level: 95 },
  { name: "Deep Learning", icon: Brain, level: 95 },
  { name: "Uncertainty Quantification", icon: Layers, level: 90 },
  { name: "Explainable AI", icon: Cpu, level: 85 },
  { name: "Remote Sensing", icon: GlobeIcon, level: 80 },
  { name: "Python / PyTorch", icon: Code, level: 95 },
];

const PUBLICATIONS = [
  {
    title: "Rethinking Semi-supervised Segmentation Beyond Accuracy",
    venue: "CVPR / ECCV (Preprint)",
    date: "Jun 2025",
    tags: ["Semi-supervised", "Robustness", "Reliability"],
    link: "#"
  },
  {
    title: "Efficient Multi-task Uncertainties for Joint Semantic Segmentation",
    venue: "Pattern Recognition",
    date: "Apr 2025",
    tags: ["Multi-task Learning", "Depth Estimation"],
    link: "#"
  },
  {
    title: "A Comparative Study on Multi-task Uncertainty Quantification",
    venue: "Technisches Messen",
    date: "Apr 2025",
    tags: ["UQ", "Segmentation"],
    link: "#"
  },
  {
    title: "Critical Synthesis of Uncertainty Quantification and Foundation Models",
    venue: "arXiv",
    date: "Jan 2025",
    tags: ["Foundation Models", "Monocular Depth"],
    link: "#"
  }
];

// Helper icon component
function GlobeIcon(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// --- Components ---

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
        this.color = `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.1})`; // Cyan-ish
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
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
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            let opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`; // Cyan lines
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw connections to mouse
      if (mouse.x != null) {
         particles.forEach(particle => {
            let dx = mouse.x - particle.x;
            let dy = mouse.y - particle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouseDistance) {
                ctx.beginPath();
                let opacity = 1 - distance / mouseDistance;
                ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.4})`; // Purple mouse lines
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

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Research', href: '#publications' },
    { name: 'CV', href: '#cv' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          SL.
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

// --- Main App Component ---

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
  }, []);

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <MeshBackground />
      <NavBar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative">
        <div className="max-w-5xl w-full">
          <p className="text-cyan-400 font-mono mb-4 animate-fade-in-up">Hi there, I'm</p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
            {PROFILE.name}
            <span className="text-cyan-500">.</span>
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

          <div className="flex gap-6 animate-fade-in-up delay-300">
            <a href="#about" className="px-8 py-3 bg-cyan-600/10 border border-cyan-500/50 text-cyan-400 rounded-full font-medium hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300">
              Explore My Work
            </a>
            <a href={`mailto:${PROFILE.email}`} className="px-8 py-3 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-full font-medium hover:bg-slate-700 transition-all duration-300">
              Contact Me
            </a>
          </div>
        </div>

        <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 hover:text-cyan-400 transition-colors">
          <ChevronDown size={32} />
        </a>
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" title="About Me">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              I'm an AI engineer, researcher, and tech enthusiast living at the intersection of <strong className="text-cyan-300">computer vision</strong> and <strong className="text-cyan-300">metrology</strong>. My focus is on making AI systems more <strong className="text-cyan-300">reliable</strong>, <strong className="text-cyan-300">interpretable</strong>, and <strong className="text-cyan-300">safer</strong>—across domains like <strong className="text-cyan-300">remote sensing</strong>, <strong className="text-cyan-300">robotics</strong>, and <strong className="text-cyan-300">autonomous driving</strong>. Whether debugging a stubborn model or guiding a thesis, I love pushing the boundaries of what machines can do.
            </p>
            <p>
              My work aims to bridge the gap between cutting-edge research and real-world impact. From <strong className="text-cyan-300">autonomous driving</strong> to <strong className="text-cyan-300">medical imaging</strong>, I build systems that don't just predict, but <em>understand</em> what they don't know.
            </p>
            {/* <div className="pt-4 flex flex-wrap gap-3">
              {["Machine Learning", "Sports", "Music", "Tech", "Coding"].map(interest => (
                <span key={interest} className="px-3 py-1 bg-slate-800 rounded-md text-sm text-slate-300 border border-slate-700">
                  {interest}
                </span>
              ))}
            </div> */}
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <GlassCard className="flex flex-col items-center text-center p-12">
                <div className="w-32 h-32 rounded-full bg-slate-800 mb-6 flex items-center justify-center border-2 border-cyan-500/30 overflow-hidden relative">
                  <img
                    src="/me.jpg"
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

        {/* SKILLS SECTION - CONTEXTUAL VARIANT */}
        <Section id="skills" title="Technical & Leadership Arsenal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill) => (
              <GlassCard key={skill.name} className="flex flex-col gap-3 group hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <skill.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">{skill.name}</h4>
                    {/* Replace Percent with a text label */}
                    <span className="text-xs text-slate-400 font-mono border border-slate-700 px-2 py-0.5 rounded-full">
                      {skill.label} {/* e.g. "Daily Driver" or "Mentor Level" */}
                    </span>
                  </div>
                </div>
                
                {/* The Upgrade: Context over Progress Bars */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {skill.context}
                </p>
              </GlassCard>
            ))}
          </div>
        </Section>

      {/* CV / TIMELINE SECTION */}
      <Section id="cv" title="Education & Journey">
        <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12 pl-8 md:pl-12">
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[41px] md:-left-[57px] top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <span className="hidden md:inline text-slate-600">•</span>
                <span className="text-cyan-400 font-mono text-sm">{edu.year}</span>
              </div>
              <p className="text-purple-300 font-medium mb-2">{edu.school}</p>
              <p className="text-slate-400 text-sm max-w-2xl">{edu.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PUBLICATIONS SECTION */}
      <Section id="publications" title="Selected Publications">
        <div className="grid md:grid-cols-2 gap-6">
          {PUBLICATIONS.map((pub, idx) => (
            <GlassCard key={idx} className="flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 text-xs font-bold text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20">
                  {pub.venue}
                </span>
                <span className="text-slate-500 text-sm font-mono">{pub.date}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                {pub.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-auto pt-6">
                {pub.tags.map(tag => (
                  <span key={tag} className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <a href={pub.link} className="absolute top-6 right-6 text-slate-600 group-hover:text-white transition-colors">
                <ExternalLink size={20} />
              </a>
            </GlassCard>
          ))}
        </div>
        <div className="mt-12 text-center">
            <a href={PROFILE.links.scholar} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 border-b border-cyan-400/30 hover:border-cyan-400 pb-1 transition-all">
                View Full Publication List on Google Scholar <ExternalLink size={16}/>
            </a>
        </div>
      </Section>

      {/* CONTACT FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16 mt-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Interested in collaboration, uncertainty quantification, or just want to chat about the latest in AI? Feel free to reach out.
          </p>
          <div className="flex justify-center gap-6 mb-12">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all font-medium">
              <Mail size={18} /> Email Me
            </a>
            <a href={PROFILE.links.linkedin} className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all font-medium">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
          <div className="text-slate-600 text-sm">
            <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
            <p className="mt-2 text-slate-700">Built with React, Tailwind, and neural particles.</p>
          </div>
        </div>
      </footer>

      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        
        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: #a855f7; }
        }
        .animate-pulse-cursor {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}