'use client'
import React from 'react';
import { useNodes } from 'reactflow';
import { Button } from "@radix-ui/themes";
import { IconArrowsShuffle2, IconHierarchy, IconMessage, IconPlayerPlay, IconPlus, IconQuestionMark, IconUser } from '@tabler/icons-react';

type SidebarProps = {
    addNode: (type: string) => void;
};

export default function Sidebar({ addNode }: SidebarProps) {
  const nodes = useNodes();

  return (
    <aside className='w-16 bg-zinc-950 text-pink-500 shadow-md'>
      <div className='flex flex-col items-center py-5 gap-3'>
        <IconHierarchy className='text-white' />
        <button onClick={() => addNode('message')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconMessage /></button>
        <button onClick={() => addNode('condition')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconQuestionMark /></button>
        <button onClick={() => addNode('random')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconArrowsShuffle2 /></button>
      </div>
      {/* <div className='mt-4'>
        {nodes.map((node) => (
          <div key={node.id}>
            Node {node.id} -
            x: {node.position.x.toFixed(2)},
            y: {node.position.y.toFixed(2)}
          </div>
        ))}
      </div> */}
    </aside>
  );
}