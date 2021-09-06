import React, {FC} from 'react';
import {Box, makeStyles, Typography} from '@material-ui/core';
import Me from 'Assets/images/Me3.png';
import useCustomMediaQuery from 'Hooks/useCustomMediaQuery';

interface IntroHeadshotProps { }

const IntroHeadshot: FC<IntroHeadshotProps> = (props) => {
  const classes = styles();
  const {maxSm: isDeviceSm} = useCustomMediaQuery();

  return <Box display="flex" alignItems="center" pb={'35px'} boxSizing="border-box">
    <Box pr={isDeviceSm?'10px': 4} boxSizing="border-box"><img className={classes.img} src={Me} alt='Aniruddha' /></Box>
    <Box boxSizing="border-box">
      <Typography variant="h1">Aniruddha Ganesh</Typography>
      <Typography variant="h2">Full stack web developer</Typography>
      <Typography variant="h2">Mithyalabs</Typography>
    </Box>
  </Box>;
};

export default IntroHeadshot;

const styles = makeStyles((theme) => ({
  img: {
    borderRadius: '50%',
    width: 100,
    height: 100,
    [theme.breakpoints.up('sm')]: {
      width: 180,
      height: 180,
    },
  },
}));
