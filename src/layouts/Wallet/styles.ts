import styled from 'styled-components';

interface ButtonProps {
  height?: number;
}

export const StyledButton = styled.button<ButtonProps>`
  height: ${({ height }) => (height ? height + 'px' : '3.875rem')}; /* 62px */
  border-radius: 0.75rem; /* 12px */
  background-color: #68a3f4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  transform: skew(-25deg);
  margin-right: 1rem;
  &:hover {
    color: #43e3ff;
  }
  div {
    transform: skew(25deg);
  }
`;
