import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, Clipboard, User, Calendar, PlusCircle, Check, HelpCircle, Heart } from 'lucide-react';

interface Suggestion {
  id: string;
  author: string;
  city: string;
  category: 'enrichment' | 'eco' | 'facility' | 'diet' | 'cheer';
  date: string;
  content: string;
  likes: number;
  rotation: number; // for realistic slanting on the board
}

const INITIAL_SUGGESTIONS: Suggestion[] = [
  {
    id: 's-1',
    author: '王小明',
    city: '上海',
    category: 'diet',
    date: '2026-05-26',
    content: '在童话萌宠牧场，荷兰垂耳兔实在是太圆滚滚了，简直像一个巨型棉花糖！能不能在旁边提供一个小型的电子秤，方便我们随时掌握兔子们的真实肥胖度，科学投喂提摩西牧草呀？🐰',
    likes: 42,
    rotation: -1.5
  },
  {
    id: 's-2',
    author: '环保主义者·林大叔',
    city: '杭州',
    category: 'eco',
    date: '2026-05-26',
    content: '非常赞同园区的“双腿弹跳起飞”汤氏瞪羚！今天亲眼看到它们在草坪上和猞猁完美相邻，科普讲解也极其走心。希望推出官方由落叶和竹片制成的生态环保书签，一定会大卖！',
    likes: 28,
    rotation: 2.1
  },
  {
    id: 's-3',
    author: '宇航科普狂热粉',
    city: '北京',
    category: 'facility',
    date: '2026-05-25',
    content: '强烈建议在“暴雨雨林狂野区”的温度控制面板旁增加一把手持侧风仪！孩子们特别想在降水演练时实时读取气压和风速，这样能让他们本子上的研学游园笔记百分百严谨！📊',
    likes: 31,
    rotation: -2.3
  },
  {
    id: 's-4',
    author: '大山猫守护者',
    city: '成都',
    category: 'enrichment',
    date: '2026-05-25',
    content: '刚看到搬到休闲草坪那一列的“欧亚猞猁”，大脚梅花雪鞋印踩出来真的帅呆了。由于它们大多在打熟睡的呼噜，建议在展示牌增加个“核心伸懒腰时间”提醒，那就太完美啦。',
    likes: 19,
    rotation: 1.2
  },
  {
    id: 's-5',
    author: '萱萱小朋友',
    city: '深圳',
    category: 'cheer',
    date: '2026-05-26',
    content: '今天跟梅花鹿幼崽对视了整整三分钟，小树林里落满叶子，真像闯入了童话世界！谢谢培育员叔叔把它们照顾得这么好，我把自己的苹果都给小鹿吃，它们真的是太香、太机警了。❤️',
    likes: 56,
    rotation: -0.8
  }
];

