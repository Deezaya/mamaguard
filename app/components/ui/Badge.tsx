/**
 * Badge Component - For displaying status, labels, and tags
 */

import React from 'react';
import { COLORS, BORDER_RADIUS, getRiskTierByScore, RISK_TIERS } from '../../lib/design-tokens';

type BadgeVariant = 'primary' | 'low-risk' | 'watch-risk' | 'urgent-risk' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantConfig = {
  primary: {
    bg: COLORS.primary,
    text: COLORS.white,
  },
  'low-risk': {
    bg: COLORS.lowRiskBg,
    text: COLORS.lowRisk,
  },
  'watch-risk': {
    bg: COLORS.watchRiskBg,
    text: COLORS.watchRisk,
  },
  'urgent-risk': {
    bg: COLORS.urgentRiskBg,
    text: COLORS.urgentRisk,
  },
  neutral: {
    bg: COLORS.deep,
    text: COLORS.primary,
  },
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', children, ...props }, ref) => {
    const config = variantConfig[variant];

    const style: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 12px',
      backgroundColor: config.bg,
      color: config.text,
      borderRadius: BORDER_RADIUS.full,
      fontSize: '12px',
      fontWeight: 700,
      whiteSpace: 'nowrap',
      ...props.style,
    };

    return (
      <span ref={ref} style={style} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

interface RiskBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  score: number;
}

export const RiskBadge = React.forwardRef<HTMLSpanElement, RiskBadgeProps>(
  ({ score, ...props }, ref) => {
    const tier = getRiskTierByScore(score);
    const variantMap: Record<string, BadgeVariant> = {
      'Low': 'low-risk',
      'Moderate': 'watch-risk',
      'High': 'urgent-risk',
      'Critical': 'urgent-risk',
    };

    return (
      <Badge
        ref={ref}
        variant={variantMap[tier.label] || 'primary'}
        {...props}
      >
        {tier.label} Risk
      </Badge>
    );
  }
);

RiskBadge.displayName = 'RiskBadge';
