import styled from 'styled-components';
import { Counter } from './counter';
import { useMatchContext } from '../context/matchContext';

export function PlayerCounters() {
  const { matchData } = useMatchContext();
  const players = { ...matchData.players };
  const playerNames = Object.values(players).map((player, index) => {
    if (player.name) {
      return <p key={index}>{player.name}</p>;
    }
  });

  function createPointCounters(pointType: 'commandPoint' | 'victoryPoint') {
    const pointCounters = Object.values(players).map((player, index) => {
      if (player.name) {
        switch (pointType) {
          case 'commandPoint':
            return (
              <Counter
                key={index}
                points={player.cp}
                playerIndex={index}
                pointType="cp"
              />
            );
          case 'victoryPoint':
            return (
              <Counter
                key={index}
                points={player.vp}
                playerIndex={index}
                pointType="vp"
              />
            );
        }
      }
    });
    return pointCounters;
  }

  return (
    <PlayerCountersContainer>
      <h4>Player Points</h4>
      <section className="player-names">{playerNames}</section>
      <CounterSection>
        <h5>Command Points</h5>
        <section className="counters">
          {createPointCounters('commandPoint')}
        </section>
      </CounterSection>
      <CounterSection>
        <h5>Victory Points</h5>
        <section className="counters">
          {createPointCounters('victoryPoint')}
        </section>
      </CounterSection>
    </PlayerCountersContainer>
  );
}

const PlayerCountersContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;

  .player-names {
    display: flex;
    width: 100%;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    gap: 8px;
    margin-bottom: 8px;
  }

  p {
    flex-basis: 100%;
    background: #eee;
    padding: 8px 4px;
    border-radius: 10px 0px 10px 0px;
    font-weight: 500;
    border: 2px solid HSL(200, 10%, 70%);
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: black;
  }

  h4 {
    padding: 8px;
    color: HSL(${(props) => props.theme.colors.tertiary});
    border: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
    margin-bottom: 32px;
  }

  h5 {
    padding: 6px;
    border-bottom: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
    border-top: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
    color: white;
    letter-spacing: 1px;
  }
`;

const CounterSection = styled.section`
  width: 100%;

  .counters {
    display: flex;
    width: 100%;
    gap: 8px;
  }
`;
