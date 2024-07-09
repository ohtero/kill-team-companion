import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export function SideNavigation() {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <NavigationMenu>
      <ToggleSideMenu
        type="button"
        onClick={() => setIsHidden(!isHidden)}
      ></ToggleSideMenu>
      <LinkList $isHidden={isHidden}>
        <li key="unit-list">
          <NavLink to="unit-list">Unit List</NavLink>
        </li>
        <li key="add-unit">
          <NavLink to="add-unit">Add Unit</NavLink>
        </li>
      </LinkList>
    </NavigationMenu>
  );
}

const NavigationMenu = styled.nav`
  grid-column: left-start / left-end;
  background: HSL(${(props) => props.theme.colors.secondary});
  margin: 32px;

  @media (width < 1300px) {
    position: fixed;
    margin: 0px;
    width: fit-content;
    height: 100%;
  }
`;

const LinkList = styled.ul<{ $isHidden: boolean }>`
  display: flex;
  padding: 0;
  list-style: none;
  text-wrap: nowrap;
  flex-direction: column;
  margin: 16px;

  @media (width < 1300px) {
    display: ${(props) => (props.$isHidden ? 'none' : 'flex')};
  }
`;

const ToggleSideMenu = styled.button`
  display: none;
  margin-left: auto;
  width: 40px;
  height: 40px;
  background: HSL(${(props) => props.theme.colors.secondary});
  @media (width < 1300px) {
    display: block;
    // width: 100%;
  }
`;
