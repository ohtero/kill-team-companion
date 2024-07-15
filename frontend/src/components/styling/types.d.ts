export interface LinkProps {
  to: string;
  children: string;
  handleClick?: () => void;
  color?: 'light' | 'dark';
}
