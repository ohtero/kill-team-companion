import styled from 'styled-components';

export function ErrorMsg({ children, $centered }: ErrorProps) {
  return <ErrorMessage $centered={$centered}>{children}</ErrorMessage>;
}

const ErrorMessage = styled.span<{ $centered?: boolean }>`
  height: 16px;
  color: HSL(360, 100%, 90%);
  place-self: ${(props) => props.$centered && 'center'};
`;
