// draggableNode.js

export const DraggableNode = ({ type, label, accent = 'teal' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const addNodeByTap = () => {
    window.dispatchEvent(
      new CustomEvent('pipeline:add-node', {
        detail: { nodeType: type },
      })
    );
  };

  return (
    <button
      className={`draggable-node node-button-accent-${accent}`}
      type="button"
      onClick={addNodeByTap}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="draggable-node-mark" />
      <span>{label}</span>
    </button>
  );
};
