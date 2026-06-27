/**
 * TanStack Query Configuration
 */

export const queryConfig = {
  queries: {
    staleTime: 1000 * 60 * 5, // 5 minutes default
    gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
    retry: 1,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
} as const;

export const staleTime = {
  never: Infinity,
  auth: 1000 * 60 * 30, // 30 minutes
  profile: 1000 * 60 * 60, // 1 hour
  scans: 1000 * 60 * 5, // 5 minutes
  hospitals: 1000 * 60 * 10, // 10 minutes
  history: 1000 * 60 * 10, // 10 minutes
} as const;

/**
 * Query Key Factory
 * Centralized query key management
 */
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    current: ['auth', 'current'] as const,
  },
  profile: {
    all: ['profile'] as const,
    current: ['profile', 'current'] as const,
  },
  scans: {
    all: ['scans'] as const,
    history: ['scans', 'history'] as const,
    detail: (id: string) => ['scans', 'detail', id] as const,
    riskScore: (sessionId: string) => ['scans', 'risk-score', sessionId] as const,
    summary: (sessionId: string) => ['scans', 'summary', sessionId] as const,
    streaming: (sessionId: string) => ['scans', 'streaming', sessionId] as const,
  },
  hospitals: {
    all: ['hospitals'] as const,
    nearby: (lat: number, lon: number, radius: number) =>
      ['hospitals', 'nearby', lat, lon, radius] as const,
  },
  baby: {
    all: ['baby'] as const,
    current: ['baby', 'current'] as const,
  },
  settings: {
    all: ['settings'] as const,
    current: ['settings', 'current'] as const,
  },
} as const;
