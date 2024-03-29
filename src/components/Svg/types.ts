import { ElementType, SVGAttributes } from 'react';
import { DefaultTheme } from 'styled-components';
import { SpaceProps } from 'styled-system';

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme;
  spin?: boolean;
}

export type IconComponentType = {
  icon: ElementType<any>;
  fillIcon?: ElementType<any>;
  isActive?: boolean;
  height?: string;
  width?: string;
  activeColor?: string;
} & SvgProps;
