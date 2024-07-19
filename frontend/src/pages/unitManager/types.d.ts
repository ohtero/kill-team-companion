interface StatInputTypes {
  statName: string;
  rangeStart: number;
  rangeEnd: number;
  statType?: string;
  step?: number;
}

interface UnitPropertyTypes {
  title: string;
}

interface WeaponRowTypes {
  weapon: number;
  selectionName: string;
  weapons: string[];
  side: string;
  handleClick: (index: number, side: string) => void;
}

interface GeneralWeaponTypes {
  weapons: string[];
}

interface WeaponSetTypes extends GeneralWeaponTypes {
  setIndex: number;
  set: number;
  handleClick: (set: number) => void;
}

interface AddPropertyModalTypes extends PropertyTypes {
  cancelAdd: () => void;
}

interface PropertyTypes {
  propertyName: 'weapon' | 'ability' | 'action' | 'not found';
}
