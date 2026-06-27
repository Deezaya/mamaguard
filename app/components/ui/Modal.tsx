/**
 * Modal Component
 */

import React, { useEffect } from 'react';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../../lib/design-tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: '400px',
    md: '600px',
    lg: '800px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease-in-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: COLORS.card,
          borderRadius: BORDER_RADIUS.lg,
          boxShadow: SHADOWS.lg,
          padding: '32px',
          maxWidth: sizeMap[size],
          width: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          animation: 'slideInUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: COLORS.dark,
                margin: 0,
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: COLORS.muted,
              }}
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.displayName = 'Modal';
