import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_STYLE } from '@styles/theme';

export const inboxChatStyles = makeStyles((theme: Theme) => ({
  appBarTitle: { ...DEFAULT_STYLE.ellipseText(1), width: '80%', color: 'black', fontWeight: '600', fontSize: 30 },
  boxMessagesWrap: {
    height: '100vh',
    overflow: 'overlay',
  },
  boxChatWrap: {
    width: '100%',
    height: '100%',
  },

  messagesWrap: { marginTop: theme.spacing(2), paddingBottom: theme.spacing(3) },
}));
