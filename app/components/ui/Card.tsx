/**
 * Card Component
 */

import React from 'react';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../../lib/design-tokens';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shadow?: 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, shadow = 'md', ...props }, ref) => {
    const shadowMap = {
      sm: SHADOWS.sm,
      md: SHADOWS.md,
      lg: SHADOWS.lg,
    };

    const style: React.CSSProperties = {
      backgroundColor: COLORS.card,
      borderRadius: BORDER_RADIUS.card,
      boxShadow: shadowMap[shadow],
      padding: '24px',
      border: `1px solid ${COLORS.border}`,
      ...props.style,
    };

    return (
      <div ref={ref} style={style} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} style={{ marginBottom: '16px' }} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, ...props }, ref) => (
    <h3
      ref={ref}
      style={{
        fontSize: '18px',
        fontWeight: 800,
        color: COLORS.dark,
        margin: 0,
      }}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';
