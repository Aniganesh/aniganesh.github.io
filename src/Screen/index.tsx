import {Box, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import {SIDEBAR_WIDTH_LG, SIDEBAR_WIDTH_MD} from 'Constants';
import React, {FC} from 'react';
import IntroHeadshot from './Sections/IntroHeadshot';
import Projects from './Sections/Projects';
import Sidebar from './Sections/Sidebar';

interface ScreenProps { }

const Screen: FC<ScreenProps> = (props) => {
  const classes = styles();
  const theme = useTheme();
  const isDeviceSm = useMediaQuery(theme.breakpoints.down('sm'));
  return <>
    <Sidebar />
    <Box pt={isDeviceSm ? 8 : 10} className={classes.mainContainer}>
      <IntroHeadshot />
      <Projects />
    </Box>
  </>;
};

export default Screen;

const styles = makeStyles((theme)=>({
  mainContainer: {
    [theme.breakpoints.up('md')]: {
      marginLeft: SIDEBAR_WIDTH_LG+MAIN_CONTAINER_SPACING_LG,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: SIDEBAR_WIDTH_MD+MAIN_CONTAINER_SPACING_MD,
    },
  },
}));

export const MAIN_CONTAINER_SPACING_MD = 48;
export const MAIN_CONTAINER_SPACING_LG = 70;

