import styled from 'styled-components';
import { useState } from 'react';
import { FeatureTabsNavbar } from './FeatureTabsNavbar';
import { ContentSection } from '../../../components/UI/contentSection';
import { MatchDetails } from '../features/matchDetails';
import { TabName } from '../types';
import { MatchCounters } from '../features/matchCounters';
import { MissionDetails } from '../features/matchMission';
import { Device } from '../../../globalStyling/breakpoints';

export function MatchFeaturesView() {
  const [activeTab, setActiveTab] = useState<TabName>('details');

  function updateActiveTab(tabName: TabName) {
    setActiveTab(tabName);
  }

  return (
    <>
      <FeatureViewWrapper data-testid="feature-view-wrapper">
        <FeatureTabsNavbar
          activeTab={activeTab}
          updateActiveTab={updateActiveTab}
        />
        <ExtendedContentSection data-testid="match">
          {activeTab === 'details' && <MatchDetails />}
          {activeTab === 'counters' && <MatchCounters />}
          {activeTab === 'mission' && <MissionDetails />}
        </ExtendedContentSection>
      </FeatureViewWrapper>
    </>
  );
}

export const FeatureViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

export const ExtendedContentSection = styled(ContentSection)`
  flex: 1;
  border-top: none;
  padding: 0px;
  border: none;
  overflow-y: auto;
  border-radius: 0px 0px 5px 5px;

  @media (max-width: ${Device.smMax}) {
    border-radius: 0px;
  }
`;
