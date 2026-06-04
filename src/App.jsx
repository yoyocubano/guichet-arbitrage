import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Sparkles, 
  Layers, 
  ChevronRight, 
  Calculator, 
  AlertTriangle,
  Zap,
  Globe,
  Building,
  Check,
  X,
  ArrowRight,
  Menu
} from 'lucide-react';

const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return mousePos;
};

const App = () => {
  const mousePos = useMousePosition();
  const [activeTab, setActiveTab] = useState('cns');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cubanDrawerOpen, setCubanDrawerOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(null);

  // States for interactive calculators
  const [cnsReceiptsCount, setCnsReceiptsCount] = useState(5);
  const [cnsServiceTier, setCnsServiceTier] = useState('premium');
  const [cnsCalc, setCnsCalc] = useState({ fee: 0, timeSaved: 0 });

  const [grantSector, setGrantSector] = useState('digital');
  const [employeeCount, setEmployeeCount] = useState(12);
  const [smeCalc, setSmeCalc] = useState({ estGrant: 0, successProb: 95 });

  const [commuteCountry, setCommuteCountry] = useState('FR');
  const [annualSalary, setAnnualSalary] = useState(65000);
  const [teleworkDays, setTeleworkDays] = useState(25);
  const [taxCalc, setTaxCalc] = useState({ optimalDays: 0, penaltyRisk: 0, potentialSavings: 0 });

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', product: 'cns', details: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update CNS Calculator
  useEffect(() => {
    const baseFee = cnsReceiptsCount * 4;
    const timeSaved = cnsReceiptsCount * 15;
    const premiumMultiplier = cnsServiceTier === 'premium' ? 1.5 : 1.0;
    setCnsCalc({ fee: Math.round(baseFee * premiumMultiplier), timeSaved });
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
    let limit = 34;
    if (commuteCountry === 'BE') limit = 34;
    if (commuteCountry === 'DE') limit = 19;

    const currentOver = Math.max(0, teleworkDays - limit);
    const taxRate = 0.32;
    const dayRate = annualSalary / 220;
    const potentialSavings = Math.round(Math.min(teleworkDays, limit) * dayRate * 0.15);
    const penaltyRisk = currentOver > 0 ? Math.round(currentOver * dayRate * taxRate * 1.2) : 0;

    setTaxCalc({ optimalDays: limit, penaltyRisk, potentialSavings });
  }, [commuteCountry, annualSalary, teleworkDays]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', phone: '', product: activeTab, details: '' });
    }, 4000);
  };

  const cnsOpportunities = [
    { title: "Onboarding de Expatriados", desc: "Preparación y validación por IA de la 'Declaración de Entrada' en eSpaces profesionales para nuevas contrataciones." },
    { title: "Mutualité (Bajas Laborales)", desc: "SaaS/Agencia para automatizar la solicitud de reembolsos salariales por incapacidades médicas corporativas." },
    { title: "Licencias Comerciales Express", desc: "Tramitación de la 'Autorisation d'Établissement' llave en mano para inversores extranjeros que abren sociedades." },
    { title: "Registro de Beneficiarios Reales", desc: "Cumplimiento mensual normativo y emisión de certificados oficiales para fondos y holdings de inversión (RBE)." },
    { title: "Autofill de Formularios", desc: "Extensión de navegador premium (Chrome/Safari) para autocompletar expedientes en lote desde ERPs de la empresa." },
    { title: "SME Packages Digitales", desc: "Suscripción B2B de preparación y auditoría técnica de solicitudes para la ayuda de digitalización estatal de €5,000." },
    { title: "Verificación de Solvencia (KYC)", desc: "Integración Proptech que valida hojas de cotización e inhabilitaciones de alquileres exportadas de MyGuichet." },
    { title: "Becas de Estudios CEDIES", desc: "Portal inteligente de solicitud y cálculo de ayudas económicas mensuales universitarias de Luxemburgo." },
    { title: "Importación de Vehículos SNCA", desc: "Flujo digital asistido para el trámite de matriculación de coches importados, placas temporales y tasas." },
    { title: "Document Backup MyGuichet", desc: "Agente local que descarga periódicamente los PDF del buzón privado 'My documents' y los respalda de forma cifrada." }
  ];

  const cubanCases = [
    { num: "01", title: "CNS al instante", desc: "Escaneas la receta con el móvil, el sistema te rellena el sobre CNS online, te genera la etiqueta de envío prepagada y te tramita el reembolso sin mover un dedo. En 4 semanas tienes la lana en tu cuenta." },
    { num: "02", title: "SME Digital Grant", desc: "Le rascamos al gobierno los €5k de digitalización que le regalan a las PYMEs. Te armamos el dossier de punta a cabo y cobramos a éxito. Sin papeleos aburridos." },
    { num: "03", title: "Tax Shield para Fronterizos", desc: "Si cruzas la frontera de Francia, Bélgica o Alemania para currar en Luxemburgo, te calculamos al centavo los días de teletrabajo para que Hacienda no te meta una multa del carajo." },
    { num: "04", title: "Licencia de Comercio Veloz", desc: "Tramitamos tu permiso comercial de establecimiento con el Ministerio de Economía. Te lo sacamos rápido para que empieces a facturar sin trabas." },
    { num: "05", title: "Apostillas Express", desc: "Validamos, legalizamos y apostillamos tus títulos y actas extranjeras ante el MAEE de Luxemburgo para que tengan fuerza legal inmediata." },
    { num: "06", title: "Registro de Holdings RBE", desc: "Diligencia completa del Registro de Beneficiarios Reales para tus sociedades patrimoniales sin que tengas que descifrar el portal estatal." }
  ];

  return (
    <div className="bg-[#ffffff] text-[#0A1628] min-h-screen selection:bg-[#C9A96E] selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Ambient background glows for extra visual dynamic depth */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#C9A96E]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#0A1628]/5 blur-[120px] pointer-events-none" />

      {/* Interactive Cursor Spotlight (Only on Desktop) */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(201, 169, 110, 0.07), transparent 80%)`
        }}
      />

      {/* TopNavBar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-[#C9A96E]/10 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-sm bg-[#0A1628] flex items-center justify-center border border-[#C9A96E]/40 shadow-sm relative overflow-hidden">
              <Shield className="text-[#C9A96E] w-5 h-5 relative z-10 animate-pulse" />
              <div className="absolute inset-0 bg-[#C9A96E] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-tight text-[#0A1628] block group-hover:text-[#C9A96E] transition-colors">MyTramits</span>
              <span className="text-[10px] text-[#C9A96E] tracking-[0.35em] uppercase font-bold block -mt-1">&nbsp;&nbsp;352</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['servicios', 'proceso', 'simulador', 'oportunidades', 'precios'].map((item) => (
              <a key={item} href={`#${item}`} className="font-semibold text-[11px] uppercase tracking-widest text-[#4A4A4A] hover:text-[#C9A96E] transition-colors relative group">
                {item === 'proceso' ? 'Metodología' : item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            <button 
              onClick={() => setCubanDrawerOpen(true)}
              className="relative overflow-hidden border border-[#C9A96E] text-[#0A1628] hover:text-white px-5 py-2.5 font-semibold text-[10px] uppercase tracking-widest transition-colors duration-300 rounded-sm group/btn"
            >
              <span className="absolute inset-0 bg-[#C9A96E] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#C9A96E] group-hover/btn:text-white transition-colors" /> Explicación Cubana
              </span>
            </button>
          </div>

          <button className="md:hidden text-[#0A1628] p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#ffffff] p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="text-[#C9A96E] w-6 h-6 animate-pulse" />
                <span className="font-serif font-bold text-[#0A1628]">MyTramits 352</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[#0A1628] p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 my-auto text-center">
              <a href="#servicios" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light text-[#0a1628] hover:text-[#C9A96E] transition-colors">Servicios</a>
              <a href="#proceso" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light text-[#0a1628] hover:text-[#C9A96E] transition-colors">Metodología</a>
              <a href="#simulador" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light text-[#0a1628] hover:text-[#C9A96E] transition-colors">Simulador</a>
              <a href="#oportunidades" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light text-[#0a1628] hover:text-[#C9A96E] transition-colors">Estrategia</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setCubanDrawerOpen(true); }}
                className="mx-auto w-fit bg-[#C9A96E]/10 text-[#C9A96E] px-6 py-3 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center gap-2"
              >
                <Zap size={16} /> Explicación Cubana
              </button>
            </div>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#0A1628] text-white py-4 rounded-sm text-center font-bold text-sm tracking-widest uppercase">Consulta Profesional</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/55 to-[#0A1628]/95 z-10" />
          <motion.img 
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 10, ease: 'easeOut' }}
            className="w-full h-full object-cover grayscale brightness-75" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf3w2DpevpIgzpg3VxMXyZTrWOkvtJ-TP6ynE986XaZpNyADaJA2lL5KP6RGq56u21bY1bM63PPRcyzJHvAEXwIQ_tPPERowouNDWRCW3I9jO0mg3-jcfpL2DXgz5KbFUu5m1gD7dhSNIbg_ElHhboEbJIgykvBeOILRw4u9IG8esz2ioWQ9SWForrrTmMS848vApDG1G5nrnYDZDy5n_8HQeBDBZPPiUFmTZnKPWj_CSvtwhrnPgdcbQ7FWyROnAOVIF80CGbFN1V"
            alt="Luxembourg City Aerial" 
          />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-16 text-center text-white space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A96E]/50 bg-[#C9A96E]/10 text-[#C9A96E] text-[10px] tracking-widest uppercase font-bold mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" /> Quiet Luxury en Gestión de Arbitraje
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-5xl mx-auto leading-[1.1] tracking-tight"
          >
            Gestión administrativa en Luxemburgo con rigor, discreción y arbitraje experto.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-white/80 font-light leading-relaxed"
          >
            Soporte estratégico y automatización inteligente del portal MyGuichet.lu para profesionales y patrimonios internacionales.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
          >
            <a href="#simulador" className="bg-[#C9A96E] text-white hover:brightness-110 font-bold px-10 py-4.5 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 shadow-md">
              Calcular Retornos
            </a>
            <a href="#servicios" className="border border-white/30 text-white hover:bg-white hover:text-black font-bold px-10 py-4.5 rounded-sm text-xs uppercase tracking-widest transition-all duration-300">
              Explorar Servicios
            </a>
          </motion.div>
        </div>
      </section>

      {/* Briefing Section */}
      <section className="bg-[#0A1628] text-white py-28 border-y border-[#C9A96E]/10 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block">INTEGRIDAD Y EFICACIA</span>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">La complejidad burocrática requiere una gestión técnica impecable.</h2>
            <p className="text-white/70 font-light text-base leading-relaxed">
              En MyTramits eliminamos la incertidumbre de los procesos estatales luxemburgueses mediante un enfoque boutique, combinando la precisión algorítmica con el conocimiento profundo de la normativa del Gran Ducado.
            </p>
            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-px h-12 bg-[#C9A96E]/40" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Seguridad Jurídica</h4>
                  <p className="text-white/60 text-xs">Garantizamos que cada expediente cumpla estrictamente con los requisitos actuales de MyGuichet.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-px h-12 bg-[#C9A96E]/40" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Discreción Absoluta</h4>
                  <p className="text-white/60 text-xs">Tratamiento confidencial de su información personal y corporativa bajo estándares premium.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border border-[#C9A96E]/20 z-0" />
            <motion.img 
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative z-10 w-full h-[550px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl rounded-sm border border-[#C9A96E]/10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0sbxFtto2qOxAvzCK2lJewHGWeVnz_HvnxQw2kfFfsyMX8vkoUXesRNuyp0NG32VIkcjYMALdkWKeVbll92alyzpnyS5qNm7kfOftusiyYCN0zojMGCRYjMzCfYWUB2WM8aIDefHSbiRl4wnSZXqrlse6jSMxHF9KttU472JzkLNXFrzuJQRXsT3HUcY73Y5RLCOEtrSNtgnZpCPta2CR7acV31rSBfKqDsVAu2fDVI7ib_8r8kltcknqA6tgkeqZpeSkA4LJwVKl"
              alt="Luxembourg Office"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 bg-[#f9f9f9]" id="servicios">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block">PORTFOLIO DE SERVICIOS</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A1628]">Especialización en el Gran Ducado</h2>
            <div className="w-12 h-0.5 bg-[#C9A96E] mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Gestión de Residencia", desc: "Asesoramiento integral y tramitación de permisos de estancia, de llegada y cambios de estatus legal en Luxemburgo." },
              { title: "Registro y Domicilio", desc: "Formalización técnica ante administraciones comunales para registros de llegada y traslados oficiales." },
              { title: "Optimización Fiscal", desc: "Diligencia y arbitraje de declaraciones de impuestos para personas físicas y deducciones familiares." },
              { title: "Reunificación Familiar", desc: "Planificación y ejecución de expedientes oficiales para reagrupaciones familiares internacionales." },
              { title: "Servicios Educativos", desc: "Gestión de plazas en el sistema de enseñanza pública y privada luxemburguesa para menores." },
              { title: "Legalización Técnica", desc: "Tratamiento oficial de apostillas y validación de documentación extranjera ante el Ministerio (MAEE)." }
            ].map((srv, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5, borderColor: '#C9A96E' }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 md:p-10 border border-[#E0E0E0] shadow-sm hover:shadow-lg rounded-sm relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C9A96E] opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-serif text-xl text-[#0A1628] mb-4">{srv.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6 font-light">{srv.desc}</p>
                <a href="#contacto" className="text-[10px] font-bold text-[#0A1628] hover:text-[#C9A96E] uppercase tracking-widest transition-colors flex items-center gap-1.5">
                  Consultar Detalles <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-28 bg-white border-t border-b border-[#E0E0E0]" id="proceso">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="text-center mb-20 space-y-3">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block">METODOLOGÍA</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A1628]">Proceso de Arbitraje Técnico</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: "01", name: "Diagnóstico", desc: "Evaluación del perfil o requerimientos para determinar la viabilidad burocrática." },
              { step: "02", name: "Planificación", desc: "Definición del roadmap y cronograma de actuación oficial ante organismos públicos." },
              { step: "03", name: "Gestión", desc: "Diligencia y monitorización activa del trámite en MyGuichet y oficinas de gobierno." },
              { step: "04", name: "Resolución", desc: "Entrega de documentos oficiales, reembolsos o subsidios debidamente consolidados." }
            ].map((p, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 border border-[#C9A96E]/30 flex items-center justify-center text-xl font-bold text-[#C9A96E] rounded-sm bg-[#F7F3EB] transition-colors duration-500 hover:bg-[#C9A96E] hover:text-white">
                  {p.step}
                </div>
                <h4 className="font-serif font-bold text-lg text-[#0A1628]">{p.name}</h4>
                <p className="text-[#4A4A4A] text-sm leading-relaxed font-light">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators & Simulation (Core Premium Experience) */}
      <section id="simulador" className="py-28 bg-[#F7F3EB]/65 relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase font-bold block">SIMULADORES INTELIGENTES</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A1628]">Calcule sus Retornos en MyGuichet</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Input Panel */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 border border-[#E0E0E0] rounded-sm flex flex-col justify-between shadow-sm">
              <div className="space-y-8">
                <div className="flex border-b border-[#E0E0E0] pb-2 overflow-x-auto whitespace-nowrap scrollbar-thin">
                  {['cns', 'sme', 'tax'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 px-4 text-xs uppercase tracking-widest font-bold transition-all relative ${activeTab === tab ? 'text-[#C9A96E]' : 'text-neutral-400 hover:text-[#0A1628]'}`}
                    >
                      {tab === 'cns' && '1. Reembolsos CNS'}
                      {tab === 'sme' && '2. Ayudas Digitalización (SME)'}
                      {tab === 'tax' && '3. Escudo Transfronterizo'}
                      {activeTab === tab && (
                        <motion.span 
                          layoutId="activeBorder"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A96E]" 
                        />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'cns' && (
                    <motion.div 
                      key="cns-tab"
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider">Facturas Médicas / Trimestre</label>
                          <span className="text-sm font-bold text-[#0A1628]">{cnsReceiptsCount} facturas</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="30" 
                          value={cnsReceiptsCount}
                          onChange={(e) => setCnsReceiptsCount(parseInt(e.target.value))}
                          className="w-full h-1 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-3">Nivel del Servicio</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {['basic', 'premium'].map((tier) => (
                            <button 
                              key={tier}
                              onClick={() => setCnsServiceTier(tier)}
                              className={`p-4 rounded-sm border text-left transition-all ${cnsServiceTier === tier ? 'bg-[#F7F3EB] border-[#C9A96E] text-[#0A1628]' : 'bg-[#f9f9f9] border-[#E0E0E0] text-[#4A4A4A] hover:border-[#C9A96E]/50'}`}
                            >
                              <h4 className="text-xs font-bold uppercase tracking-wider">{tier === 'basic' ? 'Envío Asistido' : 'Concierge Premium'}</h4>
                              <p className="text-[10px] text-[#4A4A4A]/70 mt-1">
                                {tier === 'basic' ? 'Preparamos el sobre físico CNS y las etiquetas oficiales.' : 'Sincronización LuxTrust + Control automatizado de depósitos.'}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'sme' && (
                    <motion.div 
                      key="sme-tab"
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { id: 'digital', name: 'Digital/IT', desc: 'SME Packages' },
                          { id: 'green', name: 'Ambiental', desc: 'Descarbonización' },
                          { id: 'innovation', name: 'I+D', desc: 'Patentes/Subsidio' }
                        ].map((sec) => (
                          <button
                            key={sec.id}
                            onClick={() => setGrantSector(sec.id)}
                            className={`p-4 rounded-sm border text-left transition-all ${grantSector === sec.id ? 'bg-[#F7F3EB] border-[#C9A96E] text-[#0A1628]' : 'bg-[#f9f9f9] border-[#E0E0E0] text-[#4A4A4A] hover:border-[#C9A96E]/50'}`}
                          >
                            <h4 className="text-xs font-bold uppercase tracking-wider">{sec.name}</h4>
                            <p className="text-[9px] text-[#4A4A4A]/70 mt-1">{sec.desc}</p>
                          </button>
                        ))}
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider">Empleados Equivalentes (FTE)</label>
                          <span className="text-sm font-bold text-[#0A1628]">{employeeCount} FTE</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="100" 
                          value={employeeCount}
                          onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                          className="w-full h-1 bg-[#E0E0E0] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'tax' && (
                    <motion.div 
                      key="tax-tab"
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['FR', 'BE', 'DE'].map((c) => (
                          <button
                            key={c}
                            onClick={() => setCommuteCountry(c)}
                            className={`p-4 rounded-sm border text-left transition-all ${commuteCountry === c ? 'bg-[#F7F3EB] border-[#C9A96E] text-[#0A1628]' : 'bg-[#f9f9f9] border-[#E0E0E0] text-[#4A4A4A] hover:border-[#C9A96E]/50'}`}
                          >
                            <h4 className="text-xs font-bold uppercase tracking-wider">
                              {c === 'FR' && 'Francia'}
                              {c === 'BE' && 'Bélgica'}
                              {c === 'DE' && 'Alemania'}
                            </h4>
                            <span className="text-[10px] text-[#4A4A4A]/70 block mt-1">
                              {c === 'FR' && '34 Días'}
                              {c === 'BE' && '34 Días'}
                              {c === 'DE' && '19 Días'}
                            </span>
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-2">Bruto Anual (€)</label>
                          <input 
                            type="number" 
                            value={annualSalary}
                            onChange={(e) => setAnnualSalary(parseInt(e.target.value) || 0)}
                            className="w-full bg-[#f9f9f9] border border-[#E0E0E0] rounded-sm px-4 py-3 text-xs text-[#0A1628] focus:outline-none focus:border-[#C9A96E] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-2">Días de Teletrabajo</label>
                          <input 
                            type="number" 
                            value={teleworkDays}
                            onChange={(e) => setTeleworkDays(parseInt(e.target.value) || 0)}
                            className="w-full bg-[#f9f9f9] border border-[#E0E0E0] rounded-sm px-4 py-3 text-xs text-[#0A1628] focus:outline-none focus:border-[#C9A96E] transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-5 bg-[#0A1628] text-white p-6 md:p-12 border border-[#C9A96E]/30 rounded-sm flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C9A96E]/10 p-16 text-[#C9A96E]/10 rounded-full blur-3xl animate-pulse" />
              
              <AnimatePresence mode="wait">
                {activeTab === 'cns' && (
                  <motion.div 
                    key="cns-res"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold uppercase tracking-widest">
                      <Calculator className="w-4 h-4" />
                      <span>Resumen CNS Refund</span>
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Tarifa del Servicio</span>
                        <span className="font-semibold text-white">€{cnsCalc.fee} / trimestre</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Tiempo Ahorrado</span>
                        <span className="font-bold text-[#C9A96E]">{cnsCalc.timeSaved} Minutos</span>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <span className="text-[10px] text-white/40 block uppercase tracking-wider">Canal Oficial CNS</span>
                        <span className="text-2xl font-serif text-white mt-1 block">4 Semanas Fast-Track</span>
                      </div>
                    </div>
                    <a href="#contacto" className="w-full bg-[#C9A96E] hover:bg-white text-black font-bold py-4 rounded-sm block text-center text-xs uppercase tracking-widest transition-all duration-300 mt-8 shadow-md">
                      Solicitar Gestión
                    </a>
                  </motion.div>
                )}

                {activeTab === 'sme' && (
                  <motion.div 
                    key="sme-res"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold uppercase tracking-widest">
                      <Calculator className="w-4 h-4" />
                      <span>Resumen de Ayuda PyMEs</span>
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Subsidio Proyectado</span>
                        <span className="font-bold text-white text-base">€{smeCalc.estGrant}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Viabilidad del Expediente</span>
                        <span className="font-bold text-emerald-400">{smeCalc.successProb}% de Aprobación</span>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <span className="text-[10px] text-white/40 block uppercase tracking-wider">Tarifa de Tramitación</span>
                        <span className="text-xl font-serif text-white mt-1 block">10% Success Fee</span>
                      </div>
                    </div>
                    <a href="#contacto" className="w-full bg-[#C9A96E] hover:bg-white text-black font-bold py-4 rounded-sm block text-center text-xs uppercase tracking-widest transition-all duration-300 mt-8 shadow-md">
                      Solicitar Gestión
                    </a>
                  </motion.div>
                )}

                {activeTab === 'tax' && (
                  <motion.div 
                    key="tax-res"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-6 relative z-10"
                  >
                    <div className="flex items-center gap-2 text-[#C9A96E] text-xs font-bold uppercase tracking-widest">
                      <Calculator className="w-4 h-4" />
                      <span>Resumen de Escudo Fiscal</span>
                    </div>
                    <div className="space-y-4 pt-4">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Límite Legal Exento</span>
                        <span className="font-bold text-white">{taxCalc.optimalDays} días seguros</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Ahorros Fiscales Proyectados</span>
                        <span className="font-bold text-[#C9A96E]">~€{taxCalc.potentialSavings}</span>
                      </div>
                      <div className="border-t border-white/10 pt-4">
                        <span className="text-[10px] text-white/40 block flex items-center gap-1 uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Riesgo de Penalización
                        </span>
                        <span className="text-xl font-bold text-rose-400 mt-1 block">€{taxCalc.penaltyRisk}</span>
                      </div>
                    </div>
                    <a href="#contacto" className="w-full bg-[#C9A96E] hover:bg-white text-black font-bold py-4 rounded-sm block text-center text-xs uppercase tracking-widest transition-all duration-300 mt-8 shadow-md">
                      Solicitar Gestión
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Business Opportunities Grid */}
      <section id="oportunidades" className="py-28 bg-white border-b border-[#E0E0E0]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] tracking-[0.35em] text-[#C9A96E] uppercase font-bold block">OPORTUNIDADES CLAVE</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A1628]">Estrategia y Modelos de Monetización</h2>
            <div className="w-12 h-0.5 bg-[#C9A96E] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cnsOpportunities.map((op, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -4, borderColor: '#C9A96E' }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8 border border-[#E0E0E0] rounded-sm bg-[#f9f9f9] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span className="font-mono text-[#C9A96E] text-xs font-bold block mb-2">0{idx + 1}</span>
                <h4 className="font-serif font-bold text-xl text-[#0A1628] mb-3">{op.title}</h4>
                <p className="text-sm text-[#4A4A4A] leading-relaxed font-light">{op.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Infographic Strategy Map */}
          <div className="mt-20 border border-[#C9A96E]/30 bg-[#F7F3EB]/30 p-6 md:p-8 rounded-sm text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-spotlight opacity-50 pointer-events-none" />
            <h4 className="font-serif font-bold text-xl text-[#0A1628] mb-6 relative z-10">Mapa Estratégico de Arbitraje Local (Gran Ducado)</h4>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 py-6 relative z-10 w-full">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-5 bg-white border border-[#E0E0E0] rounded-sm shadow-sm w-full max-w-[280px] transition-all duration-300"
              >
                <Globe className="w-6 h-6 text-[#C9A96E] mb-3 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1628]">1. Portal MyGuichet</span>
                <p className="text-[10px] text-[#4A4A4A] mt-2 font-light">Punto de acceso seguro y autenticación con firma LuxTrust.</p>
              </motion.div>
              <div className="w-px h-8 lg:w-12 lg:h-px bg-[#C9A96E]/50" />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-5 bg-[#0A1628] text-white border border-[#C9A96E]/30 rounded-sm shadow-sm w-full max-w-[280px] transition-all duration-300"
              >
                <Layers className="w-6 h-6 text-[#C9A96E] mb-3" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">2. Engine MyTramits</span>
                <p className="text-[10px] text-white/70 mt-2 font-light">Automatización, extracción por IA y estructuración de dossiers.</p>
              </motion.div>
              <div className="w-px h-8 lg:w-12 lg:h-px bg-[#C9A96E]/50" />
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-5 bg-white border border-[#E0E0E0] rounded-sm shadow-sm w-full max-w-[280px] transition-all duration-300"
              >
                <Building className="w-6 h-6 text-[#C9A96E] mb-3" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A1628]">3. Organismos Públicos</span>
                <p className="text-[10px] text-[#4A4A4A] mt-2 font-light">Reembolsos CNS expedítivos y obtención de subvenciones PyME.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-28 bg-[#f9f9f9]" id="precios">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <div className="text-center mb-24 space-y-4">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block">PROPUESTA DE SERVICIOS</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#0A1628]">Tarifas Transparentes</h2>
            <p className="text-[#4A4A4A] text-sm font-light max-w-lg mx-auto">Honorarios sin sorpresas para la gestión y optimización de sus trámites.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Plan 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-12 border border-[#E0E0E0] shadow-sm hover:shadow-xl transition-all rounded-sm flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-[10px] text-[#C9A96E] uppercase tracking-[0.18em] mb-6">CONSULTA PUNTUAL</h4>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-serif text-[#0A1628]">€45</span>
                  <span className="text-[#4A4A4A] text-xs">/ sesión</span>
                </div>
                <ul className="space-y-4 border-t border-[#E0E0E0] pt-6 mb-12">
                  <li className="flex gap-2 text-sm text-[#4A4A4A] font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Sesión técnica de 30 minutos
                  </li>
                  <li className="flex gap-2 text-sm text-[#4A4A4A] font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Resolución de dudas en MyGuichet
                  </li>
                  <li className="flex gap-2 text-sm text-[#4A4A4A] font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Hoja de ruta estratégica
                  </li>
                </ul>
              </div>
              <a href="#contacto" className="w-full border border-[#0A1628] py-4 text-center font-bold text-[11px] uppercase tracking-widest text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all rounded-sm">Agendar Sesión</a>
            </motion.div>
            
            {/* Plan 2 */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-[#0A1628] p-8 md:p-12 text-white shadow-xl hover:shadow-2xl transition-all rounded-sm relative flex flex-col justify-between border border-[#C9A96E]/20"
            >
              <div className="absolute top-0 right-0 bg-[#C9A96E] text-white font-bold text-[9px] px-5 py-2 uppercase tracking-widest">Recomendado</div>
              <div>
                <h4 className="font-bold text-[10px] text-[#C9A96E] uppercase tracking-[0.18em] mb-6">GESTIÓN COMPLETA</h4>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-serif text-white">€199</span>
                  <span className="text-white/60 text-xs">/ trámite</span>
                </div>
                <ul className="space-y-4 border-t border-white/10 pt-6 mb-12">
                  <li className="flex gap-2 text-sm text-white/80 font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Representación oficial autorizada
                  </li>
                  <li className="flex gap-2 text-sm text-white/80 font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Preparación del dossier al 100%
                  </li>
                  <li className="flex gap-2 text-sm text-white/80 font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Monitoreo y reclamaciones
                  </li>
                  <li className="flex gap-2 text-sm text-white/80 font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Soporte telefónico priority
                  </li>
                </ul>
              </div>
              <a href="#contacto" className="w-full bg-[#C9A96E] hover:brightness-110 py-4 text-center font-bold text-[11px] uppercase tracking-widest text-white transition-all rounded-sm shadow-md">Solicitar Trámite</a>
            </motion.div>
            
            {/* Plan 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-12 border border-[#E0E0E0] shadow-sm hover:shadow-xl transition-all rounded-sm flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-[10px] text-[#C9A96E] uppercase tracking-[0.18em] mb-6">PLAN MENSUAL B2B</h4>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-serif text-[#0A1628]">€75</span>
                  <span className="text-[#4A4A4A] text-xs">/ mes</span>
                </div>
                <ul className="space-y-4 border-t border-[#E0E0E0] pt-6 mb-12">
                  <li className="flex gap-2 text-sm text-[#4A4A4A] font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Consultoría mensual recurrente
                  </li>
                  <li className="flex gap-2 text-sm text-[#4A4A4A] font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Control de notificaciones oficiales
                  </li>
                  <li className="flex gap-2 text-sm text-[#4A4A4A] font-light">
                    <Check className="text-[#C9A96E] w-4 h-4 shrink-0 mt-0.5" /> Alertas de vencimientos y plazos
                  </li>
                </ul>
              </div>
              <a href="#contacto" className="w-full border border-[#0A1628] py-4 text-center font-bold text-[11px] uppercase tracking-widest text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-all rounded-sm">Contratar Plan</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 bg-white border-t border-[#E0E0E0]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-5xl text-center mb-16 text-[#0A1628]">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {[
              { q: "¿Cuál es el tiempo de resolución habitual?", a: "Los plazos de reembolso o aprobación dependen estrictamente de la administración luxemburguesa. No obstante, nuestra auditoría técnica reduce los tiempos de espera al presentar expedientes impecables desde el primer día." },
              { q: "¿Necesito otorgar acceso total a mi firma LuxTrust?", a: "Para gestiones tipo concierge podemos guiarle mediante pantalla compartida o, si lo prefiere, configurar una autorización limitada dentro de su eSpace de MyGuichet sin comprometer sus claves principales." },
              { q: "¿Es aplicable el reembolso CNS a residentes fronterizos?", a: "Por supuesto. Ayudamos a trabajadores que viven en Francia, Bélgica o Alemania a tramitar de forma coordinada sus devoluciones de gastos sanitarios en la caja luxemburguesa." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-[#E0E0E0] pb-6">
                <h4 className="font-serif font-bold text-lg text-[#0A1628] mb-2">{faq.q}</h4>
                <p className="text-sm text-[#4A4A4A] leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Contact Form */}
      <section className="py-28 bg-[#0A1628] text-white relative overflow-hidden" id="contacto">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A96E] uppercase block mb-4">CONTACTO PROFESIONAL</span>
              <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">Inicie su trámite con la seguridad de un experto</h2>
              <p className="text-white/60 font-light text-base leading-relaxed mb-10">
                Estamos a su disposición para analizar la naturaleza de su solicitud y proponerle la solución de arbitraje más rápida y eficiente.
              </p>
              <div className="space-y-4 text-sm font-medium text-white/80">
                <p>📍 Luxembourg City, Grand Duchy of Luxembourg</p>
                <p>✉️ oficina@luxtramites.lu</p>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 text-[#0a1628] shadow-2xl rounded-sm">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form-lux" 
                    initial={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1 border-b border-[#E0E0E0] pb-2">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Nombre Completo</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Jean Dupont"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none text-[#0A1628]"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1 border-b border-[#E0E0E0] pb-2">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Email Corporativo</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="j.dupont@empresa.lu"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none text-[#0A1628]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1 border-b border-[#E0E0E0] pb-2">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Teléfono</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="+352 691 123 456"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none text-[#0A1628]"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1 border-b border-[#E0E0E0] pb-2">
                        <label className="block text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Diligencia</label>
                        <select 
                          value={formState.product}
                          onChange={(e) => setFormState({ ...formState, product: e.target.value })}
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none text-[#0A1628] appearance-none"
                        >
                          <option value="cns">Reembolso CNS</option>
                          <option value="sme">Ayudas Digitalización (SME)</option>
                          <option value="tax">Escudo Transfronterizo</option>
                        </select>
                      </div>
                    </div>

                    <div className="border-b border-[#E0E0E0] pb-2">
                      <label className="block text-[9px] uppercase tracking-widest text-[#C9A96E] font-bold mb-1">Resumen de la Situación</label>
                      <textarea 
                        rows="3" 
                        required 
                        placeholder="Describa brevemente el estado de su trámite..."
                        value={formState.details}
                        onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                        className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 outline-none resize-none text-[#0A1628]"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-[#0A1628] hover:bg-[#C9A96E] text-white font-bold py-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-300"
                    >
                      Solicitar Información Técnica
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="form-success" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto">
                      <Check size={24} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0a1628]">Solicitud Recibida</h3>
                    <p className="text-sm text-[#4A4A4A] max-w-sm mx-auto leading-relaxed">
                      Nos pondremos en contacto con usted en un plazo máximo de **2 horas hábiles** con un análisis de viabilidad técnica preliminar.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E0E0E0]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-[#C9A96E] w-6 h-6" />
              <span className="font-serif font-bold text-[#0A1628]">MyTramits</span>
            </div>
            <p className="text-xs text-[#4A4A4A] leading-relaxed opacity-80">Gestión y arbitraje administrativo de alto nivel con rigor normativo institucional en el Gran Ducado.</p>
          </div>
          <div>
            <h5 className="font-bold text-[10px] text-[#C9A96E] uppercase tracking-widest mb-6">Servicios</h5>
            <ul className="space-y-3 text-xs text-[#4A4A4A] font-medium">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Residencia y Permisos</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Optimización Fiscal</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Ayudas SME Packages</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[10px] text-[#C9A96E] uppercase tracking-widest mb-6">Institucional</h5>
            <ul className="space-y-3 text-xs text-[#4A4A4A] font-medium">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Rigor e Integridad</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Normativa Local</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Security de Datos</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[10px] text-[#C9A96E] uppercase tracking-widest mb-6">Legal</h5>
            <ul className="space-y-3 text-xs text-[#4A4A4A] font-medium">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">GDPR Local-First</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-8 border-t border-[#E0E0E0] text-center md:text-left">
          <p className="text-[10px] text-[#4A4A4A] opacity-60 uppercase tracking-widest">© 2026 MyTramits. Excelencia Administrativa. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Cuban Style Drawer (Bespoke Sliding Sheet) */}
      <AnimatePresence>
        {cubanDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setCubanDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl p-8 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="text-[#C9A96E] w-5 h-5 animate-pulse" />
                    <h3 className="font-serif font-bold text-xl text-[#0A1628]">Explicación en Cubano 🇨🇺</h3>
                  </div>
                  <button onClick={() => setCubanDrawerOpen(false)} className="text-[#0A1628] hover:text-[#C9A96E] transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-[#F7F3EB] p-4 border border-[#C9A96E]/20 rounded-sm">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#C9A96E] block mb-1">Nota del General en Jefe</span>
                  <p className="text-[11px] text-[#0A1628] leading-relaxed font-light font-sans">
                    Asere, toca en cada caso para ver la jugada completa detallada con toda la sandunga y el rigor cubano.
                  </p>
                </div>

                <div className="space-y-4">
                  {cubanCases.map((c, idx) => (
                    <div key={idx} className="border border-[#E0E0E0] rounded-sm p-4 cursor-pointer hover:border-[#C9A96E]/50 transition-all bg-[#f9f9f9]" onClick={() => setActiveCase(activeCase === idx ? null : idx)}>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs uppercase tracking-wider text-[#0A1628] flex items-center gap-2">
                          <span className="font-mono text-[#C9A96E] font-bold">0{idx + 1}</span> {c.title}
                        </span>
                        <motion.span 
                          animate={{ rotate: activeCase === idx ? 90 : 0 }}
                          className="text-xs text-[#C9A96E] font-bold"
                        >
                          <ArrowRight size={14} />
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {activeCase === idx && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="text-xs text-[#4A4A4A] leading-relaxed font-light font-sans"
                          >
                            {c.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#E0E0E0]">
                <button 
                  onClick={() => setCubanDrawerOpen(false)}
                  className="w-full bg-[#0A1628] text-white hover:bg-[#C9A96E] font-bold py-4 rounded-sm text-xs uppercase tracking-widest transition-all duration-300 shadow-md"
                >
                  Entendido, asere
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
