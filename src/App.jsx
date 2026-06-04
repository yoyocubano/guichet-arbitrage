import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  Check, 
  TrendingUp, 
  FileText, 
  Clock, 
  Plus, 
  Menu, 
  X, 
  ChevronRight, 
  Calculator, 
  HelpCircle,
  Download,
  AlertTriangle,
  Send,
  Zap,
  Globe,
  Building,
  DollarSign
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('cns');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States for interactive calculators
  // 1. CNS Auto-Refund State
  const [cnsReceiptsCount, setCnsReceiptsCount] = useState(5);
  const [cnsServiceTier, setCnsServiceTier] = useState('premium');
  const [cnsCalc, setCnsCalc] = useState({ fee: 0, timeSaved: 0 });

  // 2. SME Grants State
  const [grantSector, setGrantSector] = useState('digital');
  const [employeeCount, setEmployeeCount] = useState(12);
  const [smeCalc, setSmeCalc] = useState({ estGrant: 0, successProb: 95 });

  // 3. Transborder Tax State
  const [commuteCountry, setCommuteCountry] = useState('FR');
  const [annualSalary, setAnnualSalary] = useState(65000);
  const [teleworkDays, setTeleworkDays] = useState(25);
  const [taxCalc, setTaxCalc] = useState({ optimalDays: 0, penaltyRisk: 0, potentialSavings: 0 });

  // Contact/Onboarding Form State
  const [formState, setFormState] = useState({ name: '', email: '', company: '', product: 'cns', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update CNS Calculator
  useEffect(() => {
    const baseFee = cnsReceiptsCount * 4;
    const timeSaved = cnsReceiptsCount * 15; // 15 mins per receipt
    const premiumMultiplier = cnsServiceTier === 'premium' ? 1.5 : 1.0;
    setCnsCalc({
      fee: Math.round(baseFee * premiumMultiplier),
      timeSaved
    });
  }, [cnsReceiptsCount, cnsServiceTier]);

  // Update SME Grant Calculator
  useEffect(() => {
    let estGrant = 5000;
    let prob = 98;
    if (grantSector === 'green') {
      estGrant = employeeCount > 10 ? 15000 : 8000;
      prob = 92;
    } else if (grantSector === 'innovation') {
      estGrant = employeeCount > 20 ? 45000 : 20000;
      prob = 85;
    }
    setSmeCalc({ estGrant, successProb: prob });
  }, [grantSector, employeeCount]);

  // Update Transborder Tax Calculator
  useEffect(() => {
    let limit = 34; // France limit
    if (commuteCountry === 'BE') limit = 34;
    if (commuteCountry === 'DE') limit = 19;

    const currentOver = Math.max(0, teleworkDays - limit);
    const taxRate = 0.32; // average tax rate
    const dayRate = annualSalary / 220;
    const potentialSavings = Math.round(Math.min(teleworkDays, limit) * dayRate * 0.15); // Tax benefit
    const penaltyRisk = currentOver > 0 ? Math.round(currentOver * dayRate * taxRate * 1.2) : 0;

    setTaxCalc({
      optimalDays: limit,
      penaltyRisk,
      potentialSavings
    });
  }, [commuteCountry, annualSalary, teleworkDays]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', company: '', product: activeTab, details: '' });
    }, 4500);
  };

  return (
    <div className="bg-[#080d15] text-[#f1f5f9] min-h-screen selection:bg-[#C9A96E]/20 selection:text-white font-sans overflow-hidden">
      
      {/* Floating Navbar with edge margins */}
      <nav className={`fixed top-4 left-4 right-4 z-50 rounded-xl transition-all duration-500 border ${isScrolled ? 'glass-nav py-3 px-6 shadow-xl' : 'bg-transparent border-transparent py-5 px-6'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A1628] to-[#1e2d42] flex items-center justify-center border border-[#C9A96E]/30 shadow-md">
              <Shield className="text-[#C9A96E] w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold tracking-wider text-sm block text-white">LUX</span>
              <span className="text-[10px] text-[#C9A96E] tracking-[0.25em] uppercase font-bold block -mt-1">TRÁMITES</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-[#C9A96E] transition-colors">Servicios</a>
            <a href="#proceso" className="text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-[#C9A96E] transition-colors">Metodología</a>
            <a href="#precios" className="text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-[#C9A96E] transition-colors">Tarifas</a>
            <a href="#calculator" className="text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-[#C9A96E] transition-colors">Simuladores</a>
            <a href="#opportunities" className="text-[10px] uppercase tracking-widest font-bold text-white/80 hover:text-[#C9A96E] transition-colors">Oportunidades</a>
            <a href="#contacto" className="bg-[#C9A96E] text-black hover:bg-white hover:text-black px-6 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all duration-300">Consulta</a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-50 bg-[#080d15] p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="text-[#C9A96E] w-6 h-6" />
                <span className="text-sm font-bold tracking-wider text-white">LUX TRÁMITES</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 my-auto text-center">
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light hover:text-[#C9A96E] transition-colors">Servicios</a>
              <a href="#proceso" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light hover:text-[#C9A96E] transition-colors">Cómo Funciona</a>
              <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light hover:text-[#C9A96E] transition-colors">Simulaciones</a>
            </div>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#C9A96E] text-black py-4 rounded-sm text-center font-bold text-sm tracking-widest uppercase">Empezar</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 overflow-hidden bg-radial-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.06),transparent_60%)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 text-[#C9A96E] text-[10px] tracking-widest uppercase font-bold">
              <Zap className="w-3.5 h-3.5" /> Quiet Luxury en Gestión Administrativa
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[76px] font-serif leading-[1.05] tracking-tight text-white">
              Gestión y Arbitraje de <br />
              <span className="text-gradient-gold font-light italic pr-4">MyGuichet.lu</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-xl leading-relaxed">
              Soporte de alto nivel y automatizaciones locales para profesionales y familias internacionales en el Gran Ducado.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#calculator" className="bg-[#C9A96E] hover:bg-white text-black font-bold px-8 py-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2">
                Simular Retornos <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#servicios" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-sm text-xs uppercase tracking-widest transition-colors">
                Explorar Servicios
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#C9A96E] to-[#0A1628] opacity-15 blur-xl"></div>
            <div className="relative glass-panel border border-[#C9A96E]/20 rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] tracking-wider text-white/40 uppercase block">Motor de Ejecución</span>
                  <span className="text-sm font-semibold text-white">Nodos Soberanos Locales</span>
                </div>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]"><Layers className="w-4 h-4" /></div>
                    <span className="text-xs font-semibold">Reembolsos CNS</span>
                  </div>
                  <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-bold">Auto-Sync</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]"><Building className="w-4 h-4" /></div>
                    <span className="text-xs font-semibold">Subvenciones PYMEs</span>
                  </div>
                  <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-bold">€5K Garantizados</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]"><Globe className="w-4 h-4" /></div>
                    <span className="text-xs font-semibold">Escudo Transfronterizo</span>
                  </div>
                  <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-bold">34 Días Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Briefing Section */}
      <section className="bg-[#0A1628] text-white py-28 border-y border-[#C9A96E]/10 relative">
        <div className="absolute inset-0 radial-spotlight pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block mb-6">INTEGRIDAD Y EFICACIA</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-10 leading-tight">La complejidad burocrática requiere una gestión técnica impecable.</h2>
              <p className="text-white/70 font-light mb-12">En LuxTrámites eliminamos la incertidumbre de los procesos administrativos mediante un enfoque de Quiet Luxury basado en el conocimiento de la normativa luxemburguesa.</p>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 w-px h-12 bg-[#C9A96E]/40"></div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold mb-2">Seguridad Jurídica</h4>
                    <p className="text-white/60 text-xs">Garantizamos que cada expediente cumpla estrictamente con los requisitos actuales del Gran Ducado.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-px h-12 bg-[#C9A96E]/40"></div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold mb-2">Discreción Absoluta</h4>
                    <p className="text-white/60 text-xs">Tratamiento confidencial de su información personal y corporativa bajo estándares premium.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-[#C9A96E]/20 z-0"></div>
              <img className="relative z-10 w-full h-[550px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQQkZPRsjGyhJEiw3hC_8FZu9KOOZlMFBuEOX-kOKbSwRHolkZ2yd0a6-rKlUQTB_ZzIMD7xJLkBFAtlY4dvqqXGsoFQRaI7i8pHOHgjl3d_Ugf7QLtccN2W2cHPbIewgPazbdEUZuXd6gyNtUIE_ASP9ufMuodqWsKAotBqVLXKb6CLaig0D2LmdOrDCmarv2Q7SrixHnD-p71SpmbPhUt-mJZtohwCD36hs4YL0kpTuG2MAkOy4gOBjx5s_m2YiqYZHr7HYY3otv"/>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 bg-[#0a0f18] relative" id="servicios">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block mb-4">PORTFOLIO DE SERVICIOS</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Especialización Administrativa</h2>
            <div className="w-16 h-px bg-[#C9A96E] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Gestión de Residencia", desc: "Asesoramiento integral y tramitación de permisos de estancia, de llegada y cambios de estatus legal en Luxemburgo." },
              { title: "Optimización Fiscal", desc: "Diligencia y arbitraje de declaraciones de impuestos para personas físicas y deducciones familiares." },
              { title: "Subvenciones y Ayudas", desc: "Preparación de dossiers técnicos de digitalización y medio ambiente para PYMEs (SME Packages)." },
              { title: "Reunificación Familiar", desc: "Planificación y ejecución de expedientes oficiales para reagrupaciones familiares internacionales." },
              { title: "Servicios Educativos", desc: "Gestión de plazas en el sistema de enseñanza pública y privada luxemburguesa para menores." },
              { title: "Legalización Técnica", desc: "Tratamiento oficial de apostillas y validación de documentación extranjera ante el Ministerio." }
            ].map((srv, idx) => (
              <div key={idx} className="glass-panel p-8 hover:border-[#C9A96E]/50 transition-all duration-500 shadow-xl rounded-lg glow-card interactive-trigger">
                <h3 className="text-lg font-bold text-[#f1f5f9] mb-4">{srv.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed mb-6 font-light">{srv.desc}</p>
                <a href="#calculator" className="text-[10px] font-bold text-[#C9A96E] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1">
                  Simular Retorno <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-28 bg-[#080d15] border-t border-b border-[#C9A96E]/15" id="proceso">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block mb-4">METODOLOGÍA</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Proceso de Arbitraje</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", name: "Diagnóstico", desc: "Evaluación exhaustiva del caso para determinar la viabilidad y requisitos técnicos." },
              { step: "02", name: "Planificación", desc: "Definición de la estrategia administrativa y cronograma de actuación oficial." },
              { step: "03", name: "Gestión", desc: "Gestión directa ante las autoridades competentes con profundo conocimiento técnico." },
              { step: "04", name: "Finalización", desc: "Entrega de resoluciones oficiales y cierre administrativo de la diligencia." }
            ].map((p, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-16 h-16 border border-[#C9A96E]/30 flex items-center justify-center text-xl font-bold text-[#C9A96E] rounded-md bg-white/5">
                  {p.step}
                </div>
                <h4 className="font-bold text-sm text-white">{p.name}</h4>
                <p className="text-white/60 text-xs leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="calculator" className="py-28 bg-[#0a0f18] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase font-bold">Simuladores Premium</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">Calcule sus Retornos</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Inputs */}
            <div className="lg:col-span-7 glass-panel p-8 rounded-lg flex flex-col justify-between">
              <div className="space-y-8">
                <div className="flex border-b border-white/10 pb-2 overflow-x-auto whitespace-nowrap">
                  <button 
                    onClick={() => setActiveTab('cns')}
                    className={`pb-4 px-2 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === 'cns' ? 'text-[#C9A96E]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    1. Reembolsos CNS
                    {activeTab === 'cns' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A96E]"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('sme')}
                    className={`pb-4 px-6 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === 'sme' ? 'text-[#C9A96E]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    2. Ayudas Digitalización
                    {activeTab === 'sme' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A96E]"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('tax')}
                    className={`pb-4 px-2 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === 'tax' ? 'text-[#C9A96E]' : 'text-neutral-400 hover:text-white'}`}
                  >
                    3. Escudo Transfronterizo
                    {activeTab === 'tax' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A96E]"></span>}
                  </button>
                </div>

                {activeTab === 'cns' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-semibold text-white/80">Facturas Médicas al Trimestre</label>
                        <span className="text-sm font-semibold text-white">{cnsReceiptsCount} facturas</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        value={cnsReceiptsCount}
                        onChange={(e) => setCnsReceiptsCount(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-3">Nivel del Servicio</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setCnsServiceTier('basic')}
                          className={`p-4 rounded-sm border text-left transition-all ${cnsServiceTier === 'basic' ? 'bg-[#C9A96E]/10 border-[#C9A96E] text-white' : 'bg-white/5 border-transparent text-white/70 hover:border-white/10'}`}
                        >
                          <h4 className="text-xs font-bold">Escaneo Asistido</h4>
                          <p className="text-[10px] text-white/50 mt-1">Preparamos sobres y formularios físicos.</p>
                        </button>
                        <button 
                          onClick={() => setCnsServiceTier('premium')}
                          className={`p-4 rounded-sm border text-left transition-all ${cnsServiceTier === 'premium' ? 'bg-[#C9A96E]/10 border-[#C9A96E] text-white' : 'bg-white/5 border-transparent text-white/70 hover:border-white/10'}`}
                        >
                          <h4 className="text-xs font-bold">Concierge Premium</h4>
                          <p className="text-[10px] text-white/50 mt-1">Sincronización LuxTrust + Gestión total.</p>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'sme' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'digital', name: 'Digital/IT', desc: 'SME Package' },
                        { id: 'green', name: 'Ambiental', desc: 'Sostenibilidad' },
                        { id: 'innovation', name: 'R+D', desc: 'Innovación' }
                      ].map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => setGrantSector(sec.id)}
                          className={`p-4 rounded-sm border text-left transition-all ${grantSector === sec.id ? 'bg-[#C9A96E]/10 border-[#C9A96E] text-white' : 'bg-white/5 border-transparent text-white/70 hover:border-white/10'}`}
                        >
                          <h4 className="text-xs font-bold">{sec.name}</h4>
                          <p className="text-[9px] text-white/50 mt-1">{sec.desc}</p>
                        </button>
                      ))}
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-semibold text-white/80">Empleados FTE</label>
                        <span className="text-sm font-semibold text-white">{employeeCount} FTE</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tax' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {['FR', 'BE', 'DE'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setCommuteCountry(c)}
                          className={`p-4 rounded-sm border text-left transition-all ${commuteCountry === c ? 'bg-[#C9A96E]/10 border-[#C9A96E] text-white' : 'bg-white/5 border-transparent text-white/70 hover:border-white/10'}`}
                        >
                          <h4 className="text-xs font-bold text-white">
                            {c === 'FR' && 'Francia'}
                            {c === 'BE' && 'Bélgica'}
                            {c === 'DE' && 'Alemania'}
                          </h4>
                          <span className="text-[10px] text-white/50 block mt-1">
                            {c === 'FR' && '34 Días Límite'}
                            {c === 'BE' && '34 Días Límite'}
                            {c === 'DE' && '19 Días Límite'}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-2">Salario Bruto Anual (€)</label>
                        <input 
                          type="number" 
                          value={annualSalary}
                          onChange={(e) => setAnnualSalary(parseInt(e.target.value) || 0)}
                          className="w-full bg-[#0A1628]/35 border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-2">Días Teletrabajo</label>
                        <input 
                          type="number" 
                          value={teleworkDays}
                          onChange={(e) => setTeleworkDays(parseInt(e.target.value) || 0)}
                          className="w-full bg-[#0A1628]/35 border border-white/10 rounded-sm px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C9A96E]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Receipt Summary */}
            <div className="lg:col-span-5 bg-[#0A1628] text-white p-8 md:p-12 border border-[#C9A96E]/20 rounded-lg flex flex-col justify-between relative overflow-hidden shadow-2xl">
              {activeTab === 'cns' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold uppercase tracking-widest">
                    <Calculator className="w-4 h-4" />
                    <span>CNS Refund</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Tarifa del Servicio</span>
                      <span className="font-semibold text-white">€{cnsCalc.fee} / trimestre</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Tiempo Ahorrado</span>
                      <span className="font-semibold text-emerald-400">{cnsCalc.timeSaved} Minutos</span>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <span className="text-[10px] text-white/40 block">Procesamiento CNS</span>
                      <span className="text-2xl font-bold text-white mt-1">4 Semanas Fast-Track</span>
                    </div>
                  </div>
                  <a href="#contacto" className="w-full bg-[#C9A96E] hover:bg-white text-black font-bold py-3.5 rounded-sm block text-center text-xs uppercase tracking-widest transition-all duration-300 mt-8 shadow-md">
                    Comenzar
                  </a>
                </div>
              )}

              {activeTab === 'sme' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold uppercase tracking-widest">
                    <Calculator className="w-4 h-4" />
                    <span>Ayudas de Capital</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Subsidio Estimado</span>
                      <span className="font-bold text-white text-base">€{smeCalc.estGrant}</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Probabilidad de Aprobación</span>
                      <span className="font-semibold text-emerald-400">{smeCalc.successProb}% de éxito</span>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <span className="text-[10px] text-white/40 block">Costo de Tramitación</span>
                      <span className="text-xl font-bold text-white mt-1">10% Success Fee</span>
                    </div>
                  </div>
                  <a href="#contacto" className="w-full bg-[#C9A96E] hover:bg-white text-black font-bold py-3.5 rounded-sm block text-center text-xs uppercase tracking-widest transition-all duration-300 mt-8 shadow-md">
                    Comenzar
                  </a>
                </div>
              )}

              {activeTab === 'tax' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold uppercase tracking-widest">
                    <Calculator className="w-4 h-4" />
                    <span>Escudo Fiscal</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Días Seguros</span>
                      <span className="font-bold text-white">{taxCalc.optimalDays} días</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Ahorros Fiscales Proyectados</span>
                      <span className="font-semibold text-emerald-400">~€{taxCalc.potentialSavings}</span>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <span className="text-[10px] text-white/40 block flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Riesgo de Penalización
                      </span>
                      <span className="text-xl font-bold text-rose-500 mt-1">€{taxCalc.penaltyRisk}</span>
                    </div>
                  </div>
                  <a href="#contacto" className="w-full bg-[#C9A96E] hover:bg-white text-black font-bold py-3.5 rounded-sm block text-center text-xs uppercase tracking-widest transition-all duration-300 mt-8 shadow-md">
                    Comenzar
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10 Oportunidades Brutales */}
      <section id="opportunities" className="py-28 bg-[#080d15] border-t border-[#C9A96E]/15 relative">
        <div className="absolute inset-0 radial-spotlight pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
            <span className="text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase font-bold">Oportunidades de Negocio</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white">10 Oportunidades Brutales de Monetización</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "1. Onboarding de Empleados Expatriados", desc: "Plataforma de preparación y validación por IA de la 'Declaración de Entrada' en eSpaces profesionales para nuevas contrataciones extranjeras." },
              { title: "2. Reembolsos de Bajas Laborales (Mutualité)", desc: "SaaS/Agencia para automatizar la solicitud de reembolsos salariales por incapacidades médicas corporativas." },
              { title: "3. Obtención Express de Licencias Comerciales", desc: "Servicios llave en mano de tramitación de la 'Autorisation d'Établissement' para inversores extranjeros que abren sociedades." },
              { title: "4. Registro de Beneficiarios Reales (RBE)", desc: "Gestión mensual de cumplimiento normativo y emisión de certificados oficiales para fondos y holdings de inversión." },
              { title: "5. Extensión Auto-fill de Formularios Corporativos", desc: "Extensión de navegador premium (Chrome/Safari) para autocompletar expedientes en lote desde ERPs de la empresa." },
              { title: "6. Gestor de Subvenciones Digitales (SME Packages)", desc: "Suscripción B2B de preparación y auditoría técnica de solicitudes para la ayuda de digitalización estatal de €5,000." },
              { title: "7. Pasarela de Verificación de Solvencia (KYC)", desc: "Integración Proptech que valida hojas de cotización e inhabilitaciones de alquileres exportadas de MyGuichet." },
              { title: "8. Optimizador de Becas de Estudios (CEDIES)", desc: "Portal inteligente de solicitud y cálculo de ayudas económicas mensuales universitarias de Luxemburgo." },
              { title: "9. Importación y Registro de Vehículos SNCA", desc: "Flujo digital asistido para el trámite de matriculación de coches importados, placas temporales y tasas." },
              { title: "10. Sincronización MyGuichet Document Backup", desc: "Agente local que descarga periódicamente los PDF del buzón privado 'My documents' y los respalda de forma cifrada en nubes corporativas." }
            ].map((op, idx) => (
              <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/5 hover:border-[#C9A96E]/50 transition-all duration-300 glow-card interactive-trigger">
                <h4 className="font-bold text-white text-sm mb-2">{op.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed font-light">{op.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Form */}
      <section id="contacto" className="py-28 bg-[#0a0f18] text-white border-t border-[#C9A96E]/15">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase font-bold">CONTACTO</span>
            <h2 className="text-3xl font-serif">Inicie su Trámite</h2>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-lg border border-[#C9A96E]/20 text-[#191c1d]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Jean Dupont" 
                        className="w-full bg-[#f8f9fa] border border-[#E0E0E0] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold mb-2">Email</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="j.dupont@empresa.lu" 
                        className="w-full bg-[#f8f9fa] border border-[#E0E0E0] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold mb-2">Tipo de Trámite</label>
                    <select 
                      value={formState.product}
                      onChange={(e) => setFormState({ ...formState, product: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-[#E0E0E0] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                    >
                      <option value="cns">Reembolso CNS</option>
                      <option value="sme">Ayudas Digitalización</option>
                      <option value="tax">Escudo Transfronterizo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#C9A96E] font-bold mb-2">Detalles del Caso</label>
                    <textarea 
                      rows="4"
                      required
                      value={formState.details}
                      onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                      placeholder="Resumen del expediente a gestionar..." 
                      className="w-full bg-[#f8f9fa] border border-[#E0E0E0] rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#0A1628] text-white hover:bg-[#C9A96E] font-bold py-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-2"
                  >
                    Enviar Solicitud <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6 text-white"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <Check size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Solicitud Enviada</h3>
                  <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed">
                    ¡Gracias! Nos pondremos en contacto contigo en un plazo máximo de **2 horas hábiles** con un informe técnico detallado.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080d15] border-t border-[#C9A96E]/20 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-[#C9A96E] w-6 h-6" />
              <span className="text-sm font-bold tracking-wider">LUX TRÁMITES</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">Gestión administrativa de alto nivel con rigor institucional en el Gran Ducado de Luxemburgo.</p>
          </div>
          <div>
            <h5 className="text-[10px] text-[#C9A96E] font-bold uppercase tracking-widest mb-6">Servicios</h5>
            <ul className="space-y-3 text-xs text-white/50">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Residencia y Permisos</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Optimización Fiscal</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Ayudas SME</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] text-[#C9A96E] font-bold uppercase tracking-widest mb-6">Institucional</h5>
            <ul className="space-y-3 text-xs text-white/50">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Nuestros Estándares</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Rigor de Datos</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Localización</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] text-[#C9A96E] font-bold uppercase tracking-widest mb-6">Legal</h5>
            <ul className="space-y-3 text-xs text-white/50">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">GDPR Local-First</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Términos</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-white/5 text-center md:text-left">
          <p className="text-[10px] text-white/40 uppercase tracking-widest">© 2026 LuxTrámites. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
