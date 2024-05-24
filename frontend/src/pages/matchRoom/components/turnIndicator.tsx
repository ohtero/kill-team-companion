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

  border: ${(props) =>
    props.$ownTurn === props.$currentTurn
      ? `4px solid HSLA(${props.theme.colors.tertiary})`
      : 'none'};
`;
