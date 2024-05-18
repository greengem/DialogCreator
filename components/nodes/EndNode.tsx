'use client'
import { Handle, Position,} from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';

export default function EndNode() {
  return (
    <NodeTemplate color='bg-red-500'>
        <NodeHeading title='End' />
        <NodeBody>It all ends here</NodeBody>
        <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-red-500 mr-3 mt-4" />
    </NodeTemplate>
  );
}