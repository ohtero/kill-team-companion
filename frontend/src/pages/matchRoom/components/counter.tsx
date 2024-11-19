import styled from 'styled-components';
import { PlayerPoint } from '../types';
import { PointModifierButton } from './pointModifierButton';

export function Counter({ points, playerIndex, pointType }: PlayerPoint) {
  return (
    <CounterContainer>
      <div className="wrapper">
        <SubtractPointButton
          pointType={pointType}
          playerIndex={playerIndex}
          operation="subtract"
        >
          -
        </SubtractPointButton>
        <div className="point-display">
          <output role={`player${playerIndex + 1}${pointType}`}>
            {points}
          </output>
        </div>
        <AddPointButton
          pointType={pointType}
          playerIndex={playerIndex}
          operation="add"
        >
          +
        </AddPointButton>
      </div>
    </CounterContainer>
  );
}

const CounterContainer = styled.div`
  display: flex;
  flex-basis: 80%;
  align-items: center;

  button {
    border: 4px solid HSL(200, 10%, 70%);
  }

  .wrapper {
    display: flex;
    min-width: 50px;
    width: clamp(50px, 100%, 1000px);
    margin: 10px 0;
  }

  .wrapper > * {
    flex: 1;
  }

  .point-display {
    height: 75px;
    display: flex;
    flex-basis: 60%;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-size: 2rem;
    font-weight: 700;
    border-left: 4px solid HSL(200, 10%, 70%);
    border-right: 4px solid HSL(200, 10%, 70%);
  }
`;

const AddPointButton = styled(PointModifierButton)`
  min-width: 60px;
  border-radius: 0 10px 10px 0;
  font-size: 2rem;
  background: linear-gradient(to top, HSL(200, 10%, 80%) 0%, #fff 50%);
`;

const SubtractPointButton = styled(PointModifierButton)`
  min-width: 60px;
  border-radius: 10px 0 0 10px;
  font-size: 2rem;
  background: linear-gradient(to top, HSL(200, 10%, 80%) 0%, #fff 50%);
`;
