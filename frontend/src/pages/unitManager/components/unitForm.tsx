import styled from 'styled-components';
import { Form } from '../../../components/UI/form';
import { FormSection } from '../../../components/UI/formSection';
import { StatInputContainer } from './statInputContainer';
import { StatInput } from './statInput';
import { Device } from '../../../globalStyling/breakpoints';
import { PropertySelector } from './propertySelector';
import { WeaponCombinations } from './weaponCombinations';
import { useState } from 'react';
import { FormSectionHeader } from '../../../components/UI/formSectionHeader';

export function UnitForm() {
  function onSubmit() {
    return;
  }

  const [weapons] = useState(['power sword', 'gun butt', 'bolter']);

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        <FormSection>
          <label htmlFor="unitName">Unit Name</label>
          <input type="text" id="unitName" />
        </FormSection>
        <FormSection>
          <label htmlFor="killTeam">Kill Team</label>
          <select className="kill-team-select" name="killTeam" id="killTeam">
            <option value="team1">team1</option>
            <option value="team2">team2</option>
          </select>
        </FormSection>
      </FormRow>
      <FormSection>
        <label htmlFor="keywords">Keywords</label>
        <input type="text" id="keywords" />
      </FormSection>
      <FormSection>
        <FormSectionHeader>Stats</FormSectionHeader>
        <StatInputContainer>
          <StatInput
            statName="M"
            rangeStart={4}
            rangeEnd={6}
            step={2}
            statType="movement"
          />
          <StatInput statName="APL" rangeStart={2} rangeEnd={3} />
          <StatInput statName="GA" rangeStart={1} rangeEnd={2} />
          <StatInput statName="D" rangeStart={2} rangeEnd={3} />
          <StatInput
            statName="Save"
            rangeStart={2}
            rangeEnd={6}
            statType="dye"
          />
          <StatInput statName="W" rangeStart={5} rangeEnd={19} />
          <StatInput
            statName="Base"
            rangeStart={2}
            rangeEnd={6}
            statType="base"
          />
        </StatInputContainer>
      </FormSection>
      <FormSection>
        <ExtendedFormRow>
          <PropertySelector title="Weapons" />
          <PropertySelector title="Abilities" />
          <PropertySelector title="Unique Actions" />
        </ExtendedFormRow>
      </FormSection>
      <FormSection>
        <WeaponCombinations weapons={weapons} />
      </FormSection>
    </Form>
  );
}

const FormRow = styled.section`
  display: flex;
  flex: 1;
  gap: 16px;
  // flex-wrap: wrap;
  @media (width < ${Device.smMax}) {
    flex-direction: column;
  }
`;

const ExtendedFormRow = styled(FormRow)`
  flex-wrap: nowrap;
  @media (width < ${Device.smMax}) {
    flex-direction: column;
  }
`;
