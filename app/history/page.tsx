'use client';

import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import { Calendar, TrendingUp, Heart } from 'lucide-react';

const COLORS = {
  primary: '#A8554A',
  dark: '#2E2228',
  muted: '#9B8A84',
  white: '#FFFFFF',
};

const scanHistory = [
  {
    id: 1,
    date: 'Today',
    time: '2:30 PM',
    heartRate: '72 BPM',
    bloodPressure: '120/80',
    temperature: '98.6°F',
    status: 'Normal',
  },
  {
    id: 2,
    date: 'Yesterday',
    time: '10:15 AM',
    heartRate: '75 BPM',
    bloodPressure: '118/79',
    temperature: '98.4°F',
    status: 'Normal',
  },
  {
    id: 3,
    date: '2 days ago',
    time: '3:45 PM',
    heartRate: '70 BPM',
    bloodPressure: '122/81',
    temperature: '98.7°F',
    status: 'Normal',
  },
  {
    id: 4,
    date: '3 days ago',
    time: '9:00 AM',
    heartRate: '78 BPM',
    bloodPressure: '125/82',
    temperature: '99.1°F',
    status: 'Elevated',
  },
];

export default function HistoryPage() {
  return (
    <main style={{ background: '#FAF5F1', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ maxWidth: '1150px', margin: 'auto', padding: '40px 30px 120px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: COLORS.primary, fontWeight: 700, marginBottom: '10px', fontSize: '14px' }}>
            / Home / History
          </p>
          <h1
            style={{
              fontSize: '42px',
              marginBottom: '10px',
              color: COLORS.dark,
              fontWeight: 800,
            }}
          >
            Scan History
          </h1>
          <p
            style={{
              color: COLORS.muted,
              fontSize: '17px',
              lineHeight: 1.7,
              maxWidth: '650px',
            }}
          >
            Review your past health scans and track your wellness journey over time.
          </p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: COLORS.white,
              borderRadius: '25px',
              padding: '25px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#E5F3FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4a8ed9',
                }}
              >
                <Calendar size={24} />
              </div>
              <h3 style={{ fontSize: '14px', color: COLORS.muted, fontWeight: 700 }}>Total Scans</h3>
            </div>
            <p style={{ fontSize: '28px', fontWeight: 800, color: COLORS.dark }}>4</p>
          </div>

          <div
            style={{
              background: COLORS.white,
              borderRadius: '25px',
              padding: '25px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#E8F8EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#47a35b',
                }}
              >
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: '14px', color: COLORS.muted, fontWeight: 700 }}>Avg Heart Rate</h3>
            </div>
            <p style={{ fontSize: '28px', fontWeight: 800, color: COLORS.dark }}>73.75 BPM</p>
          </div>

          <div
            style={{
              background: COLORS.white,
              borderRadius: '25px',
              padding: '25px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#E8F8EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#47a35b',
                }}
              >
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '14px', color: COLORS.muted, fontWeight: 700 }}>Health Trend</h3>
            </div>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#2e9b58' }}>Stable ✓</p>
          </div>
        </div>

        {/* History List */}
        <h2 style={{ fontSize: '24px', color: COLORS.dark, fontWeight: 800, marginBottom: '20px' }}>
          Recent Scans
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {scanHistory.map((scan) => (
            <div
              key={scan.id}
              style={{
                background: COLORS.white,
                borderRadius: '25px',
                padding: '20px 25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                transition: '0.3s',
              }}
            >
              <div>
                <h3 style={{ fontSize: '16px', color: COLORS.dark, fontWeight: 800, marginBottom: '4px' }}>
                  {scan.date}
                </h3>
                <p style={{ color: COLORS.muted, fontSize: '14px', marginBottom: '10px' }}>{scan.time}</p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginTop: '10px',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '12px', color: COLORS.muted, fontWeight: 700 }}>Heart Rate</p>
                    <p style={{ fontSize: '16px', color: COLORS.dark, fontWeight: 800 }}>{scan.heartRate}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: COLORS.muted, fontWeight: 700 }}>Blood Pressure</p>
                    <p style={{ fontSize: '16px', color: COLORS.dark, fontWeight: 800 }}>{scan.bloodPressure}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: COLORS.muted, fontWeight: 700 }}>Temperature</p>
                    <p style={{ fontSize: '16px', color: COLORS.dark, fontWeight: 800 }}>{scan.temperature}</p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: '20px',
                  background: scan.status === 'Normal' ? '#E8F8EA' : '#fff3cd',
                  color: scan.status === 'Normal' ? '#47a35b' : '#d7a000',
                  fontWeight: 700,
                  fontSize: '14px',
                  minWidth: '100px',
                  textAlign: 'center',
                }}
              >
                {scan.status === 'Normal' ? '✓ ' : '⚠ '}
                {scan.status}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <button
          style={{
            width: '100%',
            padding: '16px',
            marginTop: '25px',
            border: `2px solid ${COLORS.primary}`,
            borderRadius: '15px',
            background: 'transparent',
            color: COLORS.primary,
            fontWeight: 800,
            fontSize: '16px',
            cursor: 'pointer',
            transition: '0.3s',
          }}
        >
          Load More History
        </button>
      </div>

      <BottomNav />
    </main>
  );
}
