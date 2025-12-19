import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Star, Clock, Check, ChevronRight, Menu, X, Instagram, Mail, Phone, PawPrint } from 'lucide-react';

// --- Assets ---
// Using the uploaded image for the hero section
const ENDING_IMAGE = "/steven_dogs.jpeg";
const HERO_IMAGE = "/steven_karo.jpg";

// Online placeholder images for the preview
const PHILOSOPHY_IMAGE = "/karo.png"; // Dog looking at hand/training
const DOG_1_IMAGE = "/skittelz.png"; // Bulldog type for "Skittelz"
const DOG_2_IMAGE = "/cappa.png"; // Mixed breed for "Cappa"

const WAVE_TEXTURE_IMAGE = "wave.png";

const WAVE_PATH_BOTTOM = "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z";
const WAVE_PATH_TOP = "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z";

// --- Components ---

const SectionHeading = ({ children, subtitle, light = false }) => (
  <div className="text-center mb-12 md:mb-16">
    {subtitle && (
      <span className={`block text-sm font-bold uppercase tracking-[0.2em] mb-3 ${light ? 'text-stone-300' : 'text-stone-500'}`}>
        {subtitle}
      </span>
    )}
    <h2 className={`text-3xl md:text-5xl font-serif font-bold ${light ? 'text-white' : 'text-stone-800'}`}>
      {children}
    </h2>
    <div className={`w-24 h-1 mx-auto mt-6 ${light ? 'bg-stone-400' : 'bg-[#8c7b6c]'}`}></div>
  </div>
);

