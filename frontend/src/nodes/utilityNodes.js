import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="API"
    subtitle="Fetch external data"
    fields={[
      { name: 'endpoint', label: 'Endpoint', defaultValue: 'https://api.example.com', placeholder: 'https://api.example.com' },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { label: 'GET', value: 'GET' },
          { label: 'POST', value: 'POST' },
          { label: 'PUT', value: 'PUT' },
        ],
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-input` },
      { type: 'source', position: Position.Right, id: `${id}-response` },
    ]}
  />
);

export const FilterNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Filter"
    subtitle="Keep matching records"
    fields={[
      { name: 'condition', label: 'Condition', defaultValue: 'status == active', placeholder: 'field == value' },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-input` },
      { type: 'source', position: Position.Right, id: `${id}-filtered` },
    ]}
  />
);

export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Transform"
    subtitle="Reshape data"
    fields={[
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'Summarize',
        options: [
          { label: 'Summarize', value: 'Summarize' },
          { label: 'Extract', value: 'Extract' },
          { label: 'Normalize', value: 'Normalize' },
        ],
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-input` },
      { type: 'source', position: Position.Right, id: `${id}-output` },
    ]}
  />
);

export const DatabaseNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Database"
    subtitle="Query stored data"
    fields={[
      { name: 'table', label: 'Table', defaultValue: 'customers', placeholder: 'table_name' },
      {
        name: 'queryType',
        label: 'Query',
        type: 'select',
        defaultValue: 'Search',
        options: [
          { label: 'Search', value: 'Search' },
          { label: 'Insert', value: 'Insert' },
          { label: 'Update', value: 'Update' },
        ],
      },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-query` },
      { type: 'source', position: Position.Right, id: `${id}-rows` },
    ]}
  />
);

export const ImageGenerationNode = ({ id, data }) => (
  <BaseNode
    id={id}
    data={data}
    title="Image"
    subtitle="Generate visuals"
    fields={[
      {
        name: 'style',
        label: 'Style',
        type: 'select',
        defaultValue: 'Product',
        options: [
          { label: 'Product', value: 'Product' },
          { label: 'Illustration', value: 'Illustration' },
          { label: 'Photoreal', value: 'Photoreal' },
        ],
      },
      { name: 'size', label: 'Size', defaultValue: '1024x1024', placeholder: '1024x1024' },
    ]}
    handles={[
      { type: 'target', position: Position.Left, id: `${id}-prompt` },
      { type: 'source', position: Position.Right, id: `${id}-image` },
    ]}
  />
);
