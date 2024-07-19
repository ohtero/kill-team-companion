import styled from 'styled-components';

export function WeaponRow({
  weapon,
  selectionName,
  weapons,
  side,
  handleClick
}: WeaponRowTypes) {
  return (
    <Row>
      <label htmlFor={`${selectionName}`} className="invisible-label">
        Weapon{weapon + 1}
      </label>
      <select
        name={`${selectionName}`}
        id={`${selectionName}`}
        className="selector"
      >
        {weapons.map((weapon) => (
          <option value={weapon} key={weapon}>
            {weapon}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="delete-weapon-button"
        onClick={() => handleClick(weapon, side)}
      >
        Del
      </button>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  .selector {
    width: 100%;
    margin-right: 4px;
  }
`;
