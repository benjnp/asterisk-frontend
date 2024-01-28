import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { CircleLoader } from '@/components/Loader';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'dark' | 'white';
  children?: ReactNode | undefined;
  loading?: boolean;
}

const stylesButton = {
  dark: 'bg-neutral-900 text-neutral-200',
  white: 'bg-white border border-neutral-900 text-neutral-900',
};
const defaultStyle = 'p-3 rounded-lg text-base leading-5 disabled:bg-neutral-500';
const Button = (props: Props) => {
  const { theme = 'dark', children, className, loading, disabled, ...prop } = props;
  return (
    <button
      {...prop}
      disabled={loading || disabled}
      className={classNames(defaultStyle, stylesButton[theme], className)}
    >
      <span className="flex justify-center items-center gap-x-1">
        {children}
        {loading && <CircleLoader stroke="white" />}
      </span>
    </button>
  );
};

export default Button;
