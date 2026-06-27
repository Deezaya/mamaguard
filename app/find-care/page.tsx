'use client';

import { Search, AlertCircle, MapPin, Phone, Globe, Navigation, PhoneCall } from 'lucide-react';
import { useState } from 'react';

const COLORS = {
  primary: '#A8554A',
  dark: '#2E2228',
  muted: '#9B8A84',
  white: '#FFFFFF',
};

const hospitals = [
  {
    id: 1,
    name: 'Maternal Health Center',
    address: '123 Medical Plaza, Downtown',
    distance: '2.3 km away',
    rating: '4.9',
    open: true,
    phone: '(555) 123-4567',
    website: 'maternalhealth.com',
  },
  {
    id: 2,
    name: 'City General Hospital',
    address: '456 Hospital Ave, Midtown',
    distance: '3.1 km away',
    rating: '4.7',
    open: true,
    phone: '(555) 234-5678',
    website: 'citygeneralhosp.com',
  },
  {
    id: 3,
    name: 'Women\'s Care Clinic',
    address: '789 Health Blvd, Uptown',
    distance: '4.5 km away',
    rating: '4.8',
    open: false,
    phone: '(555) 345-6789',
    website: 'womensclinic.com',
  },
];

export default function FindCarePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main style={{ background: '#FAF5F1', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1150px', margin: 'auto', padding: '40px 30px 120px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: COLORS.primary, fontWeight: 700, marginBottom: '10px', fontSize: '14px' }}>
            / Home / Care
          </p>
          <h1
            style={{
              fontSize: '42px',
              marginBottom: '10px',
              color: COLORS.dark,
              fontWeight: 800,
            }}
          >
            Find Care Nearby
          </h1>
          <p
            style={{
              color: COLORS.muted,
              fontSize: '17px',
              lineHeight: 1.7,
              maxWidth: '650px',
            }}
          >
            Find trusted healthcare providers and maternal care facilities in your area.
          </p>
        </div>

        {/* Emergency Section */}
        <div
          style={{
            marginTop: '35px',
            background: 'linear-gradient(135deg, #B96F62, #D78E82)',
            color: 'white',
            borderRadius: '30px',
            padding: '35px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 25px 45px rgba(185,111,98,0.28)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.18)',
                fontSize: '13px',
                fontWeight: 800,
                marginBottom: '12px',
              }}
            >
              EMERGENCY
            </div>
            <h2 style={{ fontSize: '30px', marginBottom: '10px', fontWeight: 800 }}>Need Help Right Now?</h2>
            <p style={{ maxWidth: '600px', lineHeight: 1.8, fontSize: '16px' }}>
              If you're experiencing chest pain, severe bleeding, or difficulty breathing, call emergency services immediately.
            </p>
          </div>
          <button
            style={{
              border: 'none',
              background: 'white',
              color: '#B96F62',
              padding: '18px 28px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 800,
              transition: '0.3s',
            }}
          >
            <AlertCircle size={20} />
            Call 911
          </button>
        </div>

        {/* Search Box */}
        <div
          style={{
            marginTop: '30px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '18px 22px',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
          }}
        >
          <Search size={20} style={{ color: COLORS.primary }} />
          <input
            type="text"
            placeholder="Search hospitals, clinics, or care providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              background: 'transparent',
              fontFamily: 'Nunito, sans-serif',
            }}
          />
        </div>

        {/* Map Section */}
        <div
          style={{
            marginTop: '30px',
            background: 'white',
            borderRadius: '30px',
            padding: '25px',
            boxShadow: '0 20px 45px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ fontSize: '24px', color: COLORS.dark, fontWeight: 800 }}>Map View</h3>
            <button
              style={{
                border: 'none',
                background: '#F8E4DF',
                color: '#B96F62',
                padding: '12px 18px',
                borderRadius: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
              }}
            >
              <Navigation size={16} />
              My Location
            </button>
          </div>

          <div
            style={{
              height: '420px',
              borderRadius: '25px',
              background: '#F4F4F4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <MapPin size={60} style={{ color: '#B96F62', marginBottom: '20px' }} />
              <h2 style={{ color: COLORS.dark, fontWeight: 800, marginBottom: '10px' }}>Map View</h2>
              <p style={{ color: COLORS.muted }}>Interactive map coming soon</p>
            </div>
          </div>
        </div>

        {/* Hospitals Section */}
        <h2 style={{ marginTop: '45px', marginBottom: '25px', fontSize: '30px', color: COLORS.dark, fontWeight: 800 }}>
          Nearby Facilities
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              style={{
                background: 'white',
                borderRadius: '25px',
                padding: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
                transition: '0.3s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '20px',
                    background: '#F8E4DF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B96F62',
                    marginRight: '20px',
                  }}
                >
                  <MapPin size={32} />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '6px', color: COLORS.dark, fontWeight: 800 }}>
                    {hospital.name}
                  </h3>
                  <p style={{ color: COLORS.muted, fontSize: '14px' }}>{hospital.address}</p>

                  <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '14px', flexWrap: 'wrap' }}>
                    <span style={{ color: hospital.open ? '#2e9b58' : '#e67e4b', fontWeight: 700 }}>
                      {hospital.open ? '✓ Open' : '✗ Closed'}
                    </span>
                    <span style={{ color: COLORS.muted }}>📍 {hospital.distance}</span>
                    <span style={{ color: COLORS.muted }}>⭐ {hospital.rating}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    background: '#F8E4DF',
                    color: '#B96F62',
                    border: 'none',
                    padding: '12px 18px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                  }}
                >
                  <Navigation size={16} />
                  Direction
                </button>
                <button
                  style={{
                    background: '#B96F62',
                    color: 'white',
                    border: 'none',
                    padding: '12px 18px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                  }}
                >
                  <PhoneCall size={16} />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Button */}
        <button
          style={{
            position: 'fixed',
            right: '25px',
            bottom: '95px',
            width: '65px',
            height: '65px',
            border: 'none',
            borderRadius: '50%',
            background: '#B96F62',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 20px 40px rgba(185,111,98,0.35)',
            transition: '0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          💬
        </button>
      </div>

    </main>
  );
}
