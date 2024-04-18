import styled from 'styled-components';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  name: string;
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
  $orange?: boolean;
}

export function GenericButton({
  type,
  name,
  text,
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
      {text}
    </Button>
  );
}

const Button = styled.button<{ $orange?: boolean }>`
  flex: 1;
  font-size: 1.25rem;
  padding: 16px;
  font-weight: 800;
  letter-spacing: 1px;
  border: none;
  border-radius: 5px;
  background: ${(props) =>
    props.$orange ? `HSLA(${props.theme.colors.tertiary}, 1)` : '#eee'};
`;
