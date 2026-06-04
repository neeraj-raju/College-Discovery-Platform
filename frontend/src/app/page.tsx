'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { searchColleges, College, SearchParams } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import Pagination from '@/components/Pagination';
import { CardGridSkeleton } from '@/components/LoadingSkeleton';

const COLLEGE_TYPES = ['GOVERNMENT', 'PRIVATE', 'DEEMED'] as const;
const SORT_OPTIONS = [
  { value: 'rating', label: 'Rating' },
  { value: 'name', label: 'Name' },
  { value: 'fees', label: 'Fees' },
  { value: 'established', label: 'Established' },
];

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{ total: number; page: number; totalPages: number; hasNext: boolean; hasPrev: boolean } | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter state from URL
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get('type')?.split(',').filter(Boolean) || []);
  const [minFees, setMinFees] = useState(searchParams.get('minFees') || '');
  const [maxFees, setMaxFees] = useState(searchParams.get('maxFees') || '');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    try {
      const params: SearchParams = {
        page,
        limit: 9,
        sortBy,
        sortOrder,
      };
      if (search) params.search = search;
      if (selectedTypes.length) params.type = selectedTypes.join(',');
      if (minFees) params.minFees = Number(minFees);
      if (maxFees) params.maxFees = Number(maxFees);
      if (minRating) params.minRating = Number(minRating);

      const res = await searchColleges(params);
      setColleges(res.data);
      if (res.meta) setMeta(res.meta);
    } catch {
      setColleges([]);
    } finally {
      setLoading(false);
    }
  }, [search, selectedTypes, minFees, maxFees, minRating, sortBy, sortOrder, page]);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (selectedTypes.length) params.set('type', selectedTypes.join(','));
    if (minFees) params.set('minFees', minFees);
    if (maxFees) params.set('maxFees', maxFees);
    if (minRating) params.set('minRating', minRating);
    if (sortBy !== 'rating') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (page > 1) params.set('page', String(page));
    const qs = params.toString();
    router.replace(`/${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [debouncedSearch, selectedTypes, minFees, maxFees, minRating, sortBy, sortOrder, page, router]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedTypes, minFees, maxFees, minRating, sortBy, sortOrder]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedTypes([]);
    setMinFees('');
    setMaxFees('');
    setMinRating('');
    setSortBy('rating');
    setSortOrder('desc');
    setPage(1);
  };

  const hasActiveFilters = selectedTypes.length > 0 || minFees || maxFees || minRating;

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="gradient-text-hero">Discover Your</span>
            <br />
            <span className="text-white">Perfect College</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Search, compare, and find the ideal educational institution that matches your aspirations and budget.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="search-input"
              type="text"
              placeholder="Search colleges by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-12 py-4 md:py-5 rounded-2xl glass-strong text-white placeholder-slate-500 text-lg transition-all duration-300 outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 border border-white/[0.1]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/[0.1] transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                filtersOpen || hasActiveFilters
                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-300'
                  : 'border-white/[0.08] text-slate-400 hover:bg-white/[0.05]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary-500 text-white text-xs">
                  {[selectedTypes.length > 0, minFees, maxFees, minRating].filter(Boolean).length}
                </span>
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl text-sm bg-white/[0.03] border border-white/[0.08] text-slate-300 outline-none focus:border-primary-500/50 transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value} className="bg-surface-800">{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            </div>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2.5 rounded-xl text-sm border border-white/[0.08] text-slate-400 hover:bg-white/[0.05] transition-all"
              title={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
            >
              {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {filtersOpen && (
          <div className="glass-strong p-6 mb-8 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">College Type</label>
                <div className="flex flex-wrap gap-2">
                  {COLLEGE_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 border ${
                        selectedTypes.includes(type)
                          ? type === 'GOVERNMENT' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                            : type === 'PRIVATE' ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                            : 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                          : 'border-white/[0.1] text-slate-400 hover:bg-white/[0.05]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Range */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Fee Range (₹)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minFees}
                    onChange={(e) => setMinFees(e.target.value)}
                    className="input-field text-sm !py-2"
                  />
                  <span className="text-slate-500">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxFees}
                    onChange={(e) => setMaxFees(e.target.value)}
                    className="input-field text-sm !py-2"
                  />
                </div>
              </div>

              {/* Min Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Min Rating</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="input-field text-sm !py-2 cursor-pointer"
                >
                  <option value="" className="bg-surface-800">Any</option>
                  {[4, 3.5, 3, 2.5, 2].map(r => (
                    <option key={r} value={r} className="bg-surface-800">★ {r}+</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <CardGridSkeleton count={9} />
        ) : colleges.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.03] mb-6">
              <Search className="w-7 h-7 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No colleges found</h3>
            <p className="text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
            <button onClick={clearFilters} className="btn-primary text-sm">
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colleges.map((college, idx) => (
                <CollegeCard key={college.id} college={college} index={idx} />
              ))}
            </div>

            {meta && (
              <Pagination
                page={meta.page}
                totalPages={meta.totalPages}
                hasNext={meta.hasNext}
                hasPrev={meta.hasPrev}
                total={meta.total}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">Loading discovery platform...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
