import { ChatLayout } from '@common/Layout/ChatLayout';
import useTopic from '@hooks/useTopic';
import { Stack } from '@mui/material';
import { FC, useEffect } from 'react';

export const InboxComponent: FC<any> = () => {
  const { onSubmitAddTopic, getMyTopic } = useTopic();

  useEffect(() => {
    getMyTopic();
  }, []);

  return (
    <ChatLayout onSubmitCreateTopic={onSubmitAddTopic}>
      <Stack direction="column" sx={{ height: '100%' }}>
        {/* <Box sx={{ overflow: 'auto' }}>
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
        </Box> */}
      </Stack>
    </ChatLayout>
  );
};
