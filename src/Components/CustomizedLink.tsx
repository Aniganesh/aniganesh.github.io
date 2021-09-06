import React, {FC} from 'react';
import {Link, makeStyles} from '@material-ui/core';
import {SidebarLink} from '@types';

interface CustomizedLinkProps extends SidebarLink{
  align?: 'center'|'right'
}

const CustomizedLink: FC<CustomizedLinkProps> = ({text, link, align = 'right'}) => {
  const classes = styles();
  return <Link className={classes.link} underline="none" href={link} variant="h3" color="textSecondary" align={align}>{text}</Link>;
};

export default CustomizedLink;

const styles = makeStyles(() => ({
  link: {
    marginBottom: 25,
    display: 'block',
  },
}));
