import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import { ThemeProvider, useTheme } from 'next-themes';

const Layout = () => {
  const { theme, setTheme } = useTheme();

  // Ensure the theme is applied to the root html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const ThemedLayout = () => (
  <ThemeProvider 
    attribute="class" 
    defaultTheme="light"
    enableSystem={false}
    disableTransitionOnChange
  >
    <Layout />
  </ThemeProvider>
);

export default ThemedLayout;