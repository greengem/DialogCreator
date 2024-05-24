'use client'
import { Position,} from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { CustomHandle } from '../CustomHandle';

export default function EndNode() {
  return (
    <NodeTemplate color='bg-emerald-700' size='sm'>
        <NodeHeading title='End' />
        <NodeBody />
        <CustomHandle type='target' position={Position.Left} ringColor='ring-emerald-500' />
    </NodeTemplate>
  );
}