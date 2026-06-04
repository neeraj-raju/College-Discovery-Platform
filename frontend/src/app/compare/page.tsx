'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { compareColleges, searchColleges, College } from '@/lib/api';
import { Search, X, Star, IndianRupee, MapPin, Sparkles, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CompareResult {
  id: string;
  name: string;
  location: string;
  type: string;
  fees: number;
  rating: number;
  totalReviews: number;
  courseCount: number;
  latestPlacement: {
    year: number;
    avgPackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string[];
  } | null;
}

function ComparePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState<CompareResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search autocomplete state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<College[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const idsParam = searchParams.get('ids');

  useEffect(() => {
    if (idsParam) {
      const ids = idsParam.split(',').filter(Boolean);
      if (ids.length >= 2 && ids.length <= 3) {
        fetchComparison(ids);
      } else {
        setError('Comparison requires between 2 and 3 colleges.');
        setColleges([]);
      }
    } else {
      setColleges([]);
    }
  }, [idsParam]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchComparison = async (ids: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await compareColleges(ids);
      setColleges(res.data as unknown as CompareResult[]);
    } catch (err: any) {
      setError(err.message || 'Failed to compare colleges');
    } finally {
      setLoading(false);
    }
  };

  // Autocomplete search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await searchColleges({ search: searchQuery, limit: 5 });
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const updateUrl = (ids: string[]) => {
    if (ids.length === 0) {
      router.push('/compare');
    } else {
      router.push(`/compare?ids=${ids.join(',')}`);
    }
  };

  const addCollegeToCompare = (id: string) => {
    const currentIds = idsParam ? idsParam.split(',').filter(Boolean) : [];
    if (currentIds.includes(id)) {
      setError('College is already in the comparison');
      return;
    }
    if (currentIds.length >= 3) {
      setError('You can compare a maximum of 3 colleges');
      return;
    }
    const nextIds = [...currentIds, id];
    updateUrl(nextIds);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const removeCollege = (id: string) => {
    const currentIds = idsParam ? idsParam.split(',').filter(Boolean) : [];
    const nextIds = currentIds.filter((cid) => cid !== id);
    updateUrl(nextIds);
  };

  // Helper to determine best values (for highlights)
  const getBestValue = (key: 'fees' | 'rating' | 'avgPackage' | 'placementRate') => {
    if (colleges.length < 2) return null;

    let bestId = colleges[0].id;
    let bestVal = getVal(colleges[0], key);

    for (let i = 1; i < colleges.length; i++) {
      const currentVal = getVal(colleges[i], key);
      if (key === 'fees') {
        // Lower fees are better
        if (currentVal < bestVal) {
          bestVal = currentVal;
          bestId = colleges[i].id;
        }
      } else {
        // Higher packages/ratings/rates are better
        if (currentVal > bestVal) {
          bestVal = currentVal;
          bestId = colleges[i].id;
        }
      }
    }
    return bestId;
  };

  const getVal = (c: CompareResult, key: string): number => {
    if (key === 'fees') return c.fees;
    if (key === 'rating') return c.rating;
    if (key === 'avgPackage') return c.latestPlacement?.avgPackage || 0;
    if (key === 'placementRate') return c.latestPlacement?.placementRate || 0;
    return 0;
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const bestFeesId = getBestValue('fees');
  const bestRatingId = getBestValue('rating');
  const bestAvgPackId = getBestValue('avgPackage');
  const bestPlacementRateId = getBestValue('placementRate');

  const currentIds = idsParam ? idsParam.split(',').filter(Boolean) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            Compare Colleges <Sparkles className="w-6 h-6 text-indigo-400" />
          </h1>
          <p className="text-slate-400 mt-1">Make informed decisions by comparing side-by-side</p>
        </div>

        {/* Add College Searchbox */}
        {currentIds.length < 3 && (
          <div ref={dropdownRef} className="relative w-full md:w-80 z-20">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                placeholder="Search college to add..."
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 backdrop-blur-xl bg-[#0b0b1e]/95 border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
                {searchResults.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => addCollegeToCompare(college.id)}
                    className="w-full text-left px-4 py-3 hover:bg-white/[0.04] text-white transition-colors border-b border-white/[0.04] last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-sm line-clamp-1">{college.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-indigo-400" /> {college.location}
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-indigo-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center mb-8">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-96 bg-white/[0.02] border border-white/[0.08] rounded-2xl animate-pulse" />
          <div className="h-96 bg-white/[0.02] border border-white/[0.08] rounded-2xl animate-pulse" />
          <div className="h-96 bg-white/[0.02] border border-white/[0.08] rounded-2xl animate-pulse" />
        </div>
      ) : colleges.length === 0 ? (
        <div className="border border-dashed border-white/[0.08] rounded-3xl p-16 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Start comparing colleges</h3>
          <p className="text-slate-400 text-sm mb-6">
            Search and add 2 to 3 colleges to compare their annual fees, ratings, placement reports, and courses.
          </p>
          <div className="w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 backdrop-blur-xl bg-[#0b0b1e]/95 border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-10 text-left">
                {searchResults.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => addCollegeToCompare(college.id)}
                    className="w-full px-4 py-3 hover:bg-white/[0.04] text-white transition-colors border-b border-white/[0.04] last:border-b-0 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-sm line-clamp-1">{college.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-indigo-400" /> {college.location}
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-indigo-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-white/[0.01] shadow-2xl backdrop-blur-xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="p-6 text-sm font-semibold text-slate-400 w-1/4">Feature</th>
                {colleges.map((college) => (
                  <th key={college.id} className="p-6 w-1/4 relative group">
                    <button
                      onClick={() => removeCollege(college.id)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:bg-rose-500/10 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="text-white font-bold text-lg line-clamp-2 pr-6">{college.name}</div>
                    <div className="text-xs text-indigo-400 font-medium mt-1 uppercase tracking-wider">{college.type}</div>
                  </th>
                ))}
                {/* Empty column if comparing only 2 */}
                {colleges.length === 2 && <th className="p-6 w-1/4 text-center text-slate-500 border-l border-white/[0.04] italic">Slot available</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {/* Location */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Location</td>
                {colleges.map((c) => (
                  <td key={c.id} className="p-6 text-white text-sm">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      {c.location}
                    </div>
                  </td>
                ))}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Annual Fees */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Annual Fees (INR)</td>
                {colleges.map((c) => {
                  const isBest = c.id === bestFeesId;
                  return (
                    <td key={c.id} className={`p-6 text-sm font-semibold transition-all ${isBest ? 'text-emerald-400 bg-emerald-500/[0.02]' : 'text-white'}`}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          {formatCurrency(c.fees)}
                        </span>
                        {isBest && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Lowest Fees</span>}
                      </div>
                    </td>
                  );
                })}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Rating */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Overall Rating</td>
                {colleges.map((c) => {
                  const isBest = c.id === bestRatingId;
                  return (
                    <td key={c.id} className={`p-6 text-sm font-semibold transition-all ${isBest ? 'text-amber-400 bg-amber-500/[0.02]' : 'text-white'}`}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {c.rating.toFixed(1)} / 5.0
                        </span>
                        {isBest && <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Highest Rated</span>}
                      </div>
                    </td>
                  );
                })}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Courses Count */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Course Offerings</td>
                {colleges.map((c) => (
                  <td key={c.id} className="p-6 text-white text-sm">
                    {c.courseCount} Courses available
                  </td>
                ))}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Average Placement Package */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Average Placement Package</td>
                {colleges.map((c) => {
                  const val = c.latestPlacement?.avgPackage;
                  const isBest = c.id === bestAvgPackId;
                  return (
                    <td key={c.id} className={`p-6 text-sm font-semibold transition-all ${isBest ? 'text-emerald-400 bg-emerald-500/[0.02]' : 'text-white'}`}>
                      <div className="flex items-center justify-between">
                        <span>{val ? `${val.toFixed(1)} LPA` : 'N/A'}</span>
                        {isBest && val && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Highest Avg</span>}
                      </div>
                    </td>
                  );
                })}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Highest Placement Package */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Highest Package</td>
                {colleges.map((c) => (
                  <td key={c.id} className="p-6 text-white text-sm font-semibold">
                    {c.latestPlacement?.highestPackage ? `${c.latestPlacement.highestPackage.toFixed(1)} LPA` : 'N/A'}
                  </td>
                ))}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Placement Rate */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Placement Success Rate</td>
                {colleges.map((c) => {
                  const val = c.latestPlacement?.placementRate;
                  const isBest = c.id === bestPlacementRateId;
                  return (
                    <td key={c.id} className={`p-6 text-sm font-semibold transition-all ${isBest ? 'text-emerald-400 bg-emerald-500/[0.02]' : 'text-white'}`}>
                      <div className="flex items-center justify-between">
                        <span>{val ? `${val.toFixed(1)}%` : 'N/A'}</span>
                        {isBest && val && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Best Rate</span>}
                      </div>
                    </td>
                  );
                })}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>

              {/* Top Recruiters */}
              <tr>
                <td className="p-6 text-sm font-medium text-slate-400">Key Recruiters</td>
                {colleges.map((c) => (
                  <td key={c.id} className="p-6 text-sm">
                    <div className="flex flex-wrap gap-1.5 max-w-[240px]">
                      {c.latestPlacement?.topRecruiters.map((r, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-slate-300 text-[11px] font-medium rounded">
                          {r}
                        </span>
                      )) || 'N/A'}
                    </div>
                  </td>
                ))}
                {colleges.length === 2 && <td className="p-6 border-l border-white/[0.04]"></td>}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading comparison tool...</div>}>
      <ComparePageContent />
    </Suspense>
  );
}
