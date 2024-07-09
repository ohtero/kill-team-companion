export interface StatInputTypes {
  statName: string;
  rangeStart: number;
  rangeEnd: number;
  statType?: string;
  step?: number;
}

export interface UnitPropertyTypes {
  title: string;
}

export interface WeaponRowTypes {
  weapon: number;
  selectionName: string;
  weapons: string[];
  side: string;
  handleClick: (index: number, side: string) => void;
}

export interface GeneralWeaponTypes {
  weapons: string[];
}

export interface WeaponSetTypes extends GeneralWeaponTypes {
  setIndex: number;
  set: number;
  handleClick: (set: number) => void;
}

export interface AddPropertyModalTypes extends PropertyTypes {
  cancelAdd: () => void;
}

export interface PropertyTypes {
  propertyName: 'weapon' | 'ability' | 'action' | 'not found';
}
