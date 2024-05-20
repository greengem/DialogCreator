'use client'
import { Handle, Position } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField } from '@radix-ui/themes';
import { CustomHandle } from '../CustomHandle';

export default function ConditionNode() {
  return (
    <NodeTemplate color='bg-green-500' size='md'>
      <NodeHeading title='Condition' />
      <NodeBody>
        <TextField.Root placeholder="Has used a teleport..." className='nodrag' />
        <ul className='text-xs flex flex-col gap-3'>
          <li className='flex items-center justify-end relative pr-3'>
            <div className='uppercase'>True</div>
            <Handle 
              type="source" 
              position={Position.Right} 
              id="true-source"
              className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-green-500" 
            />
          </li>
          <li className='flex items-center justify-end relative pr-3'>
            <div className='uppercase'>False</div>
            <Handle 
              type="source" 
              position={Position.Right} 
              id="false-source"
              className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-green-500" 
            />
          </li>
        </ul>
      </NodeBody>
      <CustomHandle type='target' position={Position.Left} ringColor='ring-green-500' />
    </NodeTemplate>
  );
}
