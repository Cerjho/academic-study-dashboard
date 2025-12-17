import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FilterProvider } from '@/contexts/FilterContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Academic Study Dashboard | Mabini College',
    template: '%s | Mabini College Study',
  },
  description:
    'Analyzing the impact of enrollment status on academic achievement in the Computer Science Program at Mabini College',
  keywords: [
    'academic study',
    'enrollment status',
    'academic achievement',
    'GWA',
    'computer science',
    'Mabini College',
  ],
  authors: [{ name: 'Mabini College Research Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Academic Study Dashboard | Mabini College',
    description:
      'Analyzing the impact of enrollment status on academic achievement',
    siteName: 'Mabini College Academic Study',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <FilterProvider>
          {/* Skip to main content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Header with navigation */}
          <Header />

          {/* Main content area */}
          <main id="main-content" className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </FilterProvider>
      </body>
    </html>
  );
}
