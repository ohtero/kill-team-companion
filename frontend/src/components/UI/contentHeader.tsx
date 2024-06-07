import styled from 'styled-components';

export function ContentHeader({ children }: GenericProps) {
  return <Header>{children}</Header>;
}

const Header = styled.h2`
  width: 100%;
  padding-bottom: 16px;
  text-align: center;
  color: HSLA(${(props) => props.theme.colors.tertiary}, 1);
  props.theme.colors.tertiary}, 1);
  text-shadow: ${(props) => props.theme.shadow.dark};
`;
