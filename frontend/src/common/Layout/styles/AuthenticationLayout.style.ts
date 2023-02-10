import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';

export const authenticationLayoutStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    borderRadius: theme.spacing(1),
    width: '100%',
    overflow: 'hidden',
    maxWidth: '400px',
    boxShadow: '0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90%',
    } as CSSProperties,
  },
  wrapperTop: {
    background: '#CED3F5',
    height: 120,
    width: '100%',
    position: 'relative',
    marginBottom: theme.spacing(4),
  },
  wrapText: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  textWelcome: {
    color: '#556EE5',
    fontSize: 22,
    fontWeight: 700,
  },
  textDescription: {
    color: '#556EE5',
    fontSize: 16,
    fontWeight: 500,
  },
  wrapLogo: {
    position: 'absolute',
    left: 20,
    bottom: -40,
    background: '#ececec',
    width: 80,
    height: 80,
    borderRadius: '50%',
    '& svg.MuiSvgIcon-root': {
      fontSize: 48,
    },
  },
}));
