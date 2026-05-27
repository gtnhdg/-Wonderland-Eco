import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRIVIA_QUESTIONS } from '../data';
import { Award, CheckCircle, XCircle, RefreshCw, BookOpen, Compass } from 'lucide-react';

export default function ScienceTrivia() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [reviewList, setReviewList] = useState<{ qIdx: number; userAns: number; correct: boolean }[]>([]);

  const handleOptionClick = (optionIdx: number) => {
    if (isLocked) return;
    setSelectedAns(optionIdx);
    setIsLocked(true);

    const isCorrect = optionIdx === TRIVIA_QUESTIONS[currentIdx].correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setReviewList((prev) => [
      ...prev,
      { qIdx: currentIdx, userAns: optionIdx, correct: isCorrect }
    ]);

    // Play retro beep sound in sandbox safely
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(isCorrect ? 880 : 330, ctx.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {}
  };

  const handleNext = () => {
    if (currentIdx < TRIVIA_QUESTIONS.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAns(null);
      setIsLocked(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAns(null);
    setIsLocked(false);
    setScore(0);
    setQuizFinished(false);
    setReviewList([]);
  };

  const q = TRIVIA_QUESTIONS[currentIdx];
  const isCorrectChoice = selectedAns === q.correctIndex;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-8 border border-blue-100 shadow-xl relative overflow-hidden">
      
      {/* Decorative top header bg ornament */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-blue-100 pb-5">
        <div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
            KNOWLEDGE BASE 科普求知馆
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-blue-900 mt-2 font-sans">
            11/12 生命科普厅 · 保护科学闯关答题
          </h3>
          <p className="text-blue-800/70 text-xs mt-1">
            测一测您的生态学与动物进化智慧！答完四道原创硬核动物题，赢取由官方认证的环保小使者荣誉称号勋章！
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/80 border border-blue-100 px-3 py-1.5 rounded-xl shadow-sm">
          <Compass size={14} className="text-blue-500 animate-spin" />
          <span className="text-xs font-semibold text-blue-900 font-mono">
            答题进度: {!quizFinished ? `${currentIdx + 1} / ${TRIVIA_QUESTIONS.length}` : '已完成'}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Text Bubble */}
            <div className="bg-white rounded-2xl p-5 border border-blue-100/80 shadow-sm mb-6">
              <span className="text-xs text-blue-500 font-bold font-mono tracking-wider uppercase block mb-1">
                QUESTION #{currentIdx + 1}
              </span>
              <p className="text-base font-bold text-blue-950 leading-relaxed font-sans">
                {q.question}
              </p>
            </div>

            {/* Options layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {q.options.map((option, idx) => {
                const isSelected = selectedAns === idx;
                const isAnswerKey = idx === q.correctIndex;
                let optionStyle = 'bg-white border-blue-50 hover:border-blue-400 text-blue-950 hover:shadow-md';

                if (isLocked) {
                  if (isAnswerKey) {
                    optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold';
                  } else if (isSelected && !isAnswerKey) {
                    optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                  } else {
                    optionStyle = 'bg-slate-50/60 border-slate-100 text-slate-400 cursor-not-allowed';
                  }
                }

                return (
                  <button
                    key={`opt-${idx}`}
                    disabled={isLocked}
                    onClick={() => handleOptionClick(idx)}
                    className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 outline-none duration-250 ${optionStyle} ${
                      !isLocked && 'active:scale-98 cursor-pointer'
                    }`}
                  >
                    <span className="font-mono font-bold text-blue-500 shrink-0 select-none bg-blue-50/80 p-1 w-5 h-5 flex items-center justify-center rounded-md">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer feedback panel with explanation */}
            <AnimatePresence>
              {isLocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm mb-6"
                >
                  <div className="flex items-start gap-3">
                    {isCorrectChoice ? (
                      <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    ) : (
                      <XCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                    )}
                    <div>
                      <div className={`text-sm font-bold ${isCorrectChoice ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {isCorrectChoice ? '🎉 恭喜你答对啦！太棒了！' : '🥺 遗憾选错，再多思考。'}
                      </div>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end">
              <button
                disabled={!isLocked}
                onClick={handleNext}
                className={`flex items-center gap-1 px-6 py-3 rounded-xl text-sm font-bold transition-all outline-none ${
                  isLocked
                    ? 'bg-blue-600 text-white hover:bg-blue-500 active:scale-97 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentIdx === TRIVIA_QUESTIONS.length - 1 ? '提交查看证书' : '下一题'}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-8"
          >
            {/* The Badge/Cert design */}
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center p-2 relative animate-pulse">
                <div className="w-20 h-20 rounded-full bg-yellow-400 text-amber-970 flex items-center justify-center p-3 shadow-xl">
                  <Award size={48} className="text-amber-950 stroke-[1.5]" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border border-white">
                <CheckCircle size={14} />
              </span>
            </div>

            <h4 className="text-2xl font-black text-blue-900 font-sans tracking-tight">
              生命保护科学 · 荣誉结业证书
            </h4>
            <div className="text-xs font-mono text-blue-600 uppercase tracking-widest mt-1">
              ECO-Ranger Academic Accreditation
            </div>

            <div className="max-w-md bg-white rounded-2xl p-5 border border-blue-100 my-6 shadow-sm">
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-sans">
                恭喜您！顺利闯过所有精巧设计的硬核生物科普关卡，共计答对了 <strong className="text-blue-600 text-base">{score}</strong> 道题！
              </p>
              <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-around text-slate-500 font-mono text-[10px] w-full">
                <div>
                  <div className="font-bold text-slate-700">证书颁发端</div>
                  <div>生态奇境科普厅</div>
                </div>
                <div>
                  <div className="font-bold text-slate-700">学成日期</div>
                  <div>2026年5月</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-white border border-blue-200 hover:border-blue-400 text-blue-900 active:scale-97 outline-none transition-all cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>再玩一次 Reset</span>
              </button>
              <a
                href="#entrance"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 active:scale-97 outline-none transition-all cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  // simple callback top
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <BookOpen size={13} />
                <span>返回顶部浏览</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
