'use client'
import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Connection
} from 'reactflow';

import 'reactflow/dist/base.css';
import CustomNode from '@/components/CustomNode';

import initialNodes from '@/data/initialNodes';
import initialEdges from '@/data/initialEdges';

const nodeTypes = {
  custom: CustomNode,
};

export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className='h-dvh w-full'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-teal-50"
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};
