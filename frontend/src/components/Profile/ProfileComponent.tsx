import { Button } from '@common/Button';
import DrawerAppBar from '@common/Layout/AppBar';
import useAuth from '@hooks/useAuth';
import { Container, Link } from '@mui/material';
import { getAuthSlice } from '@redux/slices/authSlice';
import { useAppSelector } from '@redux/store';
import { FC, Fragment } from 'react';

const ProfileComponent: FC<any> = () => {
  const { loadingLogout } = useAppSelector(getAuthSlice);
  const { onLogout } = useAuth();

  return (
    <Fragment>
      <DrawerAppBar />
      <main>
        <Container sx={{ mt: 10 }} maxWidth="lg">
          <Link
            style={{ textDecoration: 'underline', display: 'block', textAlign: 'center', width: '100%' }}
            href="/dang-nhap"
          >
            Trang Ca Nhan
          </Link>
          <Button loading={loadingLogout} onClick={onLogout} variant="contained">
            Đăng xuất
          </Button>
        </Container>
      </main>
    </Fragment>
  );
};

export default ProfileComponent;
