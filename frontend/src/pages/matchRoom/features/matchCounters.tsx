import styled from 'styled-components';
import { ContentSection } from '../../../components/UI/contentSection';
import { TurnCounter } from '../components/turnCounter';
import { PlayerCounters } from '../components/playerCounters';
import { Device } from '../../../globalStyling/breakpoints';

export function MatchCounters() {
  return (
    <CountersContainer>
      <TurnCounter />
      <PlayerCounters />
    </CountersContainer>
  );
}

const CountersContainer = styled(ContentSection)`
  border: none;
  @media (max-width: ${Device.smMax}) {
    padding: 8px;
  }
`;
