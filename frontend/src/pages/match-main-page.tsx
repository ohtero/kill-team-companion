import styled from 'styled-components';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { GenericButton } from '../components/UI/genericButton';
import { ContentSection } from '../components/UI/contentSection';
import { ContentHeader } from '../components/UI/contentHeader';
import { Form } from '../components/UI/form';
import { FormSection } from '../components/UI/formSection';

enum Missions {
  select = 'Select...',
  mission1 = 'Mission 1',
  mission2 = 'Mission 2'
}

interface FormInputs {
  matchName: string;
  mission: Missions;
}

type MissionTypes = {
  name: string;
  rules: string;
  actions: string;
};

export default function MatchMainPage() {
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
        navigateToMatchLobby(data);
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

  function navigateToMatchLobby(matchId: string) {
    navigate({
      pathname: '/match',
      search: `?${createSearchParams([['id', matchId]])}`
    });
  }

  function setMissionText(name: string, rules: string, actions: string) {
    setSelectedMission({ name: name, rules: rules, actions: actions });
  }

  function placeholderFunction() {}

  return (
    <ComponentWrapper>
      <ContentSection>
        <ContentHeader>JOIN MATCH</ContentHeader>
        <Form onSubmit={placeholderFunction}>
          <FormSection>
            <label htmlFor="matchSearch">Match Id (10 characters)</label>
            <input
              type="text"
              name="matchSearch"
              id="matchSearch"
              placeholder="Match ID"
            />
          </FormSection>
          <FormSection>
            <GenericButton
              type="submit"
              name="initiateSearch"
              text="SEARCH"
              $orange
            />
          </FormSection>
        </Form>
      </ContentSection>
      <MatchCreate>
        <ContentSection>
          <ContentHeader>CREATE MATCH</ContentHeader>
          <Form onSubmit={handleSubmit(createMatch)}>
            <FormSection>
              <div className="label-and-error">
                <label htmlFor="matchName">
                  Match Name (Max 50 characters)
                </label>
                <p className="error">
                  {errors.matchName && errors.matchName.message}
                </p>
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
                  <option
                    value="select"
                    onClick={() => setSelectedMission(null)}
                  >
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
              <p className="error submit-error">
                {errors.root?.serverError && errors.root.serverError.message}
              </p>
            </FormSection>
          </Form>
        </ContentSection>
      </MatchCreate>
    </ComponentWrapper>
  );
}

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 64px;
`;

const MatchCreate = styled.section`
  display: flex;
  flex-direction: column;
  // background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);

  .mission-selection {
    display: flex;
  }

  .mission-selection-inputs {
    display: flex;
    gap: 16px;
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  .mission-selection-inputs > * {
    flex: 1;
    // padding: 10px;
  }

  .selected-mission-display {
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 16px;
    padding: 16px;
    background: HSLA(${(props) => props.theme.colors.primary}, 0.5);
  }

  #matchName {
    font-size: 1.5rem;
  }

  #mission {
    font-size: 1.25rem;
  }

  .label-and-error {
    display: flex;
    gap: 16px;
  }

  .error {
    height: 16px;
    color: HSL(360, 100%, 90%);
  }

  .submit-error {
    margin-top: 16px;
    place-self: center;
  }
`;
