import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { DesktopNavigation } from '../navigation-desktop';
import { MobileNavigation } from '../navigation-mobile';

export default function PageLayout() {
  return (
    <PageContainer>
      <TopBar>
        <DesktopNavigation />
        <MobileNavigation />
      </TopBar>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: grid;
  grid-template-rows: [header-start] auto [header-end main-start] 1fr [main-end footer-start] auto [footer-end];
  grid-template-columns:
    [left-start] 1fr [left-end center-start] clamp(300px, 95vw, 1000px)
    [center-end right-start] 1fr [right-end];
  min-height: 100vh;
  min-height: 100svh;
  row-gap: 3rem;
  background-image: url('src/assets/images/background.jpg');
  background-size: cover;
  background-attachment: fixed;

  main,
  footer {
    backdrop-filter: blur(10px);
  }

  main {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-row: main-start / main-end;
    grid-column: center-start / center-end;

    height: fit-content;
    justify-items: center;
    margin-top: 2rem;
    background: HSLA(${(props) => props.theme.colors.primary}, 1);
  }

  footer {
    grid-row: footer-start / footer-end;
    grid-column: left-start / right-end;
    height: 5rem;
    background: HSLA(${(props) => props.theme.colors.secondary}, 0.85);
  }
`;

const TopBar = styled.section`
  display: flex;
  flex: 1;
  position: fixed;
  grid-column: left-start / right-end;
  grid-row: header-start / header-end;
  width: 100%;
  height: 3rem;
  padding: 1rem 0;
  align-items: center;
  background: HSLA(${(props) => props.theme.colors.primary}, 1);
  backdrop-filter: blur(10px);
  letter-spacing: 0.25rem;
  z-index: 1;
`;
