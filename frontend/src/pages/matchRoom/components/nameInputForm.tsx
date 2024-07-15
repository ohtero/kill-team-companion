import { NameInputFormTypes, MatchEntryFormInput } from '../types';
import { Form } from '../../../components/UI/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMsg } from '../../../components/UI/errorMsg';
import { FormSection } from '../../../components/UI/formSection';

// ? See if the submitHandler should be extracted to Utils.

export function NameInputForm({
  socket,
  matchId,
  matchIsFull,
  updatePlayerInMatch,
  onTestSubmit
}: NameInputFormTypes) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<MatchEntryFormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 500
  });

  const addPlayerDisplayName: SubmitHandler<MatchEntryFormInput> = async (
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
        updatePlayerInMatch && updatePlayerInMatch(true);
        socket?.emit('newPlayer', { playerName: resData, matchId: matchId });
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
    <Form onSubmit={() => handleSubmit(onTestSubmit ?? addPlayerDisplayName)}>
      <FormSection>
        <label htmlFor="displayName">Name</label>
        <input
          {...register('displayName', {
            required: { value: true, message: 'Name is required' },
            maxLength: { value: 20, message: 'Name is too long' },
            validate: (value) =>
              value.trim().length > 0 || "Name can't be only empty spaces."
          })}
          type="text"
          name="displayName"
          id="displayName"
          placeholder="Your display name"
          disabled={matchIsFull}
        />
      </FormSection>
      <ErrorMsg $centered>
        {errors.root?.serverError.message}
        {errors?.displayName?.message}
      </ErrorMsg>
      <FormSection>
        <button type="submit" name="confirmDisplayName" disabled={matchIsFull}>
          Confirm Name
        </button>
        <button
          type="button"
          name="spectateMatch"
          onClick={() => updatePlayerInMatch && updatePlayerInMatch(true)}
        >
          Spectator
        </button>
      </FormSection>
    </Form>
  );
}
