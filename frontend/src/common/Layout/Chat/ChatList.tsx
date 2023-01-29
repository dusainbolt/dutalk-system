import { ListItemButton, Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { DEFAULT_STYLE } from '@styles/theme';
import * as React from 'react';

export const ChatList = () => {
  const listItem = (
    <ListItem disablePadding>
      <ListItemButton alignItems="flex-start" sx={{ p: 1, pt: 0.5, pb: 0.5, borderRadius: 2, width: '100%' }}>
        <ListItemText
          primary={
            <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="space-between">
              <Typography sx={{ fontSize: 18, fontWeight: 700 }} noWrap>
                Brunch this weekend? 213123 128371289371892731987312 12837218937219
              </Typography>
              <div>10:27</div>
            </Stack>
          }
          secondary={
            <React.Fragment>
              <Typography sx={DEFAULT_STYLE.ellipseText(2)} component="span" variant="body2" color="text.primary">
                <b>Ali Connors</b> — I'll be — I'll be in your neighborhood doing errands this…ng errands this…
                298092348409328409183 I'll be — I'll be in your neighborhood doing errands this…ng errands this…
                298092348409328409183
              </Typography>
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
  return (
    <List sx={{ p: 0, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {listItem}
      <Divider component="li" sx={{ mt: 0.75, mb: 0.75 }} />
      {listItem}
      <Divider component="li" sx={{ mt: 0.75, mb: 0.75 }} />
      {listItem}
      <Divider component="li" sx={{ mt: 0.75, mb: 0.75 }} />
      {listItem}
      <Divider component="li" sx={{ mt: 0.75, mb: 0.75 }} />
      {listItem}
      <Divider component="li" sx={{ mt: 0.75, mb: 0.75 }} />
    </List>
  );
};
