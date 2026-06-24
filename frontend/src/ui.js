// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import {
  APINode,
  DatabaseNode,
  FilterNode,
  ImageGenerationNode,
  TransformNode,
} from './nodes/utilityNodes';

import 'reactflow/dist/style.css';

const gridSize = 24;
const snapGrid = [gridSize, gridSize];
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  filter: FilterNode,
  transform: TransformNode,
  database: DatabaseNode,
  imageGeneration: ImageGenerationNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  deleteEdge: state.deleteEdge,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onEdgeUpdate: state.onEdgeUpdate,
});

const getInitNodeData = (nodeID, type) => {
  return { id: nodeID, nodeType: type };
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    deleteEdge,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgeUpdate,
  } = useStore(useShallow(selector));

  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);

  const createNode = useCallback(
    (type, position) => {
      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    },
    [addNode, getNodeID]
  );

  const getProjectedPosition = useCallback(
    (clientX, clientY) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return null;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      return reactFlowInstance.project({
        x: clientX - reactFlowBounds.left,
        y: clientY - reactFlowBounds.top,
      });
    },
    [reactFlowInstance]
  );

  const addNodeToVisibleCanvas = useCallback(
    (type) => {
      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const offset = (nodes.length % 5) * 28;
      const position = getProjectedPosition(
        bounds.left + bounds.width / 2 + offset,
        bounds.top + bounds.height / 2 + offset
      );

      if (position) {
        createNode(type, position);
      }
    },
    [createNode, getProjectedPosition, nodes.length, reactFlowInstance]
  );

  const removeSelectedEdge = useCallback(() => {
    if (!selectedEdgeId) {
      return;
    }

    deleteEdge(selectedEdgeId);
    setSelectedEdgeId(null);
  }, [deleteEdge, selectedEdgeId]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = getProjectedPosition(event.clientX, event.clientY);
        if (position) {
          createNode(type, position);
        }
      }
    },
    [createNode, getProjectedPosition]
  );

  useEffect(() => {
    const handleTapAdd = (event) => {
      const type = event.detail?.nodeType;

      if (type) {
        addNodeToVisibleCanvas(type);
      }
    };

    window.addEventListener('pipeline:add-node', handleTapAdd);
    return () => window.removeEventListener('pipeline:add-node', handleTapAdd);
  }, [addNodeToVisibleCanvas]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedEdgeId) {
        event.preventDefault();
        removeSelectedEdge();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [removeSelectedEdge, selectedEdgeId]);

  useEffect(() => {
    if (selectedEdgeId && !selectedEdge) {
      setSelectedEdgeId(null);
    }
  }, [selectedEdge, selectedEdgeId]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="canvas-shell" ref={reactFlowWrapper}>
      {selectedEdge ? (
        <div className="edge-action-bar">
          <span>Edge selected</span>
          <button type="button" onClick={removeSelectedEdge}>
            <Trash2 size={14} strokeWidth={2.2} />
            Delete edge
          </button>
        </div>
      ) : null}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeClick={(_, edge) => setSelectedEdgeId(edge.id)}
        onSelectionChange={({ edges: selectedEdges }) => {
          setSelectedEdgeId(selectedEdges[0]?.id ?? null);
        }}
        onPaneClick={() => setSelectedEdgeId(null)}
        deleteKeyCode={['Backspace', 'Delete']}
        edgesUpdatable
        nodesDraggable
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={snapGrid}
        connectionLineType="smoothstep"
      >
        <Background color="#252836" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
