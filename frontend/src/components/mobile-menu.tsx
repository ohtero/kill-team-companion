import styled from 'styled-components';
import { TopNavLink } from './styling/top-nav-link';
import { useEffect, useRef } from 'react';

export function MobileMenu({ isVisible, hideMenu }: MenuProps) {
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function hide(e: Event) {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        hideMenu();
      }
    }
    document.addEventListener('mousedown', hide);
  }, []);

  return (
    <Menu $isVisible={isVisible} ref={menuRef}>
      <ul>
        <li>
          <TopNavLink color="dark" to={'/matchmaker'} handleClick={hideMenu}>
            Matchmaker
          </TopNavLink>
        </li>
        <li>
          <TopNavLink color="dark" to={''} handleClick={hideMenu}>
            Teams
          </TopNavLink>
        </li>
        <li>
          <TopNavLink color="dark" to={''} handleClick={hideMenu}>
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
  background: white;
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
