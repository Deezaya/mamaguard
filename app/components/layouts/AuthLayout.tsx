/**
 * Auth Layout - For login/signup/onboarding pages
 */

import React from 'react';
import { COLORS } from '../../lib/design-tokens';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.cream,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      {children}
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
