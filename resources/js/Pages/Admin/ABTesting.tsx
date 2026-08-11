import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { FlaskConical, ArrowLeft, CheckCircle2, TrendingUp } from 'lucide-react';

interface ABTestingProps {
  experiments: Array<{
    id: string;
    name: string;
    status: string;
    variant_a: { name: string; visits: number; conversions: number; rate: number };
    variant_b: { name: string; visits: number; conversions: number; rate: number };
    winner?: string;
  }>;
}

export default function ABTesting({ experiments }: ABTestingProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <Head title="PBM A/B Testing Labs" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-purple-400" />
            PBM A/B Testing Labs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            CRO Experimentation Dashboard for testing Headlines, Copy, CTAs & Color variants.
          </p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Main Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {experiments.map((exp) => (
          <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">{exp.name}</h2>
                <span className="text-xs font-mono text-slate-500">ID: {exp.id}</span>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {exp.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variant A */}
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-5">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Variant A (Control)</h3>
                <p className="text-base font-semibold text-white mb-4">{exp.variant_a.name}</p>
                <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-800 pt-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Visits</span>
                    <span className="text-lg font-bold text-slate-200">{exp.variant_a.visits}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Conversions</span>
                    <span className="text-lg font-bold text-slate-200">{exp.variant_a.conversions}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Conv. Rate</span>
                    <span className="text-lg font-bold text-blue-400">{exp.variant_a.rate}%</span>
                  </div>
                </div>
              </div>

              {/* Variant B */}
              <div className="bg-slate-950 border border-purple-900/50 rounded-lg p-5 relative">
                {exp.winner && (
                  <div className="absolute -top-3 right-4 bg-purple-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Winner
                  </div>
                )}
                <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-2">Variant B (Challenger)</h3>
                <p className="text-base font-semibold text-white mb-4">{exp.variant_b.name}</p>
                <div className="grid grid-cols-3 gap-3 text-center border-t border-slate-800 pt-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Visits</span>
                    <span className="text-lg font-bold text-slate-200">{exp.variant_b.visits}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Conversions</span>
                    <span className="text-lg font-bold text-slate-200">{exp.variant_b.conversions}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Conv. Rate</span>
                    <span className="text-lg font-bold text-emerald-400">{exp.variant_b.rate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
