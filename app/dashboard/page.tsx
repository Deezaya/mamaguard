'use client';

import { useState } from 'react';
import { Activity, Heart, Droplet, Thermometer, Camera, Users } from 'lucide-react';
import Link from 'next/link';

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
};

const healthMetrics = [
  { icon: Heart, label: 'Heart Rate', value: '72 BPM', color: '#fde6e7', iconColor: '#d16a74' },
  { icon: Droplet, label: 'Blood Pressure', value: '120/80', color: '#fff3cd', iconColor: '#d7a000' },
  { icon: Activity, label: 'Temperature', value: '98.6°F', color: '#e5f3ff', iconColor: '#4a8ed9' },
];

const symptoms = [
  { icon: '😊', label: 'Mood' },
  { icon: '💤', label: 'Sleep' },
  { icon: '🍽️', label: 'Appetite' },
  { icon: '⚡', label: 'Energy' },
  { icon: '🌡️', label: 'Pain' },
  { icon: '😰', label: 'Anxiety' },
];

export default function Dashboard() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (label: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  return (
    <main style={{ background: '#FAF5F1', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '40px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <p style={{ color: COLORS.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '2px' }}>
            WELCOME BACK
          </p>
          <h1
            style={{
              fontSize: '42px',
              lineHeight: 1.2,
              marginTop: '10px',
              color: COLORS.dark,
              fontWeight: 800,
            }}
          >
            Your Health Dashboard
          </h1>
        </div>

        {/* Health Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {healthMetrics.map((metric) => (
            <div
              key={metric.label}
              style={{
                background: metric.color,
                borderRadius: '25px',
                padding: '25px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <metric.icon size={28} style={{ color: metric.iconColor }} />
                <div>
                  <p style={{ fontSize: '12px', color: metric.iconColor, fontWeight: 700 }}>
                    {metric.label}
                  </p>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: metric.iconColor, marginTop: '4px' }}>
                    {metric.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scan Section */}
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, #D78E82)`,
            borderRadius: '35px',
            padding: '45px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(185,111,98,0.25)',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '40px',
          }}
        >
          <div>
            <p style={{ fontSize: '16px', fontWeight: 700, opacity: 0.9 }}>START YOUR CHECK-UP</p>
            <h2 style={{ fontSize: '36px', margin: '10px 0', fontWeight: 800 }}>Health Scan</h2>
            <p style={{ maxWidth: '400px', lineHeight: 1.6, opacity: 0.95 }}>
              Quick scan for your vital signs. Takes just 2 minutes.
            </p>
          </div>
          <Link
            href="/scan"
            style={{
              border: 'none',
              background: 'white',
              color: COLORS.primary,
              padding: '18px 30px',
              borderRadius: '18px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              zIndex: 2,
            }}
          >
            <Camera size={20} />
            Start Scan
          </Link>
        </div>

        {/* Daily Check */}
        <div
          style={{
            background: 'white',
            borderRadius: '35px',
            padding: '35px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: COLORS.dark, marginBottom: '25px' }}>
            Daily Check-in
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
            {symptoms.map((symptom) => (
              <button
                key={symptom.label}
                onClick={() => toggleSymptom(symptom.label)}
                style={{
                  height: '90px',
                  background: selectedSymptoms.includes(symptom.label) ? '#F8E4DF' : 'white',
                  border: selectedSymptoms.includes(symptom.label) ? `2px solid ${COLORS.primary}` : '1px solid #eee2db',
                  borderRadius: '25px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: '0.3s',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: COLORS.dark,
                }}
              >
                <span style={{ fontSize: '28px' }}>{symptom.icon}</span>
                {symptom.label}
              </button>
            ))}
          </div>

          <button
            style={{
              width: '100%',
              padding: '16px',
              background: COLORS.primary,
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontWeight: 800,
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '25px',
            }}
          >
            Save Check-in
          </button>
        </div>

        {/* Support Card */}
        <div
          style={{
            marginTop: '35px',
            background: `linear-gradient(135deg, ${COLORS.primary}, #D88E84)`,
            color: 'white',
            borderRadius: '28px',
            padding: '35px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 45px rgba(185,111,98,0.28)',
          }}
        >
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Need Support?</h2>
            <p style={{ marginTop: '10px', opacity: 0.95, maxWidth: '500px', lineHeight: 1.7 }}>
              Our care team is here to answer your questions. Connect with a specialist today.
            </p>
          </div>
          <button
            style={{
              border: 'none',
              background: 'white',
              color: COLORS.primary,
              borderRadius: '18px',
              padding: '16px 28px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: '0.3s',
            }}
          >
            <Users size={20} />
            Contact Support
          </button>
        </div>
      </div>

    </main>
  );
}
