import styled from 'styled-components';

export function GenericButton({
  children,
  type,
  name,

  handleClick,
  disabled,
  $orange
}: ButtonProps) {
  return (
    <Button
      type={type}
      name={name}
      onClick={handleClick}
      disabled={disabled}
      $orange={$orange}
    >
      {children}
    </Button>
  );
}

const Button = styled.button<{ $orange?: boolean }>`
  flex: 1;
  min-width: 200px;
  font-size: 1.1rem;
  padding: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  border: none;
  border-radius: 5px;
  background: ${(props) =>
    props.$orange ? `HSLA(${props.theme.colors.tertiary}, 1)` : '#eee'};
`;
