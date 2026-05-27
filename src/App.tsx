import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import {
  ZOO_ZONES,
  ZOO_SHOWS,
  TRIVIA_QUESTIONS
} from './data';
import { Zone, Animal } from './types';
import MapInteractive from './components/MapInteractive';
import PettingSimulation from './components/PettingSimulation';
import ScienceTrivia from './components/ScienceTrivia';
import ShowTimeline from './components/ShowTimeline';
import RainforestControls from './components/RainforestControls';
import ContactForm from './components/ContactForm';
import SuggestionBox from './components/SuggestionBox';

// Lucide Icons
import {
  Compass,
  MapPin,
  Clock,
  Heart,
  Calendar,
  Phone,
  HelpCircle,
  Menu,
  X,
  BookOpen,
  Info,
  ChevronRight,
  Shield,
  Thermometer,
  CloudSun,
  Award,
  TreePine,
  Volume2
} from 'lucide-react';

// Interactive Custom Cursor Follower Component: An elegant organic swallow companion!
function CursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Spring configurations for buttery smoothness (helps the swallow glide like a real swallow)
  const springConfig = { damping: 32, stiffness: 140, mass: 1.1 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [facingRight, setFacingRight] = useState(false);

  // References to track directions
  const lastXRef = useRef(0);

  // High performance physical frame tracker. Instead of jittery mouse timers,
  // we check if the spring is actually sliding. The swallow is "moving" only when
  // it physically glides. Once it lands at its destination, it stops perfectly.
  useEffect(() => {
    let active = true;
    let lastState = false;

    const checkPhysics = () => {
      if (!active) return;
      const targetX = mouseX.get();
      const targetY = mouseY.get();
      const currentX = trailX.get();
      const currentY = trailY.get();

      const dx = currentX - targetX;
      const dy = currentY - targetY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Using a hysteresis loop/Schmitt trigger pattern to prevent jittering:
      // Swallow enters flying mode when the spring distance is > 7.0px,
      // and returns to parked perched state ONLY when it settles extremely close to target (< 0.6px).
      // This eliminates zero-overshoot chattering entirely.
      let currentlyMoving = lastState;
      if (distance > 7.0) {
        currentlyMoving = true;
      } else if (distance < 0.6) {
        currentlyMoving = false;
      }
      
      // Update state ONLY on actual change to eliminate 60fps React re-render loops
      if (currentlyMoving !== lastState) {
        setIsMoving(currentlyMoving);
        lastState = currentlyMoving;
      }

      requestAnimationFrame(checkPhysics);
    };

    requestAnimationFrame(checkPhysics);
    return () => {
      active = false;
    };
  }, [trailX, trailY, mouseX, mouseY]);

  useEffect(() => {
    // Disable on touch screens (such as mobile devices)
    const mediaQuery = window.matchMedia('(any-hover: none)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
      
      // Calculate horizontal motion direction to flip the swallow
      const dx = e.clientX - lastXRef.current;
      if (Math.abs(dx) > 1.2) {
        setFacingRight(dx > 0);
      }
      lastXRef.current = e.clientX;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: trailX,
        y: trailY,
        transform: 'translate(-50%, -50%)',
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] select-none"
    >
      <div className="relative flex justify-center items-center w-0 h-0">
        {/* Branch that sprouts automatically out of thin air when the swallow settles down */}
        <AnimatePresence>
          {!isMoving && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="absolute shrink-0 flex items-center justify-center pointer-events-none"
              style={{ top: '10px' }}
            >
              {/* Artistic hand-drawn style brown branch with fresh leaves */}
              <svg width="74" height="22" viewBox="0 0 74 22" fill="none" className="filter drop-shadow-sm overflow-visible">
                {/* Branch root and bark lines */}
                <path d="M -22 13 C 15 12, 38 12, 62 11" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M 32 12 C 38 7, 42 6, 48 8" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
                {/* Fresh green leaves sprouted on the branch */}
                <path d="M 48 8 C 53 4, 56 8, 48 10 C 46 10, 47 9, 48 8 Z" fill="#15803d" />
                <path d="M 24 13 C 20 7, 27 6, 28 11 C 28 13, 25 13, 24 13 Z" fill="#16a34a" />
                <path d="M 62 11 C 66 8, 67 13, 62 14 C 61 14, 62 12, 62 11 Z" fill="#22c55e" />
                <path d="M 8 14 C 6 9, 12 8, 13 12 Z" fill="#22c55e" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Swallow Companion */}
        <motion.div
          animate={{
            y: isMoving ? [0, -6, 0] : 0,
            rotate: isMoving ? (facingRight ? [0, 5, -5, 0] : [0, -5, 5, 0]) : 0,
          }}
          transition={{
            y: { repeat: Infinity, duration: 0.32, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 0.38, ease: 'easeInOut' },
          }}
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            transformOrigin: 'bottom center',
            top: '-20px',
          }}
        >
          {/* Flipped conditionally */}
          <div
            style={{
              transform: facingRight ? 'scaleX(-1)' : 'scaleX(1)',
              transition: 'transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            className="flex items-center justify-center"
          >
            {isMoving ? (
              /* Flying swallow with spread wings and scissor tail */
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-lg select-none">
                {/* Left Wing with css animation */}
                <path d="M 30 20 C 23 11, 14 6, 2 9 C 9 17, 19 23, 29 21 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" className="swallow-wing-left" />
                {/* Right Wing with css animation */}
                <path d="M 34 20 C 41 11, 50 6, 62 9 C 55 17, 45 23, 35 21 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" className="swallow-wing-right" />
                {/* Deep midnight blue core body shell and scissor tail */}
                <path d="M 32 8 C 36 8, 37 11, 36 17 C 36 24, 38 31, 40 37 C 37 39, 36 41, 38 54 C 35 49, 33 43, 32 39 C 31 43, 29 49, 26 54 C 28 41, 27 39, 24 37 C 26 31, 28 24, 28 17 C 27 11, 28 8, 32 8 Z" fill="#1e293b" />
                {/* White creamy belly patch */}
                <path d="M 28 18 C 28 26, 29 32, 32 33 C 35 32, 36 26, 36 18 C 34 19.5, 30 19.5, 28 18 Z" fill="#f8fafc" />
                {/* Reddish throat patch */}
                <path d="M 32 8 C 30 8, 29 10, 29 13 C 29 16, 32 18, 32 18 C 32 18, 35 16, 35 13 C 35 10, 34 8, 32 8 Z" fill="#ea580c" />
              </svg>
            ) : (
              /* Perched swallow with neatly folded wings upright on the branch */
              <svg width="40" height="48" viewBox="0 0 40 48" fill="none" className="drop-shadow-md select-none animate-bird-rest">
                {/* Long folded tail hanging downwards */}
                <path d="M 18 28 L 15 45 L 20 38 L 25 45 L 22 28 Z" fill="#0f172a" />
                {/* Folded wings closed on its back */}
                <path d="M 14 16 C 12 24, 15 32, 20 37 C 25 32, 28 24, 26 16 Z" fill="#1e293b" />
                {/* Sleek head up to back */}
                <path d="M 20 4 C 16 4, 14 7, 15 13 C 15 20, 14 26, 20 28 C 26 26, 25 20, 25 13 C 26 7, 24 4, 20 4 Z" fill="#1e293b" />
                {/* Creamy belly undercoat white cream color */}
                <path d="M 16 16 C 16 23, 17 28, 20 30 C 23 28, 24 23, 24 16 Z" fill="#f8fafc" opacity="0.95" />
                {/* Red chin/chest mask */}
                <path d="M 20 7 C 18 7, 17 9, 17 12 C 17 14, 20 16, 20 16 C 20 16, 23 14, 23 12 C 23 9, 22 7, 20 7 Z" fill="#ea580c" />
                {/* Little bird feet gripping the branch securely */}
                <path d="M 17 33 L 18 35 M 23 33 L 22 35" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('entrance');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currentHumidity, setCurrentHumidity] = useState<number>(68);
  const [visitorCount, setVisitorCount] = useState<number>(3420);
  const [activeAnimalAudio, setActiveAnimalAudio] = useState<string | null>(null);

  // New interactive states for extended sanctuary guidelines
  const [entranceRulesOpen, setEntranceRulesOpen] = useState<boolean>(false);
  const [panoramicMapOpen, setPanoramicMapOpen] = useState<boolean>(false);
  const [accessibilityModalOpen, setAccessibilityModalOpen] = useState<boolean>(false);
  const [beastTriviaOpen, setBeastTriviaOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = useState<Record<string, boolean>>({});

  // Scroll to top visibility check
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate current visitor counts for live immersion
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorCount((v) => v + Math.floor(Math.random() * 5) - 2);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Map zone data
  const currentZone = ZOO_ZONES.find((z) => z.id === activeTab) || ZOO_ZONES[0];

  const selectZoneHandler = (zoneId: string) => {
    setActiveTab(zoneId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playAnimalSound = (animalId: string) => {
    setActiveAnimalAudio(animalId);
    
    // Web audio synthesized voice simulation
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        
        if (animalId === 'peacock_white') {
          // Sharp squawk
          const osc1 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.connect(gain);
          gain.connect(ctx.destination);
          osc1.frequency.setValueAtTime(600, now);
          osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
          osc1.type = 'sawtooth';
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc1.start();
          osc1.stop(now + 0.45);
        } else if (animalId === 'tiger_siberian') {
          // Growl
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(80, now);
          osc.frequency.linearRampToValueAtTime(45, now + 0.5);
          osc.type = 'sawtooth';
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
          osc.start();
          osc.stop(now + 0.9);
        } else if (animalId === 'swan_black') {
          // Soft honk
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(320, now);
          osc.type = 'triangle';
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start();
          osc.stop(now + 0.35);
        } else {
          // standard chirp click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(1200, now);
          osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start();
          osc.stop(now + 0.22);
        }
      }
    } catch (e) {}

    setTimeout(() => {
      setActiveAnimalAudio(null);
    }, 1000);
  };

  const conservationLabel = (status: string) => {
    switch (status) {
      case 'CR': return { text: '极危 Critically Endangered', color: 'bg-red-500 text-white' };
      case 'EN': return { text: '濒危 Endangered', color: 'bg-orange-500 text-white' };
      case 'VU': return { text: '易危 Vulnerable', color: 'bg-amber-500 text-white font-bold' };
      case 'NT': return { text: '近危 Near Threatened', color: 'bg-yellow-400 text-amber-950 font-bold' };
      default: return { text: '无危 Least Concern', color: 'bg-emerald-500 text-white' };
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-slate-800 font-sans selection:bg-emerald-200 relative" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(5, 46, 22, 0.48), rgba(15, 23, 42, 0.65)), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2560&h=1440&q=80')` 
      }}
    >
      <CursorFollower />
      
      {/* Top Banner alert line for active updates */}
      <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono border-b border-slate-800 relative z-20">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>今日常态营业：08:30 - 17:30</span>
          <span className="text-slate-500">|</span>
          <span className="hidden md:inline">即时在园游客: <strong className="text-emerald-400">{visitorCount}</strong> 名</span>
        </div>
        <div className="flex items-center gap-3.5 flex-wrap justify-center sm:justify-end">
          <button
            onClick={() => setAccessibilityModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 bg-transparent border-none outline-none cursor-pointer text-[11px] sm:text-xs font-mono"
            title="查看无障碍通道、轮椅租借、温暖母婴室等适配关爱"
          >
            <span>♿️ [无障碍通道/轮椅租借服务]</span>
          </button>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span>当前恒温指数: <strong className="text-amber-300">24°C / 62% 湿</strong></span>
          <a
            href="#map"
            onClick={(e) => {
              e.preventDefault();
              selectZoneHandler('map');
            }}
            className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Compass size={12} />
            <span>[一键开启AR地图]</span>
          </a>
        </div>
      </div>

      {/* Main Header navigation */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-1 shadow-md">
              <TreePine className="text-white" size={24} />
            </div>
            <div>
              <div className="font-sans font-black tracking-tight text-slate-900 text-base sm:text-lg flex items-center gap-1.5">
                <span>生态奇境自然动物园</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded font-mono">
                  Wonderland Eco
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                International Ecological Sanctuary
              </p>
            </div>
          </div>

          {/* Desktop Right items */}
          <div className="hidden lg:flex items-center gap-3.5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => selectZoneHandler('calendar')}
              className={`flex items-center gap-1 text-xs font-bold px-3.5 py-1.8 rounded-xl border transition-all cursor-pointer outline-none ${
                activeTab === 'calendar'
                  ? 'bg-purple-900 border-purple-800 text-white shadow-md shadow-purple-900/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Calendar size={13} className={activeTab === 'calendar' ? 'animate-bounce' : ''} />
              <span>📅 近期生态活动日历</span>
            </button>
            <span className="text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1.8 rounded-xl border border-emerald-100 select-none">
              <CloudSun size={14} />
              <span>智能生态导护网</span>
            </span>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 outline-none active:scale-95"
              aria-expanded={mobileMenuOpen}
              aria-label="切换导览菜单"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Column Framework */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Navigation Grid of Bubble Tags for tablet and small headers */}
        <div className="mb-6 lg:hidden">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span>快速切换 12 核心景区 (Zones):</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-2 bg-slate-900/5 backdrop-blur-[2px] rounded-2xl border border-slate-200">
            {ZOO_ZONES.filter((z) => z.id !== 'map').map((zone) => {
              const isSelected = activeTab === zone.id;
              return (
                <button
                  key={`tag-${zone.id}`}
                  onClick={() => selectZoneHandler(zone.id)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/50'
                  }`}
                >
                  <div className="truncate">{zone.chineseTitle.split(' · ')[0]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Structured Split Screen (Sidebar Navigation on Desktop, Showcase on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sticky Vertical Theme Navigation Hub */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
            <div className="bg-white/90 rounded-3xl p-5 border border-slate-200/60 shadow-md">
              <div className="pb-3 border-b border-slate-100 mb-3">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Park Layout Structure
                </div>
                <h3 className="font-sans font-bold text-slate-800 text-sm mt-0.5">
                  12 场馆主题巡览
                </h3>
              </div>

              <div className="space-y-1">
                {ZOO_ZONES.filter((z) => z.id !== 'map').map((zone, idx) => {
                  const isSelected = activeTab === zone.id;
                  return (
                    <button
                      key={`nav-${zone.id}`}
                      onClick={() => selectZoneHandler(zone.id)}
                      className={`w-full py-2.5 px-3.5 rounded-2xl text-left transition-all duration-200 flex justify-between items-center group outline-none cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white font-bold shadow-md shadow-slate-900/10'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono text-[9px] border ${
                          isSelected 
                            ? 'bg-amber-400 border-amber-300 text-slate-950 font-bold' 
                            : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
                        }`}>
                          {idx + 1}
                        </span>
                        <div className="text-xs font-sans font-bold truncate">
                          {zone.chineseTitle.split(' · ')[0]}
                        </div>
                      </div>
                      <ChevronRight 
                        size={12} 
                        className={`shrink-0 transition-transform ${
                          isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-300 group-hover:translate-x-0.5'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Support Hotline Widget */}
            <div className="bg-gradient-to-br from-emerald-950 to-teal-950 rounded-3xl p-5 text-emerald-100 shadow-md border border-emerald-800/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="flex gap-2 items-start text-emerald-400">
                <Shield size={16} className="shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <div className="text-[11px] font-bold tracking-tight text-white">24H 智慧导购咨询</div>
                  <p className="text-[10px] text-emerald-300/80 mt-1 leading-relaxed">
                    在园区内遇到任何寻找小动物位置的困难、失物招领或轮椅租借？随时拨打咨询电话。
                  </p>
                  <div className="font-mono text-[11px] font-black text-amber-300 mt-2">
                    TEL: 400-820-2026
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Suggestion Box Quick Link */}
            <div className="bg-amber-50/80 border border-amber-200/60 rounded-3xl p-4.5 text-slate-800 shadow-md flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 font-sans">
                <span>📝 奇境意见收集 Voice Wall</span>
              </div>
              <p className="text-[10.5px] text-amber-800/90 leading-normal font-sans font-medium">
                每一位到访游客的妙奇建议与夸奖，都是我们生态繁荣的见证。留下您对动物宝贝们的创意想法吧！
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('suggestion-box-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-2 hover:bg-amber-100/60 active:scale-97 border border-amber-200 bg-white/50 rounded-2xl text-[11px] font-bold text-amber-950 text-center transition-all shadow-sm outline-none cursor-pointer"
              >
                看一看、去留言 &gt;&gt;
              </button>
            </div>
          </aside>

          {/* RIGHT COLUMN: Dedicated Main Showcase Content */}
          <main className="lg:col-span-9 space-y-8">
            
            {activeTab === 'calendar' ? (
              <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/50 shadow-xl space-y-6 text-left">
                <div>
                  <span className="bg-purple-100/80 text-purple-800 border border-purple-200 text-[10px] font-mono px-3 py-1 rounded-xl uppercase tracking-wider font-semibold">
                    Wonderland Ecological Classes
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-900 mt-2">
                    📅 奇境近季生态活动日历
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-sans mt-1">
                    在奇妙的大自然中求知与探索。点击免费预约，活动名额珍贵，请勿缺席哦。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {[
                    {
                      id: 'ev1',
                      title: '🏕️ 大森林奇妙夜：夏夜萤火虫与松鼠音乐会',
                      time: '本周五、周六 19:00 - 21:00',
                      location: '正门中央大道 / 休闲草坪',
                      audience: '5-12岁亲子家庭（限30组）',
                      desc: '在专职保育员牵引下提灯探秘森林之门暮色，观测萤火虫微光飞舞，并在樟树下享受小提琴合奏。'
                    },
                    {
                      id: 'ev2',
                      title: '🐒 川金丝猴“仙子金毛”梳理与手作环保鸟巢',
                      time: '本周日 10:00 - 12:00',
                      location: '生命奇迹科普厅 / 奇趣猴山',
                      audience: '全年龄段（特别适合中低幼宝贝）',
                      desc: '近观特许保育员梳猴金毛，深度解构金丝猴高原锁温，并可随亲子工坊免费用可降解树浆绘制手工鸟箱。'
                    },
                    {
                      id: 'ev3',
                      title: '🍉 河马圆圆“超级西瓜大胃王”丰容科普特辑',
                      time: '每日 11:30 - 12:00',
                      location: '水栖动物区 / 西瓜码头',
                      audience: '全体观览群落',
                      desc: '看双吨海量河马爆嚼脆瓜，聆听讲解专员精细科普巨兽红外汗腺腺孔出汗御热对策。'
                    },
                    {
                      id: 'ev4',
                      title: '🦉 极地精灵：雪鸮耐寒揭秘与保暖科学比对',
                      time: '下午 14:15 - 14:45',
                      location: '生命奇迹科普厅 / 极地展区',
                      audience: '推荐学校暑期研学组、极寒爱好者',
                      desc: '探奇白雪鸮趾覆白毛（雪鞋状足羽）防冻疮流体力学机制，参与多余塑料塑料物带走有奖倡议。'
                    }
                  ].map((ev) => {
                    const isBooked = bookedEvents[ev.id];
                    return (
                      <div key={ev.id} className="bg-slate-50/80 border border-slate-100 rounded-2xl p-5 hover:border-purple-200 transition-all flex flex-col justify-between hover:shadow-md">
                        <div className="space-y-2.5">
                          <h4 className="font-sans font-black text-slate-900 text-sm leading-snug">{ev.title}</h4>
                          <div className="text-[10.5px] font-mono text-slate-500 space-y-1">
                            <p>⏱️ 活动时段: <strong className="text-slate-700">{ev.time}</strong></p>
                            <p>📍 特许集合: <strong className="text-slate-700">{ev.location}</strong></p>
                            <p>👥 招募受众: <strong className="text-slate-700">{ev.audience}</strong></p>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-normal font-sans font-medium">{ev.desc}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200/40 flex justify-between items-center">
                          <span className="text-[10px] text-purple-600 bg-purple-50 font-bold px-2.5 py-1 rounded-lg border border-purple-100 select-none">
                            研普基地
                          </span>
                          <button
                            onClick={() => {
                              if (isBooked) {
                                setBookedEvents(prev => ({ ...prev, [ev.id]: false }));
                                alert(`已取消「${ev.title}」的课程预约。公用位置已让渡。`);
                              } else {
                                setBookedEvents(prev => ({ ...prev, [ev.id]: true }));
                                alert(`预约成功！专属研学公开课凭证已下发绑定到您的AR身份牌中，请准时在[${ev.location}]集合验证入驻。`);
                              }
                            }}
                            className={`px-4 py-1.8 rounded-xl text-[10.5px] font-bold active:scale-95 transition-all outline-none border-none cursor-pointer ${
                              isBooked 
                                ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' 
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {isBooked ? '✓ 已预约 (取消)' : '一键免费约 →'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : (
              <>
                {/* Immersive Zone Page Header (Banner & Description) */}
                <section className="bg-white rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl transition-all duration-300">
                  <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-100 border-b border-slate-100 group">
                    {/* 16:9 Banner Image */}
                    <img
                      src={currentZone.bannerImage}
                      alt={currentZone.chineseTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none group-hover:scale-102 transition-transform duration-700"
                    />

                    {/* Dark Vignette Overlay for cinematic lighting text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Header description contents floating inside */}
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 text-left">
                      <div className="flex items-center gap-2">
                        <span 
                          style={{ 
                            backgroundColor: `${currentZone.color.primary}30`, 
                            borderColor: `${currentZone.color.primary}50`,
                            color: currentZone.color.accent
                          }} 
                          className="px-3 py-1 rounded-xl text-xs font-semibold uppercase font-mono tracking-wider border backdrop-blur-md"
                        >
                          {currentZone.category}
                        </span>
                        <span className="text-xs text-slate-300 font-mono">• 园区展区巡演</span>
                      </div>

                      <h1 className="text-2xl sm:text-4xl font-black font-sans tracking-tight leading-tight filter drop-shadow">
                        {currentZone.chineseTitle}
                      </h1>
                      <p className="text-xs sm:text-sm font-semibold font-mono text-slate-300 tracking-wide translate-y-0.5 filter drop-shadow">
                        {currentZone.title}
                      </p>
                    </div>
                  </div>

                  {/* Informative details */}
                  <div className="p-6 md:p-8 space-y-4 text-left">
                    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed font-sans relative">
                      <div className="w-1.5 h-full bg-slate-900 absolute left-0 top-0 rounded-l-2xl" />
                      <p>{currentZone.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-500">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                        <Info size={15} className="text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-700 font-sans mb-0.5">科普场馆定位 Info:</div>
                          <p className="text-[11px] text-slate-500 leading-normal font-sans font-medium">{currentZone.details}</p>
                        </div>
                      </div>

                      {currentZone.features?.tips && currentZone.features.tips.length > 0 && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                          <HelpCircle size={15} className="text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-700 font-sans mb-0.5">本周游园避坑贴士 Tips:</div>
                            <p className="text-[11px] text-slate-500 leading-normal font-sans font-medium">{currentZone.features.tips[0]}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Zone-Specific Interactive Companion Guide Hub */}
                  <div className="border-t border-slate-100 p-6 md:p-8 bg-slate-50/30">
                    {currentZone.id === 'entrance' && (
                      <div className="bg-amber-50/60 p-4.5 rounded-2xl border border-amber-200/50 space-y-3 shadow-xs">
                        <div className="flex items-center justify-between text-xs font-bold text-amber-950 flex-wrap gap-1.5">
                          <span className="flex items-center gap-1.5">☀️ 今日智能气象指数 & 体感湿度</span>
                          <span className="text-emerald-700 font-mono">22°C - 26°C / 极适宜</span>
                        </div>
                        <div className="text-[11px] text-slate-600 leading-relaxed font-sans font-semibold text-left">
                          当前在园适宜度：主入口体感温度约 24°C，微风 1.5 级，和平白鸽与野雀均处于高活跃期。建议提前开启AR全景电子游园地图规划。
                        </div>
                        {/* 折叠模块：入园须知 */}
                        <div className="border border-amber-200/60 rounded-xl bg-white overflow-hidden text-[11px] text-left shadow-2xs">
                          <button
                            onClick={() => setEntranceRulesOpen(!entranceRulesOpen)}
                            className="w-full p-3 font-bold text-amber-950 hover:bg-amber-50/50 flex justify-between items-center transition-all cursor-pointer outline-none border-none text-left"
                          >
                            <span>📝 查看「入园须知及禁止携带物品准则」</span>
                            <span className="text-amber-600">{entranceRulesOpen ? '▲ 点击折叠' : '▼ 点击展开'}</span>
                          </button>
                          {entranceRulesOpen && (
                            <div className="p-3.5 border-t border-amber-100/60 text-slate-600 space-y-2 font-medium leading-relaxed bg-amber-50/10">
                              <p><strong>🚨 园区安全保护基本导则：</strong> 园区内禁止携带和鸣放高噪喇叭和尖锐高反光自拍架（避免惊吓和误伤鸟兽）；</p>
                              <p><strong>⛔️ 严禁携入物品清单：</strong> 发声塑料球、超长高亮发光气球、大反光伞具、非生态塑料包装面包；</p>
                              <p><strong>📌 游客服务中心位置：</strong> 位于主闸机验票通道后右转30米，免费提供折叠婴儿车租用、低碳踏板车停靠以及失物招领大爱关照。</p>
                            </div>
                          )}
                        </div>
                        {/* 园区全景导览图入口 */}
                        <button
                          onClick={() => setPanoramicMapOpen(true)}
                          className="w-full py-2.5 bg-gradient-to-r from-emerald-700 to-teal-800 hover:opacity-95 active:scale-98 text-white rounded-xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer outline-none border-none"
                        >
                          <span>🗺️ 开启「全景立体导览大图」(含12景区距离及时间测算)</span>
                        </button>
                      </div>
                    )}

                    {currentZone.id === 'savannah' && (
                      <div className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200/40 space-y-4 shadow-2xs">
                        <h4 className="font-sans font-black text-amber-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                          <span>🦒 狂野赤地大明星档案 Spotlight</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            {
                              name: '网纹长颈鹿',
                              range: '撒哈拉以南暖带疏林',
                              lore: '舌头长达45厘米呈暗青色。园区架设有4米长加高空中廊桥，让您零隔膜与长颈鹿平视。'
                            },
                            {
                              name: '平原斑马',
                              range: '东非塞伦盖蒂大草原',
                              lore: '浑身细条纹是极好的黑白物理迷彩，在疾风奔跑时能晃乱非洲狮肉眼的捕猎焦距。'
                            },
                            {
                              name: '非洲草原象',
                              range: '非洲灌木野荒原',
                              lore: '陆地巨无霸。常在午后 14:00 结群来到大黄泥塘，享受酣畅的热带泥巴洗浴。'
                            }
                          ].map((star, sIdx) => (
                            <div key={`star-${sIdx}`} className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-3xs text-left">
                              <div className="font-black text-amber-950 text-xs">{star.name}</div>
                              <p className="text-[9.5px] text-amber-800/80 font-mono mt-0.5">分布区域: {star.range}</p>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-1">{star.lore}</p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-amber-100 flex items-start gap-2.5 text-[11px] text-amber-900/95 leading-relaxed text-left">
                          <span className="text-sm select-none">🥕</span>
                          <div>
                            <strong>草原生态互动投喂提示：</strong>
                            <span>位于长颈鹿高架平台（每日 10:30-11:30），仅限使用保育员派发的金合欢绿叶，禁止投喂自带各类零食。</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-left">
                          <div className="text-xs font-bold text-amber-950 font-sans">📸 游客现场实拍打卡 Wall:</div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { author: '@萌兔酱', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80', text: '长颈鹿好温柔！' },
                              { author: '@星空探索家', img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80', text: '风光太壮美了' },
                              { author: '@保育小能手', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80', text: '大象泥巴洗澡' },
                              { author: '@外行摄影家', img: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80', text: '鹿宝宝超可爱' }
                            ].map((pic, pIdx) => (
                              <div key={`pic-${pIdx}`} className="bg-white p-1.5 rounded-xl border border-slate-150 shadow-3xs">
                                <div className="aspect-square rounded-lg overflow-hidden bg-slate-100">
                                  <img src={pic.img} alt="打卡" className="w-full h-full object-cover text-xs" />
                                </div>
                                <div className="text-[9px] font-bold text-slate-800 mt-1 truncate">{pic.author}</div>
                                <div className="text-[8.5px] text-slate-400 truncate">{pic.text}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'beasts' && (
                      <div className="bg-red-50/40 p-5 rounded-2xl border border-red-200/40 space-y-4 shadow-2xs">
                        <div className="bg-red-950/90 text-red-50 p-4 rounded-xl border border-red-800 space-y-2 text-left">
                          <div className="text-xs font-black tracking-wider flex items-center gap-1.5 font-sans">
                            <span>🚨 猛兽峡谷高防范安全指南 Predator Guidelines</span>
                          </div>
                          <div className="text-[10.5px] leading-relaxed font-sans text-red-100/90 space-y-1">
                            <p>• <strong>隔音观察屏：</strong> 观察野生老虎大棕熊时请勿拍打或用不锈钢餐具敲碰隔音钢化玻璃，防范大猫误激；</p>
                            <p>• <strong>严禁狂吹口哨：</strong> 猛兽感官极其细腻，严禁张口狂吹挑逗性口哨或者强光对着林薮内部照射闪烁。</p>
                          </div>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-red-100 text-[11px] text-red-950 text-left space-y-1">
                          <div className="font-bold">⏰ 生机观察与最佳观赏时间表：</div>
                          <p className="text-slate-500 font-medium">东北虎攀跃岩山加餐课：11:00 / 16:00；亚洲野熊山石幽探活跃段：09:45 - 11:00。</p>
                        </div>

                        {/* 猛兽冷知识问答 */}
                        <div className="border border-red-100 rounded-xl bg-white overflow-hidden text-[11px] text-left">
                          <button
                            onClick={() => setBeastTriviaOpen(!beastTriviaOpen)}
                            className="w-full p-3 font-bold text-red-950 hover:bg-neutral-50 flex justify-between items-center transition-all cursor-pointer outline-none border-none text-left"
                          >
                            <span>🦁 猛兽科普冷知识折叠问答</span>
                            <span className="text-red-600">{beastTriviaOpen ? '▲ 点击收起' : '▼ 点击解密'}</span>
                          </button>
                          {beastTriviaOpen && (
                            <div className="p-3.5 border-t border-red-100 text-slate-600 space-y-2 font-medium bg-red-50/10 leading-relaxed">
                              <p><strong>Q1: 东北虎的一生斑纹会长到骨肉里吗？</strong><br /><strong>A:</strong> 东北虎的黑金斑纹是毛囊深层基底印花。哪怕把毛全剔掉，在粉白的基质皮肤面依然深深印着黑圈斑斓，是其深涉密林捕杀的最佳保护色。</p>
                              <p><strong>Q2: 雄性狮子的一声咆哮为何能传5公里？</strong><br /><strong>A:</strong> 它们的声带厚扁而有力，附带有极宽的胸膈回音大风琴骨。呼出气能造成低沉谐振，低频声驻波极不易消减。</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'primate' && (
                      <div className="bg-teal-50/40 p-5 rounded-2xl border border-teal-200/40 space-y-3.5 text-left shadow-2xs">
                        <div className="bg-teal-900/10 p-4 rounded-xl border border-teal-200/60 leading-relaxed text-[11px] text-teal-950">
                          <strong className="block font-bold mb-1.5 flex items-center gap-1 text-teal-950 font-sans">🐒 灵长类安全文明守则</strong>
                          <p className="font-medium text-[10.5px] text-teal-900 leading-normal">
                            1. <strong>切勿眼神怒目：</strong> 灵长类直盯久于5秒会被判定为挑衅决斗信号。请温柔微斜扫视；<br />
                            2. <strong>理清挂坠包袋：</strong> 密林探出的小猴异常聪明机敏，请把金红项饰、随身长吊带和开口甜可乐收回包内，防止扒落。
                          </p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-teal-100 text-[11px] text-teal-950 space-y-1">
                          <strong className="font-bold block text-teal-900">🌱 科普特许生态投食及加餐：</strong>
                          <p className="text-slate-500 font-medium leading-relaxed">川金丝猴吃松萝与红枫叶秀：14:30；黑猩猩铁砧敲击坚果大百科：11:15。</p>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'aquatic' && (
                      <div className="bg-sky-50/40 p-5 rounded-2xl border border-sky-200/40 space-y-4 text-left shadow-2xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="bg-white p-3.5 rounded-xl border border-sky-100 text-[11px] text-sky-950 space-y-1 shadow-3xs">
                            <strong className="font-bold block text-sky-900 flex items-center gap-1">🦢 天鹅湖摄影大师位</strong>
                            <p className="text-slate-500 leading-relaxed font-sans font-medium">位于东堤白桦遮阳长凳椅处，晨光朦胧时，黑天鹅滑过亲颈，极易定格完美浪漫对称心影。</p>
                          </div>
                          <div className="bg-white p-3.5 rounded-xl border border-sky-100 text-[11px] text-sky-950 space-y-1 shadow-3xs">
                            <strong className="font-bold block text-sky-900 flex items-center gap-1">🦛 河马激爽吃瓜位</strong>
                            <p className="text-slate-500 leading-relaxed font-sans font-medium">位于2号露天西瓜码头，加高隔震透析墙。中午看重两吨大河马一腔爆碎几箱大甜瓜，极其震撼。</p>
                          </div>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-sky-100 text-[11px] text-sky-950 space-y-1.5 shadow-3xs">
                          <strong className="font-bold block text-sky-900">🐳 水生动物互动时间表：</strong>
                          <p className="text-slate-500 leading-relaxed font-sans font-medium">
                            • <strong>天鹅湖五彩锦鲤投食粉：</strong> 09:45 / 15:15 专属特制深藻绿粒；<br />
                            • <strong>巨无霸河马爆爆吃瓜：</strong> 11:30 码头高台巨口吞咽大演示。
                          </p>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'birds' && (
                      <div className="bg-cyan-50/40 p-5 rounded-2xl border border-cyan-200/40 space-y-4 text-left shadow-2xs">
                        <div className="bg-cyan-900/5 p-4 rounded-xl border border-cyan-200/60 leading-relaxed text-[11px] text-cyan-950">
                          <strong className="block font-bold mb-1 font-sans text-cyan-950">🦜 飞羽精灵摄影观赏提示</strong>
                          <p className="font-medium text-[10.5px] leading-relaxed">
                            极美羽叫活跃于上午 08:30 - 10:15。踏上三层半透云空中巨梯可直平视白孔雀雀翎抖羽。
                          </p>
                        </div>

                        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-[11px] text-rose-950 space-y-1.5 flex items-start gap-2.5 shadow-3xs">
                          <span className="text-base select-none">🚨</span>
                          <div>
                            <strong className="font-sans font-bold text-rose-950 block">严正生态启事：爱护嗉囊，严禁携入自带面包！</strong>
                            <p className="text-slate-600 font-medium leading-normal mt-0.5">飞鸟嗉鼻消化道极其脆弱。不当喂食硬果实和含糖零食会在胃中发酵起硬滞气，造成胃酸剧烈穿肚窒息。看顾鸟类，禁止投喂外料。</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'petting' && (
                      <div className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200/40 space-y-4 text-left shadow-2xs">
                        <div className="bg-amber-950/10 p-4 rounded-xl border border-amber-200 space-y-2 text-[11px] text-amber-950">
                          <strong className="block font-bold mb-1 flex items-center gap-1 font-sans">👶 亲子温柔触摸指南与避雷技巧</strong>
                          <p className="font-medium leading-relaxed text-[10.5px]">
                            • <strong>温柔宠宝档案：</strong> 荷兰大眼垂耳兔、童话梅花小童鹿、温吞高加索咩咩小羊。<br />
                            • <strong>避雷轻轻扶顺：</strong> 从头至臀缓缓捋摩其顺滑皮毛，不要去用力抓拉荷兰兔娇贵的大白耳朵和狂追不舍吓坏小幼鹿。
                          </p>
                        </div>

                        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-[11px] text-amber-900 space-y-1 flex items-start gap-2.5">
                          <span className="text-base select-none">⚠️</span>
                          <div>
                            <strong className="font-bold flex text-amber-950">安心防护：</strong>
                            <p className="text-slate-600 leading-normal mt-0.5">喂奶前后请充分在过道无害泡沫手消栓处净手。两岁内宝贝需家长紧跟安全触玩，防触到萌物嘴心导致抓哈保护。</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'rainforest' && (
                      <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-200/40 space-y-4 text-left shadow-2xs">
                        <div className="bg-white/95 p-3.5 rounded-xl border border-emerald-200 flex justify-between items-center text-[11px] text-emerald-950">
                          <strong>🌲 亚马逊雨林冷雾气候实时指标：</strong>
                          <span className="px-2.5 py-1 rounded bg-teal-50 border border-teal-200 font-mono text-emerald-800 font-bold animate-pulse">28.5°C / 87% 湿 / 微循环微风开</span>
                        </div>

                        <div className="space-y-2">
                          <strong className="text-xs font-bold text-emerald-950 font-sans block">🌿 Amazon 雨林极品冠木百科：</strong>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-lg border border-emerald-100 text-[11px] space-y-1 shadow-3xs">
                              <div className="font-black text-emerald-950">1. 王者浮托：大王莲</div>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">其大叶背肋布满纵横交错的气骨架，力学结构精细。在无流质平静湾面甚至能平托重35公斤小儿。</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-emerald-100 text-[11px] space-y-1 shadow-3xs">
                              <div className="font-black text-emerald-950">2. 云端吸湿：雨林吊兰</div>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">不恋泥土，它们赤裸而多微细气生根垂吊于巨樟树叶隙处，专收纳雾化细潮在顶端开一簇簇晶紫香花。</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'lawn' && (
                      <div className="bg-green-50/40 p-5 rounded-2xl border border-green-200/40 space-y-4 text-left shadow-2xs">
                        <div className="bg-white p-4 rounded-xl border border-green-100 space-y-2 text-[11px] text-green-950">
                          <strong className="block font-bold text-green-900 flex items-center gap-1 font-sans">🧺 嫩绿露营行为守则与羚羊关照</strong>
                          <p className="font-medium text-slate-600 leading-relaxed">
                            草地欢迎带垫休憩。<strong>为有效防范散步羚羊啃到外溢纸屑闷胃呕吐伤，</strong> 离开前请一定要绑好带密封拉带包装袋，不倾倒黏腻果汁，爱草爱羊。
                          </p>
                        </div>

                        <div className="space-y-2">
                          <strong className="text-xs font-bold text-green-950 font-sans block">🛎️ 周边便民补给信息：</strong>
                          <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                            <div key="serv-1" className="bg-white p-2.5 rounded-lg border border-green-150 shadow-3xs">
                              <div className="font-bold text-green-950">1号智慧服务仓</div>
                              <p className="text-[9px] text-slate-400 mt-1">南向120米，极速补给充电宝和小食品</p>
                            </div>
                            <div key="serv-2" className="bg-white p-2.5 rounded-lg border border-green-150 shadow-3xs">
                              <div className="font-bold text-green-950">2号公共卫生间</div>
                              <p className="text-[9px] text-slate-400 mt-1">西北60米，设专门空调母婴私哺乳舱</p>
                            </div>
                            <div key="serv-3" className="bg-white p-2.5 rounded-lg border border-green-150 shadow-3xs">
                              <div className="font-bold text-green-950">大树漫庇椅</div>
                              <p className="text-[9px] text-slate-400 mt-1">草野核心百年大樟树冠荫下，设避雨躺椅</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'arena' && (
                      <div className="bg-violet-50/40 p-5 rounded-2xl border border-violet-200/40 space-y-4 text-left shadow-2xs">
                        <div className="space-y-2">
                          <strong className="text-xs font-bold text-violet-950 font-sans block">🎭 飞羽生态自然丰容演出时间：</strong>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-center">
                            {[
                              { time: '10:15 / 早间', title: '云天滑冰秀', location: '鸟类滑降飞略大展' },
                              { time: '11:30 / 中午', title: '大胃王西瓜秀', location: '河马全能大胃口特写' },
                              { time: '14:15 / 下午', title: '海生垃圾拾捡', location: '海洋小能手环境互动' },
                              { time: '16:00 / 黄昏', title: '林栖大猫峭壁蹬跃', location: '大东北虎扑击重力演示' }
                            ].map((sh, sIdx) => (
                              <div key={`arena-sh-${sIdx}`} className="bg-white p-2.5 rounded-lg border border-violet-100">
                                <div className="font-mono text-[9px] text-violet-600 font-bold">{sh.time}</div>
                                <div className="font-bold text-slate-900 truncate mt-0.5">{sh.title}</div>
                                <div className="text-[8.5px] text-slate-400 truncate mt-0.5">{sh.location}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'science' && (
                      <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-200/40 space-y-4 text-left shadow-2xs">
                        <div className="bg-white p-3.5 rounded-xl border border-blue-100 text-[11px] text-slate-700 space-y-1.5 leading-relaxed">
                          <strong className="font-bold text-blue-900 block flex items-center gap-1 font-sans">🧬 多媒体物理大厅展项地图 Guide</strong>
                          <p className="text-slate-650 font-medium">
                            <strong>1区·化石长卷：</strong> 远古象骸、长齿大剑齿虎高精三维真体架模型。<br />
                            <strong>2区·多功能生态网：</strong> “保护生物连线”桌，红外点指亲眼看大食物网断链崩解的联动多米诺骨牌效应。<br />
                            <strong>3区·VR研学舱：</strong> 指尖探入，直观参与微创东北虎疗法小护士特写。
                          </p>
                        </div>

                        <div className="bg-blue-900/5 p-4 rounded-xl border border-blue-150 text-[11px] text-blue-950 flex justify-between items-center text-left shadow-3xs">
                          <div className="space-y-1">
                            <strong className="font-bold text-blue-950 block font-sans">🎒 亲子自然讲习工坊预约 Entrance</strong>
                            <p className="text-slate-600 font-medium text-[10.5px]">双休日下午 14:00。凭亲子入园票免费领生物树皮浆浆画材料。共建鸟舍！</p>
                          </div>
                          <button
                            onClick={() => {
                              alert('您已成功免费预定本周末「小科学家探索工坊」课程！专属智能席位已配妥。');
                            }}
                            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shrink-0 transition-all outline-none cursor-pointer border-none"
                          >
                            一键预约 →
                          </button>
                        </div>
                      </div>
                    )}

                    {currentZone.id === 'polar' && (
                      <div className="bg-sky-50/40 p-5 rounded-2xl border border-sky-200/40 space-y-4 text-left shadow-2xs">
                        <div className="bg-sky-950/5 p-3.5 rounded-xl border border-sky-100 text-[11px] text-sky-950 flex justify-between items-center font-sans font-bold">
                          <span>❄️ 极地人造大雪馆气候实感：</span>
                          <span className="text-sky-800 bg-white border border-sky-150 px-2.5 py-1 rounded font-mono font-black animate-pulse">零下 4.5°C / 积雪 35mm / 极清爽</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-sky-100 text-[11px] text-sky-950 space-y-1 shadow-3xs">
                          <strong className="font-bold text-sky-900 flex items-center gap-1 font-sans">☃️ 雪鸮极寒生态档案 Spotlight</strong>
                          <p className="text-slate-550 leading-relaxed font-sans font-medium">雪鸮通体羽白无斑，是极地寒区最具代表性的昼行飞羽捕手。因为它们的眼睛固定不能轻移，所以配备了多达14节极宽张力颈棘椎，头部可以极其顺滑自如旋转整整270度！即使在雪毯冰层下30厘米，也能快速双耳声差定向交叉定位，捕获极速北极旅鼠。</p>
                        </div>

                        <div className="p-4 bg-sky-900/5 border border-sky-150 rounded-xl space-y-1.5 text-[11px] text-sky-950">
                          <strong className="font-bold text-sky-900 block font-sans">🧬 极寒耐寒小百科：雪鸮的一双脚趾为什么不怕结冰坏死？</strong>
                          <p className="text-slate-650 leading-relaxed font-sans font-medium">
                            因为它们的腿脚趾表面布满高度隔温锁温的<strong>雪鞋状白绒羽毛</strong>，比温带普通鸣禽绒羽密度高出5倍以上，完全阻绝冰雪冷风直接触。同时其血管构造长有神奇的“反向血温热逆卡差”血流交互管，在极端酷寒足温凉血回流心脏前已在中间加温，确保不致伤发生冻僵！
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

            {/* Dynamic Interactive Elements Inject:
                - If Map, render interactive map.
                - If Petting, render feeding simulation.
                - If Science Hall, render science quiz trivia.
                - If Performance, render timetable timeline.
                - If Rainforest, render rainforest climate controls.
            */}
            {activeTab === 'map' && (
              <section id="map-hub" className="scroll-mt-24">
                <MapInteractive
                  zones={ZOO_ZONES}
                  activeZoneId={activeTab}
                  onSelectZone={selectZoneHandler}
                  onContactClick={() => selectZoneHandler('map-contact')}
                />
              </section>
            )}

            {activeTab === 'petting' && (
              <section id="petting-hub" className="scroll-mt-24">
                <PettingSimulation />
              </section>
            )}

            {activeTab === 'science' && (
              <section id="science-hub" className="scroll-mt-24">
                <ScienceTrivia />
              </section>
            )}

            {activeTab === 'arena' && (
              <section id="arena-hub" className="scroll-mt-24">
                <ShowTimeline />
              </section>
            )}

            {activeTab === 'rainforest' && (
              <section id="rainforest-hub" className="scroll-mt-24">
                <RainforestControls />
              </section>
            )}

            {activeTab === 'map-contact' && (
              <section id="contact-hub" className="scroll-mt-24">
                <ContactForm />
              </section>
            )}

            {/* Curated Individual Animal display grid */}
            {currentZone.animals.length > 0 ? (
              <section className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    <h2 className="text-lg font-black tracking-tight text-slate-900 font-sans">
                      场馆明星生灵档案 Species Files
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">目前注册: {currentZone.animals.length} 种</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentZone.animals.map((animal) => {
                    const status = conservationLabel(animal.conservationStatus);
                    const isAudioActive = activeAnimalAudio === animal.id;
                    return (
                      <div
                        key={animal.id}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/50 hover:border-emerald-200 hover:shadow-xl hover:scale-[1.01] shadow-lg transition-all duration-300 flex flex-col justify-between group relative cursor-pointer"
                      >
                        {/* Animal Thumbnail Card header picture */}
                        {/* 🌟 Professional Eco-Photography Showcase Wrapper (Standard 4:3 webpage spec, natural soft-light gradient) */}
                        <div className="aspect-[4/3] w-full relative bg-radial from-stone-50/90 to-stone-150/40 p-4.5 flex items-center justify-center overflow-hidden border-b border-slate-150 group/img">
                          
                          {/* 🌿 Corner Decal: Mini Climbing Squirrel (Top-Left) */}
                          <div className="absolute top-2 left-2 pointer-events-none z-20 opacity-55 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300 flex items-center gap-1 px-1 py-0.5 rounded bg-amber-50/30 border border-amber-900/5 backdrop-blur-[0.5px] text-amber-950/70">
                            <span className="text-[8px] font-black font-mono tracking-wider select-none">SQR-01</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="animate-corner-scurry text-amber-900/80">
                              <path d="M12 2c5.522 0 10 4.477 10 10c0 1.745-.447 3.387-1.233 4.819c-.31.564-.99.789-1.571.49l-1.096-.562A8 8 0 1 1 12 4V2z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </div>

                          {/* 🐦 Corner Decal: Mini Sentry Songbird (Top-Right) */}
                          <div className="absolute top-2 right-2 pointer-events-none z-20 opacity-55 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300 flex items-center gap-1 px-1 py-0.5 rounded bg-emerald-50/30 border border-emerald-950/5 backdrop-blur-[0.5px] text-emerald-950/70">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="animate-corner-sway text-emerald-800/85">
                              <path d="M12 2a4 4 0 0 1 4 4c0 .828-.25 1.597-.68 2.23l4.385 1.1c.732.183 1.157.946.911 1.666l-.5 1.465a1.5 1.5 0 0 1-1.724 1l-2.062-.516A6.974 6.974 0 0 1 12 18c-3.866 0-7-3.134-7-7s3.134-7 7-7zm0 2V2c-5.523 0-10 4.477-10 10s4.477 10 10 10v-2" />
                            </svg>
                            <span className="text-[8px] font-black font-mono tracking-wider select-none">BRD-07</span>
                          </div>

                          {/* 🐾 Corner Decal: Tiny Forest Pawprints (Bottom-Left) */}
                          <div className="absolute bottom-1.5 left-3 pointer-events-none z-20 opacity-50 group-hover/img:opacity-100 transition-all duration-300 flex items-center gap-1">
                            <svg width="22" height="8" viewBox="0 0 44 16" fill="currentColor" className="text-stone-800/60 animate-pulse">
                              {/* Left Paw */}
                              <circle cx="6" cy="10" r="2.5" /> <circle cx="4" cy="4" r="1.2" /> <circle cx="8" cy="3" r="1.2" /> <circle cx="12" cy="5" r="1.2" />
                              {/* Right Paw */}
                              <circle cx="28" cy="8" r="2.5" /> <circle cx="26" cy="3" r="1.2" /> <circle cx="30" cy="2" r="1.2" /> <circle cx="34" cy="4" r="1.2" />
                            </svg>
                            <span className="text-[7px] font-black font-mono text-stone-600/60 select-none tracking-tight">TRACKS</span>
                          </div>

                          {/* 🐇 Corner Decal: Tiny Crouching Forest Hare (Bottom-Right, safe space beside audio icon) */}
                          <div className="absolute bottom-1.5 left-[42%] pointer-events-none z-20 opacity-50 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300 flex items-center gap-0.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="animate-corner-hop text-amber-900/70">
                              <path d="M12 2c1.1 0 2 .9 2 2v2.5a.5.5 0 0 0 .5.5H17a1.5 1.5 0 0 1 1.5 1.5v3.5l2.5 1.5c.5.3.7.9.4 1.4l-1 1.8a1.5 1.5 0 0 1-2.1.4l-2.3-1.4A4 4 0 0 1 12 18H8a4 4 0 0 1-4-4v-2c0-1.1.9-2 2-2h1.5a.5.5 0 0 0 .5-.5V3c0-1.1.9-2 2-2z" />
                            </svg>
                            <span className="text-[7.5px] font-bold font-mono text-stone-600/50 select-none">HARE</span>
                          </div>

                          {/* Inner Matte frame creates generous blank margins to safely house the swinging animal photo without boundary clipping ("四周预留大范围空白区域") */}
                          <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-md bg-white border border-stone-200/50 flex items-center justify-center">
                            {/* Rich light and shadow overlay - natural outdoor soft light mimicking ecological 3D depth ("采用户外自然柔光拍摄，光影层次丰富") */}
                            <div className="absolute inset-0 bg-linear-to-tr from-stone-900/10 via-transparent to-white/15 pointer-events-none z-10 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-linear-to-b from-stone-950/5 to-transparent pointer-events-none z-10" />
                            
                            {/* The animal photo centers its subject perfectly and features the micro-wiggle on hover ("画面主体严格居中，不出现内容裁切") */}
                            <img
                              src={animal.imageUrl}
                              alt={animal.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center transition-transform duration-500 scale-[1.03] animate-animal-wiggle"
                            />
                            
                            {/* Decorative micro fine art frame line */}
                            <div className="absolute inset-1.5 border border-white/35 rounded-xl pointer-events-none z-10" />
                          </div>
                          
                          {/* Top floating conservation status pill */}
                          <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm border border-white/20 ${status.color}`}>
                              保護級: {status.text}
                            </span>
                            <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono font-bold bg-slate-950/80 text-white backdrop-blur-sm shadow-sm">
                              {animal.category}
                            </span>
                          </div>

                          {/* Float play synthesized voice click button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playAnimalSound(animal.id);
                            }}
                            className={`absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border transition-all shadow-md active:scale-90 outline-none ${
                              isAudioActive
                                ? 'bg-emerald-500 border-emerald-400 text-white animate-bounce'
                                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                            title="模拟动物鸣叫声 Audio Synth"
                          >
                            <Volume2 size={16} className={isAudioActive ? 'animate-pulse' : ''} />
                          </button>
                        </div>

                        {/* Species detailed card parameters */}
                        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 font-sans">
                                {animal.name}
                              </h3>
                              <p className="text-[11px] font-mono text-slate-400 italic font-bold">
                                {animal.scientificName}
                              </p>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed font-sans">
                                {animal.description}
                            </p>

                            {/* Fun fact bubble call out */}
                            <div className="bg-amber-50/50 border border-amber-100/60 p-3.5 rounded-2xl">
                              <div className="flex gap-1.5 text-xs text-amber-950 font-sans">
                                <span className="text-base select-none">💡</span>
                                <div>
                                  <strong className="block font-bold">趣味科普小秘密:</strong>
                                  <span className="text-[11px] text-amber-800 leading-normal block mt-1">
                                    {animal.funFact}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Specs footer label */}
                          <div className="border-t border-slate-100 mt-4 pt-3 text-[11px] text-slate-500 grid grid-cols-2 gap-2 font-mono">
                            <div>
                              <span className="text-slate-400">每日基础食谱:</span>
                              <div className="font-bold text-slate-700 truncate">{animal.diet}</div>
                            </div>
                            <div>
                              <span className="text-slate-400">核心习性偏好:</span>
                              <div className="font-bold text-slate-700 truncate">{animal.behavior || '昼行、群居性好生机'}</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}

            {/* General auxiliary links: If home page, let them quickly access Map */}
            {activeTab === 'entrance' && (
              <section className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row gap-6 justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-1.5 max-w-xl text-center md:text-left">
                  <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-mono tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    Explorer Helper
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mt-1">
                    寻找特定的场馆与代表动物？
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans">
                    点击开启我们的高分辨率全景AR缩微导览系统（第 12 场馆），轻点金色的地标可以直接飞向对应的场馆，甚至支持预约特聘学者研学讲解。
                  </p>
                </div>
                <button
                  onClick={() => selectZoneHandler('map')}
                  className="px-6 py-3 bg-white text-slate-950 rounded-xl font-bold text-xs sm:text-sm active:scale-97 outline-none transition-all cursor-pointer shadow-lg hover:bg-slate-100 flex items-center gap-1 shrink-0"
                >
                  <Compass size={14} className="animate-spin text-slate-950" />
                  <span>立刻进入：全景交互地图</span>
                </button>
              </section>
            )}

            {/* Suggestion Box Interactive Section */}
            <section id="suggestion-box-section-container" className="pt-2">
              <SuggestionBox />
            </section>

            {/* Contact quick links placeholder */}
            {activeTab !== 'map-contact' && (
              <div className="pt-4 text-center border-t border-slate-200">
                <p className="text-xs text-slate-500 font-sans">
                  有任何大宗订票或失物应急求助需求？
                  <button
                    onClick={() => selectZoneHandler('map-contact')}
                    className="text-emerald-600 font-bold hover:underline bg-transparent border-none outline-none cursor-pointer pl-1 inline-block"
                  >
                    立刻访问联络中心 {'>'}
                  </button>
                </p>
              </div>
            )}

          </>
        )}

      </main>
        </div>
      </div>

      {/* Global Interactive QR drawer/alert overlay on Mobile Side navigation in screen width */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 lg:hidden flex justify-start">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white max-w-xs w-full h-full p-6 shadow-2xl overflow-y-auto space-y-6 text-left flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div className="font-sans font-black text-slate-900 text-base">
                    12 场馆智慧导览
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 outline-none cursor-pointer border-none bg-transparent"
                    aria-label="关闭导览菜单"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Primary Activity Calendar link on mobile too! */}
                <button
                  onClick={() => selectZoneHandler('calendar')}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2.5 outline-none cursor-pointer border ${
                    activeTab === 'calendar'
                      ? 'bg-purple-900 border-purple-800 text-white shadow-md'
                      : 'bg-purple-50 hover:bg-purple-100 border-purple-100 text-purple-950'
                  }`}
                >
                  <span className="text-sm select-none">📅</span>
                  <span className="font-sans font-black">2026 奇境近季生态活动日历</span>
                </button>

                <div className="space-y-1">
                  {ZOO_ZONES.filter((z) => z.id !== 'map').map((zone, idx) => {
                    const isSelected = activeTab === zone.id;
                    return (
                      <button
                        key={`mob-nav-${zone.id}`}
                        onClick={() => selectZoneHandler(zone.id)}
                        className={`w-full py-2.5 px-3 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-2.5 outline-none cursor-pointer border-none ${
                          isSelected
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'bg-transparent hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className={`font-mono text-[9px] w-4 h-4 flex items-center justify-center border rounded font-bold ${
                          isSelected ? 'bg-amber-400 border-amber-300 text-slate-950' : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="truncate">{zone.chineseTitle.split(' · ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile custom links */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAccessibilityModalOpen(true);
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl active:scale-97 transition-all outline-none cursor-pointer border-none"
                >
                  ♿️ 无障碍/轮椅/母婴服务册
                </button>
                <button
                  onClick={() => selectZoneHandler('map-contact')}
                  className="w-full py-2.5 text-center text-xs font-bold bg-emerald-700 text-white rounded-xl active:scale-97 transition-all outline-none cursor-pointer border-none"
                >
                  在线联系我们 Form
                </button>
                <div className="text-[10px] text-center text-slate-400 font-mono">
                  Wonderland Eco Resort © 2026
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer information */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-10 border-t border-slate-800 mt-16 leading-relaxed text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-3">
              <TreePine className="text-emerald-400" size={16} />
              <span>生态奇境自然动物园</span>
            </div>
            <p className="text-[11px] text-slate-400/80">
              国家AAAAA级野奢生态保育示范区。基于“环境丰容、生机共享、智慧交互”设计总纲，打造生灵共享和谐家园。
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-3 font-sans">快速进入核心特区</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button onClick={() => selectZoneHandler('savannah')} className="text-left hover:text-white outline-none cursor-pointer border-none bg-transparent text-slate-400">3/12 狂野草原区</button>
              <button onClick={() => selectZoneHandler('beasts')} className="text-left hover:text-white outline-none cursor-pointer border-none bg-transparent text-slate-400">4/12 险峻猛兽谷</button>
              <button onClick={() => selectZoneHandler('petting')} className="text-left hover:text-white outline-none cursor-pointer border-none bg-transparent text-slate-400">7/12 童话萌宠区</button>
              <button onClick={() => selectZoneHandler('rainforest')} className="text-left hover:text-white outline-none cursor-pointer border-none bg-transparent text-slate-400">8/12 热带雨林馆</button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-3 font-sans">绿色游园保护宣言</h4>
            <p className="text-[11px] text-slate-400/80">
              请跟随“零塑料”出行导则。在天网与草原栈道内拍照时请收起强自拍金属杆，请勿投递塑料袋，多一分自律、多千万份爱心保护。
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono">
          <div>
            &copy; 2026 生态奇境自然动物园 · 保育研究学会. 版权所有 All Rights Reserved.
          </div>
          <div className="flex gap-4">
            <span className="text-slate-500">AR Code version: 2026.05.v1</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-500">Security Encrypted</span>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 35 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 35 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-slate-900 border border-slate-700/50 text-white flex items-center justify-center shadow-2xl hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer outline-none transition-all font-sans text-base font-black"
            title="返回顶部 Back to Top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* 3. Interactive Panoramic Line Map Modal */}
      <AnimatePresence>
        {panoramicMapOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6 border border-slate-150 relative text-left"
            >
              <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-sans">🗺️ 奇境学堂：全景立体航拍导游距离测算</h3>
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    以今日第一主通道大门「森林之门」为导航始发原点，高精测算12景区真实步履路径：
                  </p>
                </div>
                <button
                  onClick={() => setPanoramicMapOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer outline-none border-none bg-transparent"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Grid of 12 zones and route details from Gate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                {[
                  { name: '1. 森林之门 · 正门广场', distance: '始发起点 Ground Zero', walkTime: '0分钟/在脚下' },
                  { name: '2. 草原动物馆 · 狂野大地', distance: '东线步道 350米', walkTime: '步行约 5分钟 / 适宜小火车' },
                  { name: '3. 猛兽谷 · 山石丛林', distance: '北向主干道 600米', walkTime: '步行约 8分钟 / 设有高防弹墙' },
                  { name: '4. 灵长类馆 · 奇趣猴山', distance: '西北山原线 450米', walkTime: '步行约 6分钟 / 水云阶直通' },
                  { name: '5. 水栖动物区 · 碧波绿甸', distance: '南堤荷花路 200米', walkTime: '步行约 3分钟 / 绕湖亲水带' },
                  { name: '6. 百鸟林 · 绿叶啼鸣', distance: '北向高空索梯 500米', walkTime: '步行约 7分钟 / 巨木悬顶天网' },
                  { name: '7. 萌宠乐园 · 亲子牧歌', distance: '西向木偶小径 300米', walkTime: '步行约 4分钟 / 设有除菌池' },
                  { name: '8. 热带雨林馆 · 室内奇境', distance: '密林探幽线 550米', walkTime: '步行约 8分钟 / 恒温恒湿馆' },
                  { name: '9. 休闲草坪 · 园区风光', distance: '大树荫环路 700米', walkTime: '步行约 10分钟 / 适宜晒夕阳' },
                  { name: '10. 百鸟剧场 · 动物表演场', distance: '西看台云棚 800米', walkTime: '步行约 11分钟 / 环立拱台' },
                  { name: '11. 生命奇迹科普厅 · 互动介绍', distance: '主入口后街 400米', walkTime: '步行约 5分钟 / 天然大回廊' },
                  { name: '12. 极地展区 · 冰雪寒带', distance: '极北冰川道 900米', walkTime: '步行约 13分钟 / 保暖风衣租用' }
                ].map((pos, pIdx) => (
                  <div key={pIdx} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-between items-center hover:border-emerald-200 hover:bg-emerald-50/10 transition-all shadow-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-800">{pos.name}</div>
                      <div className="text-[10.5px] text-slate-500 font-mono">📍 步行线路: {pos.distance}</div>
                    </div>
                    <div className="text-right shrink-0 bg-white px-2 py-1 rounded-lg border border-slate-150 font-mono text-[10.5px] font-bold text-emerald-800 shadow-2xs">
                      ⏱️ {pos.walkTime.split(' / ')[0]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-500 font-medium">
                <span>智能生态指引：可在正门服务网台领取具有芯片防雷、大爱定位的纸质纸浆AR地图。</span>
                <button
                  onClick={() => setPanoramicMapOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all outline-none cursor-pointer border-none"
                >
                  确认、返回景区
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Accessibility Guide Modal */}
      <AnimatePresence>
        {accessibilityModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 border border-slate-150 relative text-left"
            >
              <div className="flex justify-between items-start pb-4 border-b border-rose-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-rose-950 font-sans flex items-center gap-1.5 animate-pulse">
                    <span>♿️ 奇境无障碍普惠关爱服务</span>
                  </h3>
                  <p className="text-xs text-rose-850 mt-1 font-sans">
                    零壁垒畅享绿色野奢自然，我们倾心为您提供：
                  </p>
                </div>
                <button
                  onClick={() => setAccessibilityModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-950 cursor-pointer outline-none border-none bg-transparent"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-xs font-medium text-slate-700 leading-relaxed">
                <div className="bg-rose-900/5 p-4 rounded-xl border border-rose-100 space-y-1 shadow-3xs">
                  <strong className="text-rose-950 block text-[12px] font-bold font-sans">🛠️ 轮椅租借点及智能推车：</strong>
                  <p className="text-slate-600 leading-normal">
                    位于大门闸机正后方右偏15米的「游客关怀中心」，凭身份证等即可<strong>免费</strong>租用减震舒适手摇式轮椅与无菌儿童折叠手摇安全婴儿车。
                  </p>
                </div>

                <div className="bg-teal-900/5 p-4 rounded-xl border border-teal-100 space-y-1 shadow-3xs">
                  <strong className="text-teal-950 block text-[12px] font-bold font-sans">🤱 私密恒温哺乳休息室：</strong>
                  <p className="text-slate-600 leading-normal">
                    园区在 <strong>7/12 萌宠乐园童话木屋侧</strong>、以及 <strong>5/12 水生动物区2号生态公共间旁</strong> 均特设了空调控温的无音哺乳室，备有净水和无菌温奶。
                  </p>
                </div>

                <div className="bg-sky-900/5 p-4 rounded-xl border border-sky-100 space-y-1 shadow-3xs">
                  <strong className="text-sky-950 block text-[12px] font-bold font-sans">♿️ 盲道及全通连环安全缓步坡：</strong>
                  <p className="text-slate-600 leading-normal">
                    全园区主题展品带高空木道梯、亲水东路缓度不超过5°，去除了任何硬生步阶坎，均设有儿童与特需高位隔栅低视线，零障碍抚触观鸟。
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10.5px] text-slate-400 font-mono">
                <span>应急救助热线 400-820-2026</span>
                <button
                  onClick={() => setAccessibilityModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all outline-none cursor-pointer border-none"
                >
                  确认、畅行奇境
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
