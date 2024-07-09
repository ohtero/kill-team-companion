import React from 'react';
import styled from 'styled-components';

export function FormSectionHeader({ children }: { children: React.ReactNode }) {
  return <Heading>{children}</Heading>;
}

const Heading = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0px;
  color: white;
`;
