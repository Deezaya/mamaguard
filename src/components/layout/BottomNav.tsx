'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, History, MapPin, Baby } from 'lucide-react';

const COLORS = {
  primary: '#A8554A',
  muted: '#9B8A84',
};

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      style={{
        display: 'none',
        position: 'fixed',
        bottom: '15px',
        left: '15px',
        right: '15px',
        background: 'white',
        borderRadius: '25px',
        justifyContent: 'space-around',
        padding: '14px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
        zIndex: 40,
      }}
    >
      <Link
        href="/dashboard"
        style={{
          textDecoration: 'none',
          color: isActive('/dashboard') ? COLORS.primary : COLORS.muted,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        <LayoutDashboard size={20} />
        Dashboard
      </Link>

      <Link
        href="/history"
        style={{
          textDecoration: 'none',
          color: isActive('/history') ? COLORS.primary : COLORS.muted,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        <History size={20} />
        History
      </Link>

      <Link
        href="/find-care"
        style={{
          textDecoration: 'none',
          color: isActive('/find-care') ? COLORS.primary : COLORS.muted,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        <MapPin size={20} />
        Find Care
      </Link>

      <Link
        href="/baby"
        style={{
          textDecoration: 'none',
          color: isActive('/baby') ? COLORS.primary : COLORS.muted,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        <Baby size={20} />
        Baby
      </Link>
    </nav>
  );
}
