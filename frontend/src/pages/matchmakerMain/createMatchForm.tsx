import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Form } from '../../components/UI/form';
import { ErrorMsg } from '../../components/UI/errorMsg';
import { FormSection } from '../../components/UI/formSection';
import { GenericButton } from '../../components/UI/genericButton';
import { FormInputs, MissionTypes } from './types';

export function CreateMatchForm() {
  const [selectedMission, setSelectedMission] = useState<MissionTypes | null>(
    null
  );
  const [creationIsPending, setCreationIsPending] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    delayError: 500
  });

  const createMatch: SubmitHandler<FormInputs> = async () => {
    try {
      setCreationIsPending(true);
      const res = await fetch('http://localhost:3000/match/new-match', {
        method: 'POST',
        mode: 'cors'
      });

      if (res.status === 200) {
        const data = await res.json();
        navigateToMatchEntry(data);
      } else {
        throw new Error(`Could not create match! Status: ${res.status}`);
      }
    } catch (err) {
      const error = err as Error;
      setError('root.serverError', {
        type: 'server',
        message: `${error.message}`
      });
      console.log(err);
    } finally {
      setCreationIsPending(false);
    }
  };

  function navigateToMatchEntry(matchId: string) {
    navigate({
      pathname: '/match',
      search: `?${createSearchParams([['id', matchId]])}`
    });
  }

  function setMissionText(name: string, rules: string, actions: string) {
    setSelectedMission({ name: name, rules: rules, actions: actions });
  }
  return (
    <Form onSubmit={handleSubmit(createMatch)}>
      <FormSection>
        <div className="label-and-error">
          <label htmlFor="matchName">Match Name (Max 50 characters)</label>
          <ErrorMsg>{errors.matchName && errors.matchName.message}</ErrorMsg>
        </div>
        <input
          type="text"
          {...register('matchName', {
            required: { value: true, message: 'Match name is required.' },
            maxLength: { value: 50, message: 'Mach name is to long.' },
            validate: (value) =>
              value.trim().length > 0 ||
              "Match name can't be only empty spaces."
          })}
          name="matchName"
          id="matchName"
          placeholder="My match"
        />
      </FormSection>
      <FormSection>
        <div className="label-and-error">
          <label htmlFor="mission">Mission</label>
        </div>
        <div className="mission-selection-inputs">
          <select {...register('mission')} name="mission" id="mission">
            <option value="select" onClick={() => setSelectedMission(null)}>
              Select...
            </option>
            <option
              value="mission1"
              onClick={() =>
                void setMissionText(
                  'Mission 1',
                  'Rules placeholder',
                  'Actions placeholder'
                )
              }
            >
              Mission 1
            </option>
            <option
              value="mission2"
              onClick={() =>
                void setMissionText(
                  'mission 2',
                  'Rules placeholder',
                  'Actions placeholder'
                )
              }
            >
              Mission 2
            </option>
          </select>
          <GenericButton
            type="button"
            name="randomizeMission"
            text="Randomize Mission"
          />
        </div>
        {selectedMission && (
          <section className="selected-mission-display">
            <h3>{selectedMission.name}</h3>
            <p>{selectedMission.rules}</p>
            <p>{selectedMission.actions}</p>
          </section>
        )}
      </FormSection>
      <FormSection>
        <GenericButton
          type="submit"
          name="createMatch"
          text={creationIsPending ? 'CREATING...' : ' CREATE'}
          disabled={creationIsPending}
          $orange
        />
        <ErrorMsg>
          {errors.root?.serverError && errors.root.serverError.message}
        </ErrorMsg>
      </FormSection>
    </Form>
  );
}
