import styled from 'styled-components';

export function ContentSection({ children }: GenericProps) {
  return <Section>{children}</Section>;
}

const Section = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 32px;
  gap: 32px;
  place-items: center;
  text-align: center;
  background: HSLA(${(props) => props.theme.colors.secondary}, 1);
  border: solid 4px HSLA(${(props) => props.theme.colors.tertiary}, 1);

  h3,
  p {
    color: white;
  }
`;
