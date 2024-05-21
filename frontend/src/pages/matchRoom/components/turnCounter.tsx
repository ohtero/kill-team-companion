import styled from 'styled-components';
import { TurnIndicator } from './turnIndicator';
import { useMatchContext } from '../context/matchContext';

export function TurnCounter() {
  const { matchData, modifyTurnCount } = useMatchContext();
  return (
    <TurningPointContainer>
      <h4>Turning Point</h4>
      <Counter>
        <button
          onClick={() =>
            matchData.turningPoint > 1 && modifyTurnCount('subtract')
          }
        >
          -
        </button>
        <ul>
          <TurnIndicator
            key={1}
            currentTurn={matchData.turningPoint}
            turnValue={1}
          />
          <TurnIndicator
            key={2}
            currentTurn={matchData.turningPoint}
            turnValue={2}
          />
          <TurnIndicator
            key={3}
            currentTurn={matchData.turningPoint}
            turnValue={3}
          />
          <TurnIndicator
            key={4}
            currentTurn={matchData.turningPoint}
            turnValue={4}
          />
        </ul>
        <button
          onClick={() => matchData.turningPoint < 4 && modifyTurnCount('add')}
        >
          +
        </button>
      </Counter>
    </TurningPointContainer>
  );
}

const TurningPointContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;

  h4 {
    padding: 8px;
    color: HSL(${(props) => props.theme.colors.tertiary});
    border: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
  }
`;

const Counter = styled.div`
  display: flex;
  width: 100%;
  background: #eee;
  height: fit-content;

  ul {
    display: flex;
    width: 100%;
    list-style: none;
    padding: 0;
    align-items: center;
    font-size: 2rem;
  }

  button {
    aspect-ratio: 1 / 1;
  }
`;
