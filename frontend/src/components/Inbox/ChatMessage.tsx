import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
// eslint-disable-next-line import/namespace
import { Message } from './InboxComponent';

const writerId = 2;

const checkIsWriter = (message: Message): boolean => message.userId === writerId;

export const checkShowTime = (messages: Message[], message: Message, index: number) =>
  messages[index + 1]?.userId !== message.userId;

type IChatMessage = {
  message: Message;
  isShowTime: boolean;
};

export const ChatMessage: FC<IChatMessage> = ({ message, isShowTime }) => {
  return (
    <Box>
      <Box
        sx={{
          width: '90%',
          float: checkIsWriter(message) ? 'right' : 'left',
          mb: 0.5,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            float: checkIsWriter(message) ? 'right' : 'left',
            background: checkIsWriter(message) ? '#683db8' : '#ecf1f8',
            color: checkIsWriter(message) ? 'white' : 'black',
            p: 1.5,
            fontSize: 15,
            borderRadius: 2,
          }}
        >
          {message.content}
        </Box>
      </Box>
      {isShowTime && (
        <Typography
          sx={{
            float: checkIsWriter(message) ? 'right' : 'left',
            textAlign: checkIsWriter(message) ? 'right' : 'left',
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
};
