'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { predictColleges, PredictionResult } from '@/lib/api';
import { Sparkles, MapPin, Star, GraduationCap, IndianRupee, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function PredictorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [exam, setExam] = useState(searchParams.get('exam') || 'JEE Main');
  const [rankInput, setRankInput] = useState(searchParams.get('rank') || '');
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPredictions = async (selectedExam: string, rankNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await predictColleges(selectedExam, rankNum);
      setResults(res.data);
      setHasSearched(true);
    } catch (err: any) {
      setError(err.message || 'Failed to predict colleges');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rankParam = searchParams.get('rank');
    const examParam = searchParams.get('exam');
    if (rankParam && examParam) {
      const rankNum = parseInt(rankParam, 10);
      if (!isNaN(rankNum) && rankNum > 0) {
        setExam(examParam);
        setRankInput(rankParam);
        fetchPredictions(examParam, rankNum);
      }
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rankNum = parseInt(rankInput, 10);
    if (isNaN(rankNum) || rankNum <= 0) {
      setError('Please enter a valid positive rank');
      return;
    }

    const params = new URLSearchParams();
    params.set('exam', exam);
    params.set('rank', String(rankNum));
    router.push(`/predictor?${params.toString()}`);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
          College Predictor Tool <Sparkles className="w-8 h-8 text-indigo-400" />
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Enter your exam and rank to find engineering, management, and post-graduate programs you qualify for.
        </p>
      </div>

      {/* Input Form */}
      <div className="max-w-xl mx-auto backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-3xl p-8 shadow-2xl relative mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Select Exam</label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
              >
                <option value="JEE Main" className="bg-[#0b0b1e] text-white">JEE Main (B.Tech)</option>
                <option value="GATE" className="bg-[#0b0b1e] text-white">GATE (M.Tech)</option>
                <option value="CAT" className="bg-[#0b0b1e] text-white">CAT (MBA Percentile/Rank)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Enter Rank / Score</label>
              <input
                type="number"
                value={rankInput}
                onChange={(e) => setRankInput(e.target.value)}
                placeholder="e.g. 5000"
                min="1"
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            {loading ? 'Analyzing data...' : 'Predict Colleges'}
          </button>
        </form>
      </div>

      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center mb-8">
          {error}
        </div>
      )}

      {/* Results Section */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-white/[0.02] border border-white/[0.08] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white mb-2">We found {results.length} matched courses you qualify for:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <div
                key={item.courseId}
                className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:border-white/[0.15] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      item.college.type === 'GOVERNMENT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : item.college.type === 'PRIVATE' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}>
                      {item.college.type}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="text-xs font-semibold">{item.college.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="text-md font-bold text-white mb-1 line-clamp-1">{item.college.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-4">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span>{item.college.location}</span>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl mb-4">
                    <div className="text-sm font-semibold text-indigo-300 flex items-center gap-1.5 mb-1.5">
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                      {item.courseName}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                      <div>Closing Cutoff: <span className="font-semibold text-white">{item.cutoff.toLocaleString()}</span></div>
                      <div>Seats Available: <span className="font-semibold text-white">{item.seats}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-white">{formatCurrency(item.fees)}</span>
                    <span className="text-[10px] text-slate-500">/yr</span>
                  </div>

                  <Link
                    href={`/colleges/${item.college.id}`}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-3xl max-w-xl mx-auto">
          <GraduationCap className="w-10 h-10 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No colleges predicted</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Admissions for this rank might be highly competitive. Try entering a lower rank or selecting a different exam.
          </p>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-3xl max-w-xl mx-auto">
          <GraduationCap className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">Ready for prediction</h3>
          <p className="text-slate-400 text-sm">
            Enter your rank above to check eligibility for different college courses.
          </p>
        </div>
      )}
    </div>
  );
}

export default function PredictorPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading prediction tool...</div>}>
      <PredictorContent />
    </Suspense>
  );
}
