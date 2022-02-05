/* eslint-disable react/display-name */
import React, {FC} from 'react';
import {makeStyles} from '@material-ui/core';

interface MenuIconProps {
  x?:boolean;
}

const MenuIcon :FC <MenuIconProps>= ({x}) => {
  const classes = styles();
  const cross = {
    svg: {width: '34', height: '34', viewBox: '0 0 34 34'},
    r1: {x: '0.029541', y: '28.3137', width: '40', height: '8', rx: '1.5', transform: 'rotate(-45 0.029541 28.3137)'},
    r2: {x: '28.2842', y: '33.9411', width: '40', height: '8', rx: '1.5', transform: 'rotate(-135 28.2842 33.9411)'},
    r3: {x: '0', y: '0', width: '0', height: '0', rx: '0'},
  };
  const lines= {
    svg: {width: '40', height: '32', viewBox: '0 0 40 32'},
    r1: {width: '40', height: '8', rx: '1.5'},
    r2: {y: '12', width: '40', height: '8', rx: '1.5'},
    r3: {y: '24', width: '40', height: '8', rx: '1.5'},
  };
  return <svg className={classes.root} {...(x?cross.svg:lines.svg)}fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect {...(x?cross.r1:lines.r1)}fill="white"/>
    <rect {...(x?cross.r2:lines.r2)}fill="white"/>
    <rect {...(x?cross.r3:lines.r3)}fill="white"/>
  </svg>
  ;
};

export default MenuIcon;

const styles = makeStyles((theme) => ({
  root: {
    'transition': 'all ease 300ms',
    'cursor': 'pointer',
    '& rect': {
      transition: 'all ease 300ms',
    },
  },
}));
