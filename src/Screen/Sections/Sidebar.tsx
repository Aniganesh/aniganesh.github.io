import {Box, Drawer, makeStyles, Typography} from '@material-ui/core';
import Spacer from 'Components/Spacer';
import {SIDEBAR_WIDTH_LG, SIDEBAR_WIDTH_MD} from 'Constants';
import React, {FC} from 'react';

interface SidebarProps { }

const Sidebar: FC<SidebarProps> = (props) => {
  const classes = styles();
  return <Drawer variant="permanent" classes={{paper: classes.root}}>
    <Box pt={10} pr={2.5}>
      <Typography variant="h2" align="right">Social links</Typography>
      <Spacer height={50} />
      <Typography variant="h2" align="right">Link1</Typography>
      <Typography variant="h2" align="right">Link2</Typography>
      <Typography variant="h2" align="right">Link3</Typography>
      <Typography variant="h2" align="right">Link4</Typography>
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
