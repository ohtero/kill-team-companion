import styled from 'styled-components';

export function ErrorMsg({ children, errorOwner, $centered }: ErrorProps) {
  return (
    <ErrorMessage role="alert" data-testid={errorOwner} $centered={$centered}>
      {children}
    </ErrorMessage>
  );
}

const ErrorMessage = styled.span<{ $centered?: boolean }>`
  height: 16px;
  color: HSL(360, 100%, 90%);
  place-self: ${(props) => props.$centered && 'center'};
`;
