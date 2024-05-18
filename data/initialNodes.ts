import { Node } from 'reactflow';

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'start',
    data: {},
    position: { x: 0, y: 0 },
  },
  {
    id: 'characters',
    type: 'characters',
    data: {},
    position: { x: -300, y: 0 },
  },
  {
    id: '1',
    type: 'message',
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
    position: { x: 300, y: 0 },
  },

];
  
  export default initialNodes;