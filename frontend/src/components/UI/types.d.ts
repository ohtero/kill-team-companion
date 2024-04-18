interface GenericProps {
  children: React.ReactNode;
}

interface FormProps extends GenericProps {
  onSubmit: () => void;
}
