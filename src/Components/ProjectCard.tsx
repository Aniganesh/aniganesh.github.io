import React, {FC} from 'react';
import {Box, Card, CardMedia, makeStyles, Typography} from '@material-ui/core';

interface ProjectCardProps {
    image: string;
    projectTitle: string;
    projectSubtitle: string;
    learning: string;
}

const ProjectCard: FC<ProjectCardProps> = ({}) => {
  const classes = styles();
  return <Card className={classes.root}>
    <Box display="flex">
      <CardMedia src={'https://images.unsplash.com/photo-1516823989326-bd1bd7d6f4f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200'} />
      <Box>
        <Typography variant="h2">Project Title</Typography>
        <Typography variant="h3">Project subtitle</Typography>
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
    width: 340,
    height: 320,
    padding: theme.spacing('20px', '25px'),
    borderRadius: 20,
    boxSizing: 'border-box',
    boxShadow: `0px 4px 9px 4px #${theme.palette.common.black}1F`,
    [theme.breakpoints.up('sm')]: {
      width: 365,
      height: 320,
    },
    [theme.breakpoints.up('md')]: {
      width: 460,
      height: 320,
    },
  },
  img: {
    width: 120,
    height: 120,
    [theme.breakpoints.up('md')]: {
      width: 157,
      height: 133,
    },
  },
}));
