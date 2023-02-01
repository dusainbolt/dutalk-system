import { ChatLayout } from '@common/Layout/ChatLayout';
import useTopic from '@hooks/useTopic';
import { Box, Container, Stack } from '@mui/material';
import { Formik } from 'formik';
import { FC, useEffect } from 'react';
import { ChatForm } from './ChatForm';
import { ChatMessage, checkShowTime } from './ChatMessage';

export type Message = {
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

export const InboxComponent: FC<any> = () => {
  const { onSubmitAddTopic, getMyTopic } = useTopic();

  useEffect(() => {
    getMyTopic();
  }, []);

  return (
    <ChatLayout onSubmitCreateTopic={onSubmitAddTopic}>
      <Stack direction="column" sx={{ height: '100%' }}>
        <Box sx={{ overflow: 'auto' }}>
          <Container maxWidth="md">
            <Box sx={{ mt: 2 }}>
              {chatData.map((message, index) => (
                <ChatMessage message={message} isShowTime={checkShowTime(chatData, message, index)} />
              ))}
              {chatData.map((message, index) => (
                <ChatMessage message={message} isShowTime={checkShowTime(chatData, message, index)} />
              ))}
              {chatData.map((message, index) => (
                <ChatMessage message={message} isShowTime={checkShowTime(chatData, message, index)} />
              ))}
            </Box>
          </Container>
        </Box>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Container maxWidth="md">
            <Formik onSubmit={null as any} validationSchema={null as any} initialValues={{ message: '' }}>
              <ChatForm />
            </Formik>
          </Container>
        </Box>
      </Stack>
    </ChatLayout>
  );
};
