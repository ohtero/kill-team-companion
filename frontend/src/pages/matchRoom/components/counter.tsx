import styled from 'styled-components';
import { PlayerPoint } from '../types';
import { useMatchContext } from '../context/matchContext';

export function Counter({ points, playerIndex, pointType }: PlayerPoint) {
  const { modifyPlayerPoints } = useMatchContext();
  return (
    <CounterContainer>
      <div className="wrapper">
        <button
          aria-label={`add ${pointType} to player${playerIndex + 1}`}
          className="add-point"
          onClick={() => modifyPlayerPoints(playerIndex, pointType, 'add')}
        >
          +
        </button>
        <div className="point-display">
          <output role={`player${playerIndex + 1}${pointType}`}>
            {points}
          </output>
        </div>
        <button
          aria-label={`subtract ${pointType} from player${playerIndex + 1}`}
          className="sub-point"
          onClick={() =>
            points > 0 && modifyPlayerPoints(playerIndex, pointType, 'subtract')
          }
        >
          -
        </button>
      </div>
    </CounterContainer>
  );
}

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  align-items: center;

  button {
    // border: 4px solid #eee;
    border: 4px solid HSL(200, 10%, 70%);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    min-width: 50px;
    width: clamp(50px, 100%, 1000px);
    margin: 10px 0;
  }

  .wrapper > * {
    height: 75px;
  }

  .point-display {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font-size: 2.5rem;
    font-weight: 700;
    border: 4px solid #eee;
  }

  .add-point {
    border-radius: 10px 10px 0 0;
    font-size: 2.5rem;
    background: linear-gradient(to top, HSL(200, 10%, 80%) 0%, #fff 50%);
  }
  .sub-point {
    border-radius: 0 0 10px 10px;
    font-size: 2.5rem;
    background: linear-gradient(to bottom, HSL(200, 10%, 80%) 0%, #fff 50%);
    // border: 4px solid HSL(200, 10%, 80%);
  }
`;
