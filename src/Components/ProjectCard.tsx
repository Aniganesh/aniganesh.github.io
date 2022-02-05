import React, { FC } from "react";
import {
  alpha,
  Box,
  Card,
  CardMedia,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Project } from "@types";

export interface ProjectCardProps extends Project {}

const ProjectCard: FC<ProjectCardProps> = ({
  image,
  projectTitle,
  details,
  url,
  role,
}) => {
  const classes = styles();
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" underline="none">
      <Card className={classes.root}>
        <Box display="flex" boxSizing="border-box" alignItems="center">
          <CardMedia
            className={classes.img}
            height="100"
            component="img"
            src={image}
          />
          <Box>
            <Typography variant="h2">{projectTitle}</Typography>
          </Box>
        </Box>
        <Box pt={1}>
          <Typography variant="subtitle1">{details}</Typography>
        </Box>
        {role ? (
          <Box>
            <Typography variant="subtitle2" color="primary">
              Role: {role}
            </Typography>
          </Box>
        ) : null}
      </Card>
    </Link>
  );
};

export default ProjectCard;

const styles = makeStyles((theme) => ({
  root: {
    "minWidth": 280,
    "minHeight": 300,
    "padding": theme.spacing("20px", "25px"),
    "borderRadius": 16,
    "boxSizing": "border-box",
    "boxShadow": `2px 6px 12px 2px ${alpha(theme.palette.common.black, 0.12)}`,
    "&:hover": {
      boxShadow: `2px 6px 12px 8px ${alpha(theme.palette.common.black, 0.12)}`,
    },
    "margin": theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(5),
    },
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: theme.spacing(1.5),
  },
}));
