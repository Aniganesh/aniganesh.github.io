import {useTheme, useMediaQuery} from '@material-ui/core';


/**
 * Returns what kind of device is being used
 * @return {boolean}
 */
export default function useCustomMediaQuery() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery(theme.breakpoints.up('lg'));

  return {isSm, isXs, isMd, isLg, isXl, minMd: isMd || isLg || isXl, minLg: isLg || isXl, maxSm: (isXs || isSm) && !isMd};
}
