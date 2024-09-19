import { FormEventHandler } from 'react';
import styled from 'styled-components';

export function Form({ children, onSubmit }: FormProps) {
  return (
    <GenericForm onSubmit={onSubmit as FormEventHandler}>
      {children}
    </GenericForm>
  );
}

const GenericForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;
