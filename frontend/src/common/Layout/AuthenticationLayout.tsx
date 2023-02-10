import { Box, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import { authenticationLayoutStyles } from './styles/AuthenticationLayout.style';

export const AuthenticationLayout: FC<any> = ({ children }) => {
  const styles = authenticationLayoutStyles();
  return (
    <main>
      <Stack alignItems="center" style={{ minHeight: '100vh', background: '#F4F4F8' }} justifyContent="center">
        <Box className={styles.mainContent}>
          <Box className={styles.wrapperTop}>
            <Box className={styles.wrapText}>
              <Typography variant="h3" className={styles.textWelcome}>
                Chào mừng bạn!
              </Typography>
              <Typography className={styles.textDescription}>Đăng nhập để tiếp tục</Typography>
            </Box>
            <Stack className={styles.wrapLogo} justifyContent="center" alignItems="center">
              <LogoDevIcon />
            </Stack>
          </Box>
          <Box style={{ padding: 20 }}>{children}</Box>
        </Box>
      </Stack>
    </main>
  );
};
