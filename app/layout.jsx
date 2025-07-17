// app/layout.jsx
import '../styles/globals.css'; // Import global CSS or Tailwind base
import Header from './components/Header';
import Footer from './components/Footer';
import { UserAuthProvider } from './contexts/UserAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

export const metadata = {
  title: 'TestYukti - Advanced Online Test Platform',
  description: 'India’s most advanced online test platform offering mock tests, PYQs, quizzes & analytics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags can go here */}
      </head>
      <body className="min-h-screen flex flex-col">
        <UserAuthProvider>
          <AdminAuthProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
              {children}
            </main>
            <Footer />
          </AdminAuthProvider>
        </UserAuthProvider>
      </body>
    </html>
  );
}
