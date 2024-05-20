'use client'
import { useCallback } from 'react';
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
} from 'reactflow';
import 'reactflow/dist/base.css';

import { v4 as uuidv4 } from 'uuid';
import MessageNode from '@/components/nodes/MessageNode';
import StartNode from '@/components/nodes/StartNode';
import CharactersNode from '@/components/nodes/CharactersNode';
import ConditionNode from '@/components/nodes/ConditionNode';
import RandomNode from '@/components/nodes/RandomNode';
import Sidebar from '@/components/Sidebar';
import initialNodes from '@/data/initialNodes';
import initialEdges from '@/data/initialEdges';

const nodeTypes: NodeTypes = {
  start: StartNode,
  message: MessageNode,
  characters: CharactersNode,
  condition: ConditionNode,
  random: RandomNode,
};

export default function PageClient() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect: OnConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addNode = useCallback((type: string) => {
    const newNode: Node = {
      id: uuidv4(),
      type: type,
      position: { x: Math.random() * 800, y: Math.random() * 600 },
      data: {}
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <div className='flex grow'>
      <Sidebar addNode={addNode} />
      <main className='grow'>
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
          <Background color="#333" variant={BackgroundVariant.Dots} />
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
}
