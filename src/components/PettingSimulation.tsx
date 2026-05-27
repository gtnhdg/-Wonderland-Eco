import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Trophy, Leaf } from 'lucide-react';

interface PettingAnimal {
  id: string;
  name: string;
  avatar: string;
  favoriteFood: string;
  normalDescription: string;
  happyDescription: string;
  lovePoints: number;
}

const PETTING_ANIMALS: PettingAnimal[] = [
  {
    id: 'bunny',
    name: '荷兰垂耳兔 · 豆包',
    avatar: '🐰',
    favoriteFood: '胡萝卜丁',
    normalDescription: '豆包缩在北欧草坪小屋旁边，正用三瓣嘴好奇地嗅着，耸动着粉嫩的鼻头，等待有人抱一抱它。',
    happyDescription: '豆包超级兴奋！嘴唇不停开合，前爪欢快拍地，在草地上做出一个180度螺旋飞天空中旋转！',
    lovePoints: 0
  },
  {
    id: 'deer',
    name: '梅花幼鹿 · 花花',
    avatar: '🦌',
    favoriteFood: '鲜枫树叶',
    normalDescription: '花花怯怯地躲在木栅栏旁，睫毛长长的眼睛湿漉漉地望着您，在微风中轻摇着娇嫩的小耳朵。',
    happyDescription: '花花十分满足！它亲密温柔地舔舐着您的指尖，轻蹭着额头，并在您的周围愉快地哒哒踱脚。',
    lovePoints: 0
  }
];

const FOODS = [
  { id: 'carrot', name: '儿童胡萝卜丁', icon: '🥕', points: 25, fits: ['bunny'] },
  { id: 'leaves', name: '无菌鲜枫叶', icon: '🍁', points: 25, fits: ['deer'] },
  { id: 'hay', name: '提摩西牧草捆', icon: '🌾', points: 15, fits: ['bunny', 'deer'] }
];

