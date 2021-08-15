import React, {FC} from 'react';
import {makeStyles, Theme} from '@material-ui/core';

interface SpacerProps {
    height?: number| string;
    width?: number| string;
}

const Spacer: FC<SpacerProps> = ({height, width}) => {
  const classes = styles({height, width});
  return <div className={classes.root}/>;
};

export default Spacer;

const styles = makeStyles<Theme, {height?: number|string, width?:number|string}>((theme) => ({
  root: {
    height: ({height}) => height??'100%',
    width: ({width}) => width??'100%',
  },
}));
