import React from 'react';

export default function SpecsTable() {
  const specs = [
    { label: 'Computer Vision Architecture', value: 'YOLOv8 Edge Neural Sorter (14.2 ms inference)' },
    { label: 'Caliber Precision', value: 'Equatorial diameter measurement (±0.5 mm precision)' },
    { label: 'Sugar Refractometer Range', value: 'Optical Brix 0° – 32° (APEDA Mango Grade A+ >18.5°)' },
    { label: 'Cold-Chain SLA Envelope', value: '12.0°C – 13.5°C, 85%–95% Relative Humidity' },
    { label: 'Blockchain Ledger Architecture', value: 'Serverless libSQL Edge Replica (Turso Cloud Mumbai)' },
    { label: 'Cryptographic Signature', value: 'Ed25519 Asymmetric Key Pairs (Offline-first sync)' },
    { label: 'Packaging Serialization', value: 'GS1 Digital Link URI, SSCC-18 Pallet Barcode, GRAI EPC' },
    { label: 'Farmer Direct Payout Premium', value: '+28.5% over conventional APMC floor rate' },
    { label: 'Regulatory Interoperability', value: 'Jaivik Bharat, NPOP Organic, APEDA Export Grade A+' },
  ];

  return (
    <section id="specs" className="w-full bg-[#050505] py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00D6FF] mb-2 block">
            Technical Specifications
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white/95">
            System Specifications
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4"
            >
              <span className="text-sm text-white/50 font-normal">
                {item.label}
              </span>
              <span className="text-sm text-white/90 font-medium sm:text-right font-mono">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
