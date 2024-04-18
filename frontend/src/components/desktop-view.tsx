import styled from 'styled-components';
import { Device } from '../config/breakpoints';

type Props = {
  children: React.ReactNode;
};

export function DesktopView({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  @media (max-width: ${Device.smMax}) {
    display: none;
  }
`;
