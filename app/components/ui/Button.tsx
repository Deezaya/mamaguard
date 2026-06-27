/**
 * Button Component
 */

import React from 'react';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from '../../lib/design-tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles = `
      font-family: ${TYPOGRAPHY.headlineFont};
      font-weight: 700;
      border: none;
      border-radius: ${BORDER_RADIUS.button};
      cursor: ${disabled || isLoading ? 'not-allowed' : 'pointer'};
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      opacity: ${disabled || isLoading ? 0.6 : 1};
    `;

    const sizeStyles = {
      sm: `padding: 8px 16px; font-size: 14px;`,
      md: `padding: 14px 24px; font-size: 16px;`,
      lg: `padding: 16px 32px; font-size: 18px;`,
    };

    const variantStyles = {
      primary: `
        background-color: ${COLORS.primary};
        color: ${COLORS.white};
        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `,
      secondary: `
        background-color: ${COLORS.deep};
        color: ${COLORS.primary};
        &:hover:not(:disabled) {
          background-color: ${COLORS.cream};
        }
      `,
      outline: `
        background-color: transparent;
        color: ${COLORS.primary};
        border: 2px solid ${COLORS.primary};
        &:hover:not(:disabled) {
          background-color: ${COLORS.cream};
        }
      `,
      ghost: `
        background-color: transparent;
        color: ${COLORS.primary};
        &:hover:not(:disabled) {
          background-color: ${COLORS.cream};
        }
      `,
    };

    const style: React.CSSProperties = {
      fontFamily: TYPOGRAPHY.headlineFont,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      borderRadius: BORDER_RADIUS.button,
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.6 : 1,
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      ...(size === 'sm' && { padding: '8px 16px', fontSize: '14px' }),
      ...(size === 'md' && { padding: '14px 24px', fontSize: '16px' }),
      ...(size === 'lg' && { padding: '16px 32px', fontSize: '18px' }),
      ...(variant === 'primary' && { backgroundColor: COLORS.primary, color: COLORS.white }),
      ...(variant === 'secondary' && { backgroundColor: COLORS.deep, color: COLORS.primary }),
      ...(variant === 'outline' && {
        backgroundColor: 'transparent',
        color: COLORS.primary,
        border: `2px solid ${COLORS.primary}`,
      }),
      ...(variant === 'ghost' && { backgroundColor: 'transparent', color: COLORS.primary }),
    };

    return (
      <button ref={ref} style={style} disabled={disabled || isLoading} {...props}>
        {isLoading && (
          <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>
            ⏳
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
