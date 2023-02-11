import { Box, Typography } from '@mui/material';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { useAppSelector } from '@redux/store';
import { Message } from '@type/message';
import Date from '@utils/date';
import { FC } from 'react';
import { chatMessageStyles } from './styles/ChatMessage.style';

export const checkShowTime = (messages: Message[], message: Message, index: number) => {
  const preMessage = messages[index - 1];
  const diffSecond = Math.floor(Date.diff(preMessage?.createdOn, message.createdOn) / 1000);
  if (diffSecond < Date.oneHours) return false;
  return true;
};

type IChatMessage = {
  message: Message;
  isShowTime: boolean;
  index: number;
};

export const ChatMessage: FC<IChatMessage> = ({ message, isShowTime, index }) => {
  const { account } = useAppSelector(getAccountSlice);
  const styles = chatMessageStyles();

  const checkIsWriter = (message: Message): boolean => account?.id === message?.accountId;

  const renderTimeContent = (
    <Box className={styles.wrapTime}>
      <Typography className={styles.timeText}>{Date.generateDuration(message.createdOn)}</Typography>
    </Box>
  );

  return (
    <Box>
      {(index === 0 || isShowTime) && renderTimeContent}
      <Box style={{ float: checkIsWriter(message) ? 'right' : 'left' }} className={styles.wrapMessage}>
        <Box
          style={{
            float: checkIsWriter(message) ? 'right' : 'left',
            background: checkIsWriter(message) ? '#F5F5F8' : '#EDF0FD',
          }}
          className={styles.wrapMessageChild}
        >
          {message.content}
        </Box>
      </Box>
    </Box>
  );
};
