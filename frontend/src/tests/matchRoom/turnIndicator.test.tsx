import { it, expect, describe } from 'vitest';
import { screen, render } from '../testUtils';
import { TurnIndicator } from '../../pages/matchRoom/components/turnIndicator';

describe('Individual turn indicator', () => {
  it(`should have a border if the current turn is equal to the the turn indicator's turn value`, () => {
    render(<TurnIndicator currentTurn={1} turnValue={1} />);
    const indicator = screen.getByRole('listitem');
    expect(indicator).toHaveStyle(
      'border: 4px solid HSLA$(${props.theme.colors.tertiary})'
    );
  });
  it(`should NOT have a border if the current turn is not equal to the the turn indicator's turn value`, () => {
    render(<TurnIndicator currentTurn={1} turnValue={2} />);
    const indicator = screen.getByRole('listitem');
    expect(indicator).toHaveStyle('border: none');
  });
});
