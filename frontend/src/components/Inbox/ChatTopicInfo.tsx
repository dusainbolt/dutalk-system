import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import Date from '@utils/date';
import { FC } from 'react';

export const ChatTopicInfo: FC<any> = () => {
  const { topic } = useAppSelector(getTopicSlice);

  return (
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
  );
};