export default function SuggestionBox() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<'enrichment' | 'eco' | 'facility' | 'diet' | 'cheer'>('enrichment');
  const [content, setContent] = useState('');
  const [isNewAdded, setIsNewAdded] = useState(false);

  // Initialize from LocalStorage or base state
  useEffect(() => {
    const saved = localStorage.getItem('zoo_suggestions');
    if (saved) {
      try {
        setSuggestions(JSON.parse(saved));
      } catch (e) {
        setSuggestions(INITIAL_SUGGESTIONS);
      }
    } else {
      setSuggestions(INITIAL_SUGGESTIONS);
    }
  }, []);

  const saveToStorage = (list: Suggestion[]) => {
    localStorage.setItem('zoo_suggestions', JSON.stringify(list));
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'enrichment': return { text: '🦒 趣味点育', bg: 'bg-emerald-50 text-emerald-800 border-emerald-100' };
      case 'eco': return { text: '🌿 环保倡议', bg: 'bg-teal-50 text-teal-800 border-teal-100' };
      case 'facility': return { text: '🚪 现场设施', bg: 'bg-indigo-50 text-indigo-800 border-indigo-100' };
      case 'diet': return { text: '🥕 饲喂建议', bg: 'bg-amber-50 text-amber-800 border-amber-100' };
      case 'cheer': return { text: '💬 夸夸鼓励', bg: 'bg-pink-50 text-pink-800 border-pink-100' };
      default: return { text: '📌 游客见解', bg: 'bg-slate-50 text-slate-800 border-slate-100' };
    }
  };

  // Sound effect of wooden notice board mallet strike / paper pinning
  const playPinSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        
        // Tap Sound Part 1: Woody strike (Low frequency damped impulse)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.frequency.setValueAtTime(120, now);
        osc1.frequency.linearRampToValueAtTime(80, now + 0.15);
        osc1.type = 'triangle';
        gain1.gain.setValueAtTime(0.15, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        
        // Tap Sound Part 2: High frequency nail pitch (simulates click or pin push)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.setValueAtTime(850, now);
        osc2.frequency.setValueAtTime(400, now + 0.02);
        osc2.type = 'sine';
        gain2.gain.setValueAtTime(0.08, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc1.start();
        osc1.stop(now + 0.2);
        osc2.start();
        osc2.stop(now + 0.1);
      }
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const randomRotation = (Math.random() * 5) - 2.5; // realistic random oblique slanting [-2.5deg, 2.5deg]
    
    const newSuggestion: Suggestion = {
      id: 's-' + Date.now(),
      author: author.trim(),
      city: city.trim() || '热心游客',
      category,
      date: new Date().toISOString().split('T')[0],
      content: content.trim(),
      likes: 1,
      rotation: randomRotation
    };

    const updated = [newSuggestion, ...suggestions];
    setSuggestions(updated);
    saveToStorage(updated);

    // Reset Form Input State
    setAuthor('');
    setCity('');
    setContent('');
    setIsNewAdded(true);
    playPinSound();

    setTimeout(() => {
      setIsNewAdded(false);
    }, 3000);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = suggestions.map(item => {
      if (item.id === id) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });
    setSuggestions(updated);
    saveToStorage(updated);

    // Subtle paper pop sound
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
    } catch (err) {}
  };

  return (
    <div id="suggestion-box-section" className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-xl space-y-8 scroll-mt-24">
      {/* Visual Component Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-950 border border-amber-200">
              Interactive Voice Wall
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Sparkles size={12} className="text-amber-500 animate-pulse" />
              <span>生机奇境游客声音通道</span>
            </span>
          </div>
          <h2 className="text-2xl font-black font-sans tracking-tight text-slate-900">
            奇境游客心声意见箱 
          </h2>
          <p className="text-xs text-slate-500 leading-normal max-w-xl">
            对动物们有何新奇的想法、游园设施改进创意或温馨鼓励？随时在下方写下您的宝贵声音，每条建议都会实时展示在正下方陈列的生态意见木板墙上！我们每晚都会整理好交给饲育员。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Panel: Submitting Suggestion Card */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3">
            <Clipboard size={16} className="text-emerald-700" />
            <span className="text-xs font-bold text-slate-800">填写您的意见卡 Input Card</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                游客署名 * Username
              </label>
              <div className="relative">
                <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="text"
                  maxLength={12}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="如：白鸽吹哨人 / 小红同学"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                来自城市（选填） Location
              </label>
              <input
                type="text"
                maxLength={10}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="如：上海、南京、热心游客"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 bg-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                意见类型建议 Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-930 focus:outline-none focus:border-emerald-500 bg-white font-medium"
              >
                <option value="enrichment">🦒 趣味点育（玩具/丰容）</option>
                <option value="eco">🌿 环保倡议（低碳环保）</option>
                <option value="facility">🚪 现场设施（座椅/指示牌）</option>
                <option value="diet">🥕 饲喂建议（饲草/磨牙）</option>
                <option value="cheer">💬 夸夸鼓励（致敬饲育员）</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                心声意见内容 * Detailed Voice
              </label>
              <textarea
                required
                maxLength={200}
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在这里写下您的精彩创意... 为了保证排版美观，建言请尽量精炼在一两句话哦！写完点下方按钮：钉上去！"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-xl font-bold text-xs select-none shadow-md transition-all outline-none cursor-pointer active:scale-97"
            >
              <PlusCircle size={14} className="text-amber-400" />
              <span>钉上陈列木板 Pinned to Wall</span>
            </button>
          </form>

          <AnimatePresence>
            {isNewAdded && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-[11px] text-emerald-800"
              >
                <Check size={14} className="text-emerald-600 animate-bounce" />
                <span>您的意见卡已钉入下方生态陈列板！</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: Rustic Wood Notice Board Display */}
        <div className="lg:col-span-8 flex flex-col justify-start">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center px-1">
            <span>木板陈列现场 Interactive Wood Wall ({suggestions.length})</span>
            <span className="text-[11px] text-slate-400 font-sans font-medium">📌 点击卡片右下角爱心可为建言鼓劲</span>
          </div>

          {/* Interactive Wooden Background Board Panel */}
          <div className="relative min-h-[440px] border-[12px] border-amber-900/90 shadow-2xl bg-gradient-to-br from-amber-900 to-amber-950 rounded-[2.5rem] p-5 sm:p-7 overflow-hidden flex flex-col justify-between">
            {/* Wooden Texture Accent Ring */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.04),_transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.15)_1px,_transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-40" />

            {/* Little metallic/bronze corners to represent physical screw frames */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full border border-amber-950 shadow-sm" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full border border-amber-950 shadow-sm" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full border border-amber-950 shadow-sm" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full border border-amber-950 shadow-sm" />

            {/* Grid Layout of the Pinned Sticky Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
              <AnimatePresence>
                {suggestions.map((item) => {
                  const label = getCategoryLabel(item.category);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{ transform: `rotate(${item.rotation}deg)` }}
                      className="bg-[#faf6e8] border border-amber-200/50 p-4.5 rounded-2xl shadow-lg relative flex flex-col justify-between space-y-3.5 hover:scale-102 hover:shadow-xl transition-all duration-300 group max-h-[220px] overflow-hidden select-text"
                    >
                      {/* Pushpin emoji simulating a real pushpin */}
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-sm select-none drop-shadow">
                        📌
                      </div>

                      <div className="space-y-2">
                        {/* Upper line: Category Tag & Date */}
                        <div className="flex justify-between items-center text-[10px] select-none pt-1">
                          <span className={`px-2 py-0.5 rounded-md border font-sans font-bold ${label.bg}`}>
                            {label.text}
                          </span>
                          <span className="font-mono text-amber-900/45 font-semibold">
                            {item.date}
                          </span>
                        </div>

                        {/* Middle Text area */}
                        <p className="text-[11px] sm:text-xs text-amber-950/90 font-sans leading-relaxed break-words font-medium line-clamp-4">
                          {item.content}
                        </p>
                      </div>

                      {/* Footer: Author Name & Likes */}
                      <div className="flex justify-between items-center border-t border-amber-200/40 pt-2.5 mt-auto">
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-900/60 font-sans font-bold">
                          <span>👤 {item.author}</span>
                          <span className="text-amber-900/40">•</span>
                          <span className="text-[9px] font-medium bg-amber-900/10 px-1 py-0.2 rounded font-mono">
                            {item.city}
                          </span>
                        </div>

                        {/* Like button of the note */}
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-amber-900/5 hover:bg-amber-900/10 text-rose-700 hover:text-rose-600 transition-colors cursor-pointer select-none active:scale-90 outline-none border border-transparent font-mono text-[10px] font-black"
                        >
                          <Heart size={9} className="fill-current text-rose-600 animate-pulse" />
                          <span>{item.likes}</span>
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Tiny eco warning on natural board */}
            <div className="border-t border-amber-800/60 pt-3 text-center text-[10px] font-mono text-amber-300/45 tracking-wider select-none">
              🌳 SUSTAINABLE TOURIST FEEDBACK SYSTEM // OFFLINE CACHED AND PERSISTENT
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
