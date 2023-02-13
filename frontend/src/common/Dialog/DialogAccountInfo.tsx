import { Box, List, ListItem, ListItemText } from '@mui/material';
import { getAccountSlice } from '@redux/slices/accountSlice';
import { useAppSelector } from '@redux/store';
import Date from '@utils/date';
import { FC } from 'react';

export const DialogAccountInfo: FC<any> = () => {
  const { account } = useAppSelector(getAccountSlice);

  return (
    <Box>
      {/* <Divider textAlign="left">Chủ đề</Divider> */}
      {/* <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemText primary="Tiêu đề" secondary={account?.title} />
        </ListItem>
      </List> */}
      {/* <Divider textAlign="left">Người dùng</Divider> */}
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemText primary="Nickname" secondary={account?.username} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={account?.email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Họ và tên" secondary={account?.fullName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ngày tạo" secondary={Date.toDateHoursStr(account?.createdOn)} />
        </ListItem>
      </List>
    </Box>
  );
};
