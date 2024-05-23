'use client'
import { useEffect, useState } from 'react';
import { Position, useUpdateNodeInternals, useReactFlow } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField } from '@radix-ui/themes';
import { CustomHandle, CustomHandleNested } from '../CustomHandle';

type ConditionNodeProps = {
  id: string;
  data: {
    condition: string;
  };
};

type ListItemProps = {
  label: string;
  id: string;
};

function ListItem({ label, id }: ListItemProps) {
  return (
    <li className='flex items-center justify-end relative pr-1'>
      <div className='uppercase'>{label}</div>
      <CustomHandleNested 
        type="source" 
        position={Position.Right} 
        id={id}
        ringColor='ring-green-500'
      />
    </li>
  );
}

export default function ConditionNode({ id, data }: ConditionNodeProps) {
  const [condition, setCondition] = useState(data.condition || '');
  const updateNodeInternals = useUpdateNodeInternals();
  const { setNodes } = useReactFlow();

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, condition } } : node
      )
    );
  }, [condition, id, setNodes]);

  const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(event.target.value);
    updateNodeInternals(id); // This will trigger a re-render for the node
  };

  return (
    <NodeTemplate color='bg-green-700' size='md'>
      <NodeHeading title='Condition' />
      <NodeBody>
        <TextField.Root
          placeholder="Has used a teleport..."
          className='nodrag'
          value={condition}
          onChange={handleConditionChange}
        />
        <ul className='text-xs flex flex-col gap-3'>
          <ListItem label='True' id='true-source' />
          <ListItem label='False' id='false-source' />
        </ul>
      </NodeBody>
      <CustomHandle type='target' position={Position.Left} ringColor='ring-green-500' />
    </NodeTemplate>
  );
}
