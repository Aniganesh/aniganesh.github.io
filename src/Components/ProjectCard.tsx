import React, {FC} from 'react';
import {Card, makeStyles} from '@material-ui/core';

interface ProjectCardProps { }

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const classes = styles();
  return <Card className={classes.root}>ProjectCard</Card>;
};

export default ProjectCard;

const styles = makeStyles((theme) => ({
  root: {
    width: 340,
    padding: theme.spacing('20px', '25px'),
  },
}));