const NavItem = ({ label, page, onClick, active }) => (
  <button
    onClick={() => onClick(page)}
    className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 
      ${active 
        ? 'text-[#8c7b6c] border-b-2 border-[#8c7b6c]' 
        : 'text-stone-600 hover:text-[#8c7b6c] hover:bg-stone-50 rounded-md'}`}
  >
    {label}
  </button>
);

const Header = ({ setPage, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo Area */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => setPage('hero')}
        >
          <div className={`font-serif font-bold text-xl md:text-2xl tracking-wider transition-colors ${isScrolled ? 'text-stone-800' : 'text-stone-800 md:text-white'}`}>
            KARO & STEVEN
            <span className={`block text-[10px] md:text-xs font-sans font-normal uppercase tracking-[0.3em] ${isScrolled ? 'text-[#8c7b6c]' : 'text-stone-600 md:text-stone-300'} group-hover:text-[#8c7b6c] transition-colors`}>
              Hundetraining
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-stone-100">
          <NavItem label="Start" page="hero" onClick={setPage} active={activeSection === 'hero'} />
          <NavItem label="Philosophie" page="philosophy" onClick={setPage} active={activeSection === 'philosophy'} />
          <NavItem label="Leistungen" page="services" onClick={setPage} active={activeSection === 'services'} />
          <NavItem label="Kontakt" page="contact" onClick={setPage} active={activeSection === 'contact'} />
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden p-2 rounded-md ${isScrolled ? 'text-stone-800' : 'text-stone-800 md:text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-xl p-4 flex flex-col space-y-2 animate-fade-in-down">
          {['hero', 'philosophy', 'services', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => { setPage(section); setMobileMenuOpen(false); }}
              className="text-left px-4 py-3 text-stone-600 font-medium hover:bg-stone-50 rounded-lg capitalize"
            >
              {section === 'hero' ? 'Startseite' : section}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

const HeroSection = ({ setPage }) => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src={HERO_IMAGE} 
        alt="Karo und Steven mit Hunden" 
        className="w-full h-full object-cover object-center"
      />
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/60"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white mt-16">
      <div className="inline-block mb-4 px-3 py-1 border border-white/30 rounded-full backdrop-blur-sm bg-white/10">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">Karo & Steven Hundetraining</p>
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-8 drop-shadow-lg">
        Verständnis <br/><span className="italic font-light">schafft</span> Vertrauen.
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-100 mb-10 font-light leading-relaxed drop-shadow-md">
        Jeder Hund verdient ein glückliches Leben - und wir geben jedem Hund eine Chance! Wer seinen Hund versteht, kann ihm Sicherheit geben. Wir helfen Ihnen dabei, eine vertrauensvolle Beziehung aufzubauen.
        <br /> Fair, individuell und alltagstauglich.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setPage('services')}
          className="px-8 py-4 bg-[#8c7b6c] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#7a6b5e] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-sm"
        >
          Angebote ansehen
        </button>
        <button 
          onClick={() => setPage('philosophy')}
          className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/40 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all duration-300 rounded-sm"
        >
          Unsere Philosophie
        </button>
      </div>
    </div>
    
    {/* WAVE DIVIDER AT THE BOTTOM */}
    <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-[1px]">
       <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-32 fill-[#faf9f6]">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
       </svg>
    </div>
  </section>
);

const PhilosophySection = () => {
  const principles = [
    { title: "Verständnis", desc: "Wir analysieren Bedürfnisse und Motivationen.", icon: <PawPrint className="w-6 h-6" /> },
    { title: "Klarheit", desc: "Wir kommunizieren eindeutig und sicher.", icon: <PawPrint className="w-6 h-6" /> },
    { title: "Vertrauen", desc: "Wir schaffen Bindung durch Fairness.", icon: <PawPrint className="w-6 h-6" /> },
    { title: "Souveränität", desc: "Wir führen gelassen und entspannt.", icon: <PawPrint className="w-6 h-6" /> },
  ];

  return (
    <section id="philosophy" className="py-24 bg-[#faf9f6] relative overflow-hidden">
      {/* BACKGROUND TEXTURE IMAGE (The dummy image) */}
      <div className="absolute inset-0 z-0 opacity-0 pointer-events-none">
        <img src={WAVE_TEXTURE_IMAGE} alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#8c7b6c] font-bold tracking-widest uppercase text-sm mb-2 block">Unsere Philosophie</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6 leading-tight">
              Nicht nur Training.<br/>
              <span className="text-[#8c7b6c] italic">Eine Lebenseinstellung.</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Hundetraining ist mehr als nur "Sitz" und "Platz". <br />
              Wir wollen keine Roboter, sondern fördern ruhige, selbstbewusste Hunde, die sich gerne an ihren Menschen orientieren.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((p, idx) => (
                <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                  <div className="p-2 bg-[#e8e4dc] text-[#5c4d43] rounded-lg">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 font-serif">{p.title}</h4>
                    <p className="text-sm text-stone-500 mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                 <img src={PHILOSOPHY_IMAGE} alt="Training Philosophy" className="w-full h-full object-cover object-center" />
             </div>
             {/* Decorative Element */}
             <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-[#8c7b6c] rounded-2xl z-0 hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => (
  <section className="py-24 bg-[#2d241e] text-[#f7f5f0] relative overflow-hidden">
    {/* Top Wave (Inverse) for smooth transition */}
    <div className="absolute top-0 left-0 right-0 z-20 translate-y-[-1px]">
       <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16 fill-[#faf9f6]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
       </svg>
    </div>

    <div className="absolute top-0 right-0 p-32 bg-[#422e26] rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
      <SectionHeading subtitle="Erfolgsgeschichten" light>Das sagen unsere Kunden</SectionHeading>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {[
          {
            text: "Bisher haben uns alle Hundeschulen und Hundetrainer abgelehnt. Karo und Steven waren die ersten Trainer, die sich überhaupt an Skittelz herangetraut haben. Und das mit großem Erfolg! Bereits nach dem ersten Treffen konnten wir Fortschritte sehen.",
            author: "Skittelz",
            detail: "XL Bully (55kg) - Aggressionsprobleme",
            image: DOG_1_IMAGE
          },
          {
            text: "Wir konnten mit Cappa teilweise nicht mal mehr Gassigehen. Nach nur wenigen Minuten mit Karo und Steven war sie wie ausgetauscht. Wir sind so dankbar und freuen uns, dass wir Cappa ein besseres Leben ermöglichen können.",
            author: "Cappa",
            detail: "Mischling aus Rumänien - Angstverhalten",
            image: DOG_2_IMAGE
          }
        ].map((t, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition duration-300 flex flex-col sm:flex-row overflow-hidden group">
            
            {/* Image Section - Large & 9:16 Aspect Ratio */}
            <div className="sm:w-2/5 md:w-1/3 relative shrink-0">
               {/* On Mobile: aspect-[9/16] forces a tall portrait crop. 
                 On Desktop: h-full makes it fill the card height.
               */}
               <div className="aspect-[9/16] sm:aspect-auto sm:h-full w-full relative">
                  <img 
                    src={t.image} 
                    alt={t.author} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Subtle gradient on mobile so text overlay isn't needed but edge looks nice */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d241e]/50 to-transparent sm:hidden"></div>
               </div>
            </div>

            {/* Content Section */}
            <div className="p-8 sm:p-6 md:p-8 flex flex-col justify-center flex-1">
              <div className="text-[#8c7b6c] mb-4 text-sm">
                {[1,2,3,4,5].map(star => <span key={star} className="inline-block mr-1">★</span>)}
              </div>
              <p className="text-lg font-serif leading-relaxed mb-6 text-stone-200 italic">
                "{t.text}"
              </p>
              <div className="mt-auto">
                <p className="font-bold text-white tracking-wide text-lg">{t.author}</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider mt-1">{t.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Bottom Wave */}
    <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-[1px]">
       <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16 fill-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
       </svg>
    </div>
  </section>
);

const ServicesSection = ({ setPage }) => {
  const services = [
    {
      title: "Erstgespräch",
      price: "89,99€",
      oldPrice: "134,99€", // Added old price
      time: "90 Min",
      desc: "Der Grundstein für Ihre gemeinsame Zukunft.",
      features: ["Verhaltensanamnese", "Zieldefinition", "Individueller Plan", "Erste Schritte"],
      highlight: true,
      zeegUrl: "https://zeeg.me/landgrafsteven/erstgespraech"
    },
    {
      title: "Einzeltermin",
      price: "59,99€",
      oldPrice: "89,99€", // Added old price
      time: "60 Min",
      desc: "Intensives 1:1 Training an Ihren Themen.",
      features: ["Korrektur von Feinheiten", "Hausaufgaben-Check", "Praxisnahe Umgebung", "Direktes Feedback"],
      highlight: false,
      link: "#"
    },
    {
      title: "Online Termin",
      price: "19,99€",
      oldPrice: "29,99€",
      time: "30 Min",
      desc: "Perfekt für schnelle Rückfragen & Theorie.",
      features: ["Video-Beratung", "Analyse von Videos", "Ortsunabhängig", "Flexible Zeiten"],
      highlight: false,
      link: "#"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* BACKGROUND TEXTURE IMAGE */}
      <div className="absolute inset-0 z-0 opacity-0 pointer-events-none">
        <img src={WAVE_TEXTURE_IMAGE} alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading subtitle="Unser Angebot">Investieren Sie in Ihre Beziehung</SectionHeading>
        
        <div className="text-center mb-12 -mt-8">
           <span className="inline-block bg-[#8c7b6c]/10 text-[#8c7b6c] px-4 py-2 rounded-full text-sm font-bold tracking-wide">
             Nur noch für kurze Zeit zu reduzierten Preisen!
           </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              className={`relative rounded-2xl p-8 transition-all duration-300 group
                ${s.highlight 
                  ? 'bg-[#2d241e] text-[#f7f5f0] shadow-2xl scale-105 z-10' 
                  : 'bg-[#faf9f6] text-stone-800 hover:shadow-xl border border-stone-100'}`}
            >
              {s.highlight && (
                <div className="absolute top-0 right-0 bg-[#8c7b6c] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-xl uppercase tracking-widest">
                  Empfohlen
                </div>
              )}
              
              <h3 className="text-2xl font-serif font-bold mb-2">{s.title}</h3>
              
              {/* Price Block Modified */}
              <div className="mb-6">
                {s.oldPrice && (
                  <span className={`text-lg font-medium line-through decoration-2 opacity-60 block mb-1 ${s.highlight ? 'decoration-white/30 text-stone-300' : 'decoration-[#8c7b6c]/50 text-stone-400'}`}>
                    {s.oldPrice}
                  </span>
                )}
                <div className="flex items-baseline">
                   {/* Add a specific color to the new price if it's a sale? */}
                  <span className={`text-4xl font-bold ${!s.highlight && s.oldPrice ? 'text-[#8c7b6c]' : ''}`}>{s.price}</span>
                  <span className={`ml-2 text-sm ${s.highlight ? 'text-stone-400' : 'text-stone-500'}`}>/ {s.time}</span>
                </div>
              </div>
              
              <p className={`mb-8 leading-relaxed ${s.highlight ? 'text-stone-300' : 'text-stone-600'}`}>{s.desc}</p>
              
              <ul className="space-y-4 mb-8">
                {s.features.map((f, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <Check size={16} className={`mr-3 ${s.highlight ? 'text-[#8c7b6c]' : 'text-[#8c7b6c]'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href={s.link || "#"}
                onClick={(e) => {
                  if (s.zeegUrl && window.Zeeg) {
                    e.preventDefault();
                    window.Zeeg.initPopupWidget({ 
                      url: s.zeegUrl, 
                      textColor: '#2d241e', 
                      primaryColor: '#8c7b6c', 
                      utm: { 'source': null, 'medium': null, 'campaign': null, 'content': null, 'term': null } 
                    });
                  }
                }}
                target={s.zeegUrl ? undefined : "_blank"}
                rel={s.zeegUrl ? undefined : "noopener noreferrer"}
                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center group-hover:gap-2
                  ${s.highlight 
                    ? 'bg-[#8c7b6c] hover:bg-[#7a6b5e] text-white' 
                    : 'bg-white border-2 border-[#2d241e] text-[#2d241e] hover:bg-[#2d241e] hover:text-white'}`}
              >
                Termin Buchen <ChevronRight size={14} className="hidden group-hover:block transition-all" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-stone-100 pt-8">
          <p className="text-stone-500 text-sm flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
            <span className="flex items-center"><Check size={14} className="text-[#8c7b6c] mr-2"/> Buchung & Zahlung via Zeeg</span>
            <span className="flex items-center"><Check size={14} className="text-[#8c7b6c] mr-2"/> 100% DSGVO-konform</span>
            <span className="flex items-center"><Check size={14} className="text-[#8c7b6c] mr-2"/> Kostenlose Verschiebung & Stornierung</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="relative h-[600px] md:h-[900px] overflow-hidden bg-white">
    {/* Top Wave (Inverse) for smooth transition from white services */}
    <div className="absolute top-0 left-0 right-0 z-20 translate-y-[-1px]">
       <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <defs>
            <pattern id="wave-texture-contact" patternUnits="userSpaceOnUse" width="100%" height="100%">
               <image href={WAVE_TEXTURE_IMAGE} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" style={{filter: 'grayscale(1)'}}/>
            </pattern>
          </defs>
          <path d={WAVE_PATH_TOP} fill="white"></path>
          <path d={WAVE_PATH_TOP} fill="url(#wave-texture-contact)" opacity="0.1"></path>
       </svg>
    </div>

    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img src={ENDING_IMAGE} alt="" className="w-full h-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/60"></div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1a1512] text-[#8c7b6c] py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <h4 className="text-xl font-serif font-bold text-[#f7f5f0] tracking-wide">KARO & STEVEN</h4>
        <p className="text-[10px] uppercase tracking-[0.3em] mt-1 opacity-70">Hundetraining</p>
      </div>
      
      <div className="flex space-x-8 text-sm opacity-60">
        <a href="#" className="hover:text-white transition">Datenschutz</a>
        <a href="#" className="hover:text-white transition">Impressum</a>
        <a href="#" className="hover:text-white transition">AGB</a>
      </div>
      
      <div className="mt-6 md:mt-0 text-xs opacity-40">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </div>
  </footer>
);

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Adjust offset for fixed header
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="font-sans text-stone-800 antialiased bg-[#f7f5f0] selection:bg-[#8c7b6c] selection:text-white">
      {/* Import Google Fonts via style tag for Playfair Display and Inter/Lato */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <script src="https://cdn.tailwindcss.com"></script>
      
      <Header setPage={scrollToSection} activeSection={activeSection} />
      
      <main>
        <HeroSection setPage={scrollToSection} />
        <PhilosophySection />
        <TestimonialsSection />
        <ServicesSection setPage={scrollToSection} />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;