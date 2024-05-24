import styled from 'styled-components';
import { ContentSection } from '../../../components/UI/contentSection';
import { ContentHeader } from '../../../components/UI/contentHeader';
import { useMatchContext } from '../context/matchContext';

export function MatchDetails() {
  const { matchData } = useMatchContext();
  const playerNames = Object.values(matchData.players).map((player, index) => {
    if (player.name) {
      return (
        <li aria-label={`player${index + 1}Name`} key={index}>
          {player.name}
        </li>
      );
    }
  });

  return (
    <MatchInfo>
      <ContentHeader>{matchData.matchName}</ContentHeader>
      <section className="info">
        <section className="sub-info">
          <p>Match Id:</p>
          <p aria-label="matchId">{matchData.matchId}</p>
        </section>
        <section className="sub-info">
          <p>Match Link:</p>
          <p>www.asd.com</p>
        </section>
      </section>
      <Players>
        <h4>PLAYERS</h4>
        <ul>{playerNames}</ul>
      </Players>
    </MatchInfo>
  );
}

const MatchInfo = styled(ContentSection)`
  border: none;

  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    border: solid 2px HSLA(${(props) => props.theme.colors.primary});
    background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);

    & .sub-info:first-child {
      border-bottom: 2px solid HSLA(${(props) => props.theme.colors.primary});
    }
  }

  .sub-info {
    display: flex;
    width: 100%;
    padding: 12px;
    gap: 16px;
    justify-content: center;
  }
`;

const Players = styled.div`
  color: white;
  width: 100%;

  h4 {
    margin-bottom: 16px;
    font-weight: 700;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 16px;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    border: solid 2px HSLA(${(props) => props.theme.colors.primary});
    // background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);
  }

  li {
    background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);
    border: solid 1px HSLA(${(props) => props.theme.colors.primary}, 1);
    padding: 4px 8px;
    color: white;
    border-radius: 5px;
  }
`;
