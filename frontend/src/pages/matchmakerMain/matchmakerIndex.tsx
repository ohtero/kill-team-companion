import styled from 'styled-components';
import { GenericButton } from '../../components/UI/genericButton';
import { ContentSection } from '../../components/UI/contentSection';
import { ContentHeader } from '../../components/UI/contentHeader';
import { Form } from '../../components/UI/form';
import { FormSection } from '../../components/UI/formSection';
import { CreateMatchForm } from './createMatchForm';

/**
 * TODO: create functionality to find match form and extract to its own component
 */

export default function MatchMainPage() {
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
          <CreateMatchForm />
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
`;
