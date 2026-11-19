import React from 'react';
import { QrCode, Smartphone, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FARMER_TEXT } from '../data/mockBatches';

export default function Features({ lang = 'hi' }) {
  const t = FARMER_TEXT[lang];

  const steps = [
    {
      num: '1',
      icon: QrCode,
      color: '#10B981',
      title: t.step1Title,
      desc: t.step1Desc
    },
    {
      num: '2',
      icon: Smartphone,
      color: '#FF6A1A',
      title: t.step2Title,
      desc: t.step2Desc
    },
    {
      num: '3',
      icon: ShieldCheck,
      color: '#38BDF8',
      title: t.step3Title,
      desc: t.step3Desc
    }
  ];

  const channels = [
    {
      title: t.channel1Title,
      desc: t.channel1Desc,
      icon: '📱'
    },
    {
      title: t.channel2Title,
      desc: t.channel2Desc,
      icon: '📟'
    },
    {
      title: t.channel3Title,
      desc: t.channel3Desc,
      icon: '🏪'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* 3 Simple Steps Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-2">
          {t.stepsTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md">
          {lang === 'hi'
            ? 'नकली खाद से बचने और सरकारी सब्सिडी पाने के 3 सबसे आसान नियम:'
            : 'Three simple rules to avoid fake fertilizer and claim your official DBT subsidy:'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#10B981]/40 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-xl font-bold font-mono"
                style={{
                  backgroundColor: `${st.color}20`,
                  color: st.color,
                  border: `1px solid ${st.color}40`
                }}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-2">
                {st.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-light">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3 Channels without Internet */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-black/40">
        <h3 className="font-display font-bold text-lg sm:text-xl text-white text-center mb-6">
          {t.channelsTitle}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {channels.map((ch, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl mb-2">{ch.icon}</div>
              <h4 className="font-bold text-sm text-white mb-1">{ch.title}</h4>
              <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">{ch.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
