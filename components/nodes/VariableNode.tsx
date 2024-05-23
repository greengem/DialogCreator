'use client';
import { useState } from 'react';
import { Position } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField } from '@radix-ui/themes';
import { CustomHandle } from '../CustomHandle';

export default function VariableNode() {
  const [variableName, setVariableName] = useState('');
  const [variableValue, setVariableValue] = useState('');

  return (
    <NodeTemplate color='bg-blue-700' size='md'>
      <NodeHeading title='Variable' />
      <NodeBody>
        <TextField.Root 
          placeholder="Variable Name" 
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
          className='nodrag'
        />
        <TextField.Root 
          placeholder="Variable Value" 
          value={variableValue}
          onChange={(e) => setVariableValue(e.target.value)}
          className='nodrag'
        />
      </NodeBody>
      <CustomHandle type='target' position={Position.Left} ringColor='ring-blue-500' />
      <CustomHandle type='source' position={Position.Right} ringColor='ring-blue-500' />
    </NodeTemplate>
  );
}
