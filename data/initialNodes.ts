import { Node } from 'reactflow';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'start',
    data: {},
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'end',
    data: {},
    position: { x: 600, y: 0 },
  },
  {
    id: '3',
    type: 'message',
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
    position: { x: 300, y: 0 },
  },

];
  
  export default initialNodes;