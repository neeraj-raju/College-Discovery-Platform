'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, hasNext, hasPrev, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
      <p className="text-sm text-slate-400">
        Showing page <span className="font-semibold text-white">{page}</span> of{' '}
        <span className="font-semibold text-white">{totalPages}</span>
        <span className="text-slate-500"> ({total} results)</span>
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] text-slate-300 border border-white/[0.08] disabled:border-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="hidden sm:flex items-center gap-1">
          {getVisiblePages().map((p, idx) =>
            typeof p === 'string' ? (
              <span key={`dots-${idx}`} className="px-2 text-slate-500">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-300 ${
                  p === page
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.06] text-slate-300 border border-white/[0.08] disabled:border-transparent"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
