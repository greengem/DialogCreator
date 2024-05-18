'use client'
import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Connection,
  Node,
  Edge,
  NodeTypes,
  OnConnect
} from 'reactflow';

import 'reactflow/dist/base.css';
import CustomNode from '@/components/CustomNode';

import initialNodes from '@/data/initialNodes';
import initialEdges from '@/data/initialEdges';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

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
