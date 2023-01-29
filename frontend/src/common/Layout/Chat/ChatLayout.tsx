import { Button } from '@common/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ReactNode } from 'react';
import { ChatList } from './ChatList';
import { ChatMenu } from './ChatMenu';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { styleChatLayout as styles } from './styles/ChatLayout.style';
import { DEFAULT_STYLE } from '@styles/theme';

const drawerWidth = 320;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactNode;
}

type Message = {
  content: string;
  time: string;
  userId: number;
};

const chatData: Message[] = [
  {
    content: '123123',
    userId: 1,
    time: '04:55',
  },
  {
    content:
      'eslint-disable-next-line react/destructuring-assignment  eslint-disable-next-line react/destructuring-assignment  eslint-disable-next-line react/destructuring-assignment ',
    userId: 1,
    time: '04:55',
  },
  {
    content: '123123',
    userId: 2,
    time: '04:55',
  },
  {
    content: '123123',
    userId: 1,
    time: '04:55',
  },
];

const writerId = 2;

const isWriter = (message: Message): boolean => message.userId === writerId;

export const ChatLayout = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar sx={(styles as any).toolbar(drawerWidth)}>
        <Stack direction="row" alignItems="center">
          <ChatMenu />
          <Button
            variant="contained"
            size="small"
            disableElevation
            startIcon={<AddCircleRoundedIcon />}
            sx={styles.buttonAddTopic}
          >
            Tạo chủ đề
          </Button>
        </Stack>
      </Toolbar>
      <Divider />
      <Box sx={styles.boxChatList}>
        <ChatList />
        <ChatList />
        <ChatList />
      </Box>
    </Box>
  );

  const renderChat = (message: Message, index: number) => (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          width: '90%',
          float: isWriter(message) ? 'right' : 'left',
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            float: isWriter(message) ? 'right' : 'left',
            background: isWriter(message) ? '#683db8' : '#ecf1f8',
            color: isWriter(message) ? 'white' : 'black',
            p: 1.5,
            fontSize: 15,
            borderRadius: 2,
          }}
        >
          {message.content}
        </Box>
      </Box>

      {chatData[index + 1]?.userId !== message.userId && (
        <Typography
          sx={{
            float: isWriter(message) ? 'right' : 'left',
            textAlign: isWriter(message) ? 'right' : 'left',
            width: '100%',
            mb: 1,
          }}
          component="div"
          color="text.primary"
        >
          {message.time}
        </Typography>
      )}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const content = <Box sx={{ width: 400 }}>{chatData.map(renderChat)}</Box>;
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={(styles as any).appBar(drawerWidth)}>
        <Toolbar>
          {/* <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h2"
            sx={{ ...DEFAULT_STYLE.ellipseText(1), width: '80%', color: 'black', fontSize: 30 }}
            component="h2"
            // variant="body2"
            color="text.primary"
          >
            Responsive drawer Responsive drawer Responsive drawer Responsive drawer Responsive drawer Responsive drawer
            Responsive drawer Responsive drawer Responsive drawer Responsive drawer Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={(styles as any).boxMain(drawerWidth)}>
        {content}
        {/* {content}
        {content}
        {content}
        {content} */}
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {/* {props.children} */}
      </Box>
    </Box>
  );
};
