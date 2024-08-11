import styled from 'styled-components';
import { Device } from '../globalStyling/breakpoints';
import { ToolCard } from '../components/tool-card';
import { ContentSection } from '../components/UI/contentSection';
import { ContentHeader } from '../components/UI/contentHeader';

export default function Homepage() {
  return (
    <HomeContentContainer>
      {/* <aside className="left">asd</aside> */}
      <header className="header">
        <h1 className="main-heading">KILL TEAM COMPANION</h1>
        <h2 className="sub-heading">Warhammer Kill Team Tools</h2>
      </header>
      <section className="introduction">
        <p>
          This site features tools for streamlining games of Warhammer 40k Kill
          Team, a tabletop miniature game by Games Workshop. <br />
          <br />
          Currently available is a matchmaking tool for handling different
          components of matches, and upcoming is a team builder for creating and
          managing of player Kill Teams.
        </p>
      </section>
      <ContentSection>
        <ContentHeader>TOOLS</ContentHeader>
        <div className="cards-wrapper">
          <ToolCard heading="Kill Team Matchmaker" linkPath="/matchmaker">
            Create a match lobby for your game or join existing games. <br />
            <br />
            Keep track of the mission objective as well as Command Points and
            Victory Points.
          </ToolCard>
        </div>
      </ContentSection>
      {/* <aside className="right"></aside> */}
    </HomeContentContainer>
  );
}

const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  width: 100%;
  .header,
  .introduction,
  .cards-header {
    text-align: center;
  }

  .header {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 3rem 1rem;
    gap: 1rem;
    background: HSLA(${(props) => props.theme.colors.secondaryLight});
    border: solid 2px HSLA(${(props) => props.theme.colors.tertiary}, 1);
    text-wrap: balance;
    border-radius: 5px;
  }

  .main-heading {
    font-weight: 800;
    font-size: 3rem;
    background: linear-gradient(
      to top,
      HSLA(${(props) => props.theme.colors.tertiary}, 1) 30%,
      HSLA(${(props) => props.theme.colors.tertiaryLight}, 1)
    );
    background-clip: text;
    color: transparent;
    filter: drop-shadow(${(props) => props.theme.shadow.dark});
    @media (max-width: ${Device.smMax}) {
      font-size: clamp(1.5rem, 7vw, 3rem);
    }
  }

  .sub-heading {
    font-size: 1.25rem;
    letter-spacing: 0.25rem;
    color: white;
    text-shadow: ${(props) => props.theme.shadow.dark};
    @media (max-width: ${Device.smMax}) {
      font-size: clamp(1rem, 3vw, 1.25rem);
    }
  }

  .introduction {
    padding: 1rem 3rem;
    color: white;
  }

  .cards-wrapper {
    display: flex;
    gap: 2rem;
    height: 100%;
    place-items: center;
    @media (max-width: 560px) {
      flex-direction: column;
      align-items: center;
    }
  }

  // .left {
  //   grid-rows: main-start / main-end;
  //   grid-columns: left-start / left-end;
  // }
`;
