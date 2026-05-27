import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, MapPin, Phone, HelpCircle, HeartHandshake } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'ticket', // ticket, school, volunteer, emergency
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const renderInquiryLabel = (type: string) => {
    switch (type) {
      case 'ticket': return '普通票务 & 散客预订咨询';
      case 'school': return '科普研学 & 团队研学预约';
      case 'volunteer': return '生态保育志愿者申请登记';
      case 'emergency': return '园区事务咨询与投诉反馈';
      default: return '普通事务反馈';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingNumber('ECO-ZOO-' + Math.floor(100000 + Math.random() * 900000));
    setIsSubmitted(true);

    // Mini sound synthesis
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(659, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (err) {}
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'ticket',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-xl relative overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Contact Info Details card */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Contact Us 联络咨询处
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-2 font-sans">
              12/12 联络中心与紧急呼救台
            </h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              需要定制团体科普研学？对园区生态建设有卓越建议？由于突发事件需要一键上报园区总控室？在此登记，我们可在 15 分钟内为您快速答复。
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700">园区现场接待中心</div>
                <div className="text-[11px] text-slate-500 mt-0.5">生态奇境森林公园A座1楼中控大客厅</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700">客服咨询与应急电话 (24H)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">400-820-2026 (普通服务) / 021-39201990 (园区总值班)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700">官方生态科学联通邮箱</div>
                <div className="text-[11px] text-slate-500 mt-0.5">conservation@ecoforest-wonder.org</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/60 text-[11px] text-slate-500 leading-relaxed font-mono">
            <strong>// 营业时间 Operating hours:</strong>
            <div className="mt-1">日常春夏季: 08:30 - 17:30 (16:30 停止入园)</div>
            <div>夜间奇妙营: 18:30 - 21:30 (特定周五、六开放)</div>
          </div>
        </div>

        {/* Right column: Form body or success overlay */}
        <div className="lg:col-span-7 bg-slate-50/70 p-6 rounded-2xl border border-slate-100 relative min-h-[380px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form-contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      您的姓名 * Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="游客、研学领队、教授等"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      电子邮箱 * Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="用于接收预订/研学回执"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      联络电话 * Phone number
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="应急事务联络首选格式"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      需求类型 * Type of Inquiry
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-930 focus:outline-none focus:border-emerald-500 bg-white"
                    >
                      <option value="ticket">普通门票及亲子班车预约</option>
                      <option value="school">学校/研学团队大团预约 (科普工坊)</option>
                      <option value="volunteer">野生动物保育志愿者名额申请</option>
                      <option value="emergency">失物招领 / 寻人求助 / 突发状况</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    详细内容说明 * Message Detail
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="描述您的具体游园日期、期望人数，或求助具体详情（例如失物特征、突发状况时间等）..."
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-500 bg-white resize-none"
                  />
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all outline-none cursor-pointer active:scale-97"
                  >
                    <Send size={14} />
                    <span>提交咨询申请 Send Form</span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 flex flex-col items-center justify-center space-y-5"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                  <CheckCircle size={36} className="animate-bounce" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-950">申请受理提交成功！</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    系统已为您建立专案追踪号，该回执复本已同时下发至您的私人邮箱《{formData.email}》，请注意阅览。
                  </p>
                </div>

                {/* Simulated receipt ticket */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 text-left text-[11px] text-slate-600 max-w-sm w-full font-mono space-y-1 my-3 shadow-inner relative overflow-hidden">
                  
                  {/* Visual cut out notch on coupon edge */}
                  <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-slate-50 border-r border-slate-200 -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-slate-50 border-l border-slate-200 -translate-y-1/2" />
                  
                  <div className="font-bold border-b border-dashed border-slate-100 pb-1.5 flex justify-between items-center text-slate-900">
                    <span>RECEIPT FOR RESERVATION</span>
                    <span className="text-amber-600">VIP</span>
                  </div>
                  <div className="pt-1.5"><span className="text-slate-400">流水追踪号 ID:</span> <span className="text-slate-800 font-bold">{trackingNumber}</span></div>
                  <div><span className="text-slate-400">联络人 Name:</span> <span className="text-slate-800 font-bold">{formData.name}</span></div>
                  <div><span className="text-slate-400">承载电话 Phone:</span> <span className="text-slate-800">{formData.phone}</span></div>
                  <div><span className="text-slate-400">业务类型 Code:</span> <span className="text-slate-800">{renderInquiryLabel(formData.inquiryType)}</span></div>
                  <div className="pt-1 text-[10px] text-slate-400 border-t border-slate-100/60 mt-2 block overflow-hidden truncate">
                    内容: "{formData.message}"
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-slate-600 font-semibold text-xs active:scale-97 outline-none transition-all cursor-pointer"
                  >
                    返回重写 Form
                  </button>
                  <button
                    onClick={() => {
                      alert(`已复制您的流水号：${trackingNumber}`);
                    }}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-white rounded-xl font-semibold text-xs active:scale-97 outline-none transition-all cursor-pointer flex items-center gap-1"
                  >
                    <HeartHandshake size={12} />
                    <span>记下我的流水号</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
