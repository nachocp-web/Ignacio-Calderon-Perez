/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Stethoscope, 
  Brain, 
  Pill, 
  Compass,
  Quote,
  CheckCircle2,
  ChevronDown,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'about' | 'therapies' | 'contact';

const Header = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, id: Page }[] = [
    { label: 'Hjem', id: 'home' },
    { label: 'Om mig', id: 'about' },
    { label: 'Terapiformer', id: 'therapies' },
    { label: 'Kontakt', id: 'contact' },
  ];

  return (
    <header id="main-header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-on-surface">
        <div 
          id="logo"
          className="font-headline text-2xl md:text-3xl text-secondary italic cursor-pointer"
          onClick={() => setPage('home')}
        >
          Aarhus Psykiatriklinik
        </div>

        <nav id="desktop-nav" className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              id={`nav-link-${item.id}`}
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`font-body text-sm tracking-wide transition-colors hover:text-secondary ${currentPage === item.id ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            id="nav-cta-contact"
            onClick={() => setPage('contact')}
            className="bg-primary text-white font-body text-xs px-6 py-2.5 rounded-full hover:bg-surface-tint transition-all"
          >
            Kontakt
          </button>
        </nav>

        <button 
          id="mobile-menu-toggle"
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-surface shadow-xl p-6 flex flex-col gap-4 border-t border-outline-variant/30 md:hidden"
          >
            {navItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.id}`}
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg text-left px-4 py-2 rounded-lg ${currentPage === item.id ? 'bg-primary-container/20 text-primary font-bold' : 'text-on-surface-variant'}`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="space-y-4">
          <div className="font-headline text-3xl text-secondary italic">Aarhus Psykiatriklinik</div>
          <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto md:mx-0">
            Dit mentale helbred er vores prioritet. Et trygt rum designet til dig.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-primary">Links</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setPage('home')} className="text-on-surface-variant hover:text-secondary text-sm">Hjem</button></li>
            <li><button onClick={() => setPage('about')} className="text-on-surface-variant hover:text-secondary text-sm">Om mig</button></li>
            <li><button onClick={() => setPage('therapies')} className="text-on-surface-variant hover:text-secondary text-sm">Terapiformer</button></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-primary">Kontakt</h4>
          <div className="text-on-surface-variant text-sm space-y-2">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <MapPin size={16} /> Rolighedsvej 36, 8240 Risskov
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} /> kontakt@psykiatricph.dk
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Phone size={16} /> +45 34 55 65 68
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-outline-variant/20 text-center flex flex-col md:flex-row justify-between gap-4 text-xs text-on-surface-variant">
        <p>© 2024 Aarhus Psykiatriklinik. Alle rettigheder forbeholdes.</p>
        <div className="flex gap-4 justify-center">
          <button className="hover:text-secondary">Privatlivspolitik</button>
          <button className="hover:text-secondary">Cookies</button>
          <button className="hover:text-secondary">Vilkår</button>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const services = [
    {
      title: "Diagnostisk udredning",
      description: "En omfattende og empatisk analyse for at forstå din nuværende situation og identificere rødderne til din mistrivsel.",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-surface-container-low"
    },
    {
      title: "Psykoterapi",
      description: "Individuelle samtaler med fokus på personlig udvikling og overvindelse af forhindringer.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-surface-container-highest"
    },
    {
      title: "Medicinhåndtering",
      description: "Ansvarlig ordinering og tæt opfølgning af farmakologisk behandling, når det er nødvendigt.",
      icon: <Pill className="w-6 h-6" />,
      color: "bg-surface-container-low"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section id="hero-section" className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            id="hero-bg-image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoN-3w_H2B9bFHod-QJwIfLw9mJFMunzFgkOZNQpolSYp3dqQJ9YUY6Ao9Pf-_hrwfLSkt1aGSy1gQKuEjAaE_PqJ8YUjSRMURaA8etym-XyKJgBuoUyFLKXnePX_ch9BgR0FJK1l6fovuIMrBxsjlLZAWdgJJYPJroFI9NpZU8LnXEtd4QpGlSm-T1vMK9ZwTT9zzrPCkMAJtF1EM3KATtqOGsc8gz9heAvxmhdEaC4FQGX8rMkeNyDci2_YZHXqlE6bZZuyVEw0" 
            alt="Danish Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 max-w-xl"
          >
            <h1 id="hero-headline" className="font-headline text-5xl md:text-7xl text-primary leading-[1.1]">
              Aarhus Psykiatriklinik <br />
              <span className="text-3xl md:text-5xl block mt-4">
                Integrativ psykiatri i Aarhus
              </span>
            </h1>
            <p id="hero-description" className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
              Find professionel støtte i rolige omgivelser, skabt til din følelsesmæssige og mentale trivsel. En varm og empatisk tilgang baseret på ro og nærvær.
            </p>
            <div id="hero-actions" className="flex flex-wrap gap-4 pt-4">
              <button 
                id="hero-cta-appointment"
                onClick={() => setPage('contact')}
                className="bg-primary text-white font-body text-sm px-10 py-4 rounded-full shadow-lg hover:bg-surface-tint hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                Bestil tid <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                id="hero-cta-services"
                onClick={() => setPage('therapies')}
                className="bg-surface-container text-primary font-body text-sm px-10 py-4 rounded-full hover:bg-surface-container-high transition-all"
              >
                Udforsk behandlinger
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy-section" className="py-24 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-secondary">Klinisk tilgang</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary">Ro som et terapeutisk værktøj</h2>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed">
            Vores praksis bevæger sig væk fra den traditionelle kliniske kulde og omfavner en varm minimalisme. Vi tror på, at omgivelserne er afgørende for helingsprocessen, og tilbyder et trygt rum, hvor du kan trække vejret, reflektere og finde klarhed med professionel og empatisk vejledning.
          </p>
        </div>
      </section>
      <section id="services-bento" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div id="services-header" className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-3xl md:text-5xl text-primary">Specialiserede ydelser</h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto">Vi tilbyder en helhedsorienteret pleje tilpasset den enkelte, der kombinerer moderne psykiatri med personlig behandling.</p>
        </div>

        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div id="service-card-diagnostic" className="md:col-span-2 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/30 group hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-secondary-container/30 text-secondary rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-3xl text-primary">Diagnostisk udredning</h3>
              <p className="font-body text-on-surface-variant max-w-md">
                En omfattende og empatisk analyse for at forstå din nuværende situation og identificere rødderne til din mistrivsel for at skabe en klar og effektiv handleplan.
              </p>
            </div>
          </div>

          <div id="service-card-therapy" className="bg-surface-container-highest rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-primary-container/20 text-primary rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-3xl text-primary">Psykoterapi</h3>
              <p className="font-body text-on-surface-variant">
                Individuelle samtaler med fokus på personlig udvikling, stresshåndtering og overvindelse af følelsesmæssige udfordringer.
              </p>
            </div>
          </div>

          <div id="service-card-medication" className="bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-shadow">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-tertiary-container/20 text-tertiary rounded-2xl flex items-center justify-center">
                <Pill className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-3xl text-primary">Medicinering</h3>
              <p className="font-body text-on-surface-variant">
                Klinisk opfølgning for ansvarlig og overvåget brug af psykofarmakologisk behandling.
              </p>
            </div>
          </div>

          <div id="service-card-mindfulness" className="md:col-span-2 bg-white rounded-3xl p-10 flex flex-col md:flex-row items-center gap-12 border border-outline-variant/30 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex-1 space-y-6">
              <div className="w-14 h-14 bg-surface-container text-on-surface-variant rounded-2xl flex items-center justify-center">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-headline text-3xl text-primary">Klinisk Mindfulness</h3>
              <p className="font-body text-on-surface-variant">
                Teknikker til bevidst nærvær integreret i behandlingen for at reducere angst og forbedre følelsesmæssig regulering i hverdagen.
              </p>
            </div>
            <div id="mindfulness-image-container" className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden bg-surface-variant">
              <img 
                id="mindfulness-image"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKw18XMXIzWPnqIOGVCA5Lsxi4di9ptXoMwoaeTHe2B3iqP8s0ttQjGumRFdL6UE7OQlR4eKIU5DDPiec-fGJkxKt3ASW2q_jRAY2-ZYI30GgZrFMtTq_jgvPn1YvWENz0OQt42e_f6NqnrVegIJQyZWVSPuhNgC9WP92oHiFqYFP3n62IaXV_Bz4DYPIqg8QetawJadOI1ImjJlhGC2enqcJKLhVnsuRD2NGDIadTq3fGCHZ5Pr4a8LmUhQW_zWI9JXEEkIiDuHE" 
                alt="Mindfulness" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-low overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <Quote className="w-16 h-16 text-secondary mx-auto opacity-30" />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-headline text-3xl md:text-4xl text-primary italic leading-relaxed"
          >
            "Fra det øjeblik jeg trådte ind, følte jeg en dyb følelse af ro. Tilgangen føles ikke klinisk, men dybt menneskelig og forstående. Det har været afgørende for min bedring."
          </motion.p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full bg-surface-variant flex items-center justify-center font-body text-on-surface-variant text-lg">M.S.</div>
            <div className="text-left">
              <p className="font-body font-bold text-primary">Anonym patient</p>
              <p className="font-body text-xs text-on-surface-variant">Løbende terapi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="animate-in slide-in-from-bottom-5 duration-700 pt-32 pb-24">
    {/* Hero Section */}
    <section className="px-6 md:px-12 mb-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/src/assets/images/regenerated_image_1778963518834.png" 
                alt="Ignacio Calderon Perez" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl -z-0" />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <span className="font-body text-sm font-bold uppercase tracking-widest text-secondary">Speciallæge i psykiatri</span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary leading-tight">Ignacio Calderon Perez</h1>
              <p className="font-body text-xl text-on-surface-variant leading-relaxed">
                Min rejse inden for psykiatrien har altid været drevet af en dyb nysgerrighed på det menneskelige sind og et ønske om at skabe ægte forandring. 
              </p>
              <p className="font-body text-lg text-on-surface-variant/80 leading-relaxed">
                Som grundlægger af Aarhus Psykiatriklinik har jeg skabt et rum, hvor videnskabelig ekspertise møder menneskelig varme. Jeg tror på, at hver person har sin egen unikke fortælling, og at heling starter med at blive set og hørt i et trygt miljø.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Philosophy & Values */}
    <section className="bg-surface-container-low py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl text-primary">Min Vision & Værdier</h2>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto">Min tilgang er funderet i respekten for individet og troen på, at mental sundhed kræver en balance mellem krop, sind og omgivelser.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Dyb Empati",
              desc: "At forstå din verden indefra er grundlaget for al min behandling. Jeg skaber et rum uden fordomme.",
              icon: <Brain className="text-secondary" />
            },
            {
              title: "Faglig Integritet",
              desc: "Jeg holder mig konstant opdateret med den nyeste forskning for at sikre dig den mest effektive behandling.",
              icon: <CheckCircle2 className="text-primary" />
            },
            {
              title: "Ro og Nærvær",
              desc: "I en travl verden er ro en luksus. Her får du tid og plads til at fordybe dig i din egen proces.",
              icon: <Compass className="text-tertiary" />
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/30 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">{item.title}</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Experience & Education */}
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h2 className="font-headline text-4xl text-primary">Uddannelse & Baggrund</h2>
            <div className="space-y-8">
              {[
                {
                  year: "2012 - 2018",
                  title: "Speciallæge i Psykiatri",
                  place: "Københavns Universitetshospital",
                  desc: "Specialisering med fokus på affektive lidelser og personlighedspsykiatri."
                },
                {
                  year: "2005 - 2011",
                  title: "Cand.med.",
                  place: "Aarhus Universitet",
                  desc: "Medicinstudiet med særlig interesse for neurobiologi og medicinsk psykologi."
                }
              ].map((edu, i) => (
                <div key={i} className="flex gap-6">
                  <div className="font-body text-sm font-bold text-secondary shrink-0 pt-1 w-24">{edu.year}</div>
                  <div className="space-y-2">
                    <h4 className="font-headline text-xl text-primary">{edu.title}</h4>
                    <p className="font-body text-sm text-primary/70">{edu.place}</p>
                    <p className="font-body text-on-surface-variant text-sm leading-relaxed">{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="font-headline text-4xl text-primary">Erhvervserfaring</h2>
            <div className="space-y-8">
              {[
                {
                  year: "2018 - Nu",
                  title: "Privatpraktiserende Psykiater",
                  place: "Aarhus Psykiatriklinik",
                  desc: "Etablering og ledelse af klinik med fokus på integrativ og personlig psykiatri."
                },
                {
                  year: "2015 - 2018",
                  title: "Overlæge",
                  place: "Psykiatrisk Center København",
                  desc: "Ansvarlig for udredning og behandling på lukket afsnit samt ambulant opfølgning."
                }
              ].map((exp, i) => (
                <div key={i} className="flex gap-6">
                  <div className="font-body text-sm font-bold text-secondary shrink-0 pt-1 w-24">{exp.year}</div>
                  <div className="space-y-2">
                    <h4 className="font-headline text-xl text-primary">{exp.title}</h4>
                    <p className="font-body text-sm text-primary/70">{exp.place}</p>
                    <p className="font-body text-on-surface-variant text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Quote Section */}
    <section className="bg-primary py-24 px-6 md:px-12 text-center text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]" />
      </div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <Quote size={64} className="mx-auto opacity-20 mb-8" />
        <h3 className="font-headline text-3xl md:text-5xl italic leading-tight">
          "At hjælpe et menneske med at finde fodfæste igen kræver ikke bare medicin, men en dyb forståelse for deres historie og styrke."
        </h3>
        <p className="font-body text-white/70 uppercase tracking-widest text-sm pt-4">— Ignacio Calderon Perez</p>
      </div>
    </section>
  </div>
);

const TherapiesPage = () => {
  const therapies = [
    {
      title: "Kognitiv adfærdsterapi (KAT)",
      description: "En struktureret tilgang, der undersøger forbindelsen mellem tanker, følelser og adfærd. Det giver dig praktiske værktøjer til mental modstandskraft.",
      icon: <Brain />
    },
    {
      title: "Mindfulness og bevidst nærvær",
      description: "Praksis der inviterer til at forankre opmærksomheden i nuet uden dom. Hjælper med at reducere kognitiv støj og angst ved at dyrke indre ro.",
      icon: <Compass />
    },
    {
      title: "Acceptance and Commitment Therapy (ACT)",
      description: "Fremmer psykologisk fleksibilitet. Vi lærer at acceptere det, der er uden for vores kontrol, og forpligte os til berigende handlinger.",
      icon: <CheckCircle2 />
    }
  ];

  return (
    <div className="animate-in slide-in-from-right-5 duration-700 pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-24">
        <section className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="font-headline text-5xl md:text-6xl text-primary">Terapeutiske tilgange</h1>
          <p className="font-body text-lg text-on-surface-variant">
            Vi anvender en integrativ tilgang og vælger den terapeutiske modalitet, der bedst passer til din oplevelse. Et trygt rum, hvor mental trivsel kan blomstre.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapies.map((t, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-10 border border-outline-variant/30 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-surface-container-low text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                {t.icon}
              </div>
              <h3 className="font-headline text-2xl text-primary mb-4">{t.title}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>

        <section className="bg-primary/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="font-headline text-4xl text-primary">Evidensbaseret medicin</h2>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Hver intervention er understøttet af de seneste fremskridt inden for neurovidenskab og klinisk psykologi. Vi kombinerer lægefaglig præcision med den menneskelige varme for at sikre det bedst mulige terapeutiske resultat.
              </p>
              <ul className="space-y-4">
                {['Helhedsorienterede behandlinger', 'Personlige protokoller', 'Specialiseret opfølgning'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-body text-sm text-primary">
                    <CheckCircle2 size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH5wEj50jLOkpk0HWUohsXCF2G4q7O5iTIXz0ZnggNvAiszdUi91iBxt6s301lsxu1y_PRhwhP-4OooZf03S24SRr4MkZcqEolqOJmK3R2n32nd5_f2UmRi_IYm6fKOh8YTsrTa9Rs-WRqmXu2sO081dI4wIaQKI8KfwX-m04fGRkokVkT8vzq5HuVyRMZU_DSJihkDntiSk_gMaTQpudN4evieLnf1HtH25RKx6ncLO5mTuZhSjQX9pUa7fDaI1mnceFBrLpxT48" 
                alt="Clinic Ambient" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ContactPage = () => (
  <div className="animate-in fade-in duration-700 pt-32 pb-24 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="font-headline text-5xl md:text-6xl text-primary">Kontakt os</h1>
            <p className="font-body text-lg text-on-surface-variant">
              Et trygt og roligt rum for din mentale trivsel. Book en indledende samtale eller stille os spørgsmål.
            </p>
          </div>

          <form className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/30">
            <div className="space-y-2">
              <label className="font-body text-xs font-bold uppercase tracking-widest text-primary ml-2">Fulde navn</label>
              <input 
                type="text" 
                placeholder="F.eks. Anna Jensen"
                className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 font-body transition-all"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-primary ml-2">Telefon</label>
                <input 
                  type="tel" 
                  placeholder="+45 34 55 65 68"
                  className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 font-body transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs font-bold uppercase tracking-widest text-primary ml-2">E-mail</label>
                <input 
                  type="email" 
                  placeholder="din@email.dk"
                  className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 font-body transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-body text-xs font-bold uppercase tracking-widest text-primary ml-2">Besked</label>
              <textarea 
                rows={4}
                placeholder="Hvordan kan vi hjælpe dig?"
                className="w-full px-6 py-4 rounded-2xl bg-surface-container-low border-transparent focus:border-primary focus:ring-0 font-body transition-all resize-none"
              />
            </div>
            <button className="w-full bg-primary text-white font-body py-5 rounded-2xl hover:bg-surface-tint transition-all shadow-lg hover:shadow-xl font-bold">
              Send besked
            </button>
          </form>
        </div>

        <div className="space-y-12">
          <div className="bg-surface-container-highest rounded-[2.5rem] p-10 space-y-10 border border-outline-variant/40">
            <h3 className="font-headline text-3xl text-primary">Kontaktoplysninger</h3>
            <div className="space-y-8">
              {[
                { icon: <MapPin />, label: "Klinikadresse", text: "Rolighedsvej 36, 8240 Risskov" },
                { icon: <Mail />, label: "E-mailadresse", text: "kontakt@psykiatricph.dk" },
                { icon: <Phone />, label: "Telefon", text: "+45 34 55 65 68" },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-primary mb-1">{item.label}</p>
                    <p className="font-body text-on-surface-variant">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="aspect-[16/10] bg-surface-container-low rounded-3xl overflow-hidden shadow-inner border border-outline-variant/30 relative">
              {/* Map Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant p-8 text-center space-y-4">
                <MapPin size={48} className="text-secondary opacity-50" />
                <p className="font-body text-sm italic">Central beliggenhed i Risskov</p>
                <button className="bg-white px-6 py-2.5 rounded-full shadow-sm text-xs font-bold text-primary hover:bg-surface transition-colors flex items-center gap-2">
                  Se på Google Maps
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-headline text-3xl text-primary px-4">Ofte stillede spørgsmål</h3>
            <div className="space-y-4">
              {[
                "Hvordan forløber den første samtale?",
                "Tager I imod sundhedsforsikring?",
                "Tilbyder I online konsultationer?"
              ].map((q, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-outline-variant/30 flex justify-between items-center cursor-pointer hover:bg-surface-container-low transition-colors">
                  <span className="font-body text-sm font-bold text-primary">{q}</span>
                  <ChevronDown size={20} className="text-secondary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setPage] = useState<Page>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'about': return <AboutPage />;
      case 'therapies': return <TherapiesPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden selection:bg-secondary/20 selection:text-secondary">
      <Header currentPage={currentPage} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />

      {/* FAB Scroll Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-surface-tint focus:outline-none"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
