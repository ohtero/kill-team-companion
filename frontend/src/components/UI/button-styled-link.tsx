import { Link } from 'react-router-dom';
import styled from 'styled-components';

type LinkProps = {
  to: string;
  children: string;
  textColor: 'light' | 'dark';
};

export default function ButtonStyledLink({
  to,
  children,
  textColor
}: LinkProps) {
  return (
    <StyledLink to={to} $textColor={textColor}>
      {children}
    </StyledLink>
  );
}

export const StyledLink = styled(Link)<{ $textColor: 'light' | 'dark' }>`
  display: inline-flex;
  padding: 1rem;
  border-radius: 0 0 3px 3px;
  background: HSLA(${(props) => props.theme.colors.tertiary}, 1);
  color: ${(props) => (props.$textColor === 'light' ? '#fff' : '#111')};
  text-decoration: none;
  justify-content: center;
  width: 100%;
`;
