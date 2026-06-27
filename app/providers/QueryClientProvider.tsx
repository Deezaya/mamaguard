'use client';

import React from 'react';
import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '../lib/query-config';

// Create a single QueryClient instance for the entire app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: queryConfig.queries,
  },
});

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}

export default QueryClientProvider;
