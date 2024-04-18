import { ContentSection } from '../components/UI/contentSection';
import { ContentHeader } from '../components/UI/contentHeader';
import { Form } from '../components/UI/form';
import { FormSection } from '../components/UI/formSection';
import { useNavigate } from 'react-router-dom';

export function MatchLobby() {
  const navigate = useNavigate();

  return (
    <ContentSection>
      <ContentHeader>MATCH LOBBY</ContentHeader>
      <section className="instructions">
        <h3></h3>
        <p>
          Select your display name or choose 'Spectator' if you wish to only
          spectate the match.
        </p>
      </section>
      <Form onSubmit={placeholderFunction}>
        <FormSection>
          <label htmlFor="displayName">Name</label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            placeholder="Your display name"
          />
        </FormSection>
        <FormSection>
          <button type="submit" name="confirmDisplayName">
            Confirm Name
          </button>
          <button type="submit" name="spectateMatch">
            Spectator
          </button>
          <button
            type="button"
            name="returnToMatchmaker"
            onClick={returnToMatchMainPage}
          >
            Return
          </button>
        </FormSection>
      </Form>
    </ContentSection>
  );

  function placeholderFunction() {}

  function returnToMatchMainPage() {
    navigate('/matchmaker');
  }
}
