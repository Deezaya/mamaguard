'use client';

import { useRef, useState, useEffect } from 'react';
import { X, Repeat2 } from 'lucide-react';
import Link from 'next/link';

const COLORS = {
  primary: '#A8554A',
  dark: '#2E2228',
  muted: '#9B8A84',
  white: '#FFFFFF',
};

export default function ScanPage() {
  const [timer, setTimer] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning && timer < 120) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } else if (timer >= 120) {
      setIsScanning(false);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setScanResult({
          heartRate: '72 BPM',
          bloodPressure: '120/80',
          temperature: '98.6°F',
          status: 'Normal',
        });
      }, 2000);
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isScanning, timer]);

  const startScan = () => {
    setIsScanning(true);
    setTimer(0);
    setScanResult(null);
  };

  const resetScan = () => {
    setIsScanning(false);
    setIsLoading(false);
    setScanResult(null);
    setTimer(0);
  };

  return (
    <main style={{ margin: 0, fontFamily: "'Nunito', sans-serif", background: '#faf5f1' }}>
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 25px',
          background: 'white',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
        }}
      >
        <h2 style={{ color: COLORS.primary, margin: 0, fontSize: '20px', fontWeight: 800 }}>
          Health Scan
        </h2>
        <Link
          href="/dashboard"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            border: 'none',
            background: '#f8e4df',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: COLORS.primary,
            textDecoration: 'none',
          }}
        >
          <X size={20} />
        </Link>
      </div>

      {/* Wrapper */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
            background: 'white',
            borderRadius: '30px',
            padding: '25px',
            boxShadow: '0 30px 80px rgba(185,111,98,0.2)',
            marginTop: '20px',
          }}
        >
          {/* Camera */}
          <div
            style={{
              position: 'relative',
              width: '300px',
              height: '300px',
              margin: 'auto',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '6px solid #f8e4df',
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isScanning && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '4px solid ' + COLORS.primary,
                    animation: 'pulse 2s infinite',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: COLORS.primary,
                    animation: 'move 2s linear infinite',
                  }}
                />
              </>
            )}
            <div style={{ fontSize: '60px', opacity: isScanning ? 0.3 : 1 }}>📷</div>
          </div>

          {/* Timer */}
          {isScanning && (
            <div style={{ fontSize: '45px', color: COLORS.primary, margin: '15px', fontWeight: 800 }}>
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  border: '5px solid #f8e4df',
                  borderTopColor: COLORS.primary,
                  margin: 'auto',
                  animation: 'spin 1s linear infinite',
                }}
              />
            </div>
          )}

          {/* Result */}
          {scanResult && (
            <div
              style={{
                marginTop: '20px',
                background: '#faf5f1',
                padding: '20px',
                borderRadius: '25px',
                textAlign: 'left',
              }}
            >
              <h3 style={{ color: COLORS.primary, fontWeight: 800, marginBottom: '15px' }}>
                Scan Results
              </h3>
              <div style={{ color: COLORS.dark, lineHeight: 1.8 }}>
                <p>
                  <strong>Heart Rate:</strong> {scanResult.heartRate}
                </p>
                <p>
                  <strong>Blood Pressure:</strong> {scanResult.bloodPressure}
                </p>
                <p>
                  <strong>Temperature:</strong> {scanResult.temperature}
                </p>
                <p>
                  <strong>Status:</strong> <span style={{ color: '#2e9b58', fontWeight: 800 }}>✓ {scanResult.status}</span>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                  onClick={startScan}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '20px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: COLORS.primary,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Repeat2 size={16} />
                  Scan Again
                </button>
                <Link
                  href="/dashboard"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '20px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    background: '#f8e4df',
                    color: COLORS.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                  }}
                >
                  Home
                </Link>
              </div>
            </div>
          )}

          {/* Buttons */}
          {!isScanning && !isLoading && !scanResult && (
            <button
              onClick={startScan}
              style={{
                background: COLORS.primary,
                color: 'white',
                padding: '14px 30px',
                borderRadius: '25px',
                marginTop: '15px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 800,
              }}
            >
              Start Scan
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes move {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes pulse {
          0% { transform: scale(0.96); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.96); opacity: 0.5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
