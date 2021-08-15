import {createTheme} from '@material-ui/core';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
const breakpoints = createBreakpoints({});
const Theme = createTheme({
  typography: {
    h1: {
      fontSize: 36,
      [breakpoints.up('sm')]: {
        fontsize: 40,
      },
      [breakpoints.up('md')]: {
        fontSize: 48,
      },
    },
    h2: {
      fontSize: 26,
      [breakpoints.up('md')]: {
        fontSize: 32,
      },
    },
    h3: {
      fontSize: 20,
    },
    subtitle1: {
      fontSize: 14,
      [breakpoints.up('md')]: {
        fontSize: 16,
      },
    },
  },
});
export default Theme;
