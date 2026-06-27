'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Leaf, User, Building2, Heart, Baby, MapPin } from 'lucide-react';

const COLORS = {
  primary: '#A8554A',
  dark: '#2E2228',
  cream: '#F7EFE6',
  sage: '#8FA08A',
  card: '#FDF8F2',
  deep: '#F0E6D8',
  border: 'rgba(46,34,40,0.10)',
  muted: '#9B8A84',
  white: '#FFFFFF',
} as const;

export default function Home() {
  const [accountType, setAccountType] = useState<'individual' | 'hospital'>('individual');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [portalText, setPortalText] = useState('PATIENT PORTAL');
  const [heroTitle, setHeroTitle] = useState('Your postpartum journey, guided with care.');
  const [heroText, setHeroText] = useState('Support, check-ins, and trusted health guidance for new mothers after delivery.');

  const handleAccountSwitch = (type: 'individual' | 'hospital') => {
    setAccountType(type);
    if (type === 'individual') {
      setPortalText('PATIENT PORTAL');
      setHeroTitle('Your postpartum journey, guided with care.');
      setHeroText('Support, check-ins, and trusted health guidance for new mothers after delivery.');
    } else {
      setPortalText('PROVIDER ACCESS');
      setHeroTitle('Manage patients with confidence.');
      setHeroText('Monitor mothers, track check-ins and support better healthcare decisions.');
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '70px',
        padding: '40px',
        backgroundColor: COLORS.cream,
      }}
    >
      {/* HERO SECTION */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          style={{
            fontSize: '30px',
            fontWeight: 800,
            color: COLORS.primary,
            marginBottom: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Leaf size={32} style={{ color: COLORS.primary }} /> <span style={{ fontSize: '35px' }}>MamaGuard</span>
        </div>

        <div
          style={{
            color: COLORS.sage,
            fontWeight: 700,
            letterSpacing: '2px',
            marginBottom: '20px',
            fontSize: '12px',
          }}
        >
          {portalText}
        </div>

        <h1
          style={{
            fontSize: '55px',
            lineHeight: '1.1',
            color: COLORS.dark,
            marginTop: '20px',
            marginBottom: '0',
          }}
        >
          {heroTitle.split('guided with care.')[0]}
          <span style={{ color: COLORS.primary }}>guided with care.</span>
        </h1>

        <p
          style={{
            marginTop: '25px',
            maxWidth: '450px',
            fontSize: '18px',
            lineHeight: '1.7',
            color: '#705f65',
          }}
        >
          {heroText}
        </p>

        <div
          style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            marginTop: '30px',
          }}
        >
          <div
            style={{
              background: COLORS.white,
              padding: '12px 18px',
              borderRadius: '30px',
              color: COLORS.primary,
              boxShadow: '0 10px 30px #eadbd1',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Heart size={16} /> Health Check
          </div>
          <div
            style={{
              background: COLORS.white,
              padding: '12px 18px',
              borderRadius: '30px',
              color: COLORS.primary,
              boxShadow: '0 10px 30px #eadbd1',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Baby size={16} /> Baby Care
          </div>
          <div
            style={{
              background: COLORS.white,
              padding: '12px 18px',
              borderRadius: '30px',
              color: COLORS.primary,
              boxShadow: '0 10px 30px #eadbd1',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MapPin size={16} /> Find Care
          </div>
          <div
            style={{
              background: COLORS.white,
              padding: '12px 18px',
              borderRadius: '30px',
              color: COLORS.primary,
              boxShadow: '0 10px 30px #eadbd1',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Leaf size={16} /> Wellness
          </div>
        </div>
      </div>

      {/* AUTH FORM SECTION */}
      <div
        style={{
          width: '420px',
          background: COLORS.white,
          padding: '35px',
          borderRadius: '30px',
          boxShadow: '0 30px 70px rgba(0,0,0,.12)',
        }}
      >
        {/* Account Type Toggle */}
        <div
          style={{
            display: 'flex',
            background: '#f6eee8',
            borderRadius: '15px',
            padding: '5px',
            marginBottom: '28px',
          }}
        >
          <button
            onClick={() => handleAccountSwitch('individual')}
            style={{
              flex: 1,
              padding: '13px',
              border: '0',
              borderRadius: '12px',
              background: accountType === 'individual' ? COLORS.white : 'transparent',
              color: accountType === 'individual' ? COLORS.primary : COLORS.dark,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: accountType === 'individual' ? '0 5px 15px #ddd' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <User size={16} /> Individual
          </button>
          <button
            onClick={() => handleAccountSwitch('hospital')}
            style={{
              flex: 1,
              padding: '13px',
              border: '0',
              borderRadius: '12px',
              background: accountType === 'hospital' ? COLORS.white : 'transparent',
              color: accountType === 'hospital' ? COLORS.primary : COLORS.dark,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: accountType === 'hospital' ? '0 5px 15px #ddd' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Building2 size={16} /> Hospital
          </button>
        </div>

        {/* Form Title */}
        <h2
          style={{
            textAlign: 'center',
            marginTop: '25px',
            color: COLORS.dark,
            fontSize: '20px',
            fontWeight: 700,
          }}
        >
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        <div
          style={{
            textAlign: 'center',
            color: COLORS.muted,
            margin: '10px 0 20px',
            fontSize: '14px',
          }}
        >
          {mode === 'login' ? 'Sign in to continue' : 'Join MamaGuard today'}
        </div>

        {/* Form Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (mode === 'login') {
              // Handle login
              console.log('Login:', { email, password });
            } else {
              // Handle signup
              console.log('Signup:', { firstName, lastName, email, password });
            }
          }}
        >
          {mode === 'signup' && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '50%' }}>
                <label style={{ display: 'block', marginTop: '15px', fontWeight: 700, color: COLORS.dark, fontSize: '14px' }}>
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginTop: '7px',
                    borderRadius: '14px',
                    border: '1px solid #e8d8d0',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ width: '50%' }}>
                <label style={{ display: 'block', marginTop: '15px', fontWeight: 700, color: COLORS.dark, fontSize: '14px' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginTop: '7px',
                    borderRadius: '14px',
                    border: '1px solid #e8d8d0',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          )}

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 700, color: COLORS.dark, fontSize: '14px' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '7px',
              borderRadius: '14px',
              border: '1px solid #e8d8d0',
              fontSize: '15px',
              boxSizing: 'border-box',
            }}
          />

          <label style={{ display: 'block', marginTop: '15px', fontWeight: 700, color: COLORS.dark, fontSize: '14px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '7px',
              borderRadius: '14px',
              border: '1px solid #e8d8d0',
              fontSize: '15px',
              boxSizing: 'border-box',
            }}
          />

          {mode === 'login' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '18px 0',
                fontSize: '14px',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: 'auto', margin: 0 }} />
                Remember me
              </label>
              <Link href="/forgot" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: 600 }}>
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              border: '0',
              borderRadius: '15px',
              background: COLORS.primary,
              color: COLORS.white,
              fontSize: '17px',
              cursor: 'pointer',
              fontWeight: 700,
              marginTop: '10px',
            }}
          >
            {mode === 'login' ? 'Sign In →' : 'CREATE ACCOUNT →'}
          </button>
        </form>

        {/* Mode Switch */}
        <div style={{ textAlign: 'center', marginTop: '25px', color: COLORS.muted, fontSize: '14px' }}>
          {mode === 'login' ? 'Don\'t have an account? ' : 'Already have an account? '}
          <button
            onClick={handleModeSwitch}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.primary,
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            {mode === 'login' ? 'Create account' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
              