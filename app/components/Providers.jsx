'use client';

import { LanguageProvider } from '../lib/LanguageContext';
import SiteShell from './SiteShell';

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <SiteShell>{children}</SiteShell>
    </LanguageProvider>
  );
}
