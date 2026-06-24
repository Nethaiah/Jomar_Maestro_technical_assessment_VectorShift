// toolbar.js

import { Moon, PanelLeftClose, PanelLeftOpen, Sun } from 'lucide-react';
import { DraggableNode } from './draggableNode';

const nodeGroups = [
  {
    label: 'Core',
    nodes: [
      { type: 'customInput', label: 'Input', accent: 'teal' },
      { type: 'llm', label: 'LLM', accent: 'warm' },
      { type: 'customOutput', label: 'Output', accent: 'teal' },
      { type: 'text', label: 'Text', accent: 'warm' },
    ],
  },
  {
    label: 'Workflow',
    nodes: [
      { type: 'api', label: 'API', accent: 'purple' },
      { type: 'filter', label: 'Filter', accent: 'purple' },
      { type: 'transform', label: 'Transform', accent: 'blue' },
      { type: 'database', label: 'Database', accent: 'blue' },
      { type: 'imageGeneration', label: 'Image', accent: 'pink' },
    ],
  },
];

export const PipelineToolbar = ({ isCollapsed, onToggle, theme, onThemeToggle }) => {
  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;
  const ThemeIcon = theme === 'dark' ? Sun : Moon;
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <aside className={`toolbar ${isCollapsed ? 'toolbar-collapsed' : ''}`}>
      <div className="toolbar-actions">
        <button
          className="toolbar-toggle"
          type="button"
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand node toolbar' : 'Collapse node toolbar'}
          title={isCollapsed ? 'Expand toolbar' : 'Collapse toolbar'}
        >
          <ToggleIcon size={18} strokeWidth={2.2} />
        </button>
        <button
          className="toolbar-toggle theme-toggle"
          type="button"
          onClick={onThemeToggle}
          aria-label={`Switch to ${nextTheme} mode`}
          title={`Switch to ${nextTheme} mode`}
        >
          <ThemeIcon size={17} strokeWidth={2.2} />
        </button>
      </div>

      {isCollapsed ? (
        <div className="toolbar-collapsed-label" aria-hidden="true">
          Nodes
        </div>
      ) : (
        <>
          <div className="toolbar-heading">
            <span className="toolbar-eyebrow">VectorShift</span>
            <h1>Pipeline Builder</h1>
          </div>

          {nodeGroups.map((group) => (
            <section className="toolbar-group" key={group.label}>
              <h2>{group.label}</h2>
              <div className="toolbar-node-grid">
                {group.nodes.map((node) => (
                  <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                    accent={node.accent}
                  />
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </aside>
  );
};
