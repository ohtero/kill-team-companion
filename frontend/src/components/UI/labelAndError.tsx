import styled from 'styled-components';
import { ErrorMsg } from './errorMsg';

export function LabelAndError({
  label,
  labelFor,
  error
}: {
  label: string;
  labelFor: string;
  error?: string;
}) {
  return (
    <Row>
      <label htmlFor={labelFor}>{label}</label>
      <ErrorMsg errorOwner={labelFor}>{error}</ErrorMsg>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  gap: 16px;
`;
