import { PropertyTypes } from '../types';
import { NewWeaponForm } from './newWeaponForm';

export function CreatePropertyView({ propertyName }: PropertyTypes) {
  return (
    <>
      {propertyName === 'weapon' ? (
        <NewWeaponForm />
      ) : propertyName === 'ability' ? (
        <div></div>
      ) : (
        <div></div>
      )}
    </>
  );
}
