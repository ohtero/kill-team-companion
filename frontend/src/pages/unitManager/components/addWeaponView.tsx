export function AddWeaponView({ propertyName }: PropertyTypes) {
  return (
    <>
      <section className="find-weapon-section">
        <label htmlFor={propertyName}>Find {propertyName}</label>
        <input type="text" name={propertyName} id={propertyName} />
      </section>
      <section>
        <h5>Select {propertyName}</h5>
        <div className="search-results"></div>
      </section>
    </>
  );
}
