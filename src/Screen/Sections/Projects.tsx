import React, { FC } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import ProjectCard from "Components/ProjectCard";
import useCustomMediaQuery from "Hooks/useCustomMediaQuery";
import { projects, workProjects } from "./Constants";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = (props) => {
  const classes = styles();
  const { maxSm } = useCustomMediaQuery();

  return (
    <Box boxSizing="border-box">
      <Typography className={classes.heading} variant="h2">
        Work projects
      </Typography>
      <Grid
        container
        spacing={!maxSm ? 5 : undefined}
        className={classes.gridContainer}
        alignContent="space-between"
      >
        {workProjects.map((project) => (
          <Grid
            item
            key={project.image}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3} /* className={classes.gridItem} */
          >
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
      <Typography className={classes.heading} variant="h2">
        Tiny fun projects
      </Typography>
      <Grid
        container
        spacing={!maxSm ? 5 : undefined}
        className={classes.gridContainer}
        alignContent="space-between"
      >
        {projects.map((project) => (
          <Grid
            item
            key={project.image}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3} /* className={classes.gridItem} */
          >
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;

const styles = makeStyles((theme) => ({
  gridContainer: {
    width: "100%",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(-5),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 4),
    },
  },
  heading: {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(5),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1.5),
    },
  },
  test: {
    padding: theme.spacing(5),
  },
}));