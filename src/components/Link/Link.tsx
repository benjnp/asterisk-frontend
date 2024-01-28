import React from "react";
import styled from "styled-components";
import { LinkProps } from "./types";

const EXTERNAL_LINK_PROPS: { target: string; rel: string } = {
  target: "_blank",
  rel: "noreferrer noopener",
};

const StyledLink = styled.a<LinkProps>`
  display: flex;
  align-items: center;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`;

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({ external, ...props }) => {
  const internalProps = external ? EXTERNAL_LINK_PROPS : {};
  return <StyledLink {...internalProps} {...props} />;
};

export default Link;
