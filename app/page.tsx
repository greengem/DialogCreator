'use client'
import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Connection,
  Node,
  Edge,
  NodeTypes,
  OnConnect,
  Background,
  BackgroundVariant
} from 'reactflow';

import 'reactflow/dist/base.css';
import MessageNode from '@/components/nodes/MessageNode';
import StartNode from '@/components/nodes/StartNode';
import EndNode from '@/components/nodes/EndNode';

import initialNodes from '@/data/initialNodes';
import initialEdges from '@/data/initialEdges';

const nodeTypes: NodeTypes = {
  start: StartNode,
  end: EndNode,
  message: MessageNode,
};

export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
  }, [setNodes]);

  const nodesWithDeleteHandler = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onDelete: () => deleteNode(node.id),
      },
    }));
  }, [nodes, deleteNode]);

  return (
    <div className='h-dvh w-full '>
      <ReactFlow
        nodes={nodesWithDeleteHandler}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-zinc-900"
      >
        <Background color="#333" variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
