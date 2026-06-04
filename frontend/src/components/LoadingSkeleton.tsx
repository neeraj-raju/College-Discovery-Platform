export function CardSkeleton() {
  return (
    <div className="glass p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-8 w-8 rounded-full" />
      </div>
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
      <div className="pt-4 border-t border-white/[0.06] flex justify-between">
        <div className="skeleton h-5 w-24" />
        <div className="skeleton h-5 w-16" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div className="skeleton h-8 w-32" />
      <div className="glass-strong p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="skeleton h-10 w-2/3" />
            <div className="skeleton h-5 w-1/3" />
            <div className="flex gap-3">
              <div className="skeleton h-7 w-24 rounded-full" />
              <div className="skeleton h-7 w-20 rounded-full" />
            </div>
          </div>
          <div className="skeleton h-10 w-10 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="skeleton h-12 w-full rounded-xl" />
      <div className="skeleton h-64 w-full rounded-xl" />
    </div>
  );
}
