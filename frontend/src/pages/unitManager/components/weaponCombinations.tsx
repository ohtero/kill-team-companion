import styled from 'styled-components';
import { WeaponSet } from './weaponSet';
import { useState } from 'react';
import { FormSectionHeader } from '../../../components/UI/formSectionHeader';

export function WeaponCombinations({ weapons }: GeneralWeaponTypes) {
  const [weaponSetCount, setWeaponSetCount] = useState([0]);

  function updateSetCount(set: number) {
    let newArr = weaponSetCount.filter((element: number) => element !== set);
    if (newArr.length === 0) {
      newArr = [0];
    }
    setWeaponSetCount(newArr);
  }

  return (
    <Container>
      <section className="header">
        <FormSectionHeader>Weapon Combinations</FormSectionHeader>
        <button
          type="button"
          className="add-set"
          onClick={() =>
            setWeaponSetCount([
              ...weaponSetCount,
              weaponSetCount[weaponSetCount.length - 1] + 1
            ])
          }
        >
          Add Set
        </button>
      </section>
      <WeaponSets>
        {weaponSetCount.map((set, index) => (
          <WeaponSet
            key={set}
            set={set}
            setIndex={index}
            weapons={weapons}
            handleClick={updateSetCount}
          />
        ))}
      </WeaponSets>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    }

  .header > * {
    text-wrap: nowrap;
    flex: 1;
  }

  .add-set {
    flex-basis
  }
  
`;

const WeaponSets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
