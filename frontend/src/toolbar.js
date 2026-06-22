// toolbar.js

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { DraggableNode } from './draggableNode';

const nodeGroups = [
  {
    label: 'Core',
    nodes: [
      { type: 'customInput', label: 'Input' },
      { type: 'llm', label: 'LLM' },
      { type: 'customOutput', label: 'Output' },
      { type: 'text', label: 'Text' },
    ],
  },
  {
    label: 'Workflow',
    nodes: [
      { type: 'api', label: 'API' },
      { type: 'filter', label: 'Filter' },
      { type: 'transform', label: 'Transform' },
      { type: 'database', label: 'Database' },
      { type: 'imageGeneration', label: 'Image' },
    ],
  },
];

export const PipelineToolbar = ({ isCollapsed, onToggle }) => {
  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside className={`toolbar ${isCollapsed ? 'toolbar-collapsed' : ''}`}>
      <button
        className="toolbar-toggle"
        type="button"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Expand node toolbar' : 'Collapse node toolbar'}
        title={isCollapsed ? 'Expand toolbar' : 'Collapse toolbar'}
      >
        <ToggleIcon size={18} strokeWidth={2.2} />
      </button>

      {isCollapsed ? (
        <div className="toolbar-collapsed-label" aria-hidden="true">
          Nodes
        </div>
      ) : (
        <>
          <div className="toolbar-heading">
            <span className="toolbar-eyebrow">VectorShift Assessment</span>
            <h1>Pipeline Builder</h1>
          </div>

          {nodeGroups.map((group) => (
            <section className="toolbar-group" key={group.label}>
              <h2>{group.label}</h2>
              <div className="toolbar-node-grid">
                {group.nodes.map((node) => (
                  <DraggableNode key={node.type} type={node.type} label={node.label} />
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </aside>
  );
};
