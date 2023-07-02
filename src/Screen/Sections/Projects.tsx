import React, { FC } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import ProjectCard from "Components/ProjectCard";
import useCustomMediaQuery from "Hooks/useCustomMediaQuery";
import { projects, workProjects } from "./Constants";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = (props) => {
  const classes = styles();
  const { maxSm, isMd } = useCustomMediaQuery();
  console.log({ isMd, maxSm });

  return (
    <Box boxSizing="border-box" pt={3}>
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
            key={project.id}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className={classes.gridItem}
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
            xl={3}
            className={classes.gridItem}
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
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(-5),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 4),
    },
  },
  heading: {
    paddingLeft: theme.spacing(2),
  },
  test: {
    padding: theme.spacing(5),
  },
  gridItem: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: 14,
    },
  },
}));
