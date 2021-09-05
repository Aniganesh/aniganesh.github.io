import React, {FC, useRef, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import MenuIcon from 'Components/MenuIcon';
import clsx from 'clsx';
import CustomizedLink from 'Components/CustomizedLink';
import {sidebarLinks} from './Constants';


interface MenuSmProps { }

const MenuSm: FC<MenuSmProps> = (props) => {
  const [open, setOpen] = useState(false);
  const classes = styles();
  const ref = useRef<SVGSVGElement|null>(null);
  return <Box className={classes.root}>
    <Box onClick={()=>setOpen(!open)} display={'flex'} justifyContent="center" alignItems="center" height={50} width={50}>
      <MenuIcon x={open} ref={ref} />
    </Box>
    <Box className={clsx(classes.menuOptionsContainer, {[classes.hidden]: !open, [classes.visible]: open})}>
      {sidebarLinks.map((link) => <CustomizedLink align="center" key={link.link} {...link} />)}
    </Box>
  </Box>;
};

export default MenuSm;


const styles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    transition: 'all ease 300ms',
    width: 'max-content',
    position: 'relative',
    zIndex: 1, // Create new stacking context
  },
  menuOptionsContainer: {
    transition: 'height ease 300ms, width ease 300ms, opacity ease 300ms',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'absolute',
    top: 0,
    paddingTop: 50,
    zIndex: -1, // 1 level below the icon
  },
  visible: {
    width: '100vw',
    height: 320,
    opacity: 1,
  },
  hidden: {
    width: 0,
    height: 0,
    opacity: 0,
  },
}));
