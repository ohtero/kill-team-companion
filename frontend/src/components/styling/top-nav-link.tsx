import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LinkProps } from './types';

export function TopNavLink({ to, handleClick, color, children }: LinkProps) {
  return (
    <Link to={to} onClick={handleClick} $color={color}>
      {children}
    </Link>
  );
}

export const Link = styled(NavLink)<{ $color?: 'light' | 'dark' }>`
  text-decoration: none;
  color: ${(props) => (props.$color === 'dark' ? 'black' : 'white')};
  font-weight: 500;
  &:focus {
    color: HSLA(${(props) => props.theme.colors.tertiary}, 1);
    border-image: linear-gradient(
        HSLA(${(props) => props.theme.colors.tertiary}, 1),
        HSLA(${(props) => props.theme.colors.tertiary}, 1)
      )
      1;
    border-image-width: 0px 0px 2px 0px;
    border-image-outset: 5px;
  }
`;
