import { DefaultTheme } from 'styled-components';
import '../assets/fonts.css';

export const theme: DefaultTheme = {
  headingFontFamily: 'orbitron, lato, sans-serif',
  paragFontFamily: 'oxanium, lato, sans-serif',
  colors: {
    primary: '220, 15%, 30%',
    secondary: '220, 20%, 40%',
    secondaryLight: '220, 15%, 50%',
    tertiary: '32, 100%, 52%',
    tertiaryMid: '32, 100%, 60%',
    tertiaryLight: '32, 100%, 75%'
  },
  shadow: {
    light: '4px 4px #888',
    dark: '3px 3px #333',
    softDarkBottom: '0px 4px 10px #333'
  }
};