export default function PettingSimulation() {
  const [selectedAnimal, setSelectedAnimal] = useState<PettingAnimal>(PETTING_ANIMALS[0]);
  const [loveLevels, setLoveLevels] = useState<Record<string, number>>({
    bunny: 20,
    deer: 15
  });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; text: string }[]>([]);
  const [activeMessage, setActiveMessage] = useState<string>('');
  const [isFeeding, setIsFeeding] = useState(false);

  // Play a simple retro Web Audio eating synth sound
  const playFeedSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Plink munching sounds
      const playTone = (time: number, freq: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.value = freq;
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        
        osc.start(time);
        osc.stop(time + duration);
      };

      const now = ctx.currentTime;
      playTone(now, 523.25, 0.08); // C5
      playTone(now + 0.1, 659.25, 0.08); // E5
      playTone(now + 0.2, 783.99, 0.15); // G5
    } catch (e) {
      // Ignored if browser security forbids
    }
  };

  const handleFeed = (foodId: string, foodName: string, icon: string, points: number, fits: string[]) => {
    if (isFeeding) return;
    setIsFeeding(true);
    playFeedSound();

    const currentLove = loveLevels[selectedAnimal.id] || 0;
    const isFavorite = fits.includes(selectedAnimal.id);
    const addedPoints = isFavorite ? points + 10 : points;
    const newLove = Math.min(100, currentLove + addedPoints);

    setLoveLevels((prev) => ({
      ...prev,
      [selectedAnimal.id]: newLove
    }));

    // Trigger sweet floaty particles
    const textOptions = isFavorite 
      ? [`${icon} 好吃！`, '❤️ 喜欢你！', '✨ 幸福感 +1', '咀嚼咀嚼!'] 
      : [`${icon} 嚼嚼`, '💛 谢谢你', '开心!'];
    
    const newParticles = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40, // percentage x inside the screen
      y: 30 + Math.random() * 30, // percentage y
      text: textOptions[Math.floor(Math.random() * textOptions.length)]
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    if (isFavorite) {
      setActiveMessage(`【超级投喂】你给 ${selectedAnimal.name.split(' · ')[0]} 喂了最爱的${foodName}！好感度大幅飙升！`);
    } else {
      setActiveMessage(`你给 ${selectedAnimal.name.split(' · ')[0]} 喂了一些${foodName}，它正砸开小嘴享用呢。`);
    }

    // Clean up particles
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      setIsFeeding(false);
    }, 1200);
  };

  const resetLove = () => {
    setLoveLevels((prev) => ({
      ...prev,
      [selectedAnimal.id]: 20
    }));
    setActiveMessage('好感度已小心重置，让我们再次开始喂食吧！');
  };

  const currentLove = loveLevels[selectedAnimal.id];
  const isCrowned = currentLove >= 100;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-6 md:p-8 border border-amber-100 shadow-xl relative overflow-hidden">
      {/* Dynamic Floating Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.6, y: 100 }}
            animate={{ opacity: 1, scale: 1.1, y: -80 - Math.random() * 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ left: `${p.x}%` }}
            className="absolute bottom-40 text-sm font-bold text-rose-600 bg-white/90 backdrop-blur-[2px] px-2.5 py-1 rounded-full shadow-md border border-rose-100 flex items-center gap-1 z-20 pointer-events-none"
          >
            <span>{p.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-amber-100 pb-5">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
            Interactive Zone 互动乐园
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-amber-900 mt-2 font-sans">
            7/12 萌宠小牧场 · 虚拟爱心饲喂舱
          </h3>
          <p className="text-amber-800/70 text-xs mt-1">
            选择小萌宠居民，备妥适合它的安全无毒草料，推动食物投进围栏，守护人与生灵的清纯友谊！
          </p>
        </div>

        {/* Animals Selector */}
        <div className="flex gap-2">
          {PETTING_ANIMALS.map((ani) => {
            const isSelected = selectedAnimal.id === ani.id;
            const aniLove = loveLevels[ani.id] || 0;
            return (
              <button
                key={ani.id}
                onClick={() => setSelectedAnimal(ani)}
                className={`px-4 py-2 rounded-2xl flex items-center gap-2 border text-sm font-semibold transition-all outline-none ${
                  isSelected
                    ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                    : 'bg-white border-amber-200/60 hover:border-amber-400 text-amber-900 shadow-sm'
                }`}
              >
                <span className="text-lg">{ani.avatar}</span>
                <span>{ani.name.split(' · ')[0]}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-amber-500/30 text-amber-100' : 'bg-amber-100 text-amber-800'
                }`}>
                  {aniLove}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Render Animal Status Card */}
        <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm relative flex flex-col items-center min-h-[300px] justify-between">
          
          {/* Badge corner */}
          {isCrowned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 bg-yellow-400 text-amber-950 p-2 rounded-full shadow-lg border border-yellow-300 z-15 cursor-default flex items-center justify-center gap-1 font-mono text-xs font-bold"
              title="荣获：守护大使纪念章"
            >
              <Trophy size={14} className="text-amber-950" />
              <span>守护章</span>
            </motion.div>
          )}

          {/* Large Animal Icon & Avatar Animation wrapper */}
          <div className="my-4 text-center">
            <motion.div
              key={selectedAnimal.id + isFeeding}
              animate={isFeeding ? { scale: [1, 1.15, 0.95, 1], rotate: [0, -5, 5, 0] } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-8xl select-none filter drop-shadow hover:scale-105 transition-transform duration-300 inline-block cursor-pointer"
            >
              {selectedAnimal.avatar}
            </motion.div>
            <h4 className="text-lg font-bold text-amber-900 mt-4">{selectedAnimal.name}</h4>
            <p className="text-[11px] text-amber-700/60 font-mono mt-0.5 font-bold">FAVORITE: 【{selectedAnimal.favoriteFood}】</p>
          </div>

          {/* Love bar */}
          <div className="w-full">
            <div className="flex justify-between items-center text-xs font-semibold text-amber-800 mb-1.5">
              <span className="flex items-center gap-1 font-sans">
                <Heart size={14} className="text-rose-500 fill-rose-500" />
                <span>爱心好感度 Trust Level:</span>
              </span>
              <span className="font-mono">{currentLove}% / 100%</span>
            </div>
            <div className="w-full h-3.5 bg-amber-100 rounded-full overflow-hidden border border-amber-200/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentLove}%` }}
                className="h-full bg-gradient-to-r from-rose-400 via-rose-500 to-orange-500"
              />
            </div>
          </div>

          {/* Cute reactive paragraph */}
          <div className="mt-4 bg-amber-50/40 border border-amber-100/50 p-3.5 rounded-xl w-full text-center text-xs text-amber-900">
            {currentLove >= 80 ? (
              <span className="font-semibold text-rose-700">
                ⭐ {selectedAnimal.happyDescription}
              </span>
            ) : (
              <span className="text-amber-800/80">
                {selectedAnimal.normalDescription}
              </span>
            )}
          </div>
        </div>

        {/* Feeding Console & Interactive Buttons */}
        <div className="flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <div className="text-xs font-semibold text-amber-800/70 uppercase font-mono mb-3">
              1. 选择今日膳食粮草 Feed Selection:
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {FOODS.map((food) => {
                const isPrefId = food.fits.includes(selectedAnimal.id);
                return (
                  <button
                    key={food.id}
                    disabled={isCrowned || isFeeding}
                    onClick={() => handleFeed(food.id, food.name, food.icon, food.points, food.fits)}
                    className={`p-3.5 rounded-2xl border text-left flex justify-between items-center transition-all outline-none ${
                      isCrowned
                        ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                        : isFeeding
                        ? 'opacity-80 scale-95'
                        : 'bg-white border-amber-100/80 hover:border-amber-400 hover:shadow-md cursor-pointer active:scale-98'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl bg-amber-50 p-1.5 rounded-xl border border-amber-100">{food.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-amber-900">{food.name}</div>
                        <div className="text-[11px] text-amber-600 font-mono mt-0.5">
                          {isPrefId ? '🔥 极品最爱食品' : '🌾 通用生态野草'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-xl">
                      <span>+{isPrefId ? food.points + 10 : food.points} 好感</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-amber-100 mt-4">
            {isCrowned ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col items-center text-center">
                <Sparkles className="text-emerald-500 mb-1.5 animate-spin" size={18} />
                <div className="text-xs font-bold text-emerald-950">🎉 恭喜！你已与该萌宠建立至上友谊！</div>
                <p className="text-[10px] text-emerald-800 mt-1 max-w-sm">
                  解锁科普守护语：在现实生活中，野兔和幼鹿的触觉极其敏感。保护大森林，不乱扔白色塑料，即是对生灵最好的保护！
                </p>
                <button
                  onClick={resetLove}
                  className="mt-3 text-[10px] font-semibold text-amber-600 hover:underline cursor-pointer outline-none"
                >
                  [ 重新开始培养友好度 ]
                </button>
              </div>
            ) : (
              <div className="text-[11px] text-amber-800/80 leading-relaxed italic bg-amber-50/50 p-3 rounded-xl border border-amber-100/40 flex items-start gap-1.5">
                <Leaf size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {activeMessage || '提示：点击上方按钮投送草料，将能量喂给小动物，当爱心条积满 100% 后可赢取由动物园颁发的“守护大使爱心章”哦！'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
