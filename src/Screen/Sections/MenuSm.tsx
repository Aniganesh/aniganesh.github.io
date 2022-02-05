import React, {FC, useRef, useState} from 'react';
import {Box, makeStyles, ClickAwayListener, Button} from '@material-ui/core';
import MenuIcon from 'Components/MenuIcon';
import clsx from 'clsx';
import CustomizedLink from 'Components/CustomizedLink';
import {sidebarLinks} from './Constants';


interface MenuSmProps { }

const MenuSm: FC<MenuSmProps> = (props) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement|null>(null);
  const classes = styles();

  return <Box className={classes.root}>
    <Button ref={buttonRef} variant="contained" color="primary" onClick={(event)=>{
      event.stopPropagation(); event.preventDefault();
      setOpen(!open);
    }} className={clsx(classes.menuButton, {[classes.active]: open})}>
      <MenuIcon x={open} />
    </Button>
    <ClickAwayListener onClickAway={(event)=>{
      if (open && event.target !== buttonRef?.current && !buttonRef?.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }}>
      <div>
        <Box className={clsx(classes.menuOptionsContainer, {[classes.hidden]: !open, [classes.visible]: open})}>
          {sidebarLinks.map((link) => <CustomizedLink align="center" key={link.link} {...link} />)}
        </Box>
      </div>
    </ClickAwayListener>
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
  menuButton: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 50,
    width: 50,
    padding: theme.spacing(0, 1),
    minWidth: 'unset',
  },
  active: {
    boxShadow: 'none !important',
  },
  menuOptionsContainer: {
    transition: 'height ease 300ms, width ease 300ms, opacity ease 300ms',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'absolute',
    top: 0,
    paddingTop: 50,
    zIndex: -1, // 1 level below the icon
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
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
