import styled from 'styled-components';
import { TopNavLink } from './styling/top-nav-link';
import { Device } from '../globalStyling/breakpoints';
import { useState } from 'react';
import { MobileMenu } from './mobile-menu';
import { HamburgerMenu } from '../assets/icons/hamburger-menu';

export function MobileNavigation() {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false);

  function hideMenu() {
    setMenuIsVisible(false);
  }

  return (
    <Navigation>
      <TopNavLink to={'/'} handleClick={hideMenu}>
        KTC
      </TopNavLink>
      <MenuButton
        $isVisible={menuIsVisible}
        type="button"
        value="Menu"
        onClick={() => setMenuIsVisible(!menuIsVisible)}
      >
        <HamburgerMenu isActive={menuIsVisible} />
      </MenuButton>
      <MobileMenu isVisible={menuIsVisible} hideMenu={hideMenu} />
    </Navigation>
  );
}

const Navigation = styled.nav`
  height: 3rem;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  @media (min-width: ${Device.smMin}) {
    display: none;
  }
`;

const MenuButton = styled.button<{ $isVisible: boolean }>`
  height: 100%;
  background: ${(props) => (props.$isVisible ? 'white' : 'none')};
  border: none;
  padding: 0 16px;
  z-index: 2;
`;
