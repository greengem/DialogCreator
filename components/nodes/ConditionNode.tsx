'use client'
import { Position } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField } from '@radix-ui/themes';
import { CustomHandle, CustomHandleNested } from '../CustomHandle';

function ListItem({ label, id }: { label: string, id: string }) {
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

export default function ConditionNode() {
  return (
    <NodeTemplate color='bg-green-700' size='md'>
      <NodeHeading title='Condition' />
      <NodeBody>
        <TextField.Root placeholder="Has used a teleport..." className='nodrag' />
        <ul className='text-xs flex flex-col gap-3'>
          <ListItem label='True' id='true-source' />
          <ListItem label='False' id='false-source' />
        </ul>
      </NodeBody>
      <CustomHandle type='target' position={Position.Left} ringColor='ring-green-500' />
    </NodeTemplate>
  );
}