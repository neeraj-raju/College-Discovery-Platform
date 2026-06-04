'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Star, Heart, IndianRupee, Calendar } from 'lucide-react';
import { College, saveCollege, unsaveCollege, checkSaveStatus } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface CollegeCardProps {
  college: College;
  index?: number;
  onUnsave?: () => void;
}

export default function CollegeCard({ college, index = 0, onUnsave }: CollegeCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      checkSaveStatus(college.id)
        .then(res => setIsSaved(res.data.isSaved))
        .catch(() => {});
    }
  }, [user, college.id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || saving) return;
    setSaving(true);
    try {
      if (isSaved) {
        await unsaveCollege(college.id);
        setIsSaved(false);
        onUnsave?.();
      } else {
        await saveCollege(college.id);
        setIsSaved(true);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const typeBadgeClass = {
    GOVERNMENT: 'badge-government',
    PRIVATE: 'badge-private',
    DEEMED: 'badge-deemed',
  }[college.type];

  const formatFees = (fees: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(fees);
  };

  return (
    <div
      onClick={() => router.push(`/colleges/${college.id}`)}
      className="group glass-hover cursor-pointer p-6 animate-slide-up opacity-0 [animation-fill-mode:forwards]"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={typeBadgeClass}>{college.type}</span>
        {user && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="p-2 rounded-full hover:bg-white/[0.08] transition-all duration-300 group/heart"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isSaved
                  ? 'fill-rose-500 text-rose-500 scale-110'
                  : 'text-slate-500 group-hover/heart:text-rose-400'
              } ${saving ? 'animate-pulse' : ''}`}
            />
          </button>
        )}
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300 line-clamp-2">
        {college.name}
      </h3>

      <div className="flex items-center gap-1.5 text-slate-400 mb-4">
        <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
        <span className="text-sm truncate">{college.location}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <IndianRupee className="w-4 h-4 text-accent-400" />
          <span className="text-sm font-semibold text-white">{formatFees(college.fees)}</span>
          <span className="text-xs text-slate-500">/yr</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-semibold text-white">{college.rating?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>

      {college.established && (
        <div className="flex items-center gap-1.5 mt-3 text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-xs">Est. {college.established}</span>
        </div>
      )}
    </div>
  );
}
