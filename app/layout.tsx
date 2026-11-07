'use client';

import '@/styles/globals.css';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WatsonChat from '@/components/WatsonChat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [isWatsonOpen, setIsWatsonOpen] = useState(false);

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
  };

  const handleFontChange = (delta: number) => {
    setFontScale((prev) => Math.min(Math.max(0.8, prev + delta), 1.4));
  };

  return (
    <html lang="pt-BR" style={{ '--font-scale': fontScale } as React.CSSProperties}>
      <body className={isHighContrast ? 'high-contrast' : ''}>
        <Navbar
          onToggleHighContrast={toggleHighContrast}
          onFontChange={handleFontChange}
          onOpenWatson={() => setIsWatsonOpen(true)}
        />
        {children}
        <Footer />
        <WatsonChat
          isOpenExternal={isWatsonOpen}
          onCloseExternal={() => setIsWatsonOpen(false)}
        />
      </body>
    </html>
  );
}
