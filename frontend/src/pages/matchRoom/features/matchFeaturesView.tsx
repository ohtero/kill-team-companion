import styled from 'styled-components';
import { FeatureTabsNavbar } from '../components/FeatureTabsNavbar';
import { ContentSection } from '../../../components/UI/contentSection';
import { MatchDetails } from '../components/matchDetails';

export function MatchFeaturesView() {
  return (
    <FeatureViewWrapper>
      <FeatureTabsNavbar></FeatureTabsNavbar>
      <ExtendedContentSection>
        <MatchDetails />
      </ExtendedContentSection>
    </FeatureViewWrapper>
  );
}

const FeatureViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: solid 4px HSLA(${(props) => props.theme.colors.tertiary}, 1);
`;

const ExtendedContentSection = styled(ContentSection)`
  flex: 1;
  border-top: none;
  padding: 0px;
  border: none;
`;
