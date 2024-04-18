import styled from 'styled-components';

export function ContentHeader({ children }: GenericProps) {
  return <Header>{children}</Header>;
}

const Header = styled.h2`
  width: 100%;
  padding: 16px 0px;
  text-align: center;
  background: HSLA(${(props) => props.theme.colors.secondary}, 1);
  color: HSLA(${(props) => props.theme.colors.tertiary}, 1);
  border: solid 4px HSLA(${(props) => props.theme.colors.tertiary}, 1);
  text-shadow: ${(props) => props.theme.shadow.dark};
`;
