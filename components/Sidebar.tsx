'use client'
import { IconArrowsShuffle2, IconLogin, IconLogout, IconMessage, IconPlayerPlayFilled, IconPlayerStopFilled, IconQuestionMark, IconTrash, IconVariable } from '@tabler/icons-react';
import { signOut, signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

type SidebarProps = {
    addNode: (type: string) => void;
    deleteFlow: () => void;
};

export default function Sidebar({ addNode, deleteFlow }: SidebarProps) {
  const { data: session, status } = useSession();
  
  return (
    <aside className='w-16 bg-zinc-900 text-blue-500 shadow-md flex flex-col justify-between'>
      <div className='flex flex-col items-center py-5 gap-3'>
        <button onClick={() => addNode('start')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconPlayerPlayFilled /></button>
        <button onClick={() => addNode('end')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconPlayerStopFilled /></button>
        <button onClick={() => addNode('message')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconMessage /></button>
        <button onClick={() => addNode('condition')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconQuestionMark /></button>
        <button onClick={() => addNode('random')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconArrowsShuffle2 /></button>
        {/* <button onClick={() => addNode('variable')} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconVariable /></button> */}
      </div>

      <div className='flex flex-col items-center py-5 gap-3'>
        {status === 'authenticated' ? (
          <button onClick={() => signOut()} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconLogout /></button>
        ) : (
          <button onClick={() => signIn()} className='hover:bg-zinc-700 hover:text-white p-2 rounded-md'><IconLogin /></button>
        )}
        <button color='red' onClick={deleteFlow} className='hover:bg-red-700 hover:text-white p-2 rounded-md'><IconTrash /></button>
      </div>
    </aside>
  );
}
