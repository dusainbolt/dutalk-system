import { SxProps, Theme } from '@mui/material';

type PropertyNames = 'toolbar' | 'buttonAddTopic' | 'boxChatList' | 'appBar' | 'boxMain';

export const styleChatLayout: Record<PropertyNames, SxProps<Theme>> = {
  toolbar: (drawerWidth): any =>
    ({
      p: '10px !important',
      position: 'fixed',
      width: drawerWidth,
      height: 64,
    } as SxProps<Theme>),
  buttonAddTopic: { height: 34, borderRadius: 8 },
  boxChatList: { p: 1, position: 'absolute', top: 64, maxHeight: 'calc(100% - 64px)', overflow: 'auto', width: '100%' },
  appBar: (drawerWidth): any =>
    ({
      background: 'white',
      boxShadow: 'none',
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    } as SxProps<Theme>),
  boxMain: (drawerWidth): any =>
    ({
      flexGrow: 1,
      p: 3,
      background: '#f5e5eb',
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      mt: '64px',
      maxHeight: 'calc(100vh - 64px)',
      overflow: 'auto',
    } as SxProps<Theme>),
};
