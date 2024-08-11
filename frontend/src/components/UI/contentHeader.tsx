import styled from 'styled-components';

export function ContentHeader({
  children,
  className
}: {
  children: string;
  className?: string;
}) {
  return <Header className={className}>{children}</Header>;
}

const Header = styled.h2`
  width: 100%;
  padding-bottom: 16px;
  text-align: center;
  color: HSLA(${(props) => props.theme.colors.tertiary}, 1);
  filter: drop-shadow(${(props) => props.theme.shadow.dark});
`;
