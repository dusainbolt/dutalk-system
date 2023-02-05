import LoadingCircular from '@common/Progress/LoadingCircular';
import { Box, ListItemButton, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { getTopicSlice } from '@redux/slices/topicSlice';
import { useAppSelector } from '@redux/store';
import { DEFAULT_STYLE } from '@styles/theme';
import Date from '@utils/date';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';

export const ChatList = () => {
  const { listTopics, loadingGetTopics } = useAppSelector(getTopicSlice);
  const route = useRouter();

  return loadingGetTopics ? (
    <LoadingCircular />
  ) : (
    <List sx={{ p: 0, width: '100%', maxWidth: 360 }}>
      {listTopics?.map((item, index) => {
        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => route.push(`/hop-thu/${item.id}`)}
              alignItems="flex-start"
              sx={{ p: 1, pt: 0.5, pb: 0.5, borderRadius: 2, width: '100%' }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ fontSize: 18, fontWeight: 700 }} noWrap>
                    {item.title}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography sx={DEFAULT_STYLE.ellipseText(2)} component="span" variant="body2" color="text.primary">
                      <b>{!item?.latestMessage?.accountId ? 'ADMIN' : 'USER'}</b> — {item?.latestMessage?.content}
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
