import { IconX } from '@tabler/icons-react';

type NodeTemplateProps = {
  children: React.ReactNode;
  color: string;
};

export function NodeTemplate({ children, color }: NodeTemplateProps) {
  return (
    <div className={`min-w-64 text-xs shadow-md ${color} p-[2px] rounded-md text-zinc-200`}>
      {children}
    </div>
  );
}

export function NodeHeading({ title, onDelete }: { title: string; onDelete?: () => void }) {
  return (
      <div className='p-2 font-semibold flex justify-between'>
          <div>{title}</div>
          {onDelete && <button onClick={onDelete}><IconX size={16} /></button>}
      </div>
  )
}

export function NodeBody({ children } : { children: React.ReactNode }) {
    return (
        <div className='bg-zinc-800 text-zinc-200 rounded-md px-6 py-3'>{children}</div>
    )
}
