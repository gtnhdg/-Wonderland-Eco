import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZOO_SHOWS } from '../data';
import { Calendar, Clock, MapPin, Check, Info, Ticket, X } from 'lucide-react';

export default function ShowTimeline() {
  const [reservedShowIds, setReservedShowIds] = useState<string[]>([]);
  const [bookingShow, setBookingShow] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('B'); // A=VIP, B=Standard, C=Family
  const [visitorName, setVisitorName] = useState<string>('');

  const handleReserveClick = (showId: string) => {
    setBookingShow(showId);
  };

  const confirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingShow) return;
    
    setReservedShowIds((prev) => [...prev, bookingShow]);
    setBookingShow(null);
    setVisitorName('');
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-6 md:p-8 border border-violet-100 shadow-xl relative overflow-hidden">
      
      {/* Decorative ambient bubble */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-violet-100 pb-5">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-violet-100 text-violet-700 border border-violet-200">
            SHOW TIMELINE 精彩栏目演出
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-violet-900 mt-2 font-sans">
            10/12 动物表演场 · 剧场活动时间表
          </h3>
          <p className="text-violet-800/70 text-xs mt-1">
            精心编排的无伤害趣味生态丰容演示。寻找最喜爱的节目，领取您的电子专属观座席位！
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-white/80 border border-violet-100 px-3 py-1.5 rounded-xl shadow-sm">
          <Calendar size={13} className="text-violet-500" />
          <span className="text-xs font-semibold text-violet-900 font-mono">
            今日: 2026年5月26日
          </span>
        </div>
      </div>

      {/* Grid Timeline Lists */}
      <div className="space-y-4">
        {ZOO_SHOWS.map((show) => {
          const isReserved = reservedShowIds.includes(show.id);
          return (
            <div
              key={show.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center overflow-hidden relative ${
                isReserved
                  ? 'bg-emerald-50/50 border-emerald-200 shadow-sm'
                  : 'bg-white border-violet-100/80 hover:border-violet-300 hover:shadow-md'
              }`}
            >
              <div className="flex gap-4 items-start md:items-center">
                {/* Time bubble */}
                <div className={`px-4 py-2.5 rounded-2xl flex flex-col items-center justify-center font-mono border ${
                  isReserved
                    ? 'bg-emerald-500 border-emerald-400 text-white'
                    : 'bg-violet-50 border-violet-100 text-violet-700 font-bold'
                }`}>
                  <Clock size={15} className="mb-0.5" />
                  <span className="text-xs font-bold">{show.time}</span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base font-bold text-violet-950 font-sans">{show.title}</h4>
                    <span className="text-[10px] bg-violet-50 text-violet-600 px-1.5 py-0.5 rounded-md font-mono">
                      时长: {show.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-2xl font-sans mt-0.5">
                    {show.description}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono pt-1">
                    <MapPin size={10} className="text-violet-500" />
                    <span>地标：中央主露天大剧场区 (Show Arena C)</span>
                  </div>
                </div>
              </div>

              {/* Action booking toggles */}
              <div className="shrink-0 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100/80 flex items-center justify-end">
                {isReserved ? (
                  <div className="flex items-center gap-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl">
                    <Check size={14} />
                    <span>已锁定专属席位 [{selectedSeat}区]</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleReserveClick(show.id)}
                    className="flex items-center gap-1 px-4.5 py-2.5 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md active:scale-97 cursor-pointer transition-all outline-none"
                  >
                    <Ticket size={13} />
                    <span>预订专属席位 Seat</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-violet-50/50 p-4 rounded-xl border border-violet-100/40 flex items-start gap-2 text-xs text-violet-900 leading-relaxed font-sans">
        <Info size={14} className="text-violet-600 shrink-0 mt-0.5" />
        <span>
          注：本动物园支持绿色保护无压，倡导自由丰容生态，每日演出时间可能受空气气温和动物休养状况微调，所有订座席均可在现场进行一键退改签。
        </span>
      </div>

      {/* Form Dialog Box inside React State to simulate nice overlays */}
      <AnimatePresence>
        {bookingShow && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border border-violet-100 shadow-2xl relative"
            >
              <button
                onClick={() => setBookingShow(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 outline-none transition-colors"
                aria-label="关闭对话框"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Ticket className="text-violet-600" size={24} />
                <h4 className="text-lg font-bold text-violet-900">锁定演出电子VIP入场券</h4>
              </div>

              <form onSubmit={confirmReservation} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1">
                    1. 填报真实的入园访客称呼 / 身份证后四位
                  </label>
                  <input
                    required
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="例如：王小萌 3920"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-violet-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 block mb-1.5">
                    2. 挑选期待的目标席位档位
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'A', label: 'VIP前排高空俯瞩区' },
                      { key: 'B', label: '中部亲近鸟雨微风区' },
                      { key: 'C', label: '后部广角合影全景观' }
                    ].map((seat) => (
                      <button
                        type="button"
                        key={seat.key}
                        onClick={() => setSelectedSeat(seat.key)}
                        className={`p-3.5 rounded-xl border text-center relative transition-all outline-none flex flex-col justify-between h-20 ${
                          selectedSeat === seat.key
                            ? 'bg-violet-50 border-violet-500 text-violet-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'
                        }`}
                      >
                        <span className="text-sm font-bold block">{seat.key} 席区</span>
                        <span className="text-[9px] leading-tight text-slate-500 block mt-1">{seat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-center text-xs sm:text-sm font-bold shadow-lg shadow-violet-200 active:scale-97 outline-none transition-all cursor-pointer"
                  >
                    确认锁定，一键发券
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2 font-mono">
                    *预订完全免费，不产生真实计费。
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
