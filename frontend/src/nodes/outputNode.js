import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      subtitle="Final destination"
      accent="teal"
      fields={[
        {
          name: 'outputName',
          label: 'Name',
          defaultValue: data?.outputName || id.replace('customOutput-', 'output_'),
        },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'Image', value: 'Image' },
          ],
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    />
  );
};
