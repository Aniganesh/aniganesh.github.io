import React, { FC, useState } from "react";
import {
  alpha,
  Box,
  Card,
  CardMedia,
  makeStyles,
  Typography,
  Chip,
} from "@material-ui/core";
import { Project } from "@types";
import clsx from "clsx";

export interface ProjectCardProps extends Project {}
const spinDuration = 600;
const ProjectCard: FC<ProjectCardProps> = ({
  image,
  projectTitle,
  details,
  url,
  roles,
  additionalDetails,
}) => {
  const classes = styles();
  const [isSelected, setIsSelected] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const handleClick = () => {
    setIsEntering(!isSelected);
    setIsExiting(isSelected);
    setTimeout(() => {
      setIsSelected((curr) => !curr);
      setIsExiting(false);
      setIsEntering(false);
    }, spinDuration - 20);
  };
  return (
    <Card
      onClick={additionalDetails ? handleClick : undefined}
      className={clsx(classes.root, {
        [classes.entry]: isEntering,
        [classes.exit]: isExiting,
        [classes.selected]: isSelected,
      })}
    >
      <Box display="flex" boxSizing="border-box" alignItems="center">
        <CardMedia
          className={classes.img}
          height="100"
          component="img"
          src={image}
        />
        <Box display="flex" style={{ gap: 8 }} flexWrap="wrap" overflow="auto">
          <Typography variant="h2">{projectTitle}</Typography>
          {Boolean(roles?.length) && (
            <Box
              display="flex"
              style={{ gap: 8 }}
              overflow="auto"
              maxWidth="100%"
            >
              {roles?.map((role) => (
                <Chip color="primary" label={role} key={role} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
      <Box pt={1} className={classes.details}>
        <Typography variant="subtitle1">{details}</Typography>
      </Box>
      {isSelected && (
        <Box pt={4}>
          <Typography>{additionalDetails}</Typography>
        </Box>
      )}
    </Card>
  );
};

export default ProjectCard;

const styles = makeStyles((theme) => ({
  root: {
    minWidth: 280,
    minHeight: 300,
    padding: theme.spacing("20px", "25px"),
    borderRadius: 16,
    boxSizing: "border-box",
    boxShadow: `2px 6px 12px 2px ${alpha(theme.palette.common.black, 0.12)}`,
    "&:hover": {
      boxShadow: `2px 6px 12px 8px ${alpha(theme.palette.common.black, 0.12)}`,
    },
    margin: theme.spacing(1),
    transitionProperty: "transform, width",
    transitionDelay: "0s, 300ms",
    transitionDuration: "300ms, 10ms",
    transitionTimingFunction: "ease, ease",
    maxHeight: 400,
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(5),
    },
  },
  details: {
    textOverflow: "ellipsis",
    lineClamp: 7,
    WebkitLineClamp: 7,
    display: "-webkit-box",
    boxOrient: "vertical",
    overflow: "hidden",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: theme.spacing(1.5),
  },
  selected: {
    position: "fixed",
    maxHeight: "90vh",
    overflowY: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "0 50%",
    maxWidth: 600,
    width: "100%",
    transform: "translateX(-50%)",
  },
  entry: {
    animation: `${spinDuration}ms ${theme.transitions.easing.easeInOut} 0s $cardSpinEntry forwards`,
  },
  exit: {
    animation: `${spinDuration}ms ${theme.transitions.easing.easeInOut} 0s $cardSpinExit forwards`,
  },
  "@keyframes cardSpinEntry": {
    "0%": {
      transform: "rotateY(0deg)",
      transformOrigin: "center",
      width: 300,
      height: 400,
      overflow: "hidden",
      margin: "auto",
    },
    "5%": {},
    "50%": {
      margin: "auto",
      position: "fixed",
      bottom: 40,
      left: "calc(100vh - 150px)",
      right: "calc(100vh - 150px)",
    },
    "99%": {
      margin: "auto",
      marginBottom: 40,
      position: "fixed",
      bottom: 40,
      left: "calc(100vh - 150px)",
      right: "calc(100vh - 150px)",
      width: 300,
      height: 400,
    },
    "100%": {
      margin: "auto",
      transform: "rotateY(720deg)",
      transformOrigin: "center",
    },
  },
  "@keyframes cardSpinExit": {
    "0%": {
      margin: "auto",
      transform: "rotateY(-720deg)",
      transformOrigin: "center",
      width: 300,
      height: 400,
      position: "fixed",
      top: "unset",
      bottom: 40,
      left: "calc(100vh - 150px)",
      right: "calc(100vh - 150px)",
      overflow: "hidden",
    },
    "99%": {
      top: "unset",
      margin: "auto",
      position: "fixed",
      bottom: 40,
      left: "calc(100vh - 150px)",
      right: "calc(100vh - 150px)",
    },
    "100%": {
      top: "unset",
      transform: "rotateY(0deg)",
      margin: "auto",
      width: 300,
      height: 400,
    },
  },
}));
