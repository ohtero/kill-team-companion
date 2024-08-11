import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    headingFontFamily: string;
    paragFontFamily: string;
    colors: Colors;
    shadow: Shadows;
  }
}

interface Colors {
  primary: string;
  secondary: string;
  secondaryLight: string;
  tertiary: string;
  tertiaryMid: string;
  tertiaryLight: string;
}

interface Shadows {
  dark: string;
  light: string;
  softDarkBottom: string;
}
