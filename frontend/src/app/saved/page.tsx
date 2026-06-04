'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getSavedColleges, College } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import { CardSkeleton } from '@/components/LoadingSkeleton';
import Link from 'next/link';
import { Heart, Search, LogIn } from 'lucide-react';

export default function SavedPage() {
  const { user, loading: authLoading } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSaved = async () => {
    setLoading(true);
    try {
      const res = await getSavedColleges();
      setColleges(res.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch saved colleges');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSaved();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (authLoading || (loading && user)) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-10 w-48 bg-white/[0.05] rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-6">
          <LogIn className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3">Sign in to view saved items</h1>
        <p className="text-slate-400 max-w-md mb-8">
          Save your favorite colleges to keep track of fees, ratings, reviews, and compare them side-by-side.
        </p>
        <Link
          href="/auth/login"
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            Saved Colleges <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
          </h1>
          <p className="text-slate-400 mt-1">Keep track of your shortlisted educational institutions</p>
        </div>
        {colleges.length > 0 && (
          <Link
            href="/compare"
            className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white font-medium rounded-xl text-sm transition-all"
          >
            Compare Saved
          </Link>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center mb-8">
          {error}
        </div>
      )}

      {colleges.length === 0 ? (
        <div className="border border-dashed border-white/[0.08] rounded-3xl p-16 flex flex-col items-center justify-center text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.08] rounded-2xl flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No saved colleges</h3>
          <p className="text-slate-400 text-sm mb-6">
            Search and explore colleges from our platform and save them to view them here.
          </p>
          <Link
            href="/"
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all"
          >
            Explore Colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college, idx) => (
            <CollegeCard
              key={college.id}
              college={college}
              index={idx}
              onUnsave={fetchSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
