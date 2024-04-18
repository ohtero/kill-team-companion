import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Device } from '../config/breakpoints';

export function DesktopNavigation() {
  return (
    <Navigation>
      <ul>
        <section className="headerSection homeLink">
          <li>
            <TopNavLink to={'/'}>KTC</TopNavLink>
          </li>
        </section>
        <section className="headerSection mainLinks">
          <li>
            <TopNavLink to={'/matchmaker'}>Matchmaker</TopNavLink>
          </li>
          <li>
            <TopNavLink to={''}>Teams</TopNavLink>
          </li>
        </section>
        <section className="headerSection accountLinks">
          <li>
            <TopNavLink to={''}>Sign In</TopNavLink>
          </li>
        </section>
      </ul>
    </Navigation>
  );
}

const Navigation = styled.nav`
  display: flex;
  flex: 1;
  padding: 0 16px;
  @media (max-width: ${Device.smMax}) {
    display: none;
  }

  ul,
  .headerSection {
    display: flex;
    flex: 1;
  }

  ul {
    padding: 0;
    list-style: none;
    justify-content: space-between;
  }

  .mainLinks {
    justify-content: center;
    gap: 3rem;
  }

  .accountLinks {
    justify-content: end;
  }
`;

const TopNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
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
