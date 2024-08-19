import styled from 'styled-components';
import { TurnIndicatorProps } from '../types';

export function TurnIndicator({ currentTurn, turnValue }: TurnIndicatorProps) {
  return (
    <>
      <Indicator
        aria-label={`turn${turnValue}Indicator`}
        $currentTurn={currentTurn}
        $ownTurn={turnValue}
      >
        {turnValue}
      </Indicator>
    </>
  );
}

const Indicator = styled.li<{ $ownTurn: number; $currentTurn: number }>`
  display: flex;
  place-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: white;

  border: ${(props) =>
    props.$ownTurn === props.$currentTurn
      ? `3px solid HSLA(${props.theme.colors.tertiary})`
      : '3px solid transparent'};
`;
