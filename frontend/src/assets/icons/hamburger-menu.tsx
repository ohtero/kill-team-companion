import styled from 'styled-components';

type IconProps = {
  isActive: boolean;
};

export function HamburgerMenu({ isActive }: IconProps) {
  return (
    <Icon
      $isActive={isActive}
      stroke="white"
      height="32px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0r"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M4 6H20M4 12H20M4 18H20"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </Icon>
  );
}

const Icon = styled.svg<{ $isActive: boolean }>`
  stroke: ${(props) => (props.$isActive ? 'black' : 'white')};
`;
