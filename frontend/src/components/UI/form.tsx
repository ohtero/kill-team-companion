import styled from 'styled-components';

export function Form({ children, onSubmit }: FormProps) {
  return <GenericForm onSubmit={onSubmit}>{children}</GenericForm>;
}

const GenericForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;
