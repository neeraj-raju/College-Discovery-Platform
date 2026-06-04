'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Menu, X, LogIn, LogOut, Heart, GitCompareArrows, Home } from 'lucide-react';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.06]" style={{ background: 'rgba(5, 5, 16, 0.8)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <GraduationCap className="w-8 h-8 text-primary-400 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">CollegeDiscover</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Home" />
            <NavLink href="/compare" icon={<GitCompareArrows className="w-4 h-4" />} label="Compare" />
            {user && <NavLink href="/saved" icon={<Heart className="w-4 h-4" />} label="Saved" />}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-20 h-9 skeleton rounded-lg" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08]"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-300">{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl shadow-2xl shadow-black/50 animate-slide-down overflow-hidden">
                    <div className="p-3 border-b border-white/[0.06]">
                      <p className="text-sm font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-rose-400 hover:bg-white/[0.05] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-300 rounded-xl hover:bg-white/[0.06] transition-all duration-300 border border-transparent hover:border-white/[0.08]">
                  <LogIn className="w-4 h-4" />
                  Sign in
                </Link>
                <Link href="/auth/register" className="btn-primary text-sm !px-4 !py-2">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] animate-slide-down" style={{ background: 'rgba(5, 5, 16, 0.95)' }}>
          <div className="px-4 py-4 space-y-1">
            <MobileNavLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
            <MobileNavLink href="/compare" label="Compare" onClick={() => setMobileOpen(false)} />
            {user && <MobileNavLink href="/saved" label="Saved" onClick={() => setMobileOpen(false)} />}
            <div className="pt-3 border-t border-white/[0.06] mt-3">
              {user ? (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-rose-400 hover:bg-white/[0.05] rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] rounded-lg">Sign in</Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-center btn-primary">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:text-white hover:bg-white/[0.06] transition-all duration-300"
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2.5 text-sm font-medium text-slate-300 rounded-lg hover:bg-white/[0.06] transition-colors"
    >
      {label}
    </Link>
  );
}
