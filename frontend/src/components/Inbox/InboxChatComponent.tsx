import { ButtonIcon } from '@common/Button/ButtonIcon';
import { AppDialog } from '@common/Dialog';
import { ChatLayout } from '@common/Layout/ChatLayout';
import useMessage from '@hooks/useMessage';
import useTopic from '@hooks/useTopic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import { Alert, Box, Container, Hidden, Stack, Typography, useScrollTrigger } from '@mui/material';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { openDialogApp, showChatListMobile } from '@redux/slices/layoutSlice';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { AccountRole } from '@type/account';
import { Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { FC, useEffect, useState } from 'react';
import { validateSendMessage, valuesSendMessage } from 'src/yup/validateMessage';
import { ChatForm } from './ChatForm';
import { ChatMessage, checkShowTime, checkStartMessageOfUser } from './ChatMessage';
import { ChatTopicInfo } from './ChatTopicInfo';
import { inboxChatStyles } from './styles/InboxChatStyle';

export const InboxChatComponent: FC<any> = () => {
  const { onSubmitAddTopic, getSystemTopics, getMyTopics, getTopicDetail, getTopicMessages } = useTopic();
  const { topic, topicMessages, loadingGetTopicMessages, loadingGetTopic } = useAppSelector(getTopicSlice);
  const { account } = useAppSelector(getAccountSlice);
  const { loadedListTopic } = useAppSelector(getTopicSlice);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const [refBoxChat, setRefBoxChat] = useState<HTMLDivElement>(undefined as any);
  const [loadedTopicMessages, setLoadedTopicMessages] = useState<boolean>(false);
  const { onSubmitSendMessage } = useMessage();
  const styles = inboxChatStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: refBoxChat || undefined,
  });

  useEffect(() => {
    if (topicMessages?.length && !trigger && loadedTopicMessages) {
      console.log('loadmore');
    }
  }, [trigger, topicMessages]);

  useEffect(() => {
    setTimeout(() => {
      if (topicMessages?.length) {
        setLoadedTopicMessages(true);
      }
    });
  }, [topicMessages?.length]);

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
        content: <ChatTopicInfo />,
      })
    );
  };

  const isLoadingPage = loadingGetTopicMessages || loadingGetTopic;

  return (
    <ChatLayout
      contentAppBar={
        !isLoadingPage && (
          <Stack direction="row" justifyContent="space-between" style={{ width: '100%' }}>
            <Stack direction="row" style={{ width: '100%' }}>
              <Hidden smUp>
                <ButtonIcon onClick={backToChatList} icon={<ArrowBackIcon />} />
              </Hidden>
              <Typography
                variant="h2"
                className={styles.appBarTitle}
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
        <Stack direction="column" style={{ height: '100%' }}>
          <Box className={styles.boxChatWrap} ref={(node) => node && setRefBoxChat(node as any)}>
            <Container maxWidth="md">
              <Box className={styles.messagesWrap}>
                {topicMessages?.map((message, index) => (
                  <ChatMessage
                    message={message}
                    isShowTime={checkShowTime(topicMessages, message, index)}
                    isStartMessage={checkStartMessageOfUser(topicMessages, message, index)}
                    index={index}
                    key={index}
                  />
                ))}
                {topicMessages?.length === 1 && account?.role !== AccountRole.ADMIN && (
                  <Box style={{ marginTop: 8 }}>
                    <Alert
                      style={{ width: '100%' }}
                    >{`Chào ${account?.fullName}, hệ thống đã nhận được tin nhắn của bạn. Quản trị viên sẽ trả lời bạn sớm!`}</Alert>
                  </Box>
                )}
                <Box style={{ height: 10, width: '100%', float: 'right' }}></Box>
              </Box>
            </Container>
          </Box>
          <Box style={{ width: '100%', marginBottom: 16 }}>
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
