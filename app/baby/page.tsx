'use client';

import { useState } from 'react';
import { ChevronDown, Phone } from 'lucide-react';

const COLORS = {
  primary: '#A8554A',
  dark: '#2E2228',
  cream: '#F7EFE6',
  sage: '#8FA08A',
  muted: '#9B8A84',
  white: '#FFFFFF',
};

const careTopics = [
  {
    id: 1,
    category: 'Feeding',
    title: 'Breastfeeding',
    description: 'Feed on demand, 8–12 times a day. Mild soreness at first is normal.',
    color: '#fde6e7',
    iconColor: '#d16a74',
    icon: '👶',
    details: [
      'Offer both breasts at each feed and encourage a deep latch so your baby\'s chin touches your breast.',
      'Applying a few drops of breast milk to your nipples after feeding may help soothe and protect the skin.',
      'If you\'re experiencing pain, speak with a lactation consultant.',
    ],
  },
  {
    id: 2,
    category: 'Sleep',
    title: 'Safe Sleep Practices',
    description: 'Place baby on their back in a clear crib, bassinet, or play yard.',
    color: '#e5f3ff',
    iconColor: '#4a8ed9',
    icon: '💤',
    details: [
      'Room-sharing without bed-sharing is recommended for at least the first 6 months.',
      'Avoid pillows, blankets, and bumper pads in the crib.',
      'Maintain a comfortable room temperature to prevent overheating.',
    ],
  },
  {
    id: 3,
    category: 'Hygiene',
    title: 'Diaper & Bath Care',
    description: 'Gentle care keeps your baby healthy and comfortable.',
    color: '#e8f8ea',
    iconColor: '#47a35b',
    icon: '🛁',
    details: [
      'Change diapers frequently to prevent diaper rash.',
      'Use lukewarm water for bathing, 5-10 minutes maximum.',
      'Pat skin dry gently and use fragrance-free moisturizer if needed.',
    ],
  },
  {
    id: 4,
    category: 'Health',
    title: 'Check-ups & Vaccinations',
    description: 'Regular visits ensure your baby is growing well.',
    color: '#fff3cd',
    iconColor: '#d7a000',
    icon: '💉',
    details: [
      'Newborn screening tests are done in the hospital and at 2 weeks of age.',
      'Vaccinations start at birth and continue on a set schedule.',
      'Growth and development are monitored at every visit.',
    ],
  },
];

export default function BabyPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <main style={{ background: '#FAF5F1', minHeight: '100vh' }}>
      <div style={{ maxWidth: '950px', margin: 'auto', padding: '40px 25px 120px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: COLORS.primary, fontSize: '14px', fontWeight: 700 }}>/ Home / Baby</p>
          <h1
            style={{
              fontSize: '40px',
              marginTop: '8px',
              color: COLORS.dark,
              fontWeight: 800,
              marginBottom: '10px',
            }}
          >
            Baby Care
          </h1>
          <p
            style={{
              color: COLORS.muted,
              marginTop: '8px',
              fontSize: '17px',
              lineHeight: 1.6,
            }}
          >
            Clear guidance for caring for your newborn, week by week.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {careTopics.map((topic) => (
            <div
              key={topic.id}
              style={{
                background: COLORS.white,
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
                transition: '0.35s',
                transform: expandedId === topic.id ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              {/* Card Head */}
              <button
                onClick={() => toggleCard(topic.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '22px 28px',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', textAlign: 'left' }}>
                  <div
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: topic.color,
                      fontSize: '24px',
                    }}
                  >
                    {topic.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: topic.iconColor,
                        fontWeight: 700,
                        letterSpacing: '1px',
                      }}
                    >
                      {topic.category}
                    </p>
                    <h3 style={{ fontSize: '20px', marginBottom: '3px', color: COLORS.dark, fontWeight: 800 }}>
                      {topic.title}
                    </h3>
                    <p style={{ color: COLORS.muted, fontSize: '14px' }}>{topic.description}</p>
                  </div>
                </div>

                <ChevronDown
                  size={22}
                  style={{
                    color: COLORS.primary,
                    transition: '0.35s',
                    transform: expandedId === topic.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {/* Card Body */}
              <div
                style={{
                  maxHeight: expandedId === topic.id ? '400px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                  padding: expandedId === topic.id ? '0 30px 25px' : '0 30px 0',
                }}
              >
                <ul
                  style={{
                    listStyle: 'none',
                    paddingBottom: '25px',
                    color: '#64565b',
                    lineHeight: 1.7,
                  }}
                >
                  {topic.details.map((detail, idx) => (
                    <li key={idx} style={{ margin: '14px 0' }}>
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Support Card */}
        <div
          style={{
            marginTop: '35px',
            background: `linear-gradient(135deg, ${COLORS.primary}, #D88E84)`,
            color: COLORS.white,
            borderRadius: '28px',
            padding: '35px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 45px rgba(185,111,98,0.28)',
          }}
        >
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Get Expert Advice</h2>
            <p style={{ marginTop: '10px', opacity: 0.95, maxWidth: '500px', lineHeight: 1.7 }}>
              Have questions about your baby's care? Connect with our pediatric specialists.
            </p>
          </div>
          <button
            style={{
              border: 'none',
              background: COLORS.white,
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
            <Phone size={20} />
            Call Now
          </button>
        </div>
      </div>

    </main>
  );
}
