import { ButtonIcon } from '@common/Button/ButtonIcon';
import { AppDialog } from '@common/Dialog';
import { ChatLayout } from '@common/Layout/ChatLayout';
import useMessage from '@hooks/useMessage';
import useTopic from '@hooks/useTopic';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Container, Divider, Hidden, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { openDialogApp, showChatListMobile } from '@redux/slices/layoutSlice';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { DEFAULT_STYLE } from '@styles/theme';
import { AccountRole } from '@type/account';
import Date from '@utils/date';
import { Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { FC, useEffect, useState } from 'react';
import { validateSendMessage, valuesSendMessage } from 'src/yup/validateMessage';
import { ChatForm } from './ChatForm';
import { ChatMessage, checkShowTime } from './ChatMessage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const InboxChatComponent: FC<any> = () => {
  const { onSubmitAddTopic, getSystemTopics, getMyTopics, getTopicDetail, getTopicMessages } = useTopic();
  const { topic, topicMessages, loadingGetTopicMessages, loadingGetTopic } = useAppSelector(getTopicSlice);
  const { account } = useAppSelector(getAccountSlice);
  const { loadedListTopic } = useAppSelector(getTopicSlice);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [refBoxChat, setRefBoxChat] = useState<HTMLDivElement>(undefined as any);
  const { onSubmitSendMessage } = useMessage();

  // effect auto scroll box chat
  useEffect(() => {
    if (refBoxChat && topic?.id && topicMessages?.length) {
      refBoxChat.scrollTop = refBoxChat.scrollHeight;
    }
  }, [refBoxChat, topic?.id, topicMessages]);

  // handle check account and get list topic for chat layout
  useEffect(() => {
    if (account?.role && !loadedListTopic) {
      account.role === AccountRole.ADMIN ? getSystemTopics() : getMyTopics();
    }
  }, [account?.role, loadedListTopic]);

  useEffect(() => {
    if (route?.query.id) {
      getTopicDetail(route?.query.id as string);
      getTopicMessages(route?.query.id as string);
    }
  }, [route?.query.id]);

  const backToChatList = () => {
    dispatch(showChatListMobile(true));
  };

  const onClickViewInfo = () => {
    dispatch(
      openDialogApp({
        title: 'Thông tin chủ đề',
        content: (
          <Box>
            <Divider textAlign="left">Chủ đề</Divider>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <ListItemText primary="Tiêu đề" secondary={topic?.title} />
              </ListItem>
            </List>
            <Divider textAlign="left">Người dùng</Divider>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <ListItemText primary="Nickname" secondary={topic?.account?.username} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={topic?.account?.email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Họ và tên" secondary={topic?.account?.fullName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ngày tạo" secondary={Date.toDateHoursStr(topic?.account?.createdOn)} />
              </ListItem>
            </List>
          </Box>
        ),
      })
    );
  };

  const isLoadingPage = loadingGetTopicMessages || loadingGetTopic;

  return (
    <ChatLayout
      contentAppBar={
        !isLoadingPage && (
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Stack direction="row" sx={{ width: '100%' }}>
              <Hidden smUp>
                <ButtonIcon onClick={backToChatList} icon={<ArrowBackIcon />} />
              </Hidden>
              <Typography
                variant="h2"
                sx={{ ...DEFAULT_STYLE.ellipseText(1), width: '80%', color: 'black', fontSize: 30 }}
                component="h2"
                title={topic?.title}
                color="text.primary"
              >
                {topic?.title}
              </Typography>
            </Stack>
            {topic?.account?.id && <ButtonIcon onClick={onClickViewInfo} icon={<InfoIcon />} />}
          </Stack>
        )
      }
      onSubmitCreateTopic={onSubmitAddTopic}
    >
      {!isLoadingPage && (
        <Stack direction="column" sx={{ height: '100%' }}>
          <Box
            ref={(node) => node && setRefBoxChat(node as any)}
            sx={{ overflow: 'auto', minHeight: 'calc(100vh - 128px)' }}
          >
            <Container maxWidth="md">
              <Box sx={{ mt: 2, pb: 3 }}>
                {topicMessages?.map((message, index) => (
                  <ChatMessage
                    message={message}
                    isShowTime={checkShowTime(topicMessages, message, index)}
                    index={index}
                    key={index}
                  />
                ))}
                <Box sx={{ height: 10, width: '100%', float: 'right' }}></Box>
              </Box>
            </Container>
          </Box>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Container maxWidth="md">
              <Formik
                onSubmit={onSubmitSendMessage}
                validationSchema={validateSendMessage}
                initialValues={valuesSendMessage}
              >
                <ChatForm topicId={topic?.id} />
              </Formik>
            </Container>
          </Box>
        </Stack>
      )}
      {/* import dialog */}
      <AppDialog />
    </ChatLayout>
  );
};
