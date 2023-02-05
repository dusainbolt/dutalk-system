import { Box, Chip, Divider } from '@mui/material';
import { Message } from '@type/message';
import Date from '@utils/date';
import { FC } from 'react';

const checkIsWriter = (message: Message): boolean => !!message?.accountId;

export const checkShowTime = (messages: Message[], message: Message, index: number) => {
  const preMessage = messages[index - 1];
  const diffSecond = Math.floor(Date.diff(preMessage?.createdOn, message.createdOn) / 1000);
  if (index === messages.length - 1) {
    return false;
  }
  if (diffSecond < Date.oneHours) {
    return false;
  }
  return true;
  //   return preMessage?.accountId !== message.accountId;
};

type IChatMessage = {
  message: Message;
  isShowTime: boolean;
  index: number;
};

export const ChatMessage: FC<IChatMessage> = ({ message, isShowTime, index }) => {
  const renderTimeContent = (
    <Box
      sx={{
        float: checkIsWriter(message) ? 'right' : 'left',
        textAlign: checkIsWriter(message) ? 'right' : 'left',
        width: '100%',
        m: 1,
      }}
    >
      <Divider>
        <Chip label={Date.generateDuration(message.createdOn)} />
      </Divider>
    </Box>
  );

  return (
    <Box>
      {(index === 0 || isShowTime) && renderTimeContent}
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
            background: checkIsWriter(message) ? '#F5F5F8' : '#EDF0FD',
            color: '#4A5056',
            p: 1,
            fontSize: 15,
            borderRadius: 2,
          }}
        >
          {message.content}
        </Box>
      </Box>
    </Box>
  );
};
