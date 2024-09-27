import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*, *:after, *:before {
  margin: 0;
  box-sizing: border-box;
}

#root {
  font-family: ${(props) => props.theme.paragFontFamily};
}

h1, h2, h3, h4 input, button, select, option {
  font-family: ${(props) => props.theme.headingFontFamily};
}

h1 {
  letter-spacing: 8px;
}

h2 {
  // padding: 16px 0px;
  // text-align: center;
  // color: HSLA(${(props) => props.theme.colors.tertiary}, 1);
  // text-shadow: ${(props) => props.theme.shadow.dark};
}

h2, h3, h4 {
  letter-spacing: 5px;
}

input, button, select {
  font-size: 1rem;
  padding: 10px;
}

button {
  cursor: pointer;
}

label {
  text-align: start;
  color: white;
}

input[type="text"], input[type="password"] {
  padding-left: 8px;
  // background: HSLA(${(props) => props.theme.colors.secondary}, 0.75);
  border: 2px solid HSLA(${(props) => props.theme.colors.primary}, 0.5);
}
`;
