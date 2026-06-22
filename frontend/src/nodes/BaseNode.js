import { Trash2 } from 'lucide-react';
import { Handle } from 'reactflow';
import { useStore } from '../store';

const getFieldValue = (data, field) => {
  if (data?.[field.name] !== undefined) {
    return data[field.name];
  }

  return field.defaultValue ?? '';
};

const NodeField = ({ id, data, field }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const value = getFieldValue(data, field);

  const handleChange = (event) => {
    updateNodeField(id, field.name, event.target.value);
  };

  if (field.type === 'select') {
    return (
      <label className="node-field">
        <span>{field.label}</span>
        <select value={value} onChange={handleChange}>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="node-field">
        <span>{field.label}</span>
        <textarea
          value={value}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          onChange={handleChange}
        />
      </label>
    );
  }

  return (
    <label className="node-field">
      <span>{field.label}</span>
      <input
        type={field.type ?? 'text'}
        value={value}
        placeholder={field.placeholder}
        onChange={handleChange}
      />
    </label>
  );
};

export const BaseNode = ({
  id,
  data,
  title,
  subtitle,
  fields = [],
  handles = [],
  children,
  className = '',
  style,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (event) => {
    event.stopPropagation();
    deleteNode(id);
  };

  return (
    <div className={`base-node ${className}`.trim()} style={style}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={handle.className}
          style={handle.style}
        />
      ))}

      <div className="node-header">
        <div className="node-title-row">
          <span className="node-title">{title}</span>
          <button
            className="node-delete-button nodrag nopan"
            type="button"
            aria-label={`Delete ${title} node`}
            title="Delete node"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={handleDelete}
          >
            <Trash2 size={14} strokeWidth={2.3} />
          </button>
        </div>
        {subtitle ? <span className="node-subtitle">{subtitle}</span> : null}
      </div>

      {fields.length > 0 ? (
        <div className="node-fields">
          {fields.map((field) => (
            <NodeField key={field.name} id={id} data={data} field={field} />
          ))}
        </div>
      ) : null}

      {children ? <div className="node-content">{children}</div> : null}
    </div>
  );
};
