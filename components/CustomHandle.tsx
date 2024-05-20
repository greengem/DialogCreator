import { Handle, Position } from 'reactflow';

interface CustomHandleProps {
  type: 'target' | 'source';
  position: Position;
  ringColor: string;
}

export function CustomHandle({ type, position, ringColor }: CustomHandleProps) {
  return (
    <Handle 
      type={type} 
      position={position} 
      className={`w-3 h-3 rounded-full !bg-zinc-600 ring-2 mt-3 ${ringColor}`} 
    />
  );
}

export function CustomHandleNested({ type, position, ringColor }: CustomHandleProps) {
  return (
    <Handle 
      type={type} 
      position={position} 
      className={`w-3 h-3 rounded-full !bg-zinc-600 ring-2 -mr-[27px] ${ringColor}`} 
    />
  );
}
