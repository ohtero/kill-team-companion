import styled from 'styled-components';
import { UnitPropertyTypes } from '../types';
import { PropertyItem } from './propertyItem';
import { useRef } from 'react';
import { AddPropertyModal } from './addPropertyModal';

export function PropertySelector({ title }: UnitPropertyTypes) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const singularTitle =
    title === 'Weapons'
      ? 'weapon'
      : title === 'Abilities'
        ? 'ability'
        : 'action';

  return (
    <Container>
      <section className="header">
        <h4 className="heading">{singularTitle}</h4>
        <button
          aria-label={`addNew${singularTitle}`}
          className="add-new"
          type="button"
          onClick={() => modalRef.current?.showModal()}
        >
          Add
        </button>
      </section>
      <PropertyItemContainer>
        <PropertyItem />
        <PropertyItem />
        <PropertyItem />
      </PropertyItemContainer>
      <AddPropertyModal
        propertyName={singularTitle}
        ref={modalRef}
        cancelAdd={() => modalRef.current?.close()}
      />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;

  .header {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  .heading,
  .add-new {
    flex: 1;
  }

  .heading {
    min-width: 60%;
    color: white;
    font-weight: 400;
    letter-spacing: 0px;
  }

  .add-new {
    flex-grow: 1;
    text-wrap: nowrap;
  }
`;
const PropertyItemContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: white;
  height: 200px;
  padding: 8px 4px;
  gap: 8px;
`;
