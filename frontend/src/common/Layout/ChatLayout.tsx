/* eslint-disable react/destructuring-assignment */
import { Button } from '@common/Button';
import { TopicForm } from '@components/Inbox/TopicForm';
import useTopic from '@hooks/useTopic';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Fade, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { DEFAULT_STYLE } from '@styles/theme';
import { Formik } from 'formik';
import { ReactNode, useEffect, useState } from 'react';
import { validateCreateTopic, valuesCreateTopic } from 'src/yup/validateTopic';
import { ChatList } from '../../components/Inbox/ChatList';
import { ChatMenu } from '../../components/Inbox/ChatMenu';
import { styleChatLayout as styles } from './styles/ChatLayout.style';

const drawerWidth = 320;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactNode;
  onSubmitCreateTopic: any;
  contentAppBar?: any;
}

export const ChatLayout = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isCreatingTopic, setIsCreatingTopic] = useState<boolean>(false);
  const { newTopicId } = useAppSelector(getTopicSlice);
  const { getMyTopic } = useTopic();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (newTopicId) {
      setIsCreatingTopic(false);
      getMyTopic();
    }
  }, [newTopicId]);

  const drawer = (
    <Box>
      <Toolbar className="toolbar" sx={(styles as any).toolbar(drawerWidth)}>
        <Stack direction="row" alignItems="center">
          <ChatMenu />
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={() => setIsCreatingTopic((isCreatingTopic) => !isCreatingTopic)}
            startIcon={<AddCircleRoundedIcon />}
            sx={styles.buttonAddTopic}
          >
            Tạo chủ đề
          </Button>
        </Stack>
      </Toolbar>
      <Divider />
      <Fade in={isCreatingTopic}>
        <Box sx={styles.boxChatList}>
          <Formik
            onSubmit={props.onSubmitCreateTopic}
            validationSchema={validateCreateTopic}
            initialValues={valuesCreateTopic}
          >
            <TopicForm visible={isCreatingTopic} />
          </Formik>
        </Box>
      </Fade>
      <Fade in={!isCreatingTopic}>
        <Box sx={styles.boxChatList}>
          <ChatList />
        </Box>
      </Fade>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={(styles as any).appBar(drawerWidth)}>
        <Toolbar>{props.contentAppBar}</Toolbar>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#F5F5F8' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#F5F5F8' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={(styles as any).boxMain(drawerWidth)}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {props.children}
      </Box>
    </Box>
  );
};
