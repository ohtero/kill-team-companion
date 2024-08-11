import styled from 'styled-components';
import { Device } from '../../../globalStyling/breakpoints';
import { FeatureTabProps, TabName } from '../types';

export function FeatureTab({
  children,
  tabName,
  activeTab,
  handleClick
}: FeatureTabProps) {
  return (
    <Tab
      name={tabName}
      $active={activeTab}
      $thisTab={tabName}
      onClick={() => handleClick(tabName)}
    >
      {children}
    </Tab>
  );
}

const Tab = styled.button<{ $active: TabName; $thisTab: TabName }>`
  flex: 1;
  overflow-wrap: anywhere;
  background: ${(props) =>
    props.$active === props.$thisTab
      ? `HSLA(${props.theme.colors.secondaryLight}, 1)`
      : `HSLA(${props.theme.colors.primary}, 1)`};
  color: white;
  border: none;
  // border-right: solid 1px HSLA(${(props) =>
    props.theme.colors.secondary}, 1);
  // border-left: solid 1px HSLA(${(props) => props.theme.colors.secondary}, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  @media (max-width: ${Device.smMax}) {
    font-size: 0.8rem;
    border-radius: 0px;
  }
`;
