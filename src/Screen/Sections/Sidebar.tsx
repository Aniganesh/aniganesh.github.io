import React, {FC} from 'react';
import {Box, Drawer, Link, makeStyles} from '@material-ui/core';
import {SIDEBAR_WIDTH_LG, SIDEBAR_WIDTH_MD} from 'Constants';

interface SidebarProps { }

interface SidebarLink{
  text: string;
  link: string;
}

const Sidebar: FC<SidebarProps> = (props) => {
  const classes = styles();
  return <Drawer variant="permanent" classes={{paper: classes.root}}>
    <Box pt={10} pr={2.5}>
      {sidebarLinks.map((link)=><Link className={classes.link} key={link.link} underline="none" href={link.link} variant="h2" color="textSecondary" align="right">{link.text}</Link>)}
    </Box>
  </Drawer>;
};

export default Sidebar;
const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: SIDEBAR_WIDTH_MD,
    [theme.breakpoints.up('md')]: {
      width: SIDEBAR_WIDTH_LG,
    },
  },
  link: {
    marginBottom: 25,
    display: 'block',
  },
}));


const sidebarLinks: SidebarLink[]= [
  {
    text: 'Github',
    link: 'https://github.com/aniganesh',
  }, {
    text: 'Linkedin',
    link: 'https://www.linkedin.com/in/aniruddha-ganesh/',
  }, {
    text: 'Instagram',
    link: 'https://instagram.com/aniganesh741',
  }, {
    text: 'Youtube',
    link: 'https://www.youtube.com/channel/UCTrowLhBSwU55fXwkFcFSBA',
  },
];
