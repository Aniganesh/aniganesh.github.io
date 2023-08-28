import React, { FC } from "react";
import { alpha, Box, Link, makeStyles, Typography } from "@material-ui/core";
import { projects } from "./Constants";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const classes = styles();
  return (
    <Box className={classes.root}>
      <Box px={1.5}>
        <Typography variant="caption">Image credits:</Typography>
        <Box display="flex" flexDirection="column">
          {projects.map((project) =>
            project.imgSrc ? (
              <Link key={project.image} href={project.imgSrc} variant="caption">
                {project.imgSrc}
              </Link>
            ) : null
          )}
        </Box>
      </Box>
      <Box mt={2}>
        This website is built using{" "}
        <Link href="https://reactjs.org">React</Link> and{" "}
        <Link href="https://mui.com">material-ui</Link>. Check out the code on{" "}
        <Link href="https://github.com/aniganesh/aniganesh.github.io">
          {" "}
          Github!
        </Link>
      </Box>{" "}
    </Box>
  );
};

export default Footer;

const styles = makeStyles((theme) => ({
  root: {
    borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    marginRight: 10,
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
