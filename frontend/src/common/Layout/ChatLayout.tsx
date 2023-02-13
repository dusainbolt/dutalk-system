/* eslint-disable react/destructuring-assignment */
import { Button } from '@common/Button';
import { DialogAccountInfo } from '@common/Dialog/DialogAccountInfo';
import { TopicForm } from '@components/Inbox/TopicForm';
import useTopic from '@hooks/useTopic';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Avatar, Chip, Fade, Hidden, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { getLayoutSlice, openDialogApp } from '@redux/slices/layoutSlice';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { AccountRole } from '@type/account';
import { Formik } from 'formik';
import { ReactNode, useEffect, useState } from 'react';
import { validateCreateTopic, valuesCreateTopic } from 'src/yup/validateTopic';
import { ChatList } from '../../components/Inbox/ChatList';
import { ChatMenu } from '../../components/Inbox/ChatMenu';
import { chatLayoutStyles } from './styles/ChatLayout.style';

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
  isShowChatList?: boolean;
}

export const ChatLayout = (props: Props) => {
  const { window, isShowChatList } = props;
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isCreatingTopic, setIsCreatingTopic] = useState<boolean>(false);
  const { newTopicId } = useAppSelector(getTopicSlice);
  const { account } = useAppSelector(getAccountSlice);
  const { isShowChatListMobile } = useAppSelector(getLayoutSlice);
  const { getMyTopics } = useTopic();
  const styles = chatLayoutStyles(drawerWidth)();
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const clickViewAccountInfo = () => {
    dispatch(
      openDialogApp({
        title: 'Thông tin người dùng',
        content: <DialogAccountInfo />,
      })
    );
  };

  useEffect(() => {
    if (newTopicId) {
      setIsCreatingTopic(false);
      getMyTopics();
    }
  }, [newTopicId]);

  const isAdmin = account?.role === AccountRole.ADMIN;

  const drawer = (
    <Box>
      <Toolbar className={styles.toolbar}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <ChatMenu />
          {isAdmin ? (
            <Chip label="Admin" color="success" variant="outlined" />
          ) : (
            <Chip
              onClick={clickViewAccountInfo}
              avatar={<Avatar>{account?.fullName.split('')[0]}</Avatar>}
              label={account?.fullName}
            />
          )}
        </Stack>
      </Toolbar>
      <Box sx={{ position: 'absolute', p: 1, pt: 0, top: 64, height: 'max-content', width: '100%' }}>
        <Button
          variant="outlined"
          size="small"
          disabled={isAdmin}
          disableElevation
          onClick={() => setIsCreatingTopic((isCreatingTopic) => !isCreatingTopic)}
          startIcon={isCreatingTopic ? <ArrowBackRoundedIcon /> : <AddCircleRoundedIcon />}
          className={styles.buttonAddTopic}
        >
          {isCreatingTopic ? 'Trở lại' : 'Tạo chủ đề'}
        </Button>
      </Box>
      {/* <Divider /> */}
      <Fade in={isCreatingTopic}>
        <Box className={styles.boxChatList}>
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
        <Box className={styles.boxChatList}>
          <ChatList />
        </Box>
      </Fade>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>{props.contentAppBar}</Toolbar>
      </AppBar>
      <Box component="nav" className={styles.navDrawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp>
          <Drawer
            container={container}
            variant="temporary"
            open={typeof isShowChatListMobile !== 'undefined' ? isShowChatListMobile : isShowChatList}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100%', background: '#F5F5F8' },
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            sx={{
              display: 'block',
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#F5F5F8' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </Box>
      <Box component="main" className={styles.boxMain}>
        {props.children}
      </Box>
    </Box>
  );
};
