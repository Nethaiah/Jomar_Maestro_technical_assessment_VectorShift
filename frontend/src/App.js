import { useEffect, useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = window.localStorage.getItem('pipeline-theme');
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
};

function App() {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('pipeline-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <main className={`app-shell ${isToolbarCollapsed ? 'toolbar-is-collapsed' : ''}`}>
      <PipelineToolbar
        isCollapsed={isToolbarCollapsed}
        onToggle={() => setIsToolbarCollapsed((isCollapsed) => !isCollapsed)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <section className="workspace">
        <PipelineUI />
        <SubmitButton />
      </section>
    </main>
  );
}

export default App;

