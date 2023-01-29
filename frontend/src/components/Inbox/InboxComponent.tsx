import { Button } from '@common/Button';
import { ChatLayout } from '@common/Layout/Chat/ChatLayout';
import useAuth from '@hooks/useAuth';
import { Link } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { FC } from 'react';

export const InboxComponent: FC<any> = () => {
  const { loadingLogout } = useAppSelector(getAuthSlice);
  const { onLogout } = useAuth();

  return (
    <ChatLayout>
      {/* <DrawerAppBar /> */}
      {/* <Container> */}
      <Link
        style={{ textDecoration: 'underline', display: 'block', textAlign: 'center', width: '100%' }}
        href="/dang-nhap"
      >
        Trang Ca Nhan
      </Link>
      <Button loading={loadingLogout} onClick={onLogout} variant="contained">
        Đăng xuất
      </Button>
      {/* </Container> */}
    </ChatLayout>
  );
};
