'use client'
import { Handle, Position,} from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';

export default function StartNode() {
  return (
    <NodeTemplate color='bg-red-500' size='sm'>
        <NodeHeading title='Start' />
        <NodeBody nodeOutput>It all starts here</NodeBody>
        <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-red-500 mr-3 mt-4" />
    </NodeTemplate>
  );
}