import styled from 'styled-components';
import ButtonStyledLink from '../components/UI/button-styled-link';

export function ToolCard({ heading, linkPath }: CardProps) {
  return (
    <Card>
      <h3 className="card-header">{heading}</h3>
      <p className="card-text">
        Create a match lobby for your game or join existing games. <br />
        <br />
        Keep track of the mission objective as well as Command Points and
        Victory Points.
      </p>
      <div className="card-link">
        <ButtonStyledLink to={linkPath} color="dark">
          Go To Matchmaker
        </ButtonStyledLink>
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
  background: #fff;
  min-width: 5rem;
  max-width: 30rem;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadow.dark};
  text-align: center;

  .card-header,
  .card-text {
    color: black;
  }

  .card-header {
    grid-row: header-start / header-end;
    grid-column: start / middle;
    padding: 1rem;
    border-radius: 3px 3px 0px 0px;
    border-bottom: 2px solid black;
    background: HSLA(${(props) => props.theme.colors.secondary}, 1);
    color: white;
  }

  .card-text {
    grid-row: text-start / text-end;
    grid-column: start / middle;
    padding: 1rem;
    align-self: center;
    text-wrap: balance;
    font-weight: 500;
  }

  .card-link {
    grid-row: header-start / text-end;
    grid-column: middle / end;
    font-weight: 600;
  }
`;
