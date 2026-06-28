import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, History, MapPin, Baby, LogOut } from 'lucide-react';

const COLORS = {
  primary: '#A8554A',
  dark: '#2E2228',
  muted: '#9B8A84',
  border: 'rgba(46,34,40,0.10)',
};

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      style={{
        height: '75px',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 60px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '25px',
          fontWeight: 800,
          color: COLORS.primary,
          textDecoration: 'none',
        }}
      >
        <Leaf size={25} style={{ color: COLORS.primary }} />
        MamaGuard
      </Link>

      {/* Menu */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link
          href="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive('/dashboard') ? COLORS.primary : COLORS.muted,
            padding: '12px 18px',
            borderRadius: '15px',
            fontWeight: 700,
            fontSize: '14px',
            background: isActive('/dashboard') ? '#F8E4DF' : 'transparent',
            transition: '0.3s',
          }}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/history"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive('/history') ? COLORS.primary : COLORS.muted,
            padding: '12px 18px',
            borderRadius: '15px',
            fontWeight: 700,
            fontSize: '14px',
            background: isActive('/history') ? '#F8E4DF' : 'transparent',
            transition: '0.3s',
          }}
        >
          <History size={18} />
          History
        </Link>

        <Link
          href="/find-care"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive('/find-care') ? COLORS.primary : COLORS.muted,
            padding: '12px 18px',
            borderRadius: '15px',
            fontWeight: 700,
            fontSize: '14px',
            background: isActive('/find-care') ? '#F8E4DF' : 'transparent',
            transition: '0.3s',
          }}
        >
          <MapPin size={18} />
          Find Care
        </Link>

        <Link
          href="/baby"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: isActive('/baby') ? COLORS.primary : COLORS.muted,
            padding: '12px 18px',
            borderRadius: '15px',
            fontWeight: 700,
            fontSize: '14px',
            background: isActive('/baby') ? '#F8E4DF' : 'transparent',
            transition: '0.3s',
          }}
        >
          <Baby size={18} />
          Baby
        </Link>
      </div>

      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: '#F8E4DF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: COLORS.primary,
          }}
        >
          <span style={{ fontSize: '20px' }}>👩</span>
        </div>
        <span style={{ fontWeight: 700, color: COLORS.dark }}>Mama</span>
      </div>
    </nav>
  );
}
