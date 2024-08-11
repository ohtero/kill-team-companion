import styled from 'styled-components';

export function ContentSection({ children, className }: ContentSectionProps) {
  return <Section className={className}>{children}</Section>;
}

const Section = styled.section`
  display: flex;
  width: 100%;
  height: fit-content;
  flex-direction: column;
  padding: 32px;
  gap: 32px;
  place-items: center;
  text-align: center;
  // background: linear-gradient(
  //   HSLA(${(props) => props.theme.colors.secondary}, 1),
  //   HSLA(${(props) => props.theme.colors.secondaryLight}, 0.7) 30% 70%,
  //   HSLA(${(props) => props.theme.colors.secondary}, 1)
  // );
  background: HSLA(${(props) => props.theme.colors.secondaryLight});
  // border-top: solid 2px HSLA(${(props) => props.theme.colors.tertiary}, 1);
  // border-bottom: solid 2px HSLA(${(props) =>
    props.theme.colors.tertiary}, 1);
  border-radius: 5px;

  h3,
  p {
    color: white;
  }
`;
