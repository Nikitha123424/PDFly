import { useState, useEffect } from 'react';
import {
  Navbar,
  HeroPage,
  EditorPage,
  AboutPage,
} from './components';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'create' | 'about'>('home');
  const [isDark, setIsDark] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('pdfly-theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pdfly-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pdfly-theme', 'light');
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <Navbar
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onNavigate={(page) => setCurrentPage(page as any)}
        currentPage={currentPage}
      />

      {currentPage === 'home' && (
        <HeroPage
          isDark={isDark}
          onCreateClick={() => setCurrentPage('create')}
        />
      )}

      {currentPage === 'create' && <EditorPage isDark={isDark} />}

      {currentPage === 'about' && <AboutPage isDark={isDark} />}
    </div>
  );
}

export default App;
