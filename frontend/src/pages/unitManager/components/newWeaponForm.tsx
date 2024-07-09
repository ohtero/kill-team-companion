import { Form } from '../../../components/UI/form';
import { FormSection } from '../../../components/UI/formSection';
import { StatInput } from './statInput';
import { StatInputContainer } from './statInputContainer';

export function NewWeaponForm() {
  function placeholder() {
    return;
  }
  return (
    <Form onSubmit={placeholder}>
      <FormSection>
        <label htmlFor="weaponName">Weapon Name</label>
        <input type="text" id="weaponName" />
      </FormSection>
      <FormSection>
        <label>Stats</label>
        <StatInputContainer>
          <StatInput statName="A" rangeStart={2} rangeEnd={6} />
          <StatInput
            statName="WS/BS"
            statType="dye"
            rangeStart={2}
            rangeEnd={6}
          />
          <StatInput statName="D" rangeStart={2} rangeEnd={6} />
        </StatInputContainer>
      </FormSection>
      <FormSection>
        <label htmlFor=""></label>
      </FormSection>
    </Form>
  );
}
