import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';

export const chatLayoutStyles = (drawerWidth: number) =>
  makeStyles((theme: Theme) => ({
    toolbar: {
      padding: theme.spacing(1),
      position: 'fixed',
      width: drawerWidth,
      height: 64,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      } as CSSProperties,
    },
    buttonAddTopic: { height: 34, borderRadius: theme.spacing(4), width: '100%' },
    boxChatList: {
      padding: theme.spacing(1),
      position: 'absolute',
      top: 110,
      maxHeight: 'calc(100% - 110px)',
      height: '100%',
      overflow: 'auto',
      width: '100%',
    },
    appBar: {
      background: 'white',
      boxShadow: '0 2px 2px rgba(114,114,114,0.168627)',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
      } as CSSProperties,
    },
    boxMain: {
      overflow: 'hidden',
      position: 'relative',
      top: 64,
      flexGrow: 1,
      height: 'calc(calc(var(--vh, 1vh) * 100) - 64px)',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      } as CSSProperties,
    },
    navDrawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      } as CSSProperties,
    },
  }));
