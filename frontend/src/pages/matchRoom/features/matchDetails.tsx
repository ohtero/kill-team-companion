import styled from 'styled-components';
import { ContentSection } from '../../../components/UI/contentSection';
import { ContentHeader } from '../../../components/UI/contentHeader';
import { useMatchContext } from '../context/matchContext';
import { GenericButton } from '../../../components/UI/genericButton';

export function MatchDetails() {
  const { matchData } = useMatchContext();
  const url = window.location.toString();
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
          <p aria-label="matchId">Match Id: {matchData.matchId}</p>
        </section>
        <section className="sub-info">
          <GenericButton
            aria-label="copyMatchId"
            handleClick={() => navigator.clipboard.writeText(matchData.matchId)}
          >
            Copy Id
          </GenericButton>
          <GenericButton
            aria-label="copyLink"
            handleClick={() => navigator.clipboard.writeText(url)}
          >
            Copy Link
          </GenericButton>
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
  background: none;

  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    border: solid 2px HSLA(${(props) => props.theme.colors.primary});

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
    align-items: center;
    flex-wrap: wrap;
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
  }

  li {
    background: #ccc;
    border: solid 1px HSLA(${(props) => props.theme.colors.primary}, 1);
    padding: 4px 8px;
    color: black;
    border-radius: 5px;
  }
`;
