'use client'
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';

interface MessageNodeData {
  emoji: string;
  name: string;
  job: string;
  onDelete: () => void;
}

type MessageNodeProps = NodeProps<MessageNodeData>;

function MessageNode({ data }: MessageNodeProps) {
  return (
    <NodeTemplate color='bg-purple-500'>
        <NodeHeading title='Show Message' onDelete={data.onDelete} />
        <NodeBody>
            <div>{data.name}</div>
            <div>{data.job}</div>
            <div>{data.emoji}</div>
        </NodeBody>
        <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-purple-500 ml-3" />
        <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-purple-500 mr-3" />
    </NodeTemplate>
  );
}

export default memo(MessageNode);