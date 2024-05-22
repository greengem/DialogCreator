import { Switch, SwitchProps } from '@radix-ui/themes';

type NodeTemplateProps = {
  children: React.ReactNode;
  color: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  textColor?: string;
};

const sizeClasses = {
  sm: 'w-32',
  md: 'w-64',
  lg: 'w-80',
  xl: 'w-96',
};

export function NodeTemplate({ children, color, size = 'md', textColor = 'text-zinc-200' }: NodeTemplateProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`${sizeClass} text-xs shadow-md ${color} p-[2px] rounded-md ${textColor}`}>
      {children}
    </div>
  );
}

interface NodeHeadingProps {
  title: string;
  canBeCompleted?: boolean;
  completedColor?: SwitchProps['color'];
}

export function NodeHeading({ title, canBeCompleted, completedColor = 'gray' }: NodeHeadingProps) {
  return (
    <div className='p-1 font-semibold flex justify-between'>
        <div>{title}</div>
        {canBeCompleted && (<Switch color={completedColor} size="1" />)}
    </div>
  )
}

type NodeBodyProps = {
  children?: React.ReactNode;
};

export function NodeBody({ children }: NodeBodyProps) {

  return (
    <div className={`flex flex-col gap-y-2 bg-zinc-950 text-zinc-200 rounded-md py-3 px-3 min-h-8`}>
      {children}
    </div>
  );
}
