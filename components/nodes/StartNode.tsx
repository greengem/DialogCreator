'use client'
import { Handle, Position,} from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { CustomHandle } from '../CustomHandle';

export default function StartNode() {
  return (
    <NodeTemplate color='bg-red-700' size='sm'>
        <NodeHeading title='Start' />
        <NodeBody />
        <CustomHandle type='source' position={Position.Right} ringColor='ring-red-500' />
    </NodeTemplate>
  );
}