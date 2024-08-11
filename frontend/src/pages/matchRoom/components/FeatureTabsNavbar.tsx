import styled from 'styled-components';
import { Device } from '../../../globalStyling/breakpoints';
import { FeatureTab } from './featureTab';
import { TabNavProps } from '../types';

export function FeatureTabsNavbar({ activeTab, updateActiveTab }: TabNavProps) {
  return (
    <FeatureTabs>
      <FeatureTab
        tabName="details"
        activeTab={activeTab}
        handleClick={updateActiveTab}
      >
        match
      </FeatureTab>
      <FeatureTab
        tabName="mission"
        activeTab={activeTab}
        handleClick={updateActiveTab}
      >
        mission
      </FeatureTab>
      <FeatureTab
        tabName="counters"
        activeTab={activeTab}
        handleClick={updateActiveTab}
      >
        counters
      </FeatureTab>
    </FeatureTabs>
  );
}

const FeatureTabs = styled.nav`
  display: flex;
  width: 100%;
  height: fit-content;
  position: sticky;
  bottom: 0px;
  background: HSLA(${(props) => props.theme.colors.secondary});
  gap: 3px;

  & button:first-child {
    border-left: none;
    border-radius: 5px 0px 0px 0px;
  }
  & button:last-child {
    border-right: none;
    border-radius: 0px 5px 0px 0px;
  }
  @media (max-width: ${Device.smMax}) {
    order: 1;
    font-size: 0.5rem;
  }
`;
