import {createTheme} from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import {colors} from './themeConstants';

const breakpoints = createBreakpoints({});

const Theme = createTheme({
  ...colors,
  typography: {
    fontFamily: 'Rhodium libre',
    h1: {
      fontSize: 24,
      lineHeight: 1.7,
      [breakpoints.up('sm')]: {
        fontsize: 40,
      },
      [breakpoints.up('md')]: {
        fontSize: 48,
      },
    },
    h2: {
      fontSize: 18,
      lineHeight: 1.7,
      [breakpoints.up('md')]: {
        fontSize: 26,
      },
    },
    h3: {
      fontSize: 26,
      lineHeight: 1.7,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 1.7,

    },
  },
});
export default Theme;
