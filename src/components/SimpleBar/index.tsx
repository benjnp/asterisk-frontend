import { PropsWithChildren } from 'react';

interface SimpleBarProps extends PropsWithChildren {
  className?: string;
}

export default function SimpleBar({ className, children }: SimpleBarProps) {
  return <div className={'overflow-auto pr-1 ' + className}>{children}</div>;
}
