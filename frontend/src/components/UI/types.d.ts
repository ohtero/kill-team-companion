interface GenericProps {
  children: React.ReactNode;
}

interface FormProps extends GenericProps {
  onSubmit?: () => void | Promise<void>;
}

interface ErrorProps extends GenericProps {
  $centered?: boolean;
}

interface ContentSectionProps extends GenericProps {
  className?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  name?: string;
  handleClick?: () => void | Promise<void>;
  disabled?: boolean;
  $orange?: boolean;
}
