import { Handle, Position } from 'reactflow';

interface CustomHandleProps {
  type: 'target' | 'source';
  position: Position;
  ringColor: string;
  id?: string;
}

export function CustomHandle({ type, position, ringColor, id }: CustomHandleProps) {
  return (
    <Handle 
      id={id}
      type={type} 
      position={position} 
      className={`w-3 h-3 rounded-full !bg-zinc-600 ring-2 mt-3 ${ringColor}`} 
    />
  );
}

export function CustomHandleNested({ type, position, ringColor, id }: CustomHandleProps) {
  return (
    <Handle 
      id={id}
      type={type} 
      position={position} 
      className={`w-3 h-3 rounded-full !bg-zinc-600 ring-2 -mr-[15px] ${ringColor}`} 
    />
  );
}
