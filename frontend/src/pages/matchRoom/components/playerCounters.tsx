import styled from 'styled-components';
import { Counter } from './counter';
import { useMatchContext } from '../context/matchContext';
import { ContentHeader } from '../../../components/UI/contentHeader';

export function PlayerCounters() {
  const { matchData } = useMatchContext();
  const players = { ...matchData.players };

  function createPointCounters() {
    const pointCounters = Object.values(players).map((player, index) => {
      if (player.name) {
        return (
          <CounterSection id={player.name}>
            <PlayerName>{player.name}</PlayerName>
            <CounterRow>
              <PointType>CP</PointType>
              <Counter
                key={index}
                points={player.cp}
                playerIndex={index}
                pointType="cp"
              />
            </CounterRow>
            <CounterRow>
              <PointType>Crit Op</PointType>
              <Counter
                key={index}
                points={player.critOp}
                playerIndex={index}
                pointType="critOp"
              />
            </CounterRow>
            <CounterRow>
              <PointType>Tac Op</PointType>
              <Counter
                key={index}
                points={player.tacOp}
                playerIndex={index}
                pointType="tacOp"
              />
            </CounterRow>
            <CounterRow>
              <PointType>Kill Op</PointType>
              <Counter
                key={index}
                points={player.killOp}
                playerIndex={index}
                pointType="killOp"
              />
            </CounterRow>
          </CounterSection>
        );
      }
    });
    return pointCounters;
  }

  return (
    <PlayerCountersContainer>
      <CounterHeader>Player Points</CounterHeader>
      {createPointCounters()}
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

  h4 {
    padding: 8px;
    color: HSL(${(props) => props.theme.colors.tertiary});
    border: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
    margin-bottom: 32px;
  }
`;

const CounterHeader = styled(ContentHeader)`
  padding-bottom: 32px;
`;

const CounterSection = styled.section`
  display: flex;
  flex-direction: column;

  .point-type {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 20%;
    // padding: 6px;
    // border-bottom: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
    // border-top: 2px solid HSLA(${(props) => props.theme.colors.tertiary});
    color: white;
    letter-spacing: 1px;
  }
`;

const CounterRow = styled.section`
  display: flex;
`;

const PointType = styled.p`
  flex-basis: 20%;
  display: grid;
  place-content: center;
`;

const PlayerName = styled.p`
  background: #eee;
  padding: 8px 4px;
  border-radius: 10px 0px 10px 0px;
  font-weight: 500;
  border: 2px solid HSL(200, 10%, 70%);
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black !important;
`;
