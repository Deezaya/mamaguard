/**
 * Protected Layout - For dashboard and protected pages
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COLORS, SHADOWS, BORDER_RADIUS } from '../../lib/design-tokens';
import { clearAuth } from '../../lib/api-client';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = React.useState('Mama');

  React.useEffect(() => {
    // Get user name from localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name || userData.firstName || 'Mama');
    }
  }, []);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/history', label: 'History', icon: '⏱️' },
    { href: '/find-care', label: 'Care', icon: '📍' },
    { href: '/baby', label: 'Baby', icon: '👶' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.cream,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          backgroundColor: COLORS.white,
          boxShadow: SHADOWS.card,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/dashboard"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '24px',
              fontWeight: 800,
              color: COLORS.primary,
            }}
          >
            🌿 <span>MamaGuard</span>
          </Link>

          {/* Profile Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                backgroundColor: COLORS.deep,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: COLORS.primary,
                fontSize: '20px',
              }}
            >
              👤
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontWeight: 700, color: COLORS.dark, fontSize: '14px' }}>
                {userName}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: COLORS.primary,
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: 0,
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '32px 24px 100px',
        }}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          borderTop: `1px solid ${COLORS.border}`,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 0 16px',
          zIndex: 40,
        }}
        className="md:hidden"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              textAlign: 'center',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 700,
              color: COLORS.muted,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = COLORS.primary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = COLORS.muted;
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

ProtectedLayout.displayName = 'ProtectedLayout';
