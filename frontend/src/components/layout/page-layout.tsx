import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { DesktopNavigation } from '../navigation-desktop';
import { MobileNavigation } from '../navigation-mobile';
import { Device } from '../../globalStyling/breakpoints';

export default function PageLayout() {
  const location = useLocation();
  const isMatchPage = location.pathname === '/match';

  return (
    <PageContainer $isMatchPage={isMatchPage}>
      <TopBar>
        <DesktopNavigation />
        <MobileNavigation />
      </TopBar>
      <main className={isMatchPage ? 'main-match' : 'main-default'}>
        <Outlet />
      </main>
      <footer
        className={isMatchPage ? 'footer-match' : 'footer-default'}
      ></footer>
    </PageContainer>
  );
}

const PageContainer = styled.div<{ $isMatchPage: boolean }>`
  display: grid;
  grid-template-rows: [header-start] auto [header-end main-start] 1fr [main-end footer-start] auto [footer-end];
  grid-template-columns:
    [left-start] 1fr [left-end center-start] minmax(300px, 1000px)
    [center-end right-start] 1fr [right-end];
  min-height: 100vh;
  min-height: 100svh;
  row-gap: 3rem;
  background-image: url('src/assets/images/background.jpg');
  background-size: cover;
  background-attachment: fixed;
  @media (max-width: ${Device.smMin}) {
    height: ${(props) => (props.$isMatchPage ? '100svh' : 'none')};
    overflow-y: ${(props) => (props.$isMatchPage ? 'hidden' : 'auto')};
    row-gap: ${(props) => (props.$isMatchPage ? '0' : '3rem')};
  }

  main,
  footer {
    backdrop-filter: blur(10px);
  }

  .main-default,
  .main-match {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-row: main-start / main-end;
    grid-column: center-start / center-end;
    height: fit-content;
    justify-items: center;
    background: HSLA(${(props) => props.theme.colors.primary}, 1);
  }

  .main-match {
    @media (width < ${Device.smMin}) {
      grid-row: main-start / footer-end;
    }
  }

  .footer-default,
  .footer-match {
    grid-row: footer-start / footer-end;
    grid-column: left-start / right-end;
    height: 5rem;
    background: HSLA(${(props) => props.theme.colors.secondary}, 0.85);
  }

  .footer-default {
    grid-row: footer-start / footer-end;
    grid-column: left-start / right-end;
    height: 5rem;
    background: HSLA(${(props) => props.theme.colors.secondary}, 0.85);
  }

  .footer-match {
    @media (width < ${Device.smMin}) {
      display: none;
    }
  }
`;

const TopBar = styled.section`
  display: flex;
  flex: 1;
  position: sticky;
  top: 0;
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
