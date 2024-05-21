export enum Missions {
  select = 'Select...',
  mission1 = 'Mission 1',
  mission2 = 'Mission 2'
}

interface FormInputs {
  matchName: string;
  mission: Missions;
}

export type MissionTypes = {
  name: string;
  rules: string;
  actions: string;
};
