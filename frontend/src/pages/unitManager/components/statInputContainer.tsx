import styled from 'styled-components';
import { Device } from '../../../globalStyling/breakpoints';

export function StatInputContainer({
  children
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  @media (width < ${Device.smMin}) {
    flex-direction: column;
  }
`;
