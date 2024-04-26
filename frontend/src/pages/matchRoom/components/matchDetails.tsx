import styled from 'styled-components';
import { ContentSection } from '../../../components/UI/contentSection';
import { ContentHeader } from '../../../components/UI/contentHeader';

export function MatchDetails() {
  return (
    <MatchInfo>
      <ContentHeader>Match name</ContentHeader>
      <div className="info">
        <div className="sub-info">
          <p>Match Id:</p>
          <p>1234567890</p>
        </div>
        <div className="sub-info">
          <p>Match Link:</p>
          <p>www.asd.com</p>
        </div>
      </div>
      <Players>
        <h4>PLAYERS</h4>
        <ul>
          <li>short Name</li>
          <li>a little longer name</li>
          <li>a very long name that is long</li>
          <li>name</li>
        </ul>
      </Players>
    </MatchInfo>
  );
}

const MatchInfo = styled(ContentSection)`
  border: none;

  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    border: solid 2px HSLA(${(props) => props.theme.colors.primary});
    background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);

    & .sub-info:first-child {
      border-bottom: 2px solid HSLA(${(props) => props.theme.colors.primary});
    }
  }

  .sub-info {
    display: flex;
    width: 100%;
    padding: 12px;
    gap: 16px;
    justify-content: center;
  }
`;

const Players = styled.div`
  color: white;
  width: 100%;

  h4 {
    margin-bottom: 16px;
    font-weight: 700;
  }

  ul {
    display: flex;
    list-style: none;
    padding: 16px;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    border: solid 2px HSLA(${(props) => props.theme.colors.primary});
    // background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);
  }

  li {
    background: HSLA(${(props) => props.theme.colors.secondaryLight}, 1);
    border: solid 1px HSLA(${(props) => props.theme.colors.primary}, 1);
    padding: 4px 8px;
    color: white;
    border-radius: 5px;
  }
`;
