import styled from 'styled-components';
import { useMatchContext } from '../context/matchContext';
import { PointModifyButtonProps } from '../types';

export function PointModifierButton({
  children,
  pointType,
  playerIndex,
  operation,
  className
}: PointModifyButtonProps) {
  const { modifyPlayerPoints } = useMatchContext();
  return (
    <ModifyButton
      className={className}
      aria-label={`${operation} ${pointType} to player${playerIndex + 1}`}
      onClick={() => modifyPlayerPoints(playerIndex, pointType, operation)}
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
