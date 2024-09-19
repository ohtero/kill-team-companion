// TODO: Implement displaying of mission details when mission selection on match creation is implemented.

import { useEffect } from 'react';
import { ContentSection } from '../../../components/UI/contentSection';
import { Form } from '../../../components/UI/form';
import { FormSection } from '../../../components/UI/formSection';
import { useForm } from 'react-hook-form';

export function ArchetypeSelector({
  setArchetype
}: {
  setArchetype: (arg0: string) => void;
}) {
  const { register, watch } = useForm<{ archetype: string }>();
  const selectedOption = watch('archetype');

  useEffect(() => {
    selectedOption && setArchetype(selectedOption);
  }, [selectedOption]);

  return (
    <ContentSection>
      <Form>
        <FormSection>
          <label htmlFor="archetype">Archetype</label>
          <select id="archetype" {...register('archetype')}>
            <optgroup label="Archetypes">
              <option value="infiltration">Infiltration</option>
              <option value="Recon">Recon</option>
              <option value="security">Security</option>
              <option value="seekAndDestroy">Seek and Destroy</option>
            </optgroup>
            <optgroup label="Factions">
              <option value="farstalkerKinband">Farstalker Kinband</option>
              <option value="hunterCadre">Hunter Cadre</option>
              <option value="intercessors">Intercessors</option>
              <option value="kasrkin">Kasrkin</option>
              <option value="kommandos">Kommandos</option>
              <option value="novitiates">Novitiates</option>
              <option value="pathfinders">Pathfinders</option>
              <option value="veteranGuard">Veteran Guard</option>
            </optgroup>
          </select>
        </FormSection>
      </Form>
    </ContentSection>
  );
}
