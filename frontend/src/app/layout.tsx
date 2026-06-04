import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CollegeDiscover — Find Your Perfect College',
  description: 'Discover, compare, and save colleges across India. Search by location, fees, ratings, and more to find your ideal educational institution.',
  keywords: ['college', 'university', 'education', 'India', 'compare colleges', 'college search'],
  openGraph: {
    title: 'CollegeDiscover — Find Your Perfect College',
    description: 'Discover, compare, and save colleges across India.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
