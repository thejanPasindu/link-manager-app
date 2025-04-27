import './globals.css';
import { Inter } from 'next/font/google';
import { LinkManagerProvider } from './contexts/LinkManagerContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Link Manager',
  description: 'A simple and efficient web application to manage and categorize user links',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LinkManagerProvider>
          <main className="min-h-screen bg-gray-100 text-gray-900">
            {children}
          </main>
        </LinkManagerProvider>
      </body>
    </html>
  );
}
