// mockData.ts
import { Edge, Node } from 'reactflow';

export const exampleNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    data: {},
    position: { x: 0, y: 0 },
  },
  {
    id: 'characters',
    type: 'characters',
    data: { characters: ['Narrator', 'Player'] },
    position: { x: -300, y: 0 },
  },
  {
    id: '1',
    type: 'message',
    data: {},
    position: { x: 300, y: 0 },
  },
];

export const exampleEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'start',
    target: '1',
  },
];
