type NodeData = {
    name: string;
    job: string;
    emoji: string;
  };
  
  type CustomNode = {
    id: string;
    type: string;
    data: NodeData;
    position: { x: number; y: number };
  };
  
  const initialNodes: CustomNode[] = [
    {
      id: '1',
      type: 'custom',
      data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
      position: { x: 0, y: 50 },
    },
    {
      id: '2',
      type: 'custom',
      data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
      position: { x: -200, y: 200 },
    },
    {
      id: '3',
      type: 'custom',
      data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
      position: { x: 200, y: 200 },
    },
  ];
  
  export default initialNodes;