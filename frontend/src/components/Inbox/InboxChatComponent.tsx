import { ChatLayout } from '@common/Layout/ChatLayout';
import useMessage from '@hooks/useMessage';
import useTopic from '@hooks/useTopic';
import { Box, Container, Stack, Typography } from '@mui/material';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { DEFAULT_STYLE } from '@styles/theme';
import { Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { FC, useEffect, useState } from 'react';
import { validateSendMessage, valuesSendMessage } from 'src/yup/validateMessage';
import { ChatForm } from './ChatForm';
import { ChatMessage, checkShowTime } from './ChatMessage';

export const InboxChatComponent: FC<any> = ({ window }) => {
  const { onSubmitAddTopic, getMyTopic, getTopicDetail, getTopicMessages } = useTopic();
  const { topic, topicMessages } = useAppSelector(getTopicSlice);
  const route = useRouter();
  const [refBoxChat, setRefBoxChat] = useState<HTMLDivElement>(undefined as any);
  const { onSubmitSendMessage } = useMessage();

  // const trigger = useScrollTrigger({
  //   target: refBoxChat,
  //   disableHysteresis: true,
  //   threshold: 100,
  // });

  // effect auto scroll box chat
  useEffect(() => {
    if (refBoxChat && topic?.id && topicMessages?.length) {
      refBoxChat.scrollTop = refBoxChat.scrollHeight;
    }
  }, [refBoxChat, topic?.id, topicMessages]);

  useEffect(() => {
    getMyTopic();
  }, []);

  useEffect(() => {
    if (route?.query.id) {
      getTopicDetail(route?.query.id as string);
      getTopicMessages(route?.query.id as string);
    }
  }, [route?.query.id]);

  return (
    <ChatLayout
      contentAppBar={
        <Typography
          variant="h2"
          sx={{ ...DEFAULT_STYLE.ellipseText(1), width: '80%', color: 'black', fontSize: 30 }}
          component="h2"
          // variant="body2"
          color="text.primary"
        >
          {topic?.title}
        </Typography>
      }
      onSubmitCreateTopic={onSubmitAddTopic}
    >
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
    </ChatLayout>
  );
};
