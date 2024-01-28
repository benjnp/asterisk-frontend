import React from 'react';

import { OpenNewIcon } from '../Svg';
import Link from './Link';
import { LinkProps } from './types';

const LinkExternal: React.FC<React.PropsWithChildren<LinkProps>> = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon />
    </Link>
  );
};

export default LinkExternal;
