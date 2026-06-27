/**
 * Input Component
 */

import React from 'react';
import { COLORS, BORDER_RADIUS, TYPOGRAPHY } from '../../lib/design-tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    const style: React.CSSProperties = {
      width: '100%',
      padding: '14px 16px',
      backgroundColor: COLORS.cream,
      border: `1.5px solid ${error ? COLORS.urgentRisk : COLORS.border}`,
      borderRadius: BORDER_RADIUS.input,
      fontFamily: TYPOGRAPHY.bodyFont,
      fontSize: '15px',
      color: COLORS.dark,
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box',
    };

    return (
      <div style={{ width: '100%' }}>
        {label && (
          <label
            style={{
              display: 'block',
              fontFamily: TYPOGRAPHY.bodyFont,
              fontSize: '14px',
              fontWeight: TYPOGRAPHY.fontWeights.bold,
              color: COLORS.dark,
              marginBottom: '8px',
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={style}
          {...props}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = COLORS.primary;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.cream}`;
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? COLORS.urgentRisk : COLORS.border;
            e.currentTarget.style.boxShadow = 'none';
            props.onBlur?.(e);
          }}
        />
        {error && (
          <p
            style={{
              color: COLORS.urgentRisk,
              fontSize: '12px',
              marginTop: '4px',
              fontFamily: TYPOGRAPHY.bodyFont,
            }}
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            style={{
              color: COLORS.muted,
              fontSize: '12px',
              marginTop: '4px',
              fontFamily: TYPOGRAPHY.bodyFont,
            }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
