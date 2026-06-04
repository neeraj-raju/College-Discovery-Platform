'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Star, Heart, Globe, Calendar, IndianRupee, GraduationCap, TrendingUp, Users, Clock, BookOpen, GitCompareArrows, ExternalLink } from 'lucide-react';
import { getCollege, College, saveCollege, unsaveCollege, checkSaveStatus } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { DetailSkeleton } from '@/components/LoadingSkeleton';

type Tab = 'overview' | 'courses' | 'placements' | 'reviews';

export default function CollegeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCollege(id)
      .then(res => setCollege(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user && id) {
      checkSaveStatus(id)
        .then(res => setIsSaved(res.data.isSaved))
        .catch(() => {});
    }
  }, [user, id]);

  const handleSave = async () => {
    if (!user || saving) return;
    setSaving(true);
    try {
      if (isSaved) {
        await unsaveCollege(id);
        setIsSaved(false);
      } else {
        await saveCollege(id);
        setIsSaved(true);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const formatLPA = (val: number) => {
    if (val >= 100000) return `${(val / 100000).toFixed(1)} LPA`;
    return formatCurrency(val);
  };

  const typeBadgeClass = (type: string) => ({
    GOVERNMENT: 'badge-government',
    PRIVATE: 'badge-private',
    DEEMED: 'badge-deemed',
  }[type] || 'badge-private');

  if (loading) return <DetailSkeleton />;
  if (!college) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-4">College not found</h2>
      <p className="text-slate-400 mb-6">The college you&apos;re looking for doesn&apos;t exist.</p>
      <button onClick={() => router.push('/')} className="btn-primary">Back to search</button>
    </div>
  );

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'courses', label: 'Courses', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'placements', label: 'Placements', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Hero Card */}
      <div className="glass-strong p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={typeBadgeClass(college.type)}>{college.type}</span>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-sm font-semibold">{college.rating?.toFixed(1) || 'N/A'}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">{college.name}</h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary-400" /> {college.location}</span>
              {college.established && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary-400" /> Est. {college.established}</span>}
              {college.website && (
                <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent-400 hover:text-accent-300 transition-colors">
                  <Globe className="w-4 h-4" /> Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 border ${
                  isSaved
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    : 'border-white/[0.1] text-slate-300 hover:bg-white/[0.06]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            )}
            <button
              onClick={() => router.push(`/compare?ids=${college.id}`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium border border-white/[0.1] text-slate-300 hover:bg-white/[0.06] transition-all duration-300"
            >
              <GitCompareArrows className="w-5 h-5" />
              Compare
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Annual Fees" value={formatCurrency(college.fees)} color="accent" />
          <StatCard icon={<Star className="w-5 h-5" />} label="Rating" value={college.rating?.toFixed(1) || 'N/A'} color="amber" />
          <StatCard icon={<GraduationCap className="w-5 h-5" />} label="Courses" value={String(college.courses?.length || 0)} color="primary" />
          <StatCard icon={<Calendar className="w-5 h-5" />} label="Established" value={String(college.established || 'N/A')} color="emerald" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 glass rounded-xl mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-primary-500/20 text-primary-300 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'overview' && (
          <div className="glass-strong p-8">
            <h2 className="text-xl font-bold text-white mb-4">About</h2>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {college.overview || 'No overview information available for this college.'}
            </p>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {(!college.courses || college.courses.length === 0) ? (
              <EmptyTab message="No course data available" />
            ) : (
              <div className="glass-strong overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">Course</th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">Duration</th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">Fees</th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-slate-400">Seats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {college.courses.map(course => (
                        <tr key={course.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-4 h-4 text-primary-400" />
                              </div>
                              <span className="font-medium text-white">{course.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="flex items-center gap-1.5 text-slate-300">
                              <Clock className="w-4 h-4 text-slate-500" />{course.duration}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-accent-400 font-semibold">{formatCurrency(course.fees)}</td>
                          <td className="py-4 px-6">
                            <span className="flex items-center gap-1.5 text-slate-300">
                              <Users className="w-4 h-4 text-slate-500" />{course.seats}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="space-y-6">
            {(!college.placements || college.placements.length === 0) ? (
              <EmptyTab message="No placement data available" />
            ) : (
              college.placements.map(p => (
                <div key={p.id} className="glass-strong p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Placements {p.year}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <MiniStat label="Avg Package" value={formatLPA(p.avgPackage)} />
                    <MiniStat label="Highest Package" value={formatLPA(p.highestPackage)} />
                    <MiniStat label="Placement Rate" value={`${p.placementRate}%`} />
                  </div>
                  {p.topRecruiters && p.topRecruiters.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-400 mb-2">Top Recruiters</h4>
                      <div className="flex flex-wrap gap-2">
                        {p.topRecruiters.map((r, i) => (
                          <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-slate-300">
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {(!college.reviews || college.reviews.length === 0) ? (
              <EmptyTab message="No reviews yet" />
            ) : (
              college.reviews.map(review => (
                <div key={review.id} className="glass-strong p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{review.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">{review.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">{review.body}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="font-medium text-slate-400">{review.author}</span>
                    {review.batch && <span>Batch of {review.batch}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: 'text-primary-400 bg-primary-500/10',
    accent: 'text-accent-400 bg-accent-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
  };
  const classes = colorMap[color] || colorMap.primary;
  return (
    <div className="glass p-4 text-center">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${classes} mb-2`}>{icon}</div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-3 rounded-xl bg-white/[0.02]">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

function EmptyTab({ message }: { message: string }) {
  return (
    <div className="glass-strong p-12 text-center">
      <p className="text-slate-400">{message}</p>
    </div>
  );
}
