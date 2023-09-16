import React, { FC } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Me from "Assets/images/Me3.png";
import useCustomMediaQuery from "Hooks/useCustomMediaQuery";

interface IntroHeadshotProps {}

const IntroHeadshot: FC<IntroHeadshotProps> = (props) => {
  const classes = styles();
  const { maxSm: isDeviceSm } = useCustomMediaQuery();

  return (
    <Box className={classes.root}>
      <Box pr={isDeviceSm ? "10px" : 4} boxSizing="border-box">
        <img className={classes.img} src={Me} alt="Aniruddha" />
      </Box>
      <Box boxSizing="border-box">
        <Typography variant="h1">Aniruddha Ganesh</Typography>
        <Typography variant="h2">Full stack web developer</Typography>
      </Box>
    </Box>
  );
};

export default IntroHeadshot;

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 35,
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 1.5, "35px", 1.5),
    },
  },
  img: {
    borderRadius: "50%",
    width: 100,
    height: 100,
    objectFit: "cover",
    [theme.breakpoints.up("sm")]: {
      width: 180,
      height: 180,
    },
  },
}));
