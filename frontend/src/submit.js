import { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from './store';

const PipelineAlert = ({ result, error, onClose }) => {
  if (!result && !error) {
    return null;
  }

  const isError = Boolean(error);

  return (
    <div className="pb-alert-backdrop" role="presentation">
      <section
        className={`pb-alert ${isError ? 'pb-alert-error' : ''}`}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="pipeline-alert-title"
      >
        <button
          className="pb-alert-close"
          type="button"
          onClick={onClose}
          aria-label="Close pipeline result"
          title="Close"
        >
          <X size={16} strokeWidth={2.2} />
        </button>

        {isError ? (
          <>
            <div className="pb-alert-kicker">Backend unavailable</div>
            <h2 id="pipeline-alert-title">Unable to analyze pipeline</h2>
            <p>{error}</p>
          </>
        ) : (
          <>
            <div className="pb-alert-kicker">Pipeline analysis complete</div>
            <h2 id="pipeline-alert-title">Graph summary</h2>
            <dl>
              <div>
                <dt>Nodes</dt>
                <dd>{result.num_nodes}</dd>
              </div>
              <div>
                <dt>Edges</dt>
                <dd>{result.num_edges}</dd>
              </div>
              <div>
                <dt>DAG</dt>
                <dd className={result.is_dag ? 'dag-true' : 'dag-false'}>
                  {result.is_dag ? 'true' : 'false'}
                </dd>
              </div>
            </dl>
          </>
        )}
      </section>
    </div>
  );
};

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const clearAlert = () => {
    setResult(null);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      clearAlert();

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

      setResult(await response.json());
    } catch (error) {
      setResult(null);
      setError(
        'Please make sure the FastAPI backend is running on http://localhost:8000.'
      );
    }
  };

  return (
    <div className="submit-bar">
      <PipelineAlert result={result} error={error} onClose={clearAlert} />
      <div className="submit-count">
        <span>{nodes.length} nodes</span>
        <span>{edges.length} edges</span>
      </div>
      <button className="submit-button" type="button" onClick={handleSubmit}>
        Submit Pipeline
      </button>
    </div>
  );
};
