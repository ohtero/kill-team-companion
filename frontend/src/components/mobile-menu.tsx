import styled from 'styled-components';
import { TopNavLink } from './styling/top-nav-link';

type MenuProps = {
  isVisible: boolean;
  hideMenu: () => void;
};

export function MobileMenu({ isVisible, hideMenu }: MenuProps) {
  return (
    <Menu $isVisible={isVisible}>
      <ul>
        <li>
          <TopNavLink color="black" to={'/matchmaker'} handleClick={hideMenu}>
            Matchmaker
          </TopNavLink>
        </li>
        <li>
          <TopNavLink color="black" to={''} handleClick={hideMenu}>
            Teams
          </TopNavLink>
        </li>
        <li>
          <TopNavLink color="black" to={''} handleClick={hideMenu}>
            Sign In
          </TopNavLink>
        </li>
      </ul>
    </Menu>
  );
}

const Menu = styled.section<{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
  position: fixed;
  width: 100%;
  background: HSLA(${(props) => props.theme.colors.primary}, 1);
  top: 3rem;
  left: 0;
  z-index: 1;
  box-shadow: ${(props) => props.theme.shadow.softDarkBottom};

  ul {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 0.25rem;
    list-style: none;
  }

  li {
    width: 100%;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    padding: 16px 0px;
    text-align: center;
  }

  li:first-child,
  li:last-child {
    border: none;
  }
`;
