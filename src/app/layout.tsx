import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fabian LMS - School Management',
  description: 'School Management and Learning Management System (LMS) API and Dashboard with class organization, teachers, students, subjects, materials, assignments, and submission grading.',
  openGraph: {
    title: 'Fabian LMS - School Management',
    description: 'School Management and Learning Management System (LMS) API and Dashboard with class organization, teachers, students, subjects, materials, assignments, and submission grading.',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-[#f4f7fb] text-slate-800 min-h-screen">
        {children}
      </body>
    </html>
  );
}
