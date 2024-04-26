import { SetStateAction } from 'react';

interface FeatureTabProps {
  children: React.ReactNode;
  tabName: TabName;
  activeTab: TabName;
  handleClick: SetStateAction;
}

type TabName = 'details' | 'counters' | 'mission';
