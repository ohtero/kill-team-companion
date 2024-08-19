import styled from 'styled-components';
import { TurnIndicator } from './turnIndicator';
import { useMatchContext } from '../context/matchContext';
import { ContentHeader } from '../../../components/UI/contentHeader';

export function TurnCounter() {
  const { matchData, modifyTurnCount } = useMatchContext();
  return (
    <TurningPointContainer>
      <ContentHeader>Turning Point</ContentHeader>
      <Counter>
        <button
          className="subtract"
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
          className="add"
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
  background: #fff;
  height: fit-content;
  border-radius: 10px 10px 10px 10px;

  ul {
    border-bottom: 4px solid HSL(200, 10%, 70%);
    border-top: 4px solid HSL(200, 10%, 70%);
    display: flex;
    width: 100%;
    list-style: none;
    padding: 0;
    align-items: center;
    font-size: 2rem;
    background: HSL(200, 10%, 80%);
    gap: 2px;
  }

  button {
    aspect-ratio: 1 / 1;
    border: 4px solid HSL(200, 10%, 70%);
    background: linear-gradient(to top, HSL(200, 10%, 80%) 0%, #fff 60%);
  }

  .add {
    border-radius: 0 10px 10px 0;
  }

  .subtract {
    border-radius: 10px 0 0 10px;
  }
`;
