'use client'
import React from 'react';
import { IconArrowsShuffle2, IconMessage, IconPlayerPlayFilled, IconQuestionMark, IconTrash, IconUser } from '@tabler/icons-react';

type SidebarProps = {
    addNode: (type: string) => void;
    deleteFlow: () => void;
};

export default function Sidebar({ addNode, deleteFlow }: SidebarProps) {

  return (
    <aside className='w-16 bg-zinc-950 text-zinc-400 shadow-md flex flex-col justify-between'>
      <div className='flex flex-col items-center py-5 gap-3'>
        <button onClick={() => addNode('start')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconPlayerPlayFilled /></button>
        <button onClick={() => addNode('message')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconMessage /></button>
        <button onClick={() => addNode('condition')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconQuestionMark /></button>
        <button onClick={() => addNode('random')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconArrowsShuffle2 /></button>
      </div>

      <div className='flex flex-col items-center py-5 gap-3'>
        <button color='red' onClick={deleteFlow} className='hover:bg-red-700 hover:text-white p-2 rounded-md'><IconTrash /></button>
      </div>
    </aside>
  );
}
