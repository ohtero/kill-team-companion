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
  background: HSLA(${(props) => props.theme.colors.secondaryLight});
  border-radius: 5px;

  h3,
  p {
    color: white;
  }
`;
