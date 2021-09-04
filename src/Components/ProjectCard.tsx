import React, {FC} from 'react';
import {alpha, Box, Card, CardMedia, makeStyles, Typography} from '@material-ui/core';

export interface ProjectCardProps {
    image: string;
    projectTitle: string;
    projectSubtitle: string;
    learning: string;
}

const ProjectCard: FC<ProjectCardProps> = ({}) => {
  const classes = styles();
  return <Card className={classes.root}>
    <Box display="flex" boxSizing="border-box" alignItems="center">
      <CardMedia
        className={classes.img}
        height="100"
        component="img"
        src={'https://images.unsplash.com/photo-1516823989326-bd1bd7d6f4f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100'} />
      <Box>
        <Typography variant="h2">Project Title</Typography>
      </Box>
    </Box>
    <Box>
      <Typography variant="subtitle1">Enna poruthavaraikum, jananga paasam gra maalaiya, eppovo en thozhla potutaanga, anbu ngra mariyadhaya naan avanga mela kaatra varaikum avanga en mela vechrukra mariyadhaiya yaaralayum thadukka mudiyadhu
Panam sampadhikanum nu aasai padravan padhaviya thedi povan. Makkalukku sevai seiyanum nu aasai padravana padhavi thedi varum</Typography>
    </Box></Card>;
};

export default ProjectCard;

const styles = makeStyles((theme) => ({
  root: {
    minWidth: 280,
    height: 240,
    padding: theme.spacing('20px', '25px'),
    borderRadius: 16,
    boxSizing: 'border-box',
    boxShadow: `2px 6px 12px 0px ${alpha(theme.palette.common.black, .12)}`,
    margin: theme.spacing(1),
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: theme.spacing(1.5),
  },
}));
