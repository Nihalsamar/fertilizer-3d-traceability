import React from 'react';
import { Package, Users, IndianRupee, Award } from 'lucide-react';

export default function Stats({ lang = 'hi' }) {
  const stats = [
    {
      icon: Package,
      value: '50,000+',
      unit: 'MT',
      labelHi: 'सुरक्षित खाद वितरण',
      labelEn: 'Fertilizer Distributed',
      subHi: 'हर बोरी की जांच पूरी',
      subEn: '100% Bag QR Verified',
      color: '#FF6A1A'
    },
    {
      icon: Users,
      value: '1,28,400+',
      unit: '',
      labelHi: 'लाभार्थी किसान भाई',
      labelEn: 'Farmers Benefited',
      subHi: 'नकली खाद से सुरक्षित',
      subEn: 'Protected from Fraud',
      color: '#38BDF8'
    },
    {
      icon: IndianRupee,
      value: '₹19.2 Cr',
      unit: '',
      labelHi: 'सब्सिडी सीधे बैंक में',
      labelEn: 'DBT Directly to Bank',
      subHi: 'बिना किसी बिचौलिए के',
      subEn: 'Zero Middlemen Leakage',
      color: '#10B981'
    },
    {
      icon: Award,
      value: '100%',
      unit: '',
      labelHi: 'शुद्धता की गारंटी',
      labelEn: 'Purity Assurance',
      subHi: 'सरकारी लैब टेस्ट पास',
      subEn: 'Govt CFQCTI Passed',
      color: '#F59E0B'
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-8 max-w-6xl mx-auto border-t border-b border-white/10 my-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 text-center">
              <div
                className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2"
                style={{ backgroundColor: `${st.color}20`, color: st.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {st.value}
              </div>
              <div className="font-bold text-xs sm:text-sm text-white/90 mt-1">
                {lang === 'hi' ? st.labelHi : st.labelEn}
              </div>
              <div className="text-[11px] text-[#A1A1AA] mt-0.5 font-light">
                {lang === 'hi' ? st.subHi : st.subEn}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
