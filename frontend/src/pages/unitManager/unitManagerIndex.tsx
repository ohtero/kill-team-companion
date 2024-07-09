import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { SideNavigation } from './components/sideNavigation';

export function UnitManagerIndex() {
  return (
    <Container>
      <SideNavigation />
      <MainContent>
        <Outlet />
      </MainContent>
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-row: main-start / main-end;
  grid-column: left-start / right-end;
`;

const MainContent = styled.section`
  grid-column: center-start / center-end;
  grid-row: main-start / main-end;
  padding: 32px 0;
  @media (width < 1300px) {
    margin: 0 50px;
  }
`;
