import { Box, Typography } from '@mui/material';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { AccountRole } from '@type/account';
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

export const checkStartMessageOfUser = (messages: Message[], message: Message, index: number) => {
  const preMessage = messages[index - 1];
  return index !== 0 && message.accountId !== preMessage?.accountId;
};

type IChatMessage = {
  message: Message;
  isShowTime: boolean;
  index: number;
  isStartMessage: boolean;
};

export const ChatMessage: FC<IChatMessage> = ({ message, isShowTime, index, isStartMessage = true }) => {
  const { account } = useAppSelector(getAccountSlice);
  const { topic } = useAppSelector(getTopicSlice);

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
            ...(isStartMessage && { marginTop: 12 }),
          }}
          className={styles.wrapMessageChild}
        >
          {!checkIsWriter(message) && (
            <Box sx={{ fontWeight: 600, fontSize: 11, color: '#556EE4' }}>
              {account?.role === AccountRole.ADMIN ? topic?.account?.fullName : 'Admin'}
            </Box>
          )}
          {message.content}
        </Box>
      </Box>
    </Box>
  );
};
