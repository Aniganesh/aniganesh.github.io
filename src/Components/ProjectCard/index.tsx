import React, { FC, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import LinkIcon from "@material-ui/icons/Link";
import {
  alpha,
  Box,
  Card,
  CardMedia,
  makeStyles,
  Typography,
  Chip,
  IconButton,
  Link,
  Button,
} from "@material-ui/core";
import { Project } from "@types";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { projectToggleHandler } from "./projectToggleHandler";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

export interface ProjectCardProps extends Project {}
const spinDuration = 500;
const ProjectCard: FC<ProjectCardProps> = ({
  image,
  projectTitle,
  details,
  url,
  roles,
  additionalDetails,
  duration,
}) => {
  const classes = styles();
  const [isSelected, setIsSelected] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const openCard = () => {
    setIsEntering(true);
    setTimeout(() => {
      setIsSelected(true);
      const intervalId: NodeJS.Timer = setInterval(() => {
        console.log("interval");
        projectToggleHandler(() => clearInterval(intervalId));
      }, 100);
      setIsEntering(false);
    }, spinDuration - 20);
  };
  const closeCard = () => {
    setIsExiting(true);
    setIsSelected(false);
    setTimeout(() => {
      setIsExiting(false);
    }, spinDuration - 20);
  };
  return (
    <>
      <div
        className={clsx({ [classes.overlay]: isSelected })}
        onClick={isSelected ? closeCard : undefined}
      />
      <Card
        onClick={additionalDetails && !isSelected ? openCard : undefined}
        className={clsx(classes.root, "project-card", {
          isOpen: isSelected,
          [classes.cursor]: additionalDetails && !isSelected,
          [classes.withHover]: additionalDetails && !isSelected,
          [classes.entry]: isEntering,
          [classes.exit]: isExiting,
          [classes.selected]: isSelected,
        })}
      >
        {isSelected && (
          <IconButton className={classes.closeButton} onClick={closeCard}>
            <CloseIcon />
          </IconButton>
        )}
        <Box display="flex" boxSizing="border-box" alignItems="center">
          <CardMedia
            className={classes.img}
            height="100"
            component="img"
            src={image}
          />
          <Box
            className={classes.projNameContainer}
            style={!roles?.length ? { overflowY: "hidden" } : {}}
            display="flex"
            flexWrap="wrap"
          >
            <Typography variant="h2" className={classes.projName}>
              {projectTitle}
            </Typography>
            {Boolean(roles?.length) && (
              <Box
                display="flex"
                className={classes.rolesContainer}
                maxWidth="100%"
              >
                {roles?.map((role) => (
                  <Chip color="primary" label={role} key={role} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          pt={1}
          className={clsx(classes.details, {
            [classes.selectedDetails]: isSelected,
          })}
        >
          <Typography variant="subtitle1">{details}</Typography>
        </Box>
        {isSelected && (
          <Box>
            <Typography variant="h3">Key info: </Typography>
            <Typography component={Box} pb={2}>
              <ReactMarkdown>{additionalDetails ?? ""}</ReactMarkdown>
            </Typography>
            {Boolean(url) && (
              <Link
                className={classes.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
                <LinkIcon fontSize="small" />{" "}
              </Link>
            )}
          </Box>
        )}
        {duration && (
          <Box
            display="flex"
            pt={1}
            mb={2}
            color="gray"
            alignItems="center"
            style={{ gap: 8 }}
          >
            <AccessTimeIcon /> {duration}
          </Box>
        )}
        <Box
          display="flex"
          className={classes.alignBottom}
          alignItems="center"
          justifyContent="start"
        >
          {Boolean(url) && !isSelected && (
            <Button
              component={Link}
              className={clsx(classes.link, classes.smallLink)}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Visit
              <LinkIcon fontSize="small" />{" "}
            </Button>
          )}
          {!!additionalDetails && !isSelected && (
            <Button onClick={openCard}>View more</Button>
          )}
        </Box>
      </Card>
    </>
  );
};

export default ProjectCard;

const styles = makeStyles((theme) => ({
  alignBottom: {
    marginTop: "auto",
    marginBottom: 0,
    width: "fit-content",
  },
  projName: {
    lineHeight: 1.2,
  },
  projNameContainer: {
    gap: 8,
    overflowX: "auto",
  },
  rolesContainer: {
    overflowX: "auto",
    overflowY: "hidden",
    gap: 8,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: -12000,
    right: 0,
    background: alpha(theme.palette.common.black, 0.5),
    zIndex: 1201,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 24,
    "& svg": {
      marginLeft: 8,
      transform: "rotate(-45deg)",
    },
  },
  smallLink: {
    marginTop: "auto",
    display: "flex",
    marginBottom: 0,
    fontSize: 16,
    color: theme.palette.primary.main,
    textTransform: "unset",
  },
  root: {
    zIndex: 0,
    position: "relative",
    minWidth: 280,
    minHeight: 300,
    padding: theme.spacing("20px", "25px"),
    borderRadius: 16,
    boxSizing: "border-box",
    boxShadow: `2px 6px 12px 2px ${alpha(theme.palette.common.black, 0.12)}`,
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    transitionProperty: "transform, width",
    transitionDelay: "0s, 300ms",
    transitionDuration: "300ms, 10ms",
    transitionTimingFunction: "ease, ease",
    maxHeight: 400,
    textOverflow: "ellipsis",
    overflow: "hidden",
    height: "100%",
  },
  withHover: {
    "&:hover": {
      boxShadow: `2px 6px 12px 8px ${alpha(theme.palette.common.black, 0.12)}`,
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
  selectedDetails: {
    overflow: "unset",
  },
  cursor: {
    cursor: "pointer",
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
    zIndex: 1202,
    top: 20,
    left: 0,
    right: 0,
    bottom: 20,
    margin: "0 50%",
    maxWidth: 600,
    width: "100%",
    transform: "translateX(-50%)",
    transition: "all 200ms ease-in",
  },
  entry: {
    zIndex: 1,
    animation: `${spinDuration}ms ${theme.transitions.easing.easeInOut} 0s $cardSpinEntry forwards`,
  },
  exit: {
    zIndex: 1,
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
      position: "fixed",
      bottom: 40,
      left: 0,
      right: 0,
    },
    "99%": {
      margin: "auto",
      marginBottom: 40,
      position: "fixed",
      bottom: 40,
      left: 0,
      right: 0,
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
      left: 0,
      right: 0,
      overflow: "hidden",
    },
    "99%": {
      top: "unset",
      margin: "auto",
      position: "fixed",
      bottom: 40,
      left: 0,
      right: 0,
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
