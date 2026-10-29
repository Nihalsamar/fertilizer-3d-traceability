import React from 'react';

export default function FeatureGrid() {
  const features = [
    {
      title: 'Sub-15ms AI Inspection Camera',
      description:
        'YOLOv8 edge neural vision analyzes caliber mm, brix sugar ratings, and surface defects directly at mandi packhouses.',
      icon: (
        <svg
          className="w-5 h-5 text-[#00D6FF]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6M3 7l4-4h10l4 4"
          />
        </svg>
      ),
    },
    {
      title: 'Autonomous IoT Reefer Cold-Chain',
      description:
        'Continuous 12.8°C climate monitoring across highway corridors with instant smart contract SLA breach quarantine.',
      icon: (
        <svg
          className="w-5 h-5 text-[#0050FF]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v18m0-18l4 4m-4-4L8 7m4 14l4-4m-4 4l-4-4M3 12h18m-18 0l4 4m-4-4l4-4m18 0l-4 4m4-4l-4 4"
          />
        </svg>
      ),
    },
    {
      title: 'Zero-Knowledge Fair-Trade Payout',
      description:
        '+28.5% premium disbursed directly to verified farmer accounts, preserving Aadhaar identity with zero-knowledge proofs.',
      icon: (
        <svg
          className="w-5 h-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="technology" className="w-full bg-[#050505] py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center max-w-xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-2 block">
            Core Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white/95 mb-3">
            Engineered for zero-loss traceability.
          </h2>
          <p className="text-sm sm:text-base text-white/60">
            Three foundational pillars uniting physical agriculture with verifiable cryptographic consensus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-[#0A0A0C] border-t-2 border-[#0050FF] rounded-xl p-8 flex flex-col justify-between hover:border-[#00D6FF] transition-colors duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white/90 mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
