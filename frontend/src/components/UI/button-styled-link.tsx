import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LinkProps } from '../styling/types';

export default function ButtonStyledLink({ to, children, color }: LinkProps) {
  return (
    <StyledLink to={to} $color={color}>
      {children}
    </StyledLink>
  );
}

export const StyledLink = styled(Link)<{ $color?: 'light' | 'dark' }>`
  display: inline-flex;
  padding: 1rem;
  border-radius: 0 0 3px 3px;
  background: HSLA(${(props) => props.theme.colors.tertiary}, 1);
  color: ${(props) => (props.$color === 'light' ? '#fff' : '#111')};
  text-decoration: none;
  justify-content: center;
  width: 100%;
  &:hover {
    background: HSL(${(props) => props.theme.colors.tertiaryMid});
  }
  &:active {
    background: HSL(${(props) => props.theme.colors.tertiaryLight});
  }
`;
