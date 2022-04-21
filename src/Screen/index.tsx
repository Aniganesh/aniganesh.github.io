import { Box, makeStyles } from "@material-ui/core";
import { SIDEBAR_WIDTH_LG /* SIDEBAR_WIDTH_MD */ } from "Constants";
import useCustomMediaQuery from "Hooks/useCustomMediaQuery";
import React, { FC } from "react";
import AboutMe from "./Sections/AboutMe";
import Footer from "./Sections/Footer";
import IntroHeadshot from "./Sections/IntroHeadshot";
import MenuSm from "./Sections/MenuSm";
import Projects from "./Sections/Projects";
import Sidebar from "./Sections/Sidebar";

interface ScreenProps {}

const Screen: FC<ScreenProps> = (props) => {
  const classes = styles();
  const { maxSm: isDeviceSm } = useCustomMediaQuery();
  return (
    <>
      {!isDeviceSm ? <Sidebar /> : <MenuSm />}
      <Box className={classes.mainContainer}>
        <IntroHeadshot />
        <AboutMe />
        <Projects />
        <Footer />
      </Box>
    </>
  );
};

export default Screen;

const styles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(9),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
      marginLeft: SIDEBAR_WIDTH_LG + MAIN_CONTAINER_SPACING_LG,
    },
    // [theme.breakpoints.between("sm", "md")]: {
    //   marginLeft: SIDEBAR_WIDTH_MD + MAIN_CONTAINER_SPACING_MD,
    // },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      paddingTop: theme.spacing(9),
    },
  },
}));

export const MAIN_CONTAINER_SPACING_MD = 48;
export const MAIN_CONTAINER_SPACING_LG = 70;
