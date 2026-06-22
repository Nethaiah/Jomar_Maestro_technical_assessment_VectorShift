import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error('The backend could not parse this pipeline.');
      }

      const result = await response.json();
      const dagStatus = result.is_dag ? 'Yes, this pipeline is a DAG.' : 'No, this pipeline contains a cycle.';

      window.alert(
        `Pipeline analysis complete\n\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\nDAG: ${dagStatus}`
      );
    } catch (error) {
      window.alert(
        'Unable to analyze the pipeline. Please make sure the FastAPI backend is running on http://localhost:8000.'
      );
    }
  };

  return (
    <div className="submit-bar">
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};
