import styled from 'styled-components';
import { Device } from '../../../globalStyling/breakpoints';
import { useState } from 'react';
import { WeaponRow } from './weaponRow';

export function WeaponSet({
  weapons,
  set,
  setIndex,
  handleClick
}: WeaponSetTypes) {
  const [leftWeaponCount, setLeftWeaponCount] = useState([0]);
  const [rightWeaponCount, setRightWeaponCount] = useState([0]);

  function updateWeaponCount(weapon: number, side: string) {
    const isNotValue = (element: number) => element !== weapon;
    switch (side) {
      case 'weapon1':
        {
          let newArr = leftWeaponCount.filter(isNotValue);
          if (newArr.length === 0) {
            newArr = [0];
          }
          setLeftWeaponCount(newArr);
        }
        break;
      case 'weapon2': {
        {
          let newArr = rightWeaponCount.filter(isNotValue);
          if (newArr.length === 0) {
            newArr = [0];
          }
          setRightWeaponCount(newArr);
        }
        break;
      }
    }
  }

  return (
    <Container>
      <section className="set-name-container">
        <div className="heading-wrapper">
          <h5 className="heading">Set {setIndex + 1}</h5>
        </div>
        <button
          type="button"
          className="del-set-button"
          onClick={() => handleClick(set)}
        >
          Del
        </button>
      </section>
      <div className="weapon-selection">
        <div className="weaponBox weapon1">
          {leftWeaponCount.map((weapon, index) => (
            <div key={weapon}>
              {index !== 0 && <p className="weapon-option-divider">OR</p>}
              <WeaponRow
                weapon={weapon}
                selectionName={`weapon1${weapon}`}
                weapons={weapons}
                side="weapon1"
                handleClick={updateWeaponCount}
              />
            </div>
          ))}
          <button
            type="button"
            className="add-weapon-button"
            onClick={() =>
              setLeftWeaponCount([
                ...leftWeaponCount,
                leftWeaponCount[leftWeaponCount.length - 1] + 1
              ])
            }
          >
            Add Weapon
          </button>
        </div>
        <div className="weapon-box-divider">
          <p>AND</p>
        </div>
        <div className="weaponBox weapon2">
          {rightWeaponCount.map((weapon, index) => (
            <div key={weapon}>
              {index !== 0 && <p className="weapon-option-divider">OR</p>}
              <WeaponRow
                key={weapon}
                weapon={weapon}
                selectionName={`weapon2${weapon}`}
                weapons={weapons}
                side="weapon2"
                handleClick={updateWeaponCount}
              />
            </div>
          ))}
          <button
            type="button"
            className="add-weapon-button"
            onClick={() =>
              setRightWeaponCount([
                ...rightWeaponCount,
                rightWeaponCount[rightWeaponCount.length - 1] + 1
              ])
            }
          >
            Add Weapon
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-rows: 1fr auto;
  background: white;
  border: 1px solid black;

  .set-name-container {
    display: flex;
    grid-row: 1 / 2;
    border-bottom: 1px solid black;
    background: HSL(${(props) => props.theme.colors.secondaryLight});
    padding: 8px 4px;
  }

  .set-name-container > * {
    flex: 1;
  }

  .heading-wrapper {
    display: flex;
    align-items: center;
    flex-basis: 85%;
    padding-left: 8px;
  }

  .heading {
  }

  .del-set-button {
    flex-basis: 15%;
  }

  .weapon-selection {
    display: grid;
    grid-template-columns: 7fr 1fr 7fr;
    grid-row: 2 / 3;
    height: fit-content;
    @media (width < ${Device.smMax}) {
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 1fr;
    }
  }

  .weaponBox {
    display: flex;
    flex-direction: column;
    padding: 8px 4px;
    gap: 8px;
    text-align: center;
  }

  .weapon1 {
    grid-column: 1 / 2;
    @media (width < ${Device.smMax}) {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
  }

  .weapon2 {
    grid-column: 3 / 4;
    @media (width < ${Device.smMax}) {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
    }
  }

  .weapon-box-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: 2 / 3;
    padding: 4px;
    background: #ccc;
    border: solid black;
    border-width: 0px 1px 0px 1px;
    @media (width < ${Device.smMax}) {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      border: solid black;
      border-width: 1px 0px 1px 0px;
    }
  }

  .weapon-option-divider {
    margin-bottom: 4px;
  }

  .add-weapon-button {
    margin-top: 4px;
    width: 100%;
  }
`;
