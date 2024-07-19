import styled from 'styled-components';
import { Device } from '../globalStyling/breakpoints';

export function DesktopView({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  @media (max-width: ${Device.smMax}) {
    display: none;
  }
`;
