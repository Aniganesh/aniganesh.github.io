import React, {FC} from 'react';
import {Box, Grid, makeStyles, Typography} from '@material-ui/core';
import ProjectCard, {ProjectCardProps} from 'Components/ProjectCard';

interface ProjectsProps { }

const Projects: FC<ProjectsProps> = (props) => {
  const classes = styles();
  return <Box boxSizing="border-box">
    <Typography className={classes.heading} variant="h2">Tiny fun projects</Typography>
    <Grid container spacing={5} className={classes.gridContainer} alignContent="space-between">
      {projects.map((project)=><Grid item key={project.image} xs={12} sm={12} md={6} lg={4} xl={3} /* className={classes.gridItem} */><ProjectCard {...project} /></Grid>)}
    </Grid>
  </Box>;
};

export default Projects;

const styles = makeStyles((theme) => ({
  gridContainer: {
    width: '100%',
  },
  heading: {
    paddingBottom: 24,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: 40,
    },
  },
  test: {
    padding: theme.spacing(5),
  },
}));

const projects :ProjectCardProps[] =[
  {
    image: '1',
    projectTitle: '',
    projectSubtitle: '',
    learning: '',
  },
  {
    image: '2',
    projectTitle: '',
    projectSubtitle: '',
    learning: '',
  },
  {
    image: '3',
    projectTitle: '',
    projectSubtitle: '',
    learning: '',
  },
  {
    image: '4',
    projectTitle: '',
    projectSubtitle: '',
    learning: '',
  },
];
// const GRID_SPACING_LG = 40; const GRID_SPACING_MD = 20; const GRID_SPACING_SM = 10;
