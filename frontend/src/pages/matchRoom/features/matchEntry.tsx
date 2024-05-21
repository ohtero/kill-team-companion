import { ContentSection } from '../../../components/UI/contentSection';
import { ContentHeader } from '../../../components/UI/contentHeader';
import { useNavigate } from 'react-router-dom';
import { MatchEntryProps } from '../types';
import { NameInputForm } from '../components/nameInputForm';

export function MatchEntry({
  matchId,
  matchIsFull,
  updatePlayerInMatch,
  socket
}: MatchEntryProps) {
  const navigate = useNavigate();

  return (
    <>
      <ContentSection>
        <ContentHeader>MATCH LOBBY</ContentHeader>
        <section className="instructions">
          <h3></h3>
          {!matchIsFull ? (
            <p>
              Select your display name or choose 'Spectator' if you wish to only
              spectate the match.
            </p>
          ) : (
            <p>
              Match is full! <br />
              <br />
              Click 'Spectator' to observe the match.
            </p>
          )}
        </section>
        <NameInputForm
          socket={socket}
          matchId={matchId}
          matchIsFull={matchIsFull}
          updatePlayerInMatch={updatePlayerInMatch}
        />
        <button
          type="button"
          name="returnToMatchmaker"
          onClick={() => navigate('/matchmaker')}
        >
          Return
        </button>
      </ContentSection>
    </>
  );
}
