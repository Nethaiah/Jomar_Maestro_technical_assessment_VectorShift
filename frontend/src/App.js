import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);

  return (
    <main className={`app-shell ${isToolbarCollapsed ? 'toolbar-is-collapsed' : ''}`}>
      <PipelineToolbar
        isCollapsed={isToolbarCollapsed}
        onToggle={() => setIsToolbarCollapsed((isCollapsed) => !isCollapsed)}
      />
      <section className="workspace">
        <PipelineUI />
        <SubmitButton />
      </section>
    </main>
  );
}

export default App;
