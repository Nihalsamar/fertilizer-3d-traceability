import React, { useEffect, useState } from 'react';
import { Package, TrendingUp, IndianRupee, Award } from 'lucide-react';

const STATS_DATA = [
  {
    icon: Package,
    target: 50000,
    prefix: '',
    suffix: '+ MT',
    label: 'Fertilizer Verified',
    sub: 'Full supply chain custody',
    color: '#FF6A1A'
  },
  {
    icon: TrendingUp,
    target: 128400,
    prefix: '',
    suffix: '+',
    label: 'Unit Bags Traced',
    sub: 'Individual SHA-256 tokens',
    color: '#38BDF8'
  },
  {
    icon: IndianRupee,
    target: 19.2,
    prefix: '₹',
    suffix: ' Cr',
    label: 'DBT Subsidy Released',
    sub: 'Direct Aadhaar bank credit',
    color: '#3DDC84',
    isDecimal: true
  },
  {
    icon: Award,
    target: 99.98,
    prefix: '',
    suffix: '%',
    label: 'Purity Assurance',
    sub: 'CFQCTI certified standard',
    color: '#F59E0B',
    isDecimal: true
  }
];

export default function Stats() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setCounts(
        STATS_DATA.map((item) => {
          if (item.isDecimal) {
            return parseFloat((item.target * ease).toFixed(item.target === 19.2 ? 1 : 2));
          }
          return Math.floor(item.target * ease);
        })
      );

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return (
    <section id="stats" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-b border-white/10 my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((item, idx) => {
          const Icon = item.icon;
          const displayValue = item.isDecimal
            ? counts[idx]
            : counts[idx].toLocaleString('en-IN');

          return (
            <div
              key={item.label}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300"
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: item.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}35`
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  REAL-TIME METRIC
                </span>
              </div>

              <div>
                <div className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-1">
                  {item.prefix}
                  {displayValue}
                  <span className="text-xl sm:text-2xl font-light text-white/80">{item.suffix}</span>
                </div>
                <div className="font-medium text-sm text-white/90 mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-[#A1A1AA] font-light">
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
