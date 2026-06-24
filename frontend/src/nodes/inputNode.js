import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      subtitle="Pipeline source"
      accent="teal"
      fields={[
        {
          name: 'inputName',
          label: 'Name',
          defaultValue: data?.inputName || id.replace('customInput-', 'input_'),
        },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          defaultValue: 'Text',
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'File', value: 'File' },
          ],
        },
      ]}
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`,
        },
      ]}
    />
  );
};
