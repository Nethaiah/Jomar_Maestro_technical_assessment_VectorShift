// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <button
      className="draggable-node"
      type="button"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="draggable-node-mark" />
      <span>{label}</span>
    </button>
  );
};
