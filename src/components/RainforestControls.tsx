import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Thermometer, Droplet, CloudRain, Sun, Leaf, Info } from 'lucide-react';

export default function RainforestControls() {
  const [humidity, setHumidity] = useState<number>(75); // 0 to 100%
  const [temperature, setTemperature] = useState<number>(28); // 15 to 40°C
  const [mistRate, setMistRate] = useState<number>(50); // 0 to 100%

  // Get reactive behavior description based on humidity and temp
  const getPythonBehavior = () => {
    if (humidity > 85 && temperature > 26) {
      return '🐍【极为活跃】：翡翠树蟒惬意地舒展着长长的、如绿玉般的身体，将倒三角的小脑瓜稳稳伸到热带椰干树皮外面，大口舔食温润的水雾和雨露！';
    }
    if (humidity < 50) {
      return '🐍【昏睡藏匿】：环境显得过去干燥，翡翠树蟒蜷缩成密不透风的完美甜甜圈，将三角头部完全塞进粗壮古树的幽深暗绿褶皱深处防风脱水。';
    }
    return '🐍【平静反刍】：翡翠树蟒慢腾腾地以典型的“马鞍两面垂挂”姿势慵懒地盘卧在潮湿的大横向榕树杈上，静静看底下水坑。';
  };

  const getIguanaBehavior = () => {
    if (temperature > 32) {
      return '🦎【变幻亮绿】：绿鬣蜥兴奋得通体散发出亮绿至金黄的骄傲保护色，顺着湿润的暖石柱迅速往高处攀缘，张开脖颈折扇贪恋地迎着模拟紫外线。';
    }
    if (temperature < 20) {
      return '🦎【灰褐蛰伏】：环境气温较低，绿鬣蜥体色转换至暗沉的松鼠灰褐色，趴在仅存的导流加温暖石上一动不动，以此减弱新陈代谢保持热量。';
    }
    return '🦎【优雅吃花】：美洲绿鬣蜥迈着笨拙却平稳的小短腿，用厚厚大嘴巴采食矮灌藤条上的火红朱槿百合花瓣，安逸而和顺。';
  };

  const applyRainfallShower = () => {
    setHumidity(95);
    setMistRate(90);
    setTemperature(26);
    // Play retro drop synthesizer if needed
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }
    } catch (e) {}
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-xl relative overflow-hidden">
      
      {/* Decorative leafy badge background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-emerald-100 pb-5">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200">
            CLIMATE DASHBOARD 室内气调舱
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-emerald-900 mt-2 font-sans">
            8/12 热带雨林馆 · 生态温湿气调中控台
          </h3>
          <p className="text-emerald-800/70 text-xs mt-1">
            热带雨林中绿鳞树蟒与绿鬣蜥等变温动物的日常活性与其恒温箱的湿度和温度息息相关。拖动滑条，亲眼见证它们的生理活性与色泽变奏！
          </p>
        </div>

        <button
          onClick={applyRainfallShower}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md cursor-pointer active:scale-97 transition-all outline-none"
        >
          <CloudRain size={13} />
          <span>模拟一次人工暴雨喷洒</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm space-y-5">
          <div className="text-xs font-semibold text-emerald-800 uppercase font-mono tracking-wide border-b border-emerald-50/80 pb-2">
            温湿度调整滑块 Controls
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs text-emerald-900 font-semibold font-sans">
              <span className="flex items-center gap-1">
                <Thermometer size={14} className="text-red-500" />
                <span>恒温舱温度:</span>
              </span>
              <span className="font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded-md border border-red-100">{temperature} °C</span>
            </div>
            <input
              type="range"
              min="15"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full h-1.5 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>15°C 寒冷</span>
              <span>28°C 适中</span>
              <span>40°C 炽热</span>
            </div>
          </div>

          <div className="space-y-1.5 mt-4">
            <div className="flex justify-between items-center text-xs text-emerald-900 font-semibold font-sans">
              <span className="flex items-center gap-1">
                <Droplet size={14} className="text-blue-500" />
                <span>相对环境湿度:</span>
              </span>
              <span className="font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">{humidity} %</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={humidity}
              onChange={(e) => setHumidity(parseInt(e.target.value))}
              className="w-full h-1.5 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20% 极干</span>
              <span>75% 恒温润</span>
              <span>100% 连绵暴雨</span>
            </div>
          </div>

          <div className="space-y-1.5 mt-4">
            <div className="flex justify-between items-center text-xs text-emerald-900 font-semibold font-sans">
              <span className="flex items-center gap-1">
                <Sun size={14} className="text-amber-500" />
                <span>人工冷雾弥散率:</span>
              </span>
              <span className="font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100">{mistRate} %</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={mistRate}
              onChange={(e) => setMistRate(parseInt(e.target.value))}
              className="w-full h-1.5 bg-emerald-50 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Reactive descriptions Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white/80 border border-emerald-100/50 p-4 rounded-xl shadow-sm relative overflow-hidden backdrop-blur-sm min-h-[90px] flex items-center">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                🌿
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {getPythonBehavior()}
              </p>
            </div>
          </div>

          <div className="bg-white/80 border border-emerald-100/50 p-4 rounded-xl shadow-sm relative overflow-hidden backdrop-blur-sm min-h-[90px] flex items-center">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                🦎
              </div>
              <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
                {getIguanaBehavior()}
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/95 border border-emerald-800 text-emerald-300 p-4 rounded-xl flex items-start gap-2 relative">
            <Info size={14} className="text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-white block font-sans mb-0.5">温控科室小贴士</strong>
              亚马逊雨林动物新陈代谢极弱、属于变温体质，不靠吃肉产生高量内热。在维持恒温箱时，高温能够极大地加速它们的消化，让它们免于出现胀气或胀食死亡。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
