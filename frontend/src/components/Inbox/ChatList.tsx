/* eslint-disable eqeqeq */
import LoadingCircular from '@common/Progress/LoadingCircular';
import { Box, ListItemButton, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { DEFAULT_STYLE } from '@styles/theme';
import Constant from '@utils/constant';
import Date from '@utils/date';
import clsx from 'clsx';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import { chatListStyles } from './styles/ChatList.style';

export const ChatList = () => {
  const { listTopics, loadingGetTopics } = useAppSelector(getTopicSlice);
  const styles = chatListStyles();
  const route = useRouter();

  const isActive = (topicId) => topicId == route.query.id;

  return loadingGetTopics ? (
    <LoadingCircular />
  ) : (
    <List className={styles.listWrap}>
      {listTopics?.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => route.push(`/hop-thu/${item.id}`)}
              alignItems="flex-start"
              className={clsx(styles.chatItemWrap, isActive(item.id) && 'active')}
            >
              <ListItemText
                primary={
                  <Typography title={item.title} sx={{ fontSize: 18, fontWeight: 700 }} noWrap>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography sx={DEFAULT_STYLE.ellipseText(2)} component="span" variant="body2" color="text.primary">
                      <b>{item?.latestMessage?.accountId === Constant.ADMIN_ID ? 'Admin' : item.account?.fullName}</b>:{' '}
                      {item?.latestMessage?.content}
                    </Typography>
                    <Box sx={{ fontSize: 14 }}>{Date.generateDuration(item.updatedOn)}</Box>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
