export enum Missions {
  select = 'Select...',
  mission1 = 'Mission 1',
  mission2 = 'Mission 2'
}

interface CreateMatchFormInputs {
  matchName: string;
  mission: Missions;
}

interface MissionTypes {
  name: string;
  rules: string;
  actions: string;
}
