'use client';

import { useState } from 'react';
import { ChevronLeft, Leaf, Heart, Baby, Zap, User, HeartPulse } from 'lucide-react';
import Link from 'next/link';

const COLORS = {
  primary: '#B96F62',
  dark: '#33272B',
  muted: '#806D73',
  light: '#FAF4EF',
  card: '#F8E4DF',
};

export default function OnboardPage() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [weeks, setWeeks] = useState(2);
  const [babyNumber, setBabyNumber] = useState(1);
  const [healthHistory, setHealthHistory] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);

  const healthOptions = [
    'High blood pressure',
    'Diabetes',
    'C-section birth',
    'Preeclampsia',
    'Anaemia',
    'Postpartum depression',
  ];

  const goalOptions = ['Track health', 'Connect with support', 'Baby care tips', 'Mental wellness'];

  const toggleHealthOption = (option: string) => {
    setHealthHistory((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <main style={{ minHeight: '100vh', background: COLORS.light, display: 'flex', overflow: 'hidden' }}>
      {/* Left Side - Gradient */}
      <div
        style={{
          width: '52%',
          padding: '70px 65px',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
          background: `linear-gradient(135deg, ${COLORS.primary}, #D99587)`,
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            right: '-220px',
            top: '130px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            left: '-120px',
            bottom: '-100px',
          }}
        />

        {/* Brand */}
        <div style={{ fontSize: '42px', fontWeight: 800, position: 'relative', zIndex: 2, marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Leaf size={35} /> MamaGuard
          </div>
        </div>

        <div
          style={{
            height: '3px',
            width: '160px',
            background: 'rgba(255,255,255,0.33)',
            margin: '35px 0',
          }}
        />

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '55px',
            lineHeight: 1.2,
            position: 'relative',
            zIndex: 2,
            fontWeight: 700,
          }}
        >
          Your postpartum journey, guided with care.
        </h1>

        <p
          style={{
            fontSize: '20px',
            lineHeight: 1.7,
            marginTop: '20px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          Support, check-ins, and trusted health guidance for new mothers.
        </p>

        {/* Features */}
        <div style={{ marginTop: '45px', position: 'relative', zIndex: 2 }}>
          {[
            { icon: Heart, label: 'Health Check' },
            { icon: Baby, label: 'Baby Care' },
            { icon: HeartPulse, label: 'Find Care' },
            { icon: Leaf, label: 'Wellness Support' },
          ].map((feature) => (
            <div
              key={feature.label}
              style={{
                width: '300px',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                marginBottom: '15px',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <feature.icon size={20} />
              {feature.label}
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '120px', opacity: 0.35 }}>
          🤱
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ width: '48%', padding: '45px 90px', overflowY: 'auto' }}>
        <Link
          href="/"
          style={{
            border: 'none',
            background: COLORS.light,
            width: '55px',
            height: '55px',
            borderRadius: '18px',
            fontSize: '25px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            color: COLORS.dark,
          }}
        >
          ←
        </Link>

        <div style={{ textAlign: 'center', color: COLORS.primary, fontWeight: 800, fontSize: '26px', marginTop: '-50px' }}>
          MamaGuard Setup
        </div>

        {/* Progress Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            margin: '35px',
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: '7px',
                width: '55px',
                borderRadius: '20px',
                background: step >= i ? COLORS.primary : '#eee',
              }}
            />
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ animation: 'fade 0.4s' }}>
            <div
              style={{
                height: '120px',
                width: '120px',
                borderRadius: '50%',
                background: '#FAECE7',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '55px',
              }}
            >
              <User size={55} color={COLORS.primary} />
            </div>

            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: '38px',
                color: COLORS.dark,
                marginTop: '25px',
                fontWeight: 700,
              }}
            >
              Welcome, Mama
            </h2>

            <p
              style={{
                textAlign: 'center',
                color: COLORS.muted,
                lineHeight: 1.6,
                margin: '15px auto 30px',
              }}
            >
              Let's set up your care profile so we can look after you well.
            </p>

            <label style={{ fontWeight: 800, display: 'block', marginTop: '18px' }}>Your first name</label>
            <input
              placeholder="e.g Amaka"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '18px',
                border: '1px solid #eadbd1',
                marginTop: '10px',
                fontSize: '16px',
                fontFamily: "'Nunito', sans-serif",
              }}
            />

            <label style={{ fontWeight: 800, display: 'block', marginTop: '18px' }}>
              Weeks since your baby arrived
            </label>
            <div
              style={{
                marginTop: '10px',
                height: '70px',
                border: '1px solid #eadbd1',
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
              }}
            >
              <button
                onClick={() => setWeeks(Math.max(0, weeks - 1))}
                style={{
                  border: 'none',
                  background: '#fff4ee',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '22px',
                  cursor: 'pointer',
                }}
              >
                −
              </button>
              <span style={{ fontSize: '18px', fontWeight: 800 }}>{weeks} weeks</span>
              <button
                onClick={() => setWeeks(weeks + 1)}
                style={{
                  border: 'none',
                  background: '#fff4ee',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  fontSize: '22px',
                  cursor: 'pointer',
                }}
              >
                +
              </button>
            </div>

            <label style={{ fontWeight: 800, display: 'block', marginTop: '18px' }}>Which baby is this for you?</label>
            <div style={{ display: 'flex', gap: '12px', marginTop: '15px' }}>
              {['1st', '2nd', '3rd', '4th+'].map((num, idx) => (
                <button
                  key={num}
                  onClick={() => setBabyNumber(idx + 1)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '15px',
                    border: '1px solid #eadbd1',
                    background: babyNumber === idx + 1 ? COLORS.primary : 'white',
                    color: babyNumber === idx + 1 ? 'white' : COLORS.dark,
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                marginTop: '30px',
                padding: '18px',
                border: 'none',
                borderRadius: '20px',
                background: COLORS.primary,
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: 800,
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ animation: 'fade 0.4s' }}>
            <div
              style={{
                height: '120px',
                width: '120px',
                borderRadius: '50%',
                background: '#FAECE7',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '55px',
              }}
            >
              <HeartPulse size={55} color={COLORS.primary} />
            </div>

            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: '38px',
                color: COLORS.dark,
                marginTop: '25px',
                fontWeight: 700,
              }}
            >
              Any health history?
            </h2>

            <p
              style={{
                textAlign: 'center',
                color: COLORS.muted,
                lineHeight: 1.6,
                margin: '15px auto 30px',
              }}
            >
              Tap all that apply — this helps us watch for the right things.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {healthOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleHealthOption(option)}
                  style={{
                    padding: '12px 15px',
                    borderRadius: '20px',
                    background: healthHistory.includes(option) ? COLORS.primary : 'white',
                    color: healthHistory.includes(option) ? 'white' : COLORS.dark,
                    border: `1px solid ${healthHistory.includes(option) ? COLORS.primary : '#eadbd1'}`,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  padding: '18px',
                  border: '1px solid #eadbd1',
                  borderRadius: '20px',
                  background: 'white',
                  color: COLORS.primary,
                  fontSize: '18px',
                  cursor: 'pointer',
                  fontWeight: 800,
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                style={{
                  flex: 1,
                  padding: '18px',
                  border: 'none',
                  borderRadius: '20px',
                  background: COLORS.primary,
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  fontWeight: 800,
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ animation: 'fade 0.4s' }}>
            <div
              style={{
                height: '120px',
                width: '120px',
                borderRadius: '50%',
                background: '#FAECE7',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '55px',
              }}
            >
              <Zap size={55} color={COLORS.primary} />
            </div>

            <h2
              style={{
                textAlign: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: '38px',
                color: COLORS.dark,
                marginTop: '25px',
                fontWeight: 700,
              }}
            >
              Your Goals
            </h2>

            <p
              style={{
                textAlign: 'center',
                color: COLORS.muted,
                lineHeight: 1.6,
                margin: '15px auto 30px',
              }}
            >
              What would you like to focus on?
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  style={{
                    padding: '12px 15px',
                    borderRadius: '20px',
                    background: goals.includes(goal) ? COLORS.primary : 'white',
                    color: goals.includes(goal) ? 'white' : COLORS.dark,
                    border: `1px solid ${goals.includes(goal) ? COLORS.primary : '#eadbd1'}`,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {goal}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  flex: 1,
                  padding: '18px',
                  border: '1px solid #eadbd1',
                  borderRadius: '20px',
                  background: 'white',
                  color: COLORS.primary,
                  fontSize: '18px',
                  cursor: 'pointer',
                  fontWeight: 800,
                }}
              >
                ← Back
              </button>
              <Link
                href="/dashboard"
                style={{
                  flex: 1,
                  padding: '18px',
                  border: 'none',
                  borderRadius: '20px',
                  background: COLORS.primary,
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Get Started →
              </Link>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <span style={{ color: COLORS.primary, cursor: 'pointer', fontWeight: 700 }}>Skip for now</span>
        </div>
      </div>

      <style>{`
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
