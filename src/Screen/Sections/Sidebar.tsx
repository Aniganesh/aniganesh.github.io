import React, {FC} from 'react';
import {Box, Drawer, makeStyles} from '@material-ui/core';
import {SIDEBAR_WIDTH_LG, SIDEBAR_WIDTH_MD} from 'Constants';
import {sidebarLinks} from './Constants';
import CustomizedLink from 'Components/CustomizedLink';

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = (props) => {
  const classes = styles();
  return <Drawer variant="permanent" classes={{paper: classes.root}}>
    <Box pt={15} pr={2.5}>
      {sidebarLinks.map((link)=><CustomizedLink key={link.link} {...link} />)}
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

}));


