import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Info, ArrowRight, ArrowDownRight, Users, MessageSquare } from 'lucide-react';
import { Zone } from '../types';

interface MapInteractiveProps {
  zones: Zone[];
  activeZoneId: string;
  onSelectZone: (zoneId: string) => void;
  onContactClick: () => void;
}

export default function MapInteractive({
  zones,
  activeZoneId,
  onSelectZone,
  onContactClick
}: MapInteractiveProps) {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Zone | null>(null);

  // Map coordinates on 1000x600 canvas coordinate space for proportional responsive rendering
  const mapHotspots: Record<string, { x: number; y: number; label: string; offset?: string }> = {
    entrance: { x: 500, y: 530, label: '森林正门广场', offset: 'top' },
    lawn: { x: 320, y: 380, label: '休闲阳光大草坪', offset: 'bottom' },
    petting: { x: 220, y: 450, label: '童话萌宠乐园', offset: 'right' },
    aquatic: { x: 420, y: 280, label: '天鹅湿地湖泊区', offset: 'left' },
    birds: { x: 680, y: 390, label: '百鸟林迷雾天网', offset: 'right' },
    savannah: { x: 180, y: 200, label: '东非狂野大草原', offset: 'top' },
    beasts: { x: 800, y: 230, label: '险峻巨兽石谷', offset: 'top' },
    primate: { x: 580, y: 190, label: '高空瀑布飞猴山', offset: 'bottom' },
    rainforest: { x: 850, y: 450, label: '热带雨林温湿馆', offset: 'left' },
    arena: { x: 740, y: 120, label: '露天百鸟竞技表演场', offset: 'bottom' },
    science: { x: 430, y: 110, label: '生命科普交互大厅', offset: 'top' },
    map: { x: 500, y: 340, label: '全景环形控制台', offset: 'top' }
  };

  const handleMarkerClick = (zone: Zone) => {
    setSelectedMarker(zone);
    if (zone.id !== 'map') {
      // Small feedback
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="p-6 md:p-8 bg-slate-950/70 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Navigation Hub
            </span>
            <span className="text-xs font-mono text-slate-400">• 互动景区导览 map</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
            1/12 园区全景漫游导览图
          </h3>
          <p className="text-slate-400 text-xs mt-1 max-w-xl">
            点击地图上的金色动物徽标，可快速检索各个场馆的主题特色、代表物种与科普活动，点击按钮可瞬移直达该展区！
          </p>
        </div>
        <button
          onClick={onContactClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/20 active:scale-95 transition-all outline-none"
        >
          <MessageSquare size={16} />
          <span>预约保育员 / 联络园区</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
        {/* The Map Arena */}
        <div className="lg:col-span-8 p-4 bg-slate-950 relative overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
          {/* Stylized Grid SVG Map Backdrop */}
          <div className="w-full h-full max-w-[800px] aspect-[16/10] relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80">
            {/* SVG Roads and Pathways */}
            <svg
              viewBox="0 0 1000 600"
              className="absolute inset-0 w-full h-full select-none opacity-40 mix-blend-screen pointer-events-none"
            >
              <defs>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1000" height="600" fill="url(#mapGlow)" />

              {/* Grid Lines */}
              <g stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.06">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`x-${i}`} x1={(i + 1) * 80} y1="0" x2={(i + 1) * 80} y2="600" />
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={`y-${i}`} x1="0" y1={(i + 1) * 70} x2="1000" y2={(i + 1) * 70} />
                ))}
              </g>

              {/* Connected pathways */}
              <g fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 15" strokeOpacity="0.6">
                {/* Central ring pathway */}
                <ellipse cx="500" cy="340" rx="280" ry="160" />
                {/* Cross pathways */}
                <line x1="500" y1="530" x2="500" y2="110" />
                <line x1="320" y1="380" x2="680" y2="390" />
                {/* Perimeter connections */}
                <path d="M 500 530 Q 350 480 220 450 T 180 200" />
                <path d="M 500 530 Q 650 480 850 450 T 800 230" />
                <path d="M 180 200 Q 300 150 430 110 T 580 190 T 740 120" />
              </g>

              {/* Ecology Lakes & Habitats SVG Shapes */}
              <ellipse cx="420" cy="280" rx="90" ry="50" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
              <rect x="120" y="150" width="160" height="120" rx="20" fill="#ca8a04" fillOpacity="0.1" stroke="#facc15" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 760 380 Q 820 380 870 420 T 900 500 L 780 500 Z" fill="#047857" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Simulated Scenic Map Elements Drawing inside */}
            <div className="absolute top-4 left-6 pointer-events-none font-mono text-[9px] text-slate-400 flex flex-col gap-0.5">
              <div>// ECO-ZOO PANORAMIC GRID SYSTEM</div>
              <div>// COORDS: SEC_S_12_MAP</div>
              <div>// PRESET: DEEP GREENERY ILLUSTRATION</div>
            </div>

            {/* Rendering The Interactive Pins */}
            {zones.map((zone) => {
              const pos = mapHotspots[zone.id];
              if (!pos) return null;
              const isSelected = selectedMarker?.id === zone.id;
              const isActive = activeZoneId === zone.id;
              
              return (
                <div
                  key={`pin-${zone.id}`}
                  style={{ left: `${pos.x / 10}%`, top: `${pos.y / 6}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <button
                    onClick={() => handleMarkerClick(zone)}
                    onMouseEnter={() => setHoveredMarker(zone.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    className="group relative cursor-pointer outline-none"
                  >
                    {/* Ring animation */}
                    <span className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-emerald-400/20 animate-ping'
                        : isSelected
                        ? 'bg-amber-400/20 scale-125'
                        : 'group-hover:bg-slate-300/10 scale-90'
                    }`} />

                    {/* Badge Icon or Marker */}
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-300 shadow-lg ${
                      isActive
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-110'
                        : isSelected
                        ? 'bg-amber-400 border-amber-300 text-slate-950 scale-110'
                        : 'bg-slate-950/90 border-slate-700 hover:border-amber-400 text-amber-400'
                    }`}>
                      <MapPin size={15} className={isActive ? 'animate-bounce' : ''} />
                    </div>

                    {/* Tooltip Hover Bubble */}
                    <AnimatePresence>
                      {(hoveredMarker === zone.id || isSelected) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className={`absolute bottom-11 left-1/2 -translate-x-1/2 py-2 px-3 rounded-xl whitespace-nowrap text-xs font-semibold font-sans pointer-events-none z-30 shadow-xl border ${
                            isActive
                              ? 'bg-emerald-950/95 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-950/95 border-slate-700/80 text-amber-300'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Navigation size={10} className="text-amber-400" />
                            <span>{zone.chineseTitle.split(' · ')[0]}</span>
                          </div>
                          <div className="text-[10px] text-slate-300 font-normal mt-0.5">
                            {zone.animals.length > 0 ? `${zone.animals.length} 种明星野兽` : '互动园区场景'}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}

            {/* Simple Compass Rose Ornament */}
            <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border border-slate-700/60 flex items-center justify-center p-1 pointer-events-none opacity-40">
              <span className="text-[8px] font-mono font-bold text-slate-500 absolute top-0.5">N</span>
              <div className="w-1 h-7 bg-amber-500 rounded-full rotate-45 transform-gpu" />
            </div>
          </div>
        </div>

        {/* Selected Area Sidebar Drawer info */}
        <div className="lg:col-span-4 p-6 md:p-8 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between min-h-[300px]">
          <AnimatePresence mode="wait">
            {selectedMarker ? (
              <motion.div
                key={selectedMarker.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      style={{ 
                        backgroundColor: `${selectedMarker.color.primary}15`, 
                        color: selectedMarker.color.primary,
                        borderColor: `${selectedMarker.color.primary}30`
                      }} 
                      className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                    >
                      {selectedMarker.category.split('·')[0]}
                    </span>
                    <span className="text-xs text-slate-500 uppercase font-mono">ID: {selectedMarker.id}</span>
                  </div>

                  <h4 className="text-2xl font-bold font-sans text-white mb-1 leading-tight">
                    {selectedMarker.chineseTitle}
                  </h4>
                  <p className="text-slate-400 text-xs font-mono tracking-wide mb-4">
                    {selectedMarker.title}
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {selectedMarker.description}
                  </p>

                  {/* Representative animals list layout */}
                  {selectedMarker.animals.length > 0 ? (
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5 font-mono">
                        <Users size={12} className="text-amber-500" />
                        <span>场馆明星居民 Representative Species:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedMarker.animals.map((ani) => (
                          <div key={ani.id} className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 flex items-center gap-2">
                            {/* Mini padded ecological frame to absorb mouse wiggles natively and prevent border overlapping clipping */}
                            <div className="w-9 h-9 shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/55 p-0.5 flex items-center justify-center">
                              <img
                                src={ani.imageUrl}
                                alt={ani.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full rounded-md object-cover object-center bg-slate-800 animate-animal-wiggle"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-100">{ani.name}</div>
                              <span className="text-[9px] px-1 py-0.2 rounded font-mono bg-slate-800 text-slate-300 font-bold">
                                {ani.conservationStatus}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-950/40 border border-slate-800/60 p-4 rounded-xl mb-6">
                      <div className="flex gap-2 items-start text-xs text-slate-400">
                        <Info size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>本场馆属于交互式公共休闲与科普专区，配有丰富的亲子互动设施、导览指示、以及全天候温润绿化休憩带。</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
                  <button
                    onClick={() => onSelectZone(selectedMarker.id)}
                    className="w-full py-3 px-4 rounded-xl text-center text-sm font-semibold bg-white text-slate-950 hover:bg-emerald-50 hover:text-emerald-950 active:scale-98 transition-all flex items-center justify-center gap-2 outline-none group"
                  >
                    <span>瞬移抵达该园区</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 font-mono italic">
                    Tips: 导览系统将平滑重塑视野，并将您切换至对应栏目视图。
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 h-full">
                <div className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-700/50 flex items-center justify-center text-slate-400 mb-4 animate-bounce">
                  <Navigation size={20} className="text-amber-500 rotate-45" />
                </div>
                <h4 className="text-base font-bold text-slate-200 mb-1 font-sans">
                  暂未锁定景区
                </h4>
                <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed font-sans">
                  请在左侧的交互式全景网络网格中，轻点金色的地标图钉展开场馆详细探索档案。
                </p>
                <div className="mt-8 pt-6 border-t border-slate-800/50 w-full text-left">
                  <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1 font-mono">
                    <ArrowDownRight size={13} className="text-teal-400" />
                    <span>快捷一键导航:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {zones.slice(0, 4).map((z) => (
                      <button
                        key={`shortcut-${z.id}`}
                        onClick={() => handleMarkerClick(z)}
                        className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-950/30 hover:bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
                      >
                        {z.chineseTitle.split(' · ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
