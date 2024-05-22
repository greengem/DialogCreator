import { Node, Edge } from 'reactflow';
import { Button } from '@radix-ui/themes';
import { handleSaveFlow, handleDeleteFlow } from '@/server-actions/flow-actions';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

interface UserSaveActionsProps {
    nodes: Node[];
    edges: Edge[];
    isMockData: boolean;
}
  
export default function UserSaveActions({ nodes, edges, isMockData }: UserSaveActionsProps) {
    const saveFlow = async () => {
      const formattedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
        width: node.width,
        height: node.height,
        positionAbsolute: node.positionAbsolute,
      }));
  
      const formattedEdges = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        sourceHandle: edge.sourceHandle,
        target: edge.target,
        targetHandle: edge.targetHandle,
      }));
  
      const response = await handleSaveFlow('default-flow', formattedNodes, formattedEdges);
      if (response.success) {
        toast.success('Flow saved successfully');
      } else {
        toast.error('Failed to save flow');
      }
    };
  
    return (
      <div className='flex gap-3'>
        {isMockData ? (
          <Button color="gray" variant="surface" onClick={() => signIn()}>Sign In to Save</Button>
        ) : (
          <Button color="gray" variant="surface" onClick={saveFlow}>Save Flow</Button>
        )}
      </div>
    );
  }