import { Theme } from '@mui/material';
import { CSSProperties, makeStyles } from '@mui/styles';

export const chatLayoutStyles = (drawerWidth: number) =>
  makeStyles((theme: Theme) => ({
    toolbar: {
      padding: '10px !important',
      position: 'fixed',
      width: drawerWidth,
      height: 64,
    },
    buttonAddTopic: { height: 34, borderRadius: theme.spacing(4) },
    boxChatList: {
      padding: theme.spacing(1),
      position: 'absolute',
      top: 64,
      maxHeight: 'calc(100% - 64px)',
      height: '100%',
      overflow: 'auto',
      width: '100%',
    },
    appBar: {
      background: 'white',
      boxShadow: 'none',
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
      } as CSSProperties,
    },
    boxMain: {
      flexGrow: 1,
      mt: '64px',
      maxHeight: 'calc(100vh - 64px)',
      overflow: 'hidden',
      position: 'relative',
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
