import { useLayoutEffect, useMemo, useRef } from 'react';
import { Position } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const VARIABLE_PATTERN = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const getVariables = (text) => {
  const variables = new Set();
  let match;

  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    variables.add(match[1]);
  }

  return Array.from(variables);
};

const getNodeWidth = (text) => {
  const longestLine = text.split('\n').reduce((longest, line) => Math.max(longest, line.length), 0);
  return Math.min(440, Math.max(260, longestLine * 7 + 120));
};

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const text = data?.text ?? '{{input}}';
  const variables = useMemo(() => getVariables(text), [text]);
  const nodeWidth = useMemo(() => getNodeWidth(text), [text]);

  useLayoutEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [text]);

  const variableHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    accent: 'teal',
    className: 'variable-handle',
    style: {
      top: `${((index + 1) / (variables.length + 1)) * 100}%`,
    },
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      subtitle="Prompt template"
      accent="warm"
      className="text-node"
      style={{ width: nodeWidth }}
      handles={[
        ...variableHandles,
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    >
      <label className="node-field">
        <span>Text</span>
        <textarea
          ref={textareaRef}
          className="text-node-textarea"
          value={text}
          placeholder="Write prompt text here. Use {{ input }} to create a variable handle."
          rows={3}
          onChange={(event) => updateNodeField(id, 'text', event.target.value)}
        />
      </label>

      {variables.length > 0 ? (
        <div className="variable-list">
          {variables.map((variable) => (
            <span className="variable-pill" key={variable}>
              {variable}
            </span>
          ))}
        </div>
      ) : null}
    </BaseNode>
  );
};
