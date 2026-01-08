
'use client';

import { AuthProvider } from '@/contexts/auth-context';
import { CompareProvider } from '@/contexts/compare-context';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CompareProvider>
        {children}
        <Toaster />
      </CompareProvider>
    </AuthProvider>
  );
}
