'use client'
import React, { useCallback } from 'react';
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
  BackgroundVariant,
  Panel,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/base.css';
import MessageNode from '@/components/nodes/MessageNode';
import StartNode from '@/components/nodes/StartNode';
import CharactersNode from '@/components/nodes/CharactersNode';
import { Button } from "@radix-ui/themes"
import initialNodes from '@/data/initialNodes';
import initialEdges from '@/data/initialEdges';

const nodeTypes: NodeTypes = {
  start: StartNode,
  message: MessageNode,
  characters: CharactersNode,
};

export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'message',
      position: { x: Math.random() * 800, y: Math.random() * 600 },
      data: {}
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  return (
    <ReactFlowProvider>
      <div className='h-dvh w-full '>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-zinc-900"
        >
          <Panel position="top-left"><FlowActions addNode={addNode} /></Panel>
          <Background color="#333" variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

function FlowActions({ addNode }: { addNode: () => void }) {
  return (
    <div className="flex gap-5">
      <Button className="btn btn-primary" onClick={addNode}>Add Node</Button>
    </div>
  );
}
