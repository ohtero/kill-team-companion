import { forwardRef, useState } from 'react';
import { AddPropertyModalTypes } from '../types';
import styled from 'styled-components';
import { AddWeaponView } from './addWeaponView';
import { CreatePropertyView } from './createPropertyView';
import { Device } from '../../../globalStyling/breakpoints';

export const AddPropertyModal = forwardRef<
  HTMLDialogElement,
  AddPropertyModalTypes
>(function AddPropertyModal({ propertyName, cancelAdd }, ref) {
  const [modalTab, setModalTab] = useState('addProperty');

  return (
    <Modal ref={ref}>
      <TabNavigation>
        <Tab type="button" onClick={() => setModalTab('addProperty')}>
          Add
        </Tab>
        <Tab type="button" onClick={() => setModalTab('createProperty')}>
          Create New
        </Tab>
      </TabNavigation>
      {modalTab === 'addProperty' && (
        <AddWeaponView propertyName={propertyName} />
      )}
      {modalTab === 'createProperty' && (
        <CreatePropertyView propertyName={propertyName} />
      )}
      <div className="buttons">
        <button type="button" onClick={cancelAdd}>
          Cancel
        </button>
        <button type="button">
          {modalTab === 'addProperty' ? 'Add' : 'Create'}
        </button>
      </div>
    </Modal>
  );
});

const Modal = styled.dialog`
  &[open] {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${Device.smMax};
    margin: auto;
    gap: 16px;

    .find-weapon-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    label {
      color: black;
    }

    .search-results {
      height: 300px;
    }

    .buttons {
      display: flex;
      width: 100%;
      & button {
        flex: 1;
      }
    }
    @media (width < calc(${Device.smMax}) {
      width: 100%;
    }
  }
`;

const TabNavigation = styled.nav`
  display: flex;
`;

const Tab = styled.button`
  flex: 1;
`;
