interface MenuProps {
  isVisible: boolean;
  hideMenu: () => void;
}

interface CardProps {
  heading: string;
  linkPath: string;
  children: string | React.ReactNode;
}
