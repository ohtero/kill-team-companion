import { ContentSection } from '../../components/UI/contentSection';
import { ContentHeader } from '../../components/UI/contentHeader';
import { Form } from '../../components/UI/form';
import { FormSection } from '../../components/UI/formSection';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MatchLobbyFormInput, MatchLobbyProps } from './types';
import { useEffect } from 'react';
import { ErrorMsg } from '../../components/UI/errorMsg';

export function MatchLobby({
  matchId,
  matchData,
  playerInMatch,
  matchIsFull,
  updateMatchIsFull,
  updatePlayerInMatch
}: MatchLobbyProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<MatchLobbyFormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 500
  });

  useEffect(() => {
    if (matchData.player4_name) {
      updateMatchIsFull(true);
    }
  }, [matchData]);

  const addPlayerDisplayName: SubmitHandler<MatchLobbyFormInput> = async (
    formData
  ) => {
    const body = {
      playerName: formData.displayName
    };

    try {
      const res = await fetch(
        `http://localhost:3000/match/new-player/${matchId}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      );
      let resData = '';
      if (res) {
        const data = (await res.json()) as string;
        resData = data;
      }
      if (res.status === 200) {
        localStorage.setItem('playerName', resData);
        dispatchEvent(
          new StorageEvent('storage', { key: 'playerName', newValue: resData })
        );
        updatePlayerInMatch(true);
      } else if (res.status === 500) {
        throw new Error(resData);
      }
    } catch (error) {
      const err = error as Error;
      console.log(error);
      setError('root.serverError', {
        type: 'server',
        message: `${err.message}`
      });
    }
  };

  return (
    <>
      {playerInMatch ? (
        <p>asd</p>
      ) : (
        <ContentSection>
          <ContentHeader>MATCH LOBBY</ContentHeader>
          <section className="instructions">
            <h3></h3>
            {!matchIsFull ? (
              <p>
                Select your display name or choose 'Spectator' if you wish to
                only spectate the match.
              </p>
            ) : (
              <p>
                Match is full! <br />
                <br />
                Click 'Spectator' to observe the match.
              </p>
            )}
          </section>
          <Form onSubmit={handleSubmit(addPlayerDisplayName)}>
            <FormSection>
              <label htmlFor="displayName">Name</label>
              <input
                {...register('displayName', {
                  required: { value: true, message: 'Name is required' },
                  maxLength: { value: 50, message: 'Name is too long' },
                  validate: (value) =>
                    value.trim().length > 0 ||
                    "Name can't be only empty spaces."
                })}
                type="text"
                name="displayName"
                id="displayName"
                placeholder="Your display name"
                disabled={matchIsFull}
              />
            </FormSection>
            <ErrorMsg $centered>
              {errors.root?.serverError && errors.root?.serverError.message}
            </ErrorMsg>
            <FormSection>
              <button
                type="submit"
                name="confirmDisplayName"
                disabled={matchIsFull}
              >
                Confirm Name
              </button>
              <button type="button" name="spectateMatch">
                Spectator
              </button>
            </FormSection>
          </Form>
          <button
            type="button"
            name="returnToMatchmaker"
            onClick={() => navigate('/matchmaker')}
          >
            Return
          </button>
        </ContentSection>
      )}
    </>
  );
}
