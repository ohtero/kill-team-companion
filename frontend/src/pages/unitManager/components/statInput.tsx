import styled from 'styled-components';
import { Device } from '../../../globalStyling/breakpoints';
import { StatInputTypes } from '../types';

export function StatInput({
  statName,
  rangeStart,
  rangeEnd,
  statType,
  step
}: StatInputTypes) {
  // Determines the range for the specific stat so they can be dynamically rendered for each option selection.
  function range(start: number, end: number, step = 1) {
    return Array.from({ length: (end - start) / step + 1 }, (_, i) => {
      if (statType === 'dye') {
        return `${start + i * step}+`;
      } else if (statType === 'movement') {
        return `${start + i * step}"`;
      } else {
        return start + i * step;
      }
    });
  }

  const valueRange =
    statType === 'base'
      ? ['25mm', '32mm', '40mm']
      : step
        ? range(rangeStart, rangeEnd, step)
        : range(rangeStart, rangeEnd);

  return (
    <StatSelection>
      <label htmlFor={statName}>{statName}</label>
      <select name={statName} id={statName}>
        {valueRange.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </StatSelection>
  );
}

const StatSelection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  flex-wrap: wrap;
  label {
    text-align: center;
  }
  @media (width < ${Device.smMin}) {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    > * {
      flex: 1;
    }
    label {
      flex-basis: 75px;
    }
    select {
      flex-basis: 100%;
    }
  }
`;
