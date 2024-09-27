import styled from 'styled-components';
import { useMatchContext } from '../context/matchContext';
import { PointModifyButtonProps } from '../types';
import { NormalizedMatchData } from '../../../types/databaseTypes';

export function PointModifierButton({
  children,
  pointType,
  playerIndex,
  operation,
  className
}: PointModifyButtonProps) {
  const { modifyPlayerPoints, matchData } = useMatchContext();

  function isAllowed() {
    const player =
      `player${playerIndex + 1}` as keyof NormalizedMatchData['players'];
    const point = matchData.players[player][pointType];
    if ((operation === 'subtract' && point > 0) || operation === 'add') {
      return true;
    }
  }

  const name =
    operation === 'add'
      ? `add ${pointType} to player${playerIndex + 1}`
      : `subtract ${pointType} from player${playerIndex + 1}`;
  return (
    <ModifyButton
      className={className}
      aria-label={name}
      onClick={() =>
        isAllowed() && modifyPlayerPoints(playerIndex, pointType, operation)
      }
    >
      {children}
    </ModifyButton>
  );
}

const ModifyButton = styled.button`
  button {
    border: 4px solid HSL(200, 10%, 70%);
  }
`;
