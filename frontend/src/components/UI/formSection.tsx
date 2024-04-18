import styled from 'styled-components';

export function FormSection({ children }: GenericProps) {
  return <Section>{children}</Section>;
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
