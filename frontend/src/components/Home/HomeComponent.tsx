import DrawerAppBar from '@common/Layout/AppBar';
import { Container, Link } from '@mui/material';
import { FC, Fragment } from 'react';

const HomeComponent: FC<any> = () => {
  return (
    <Fragment>
      <DrawerAppBar />
      <main>
        <Container sx={{ mt: 10 }} maxWidth="lg">
          <Link
            style={{ textDecoration: 'underline', display: 'block', textAlign: 'center', width: '100%' }}
            href="/dang-nhap"
          >
            Đăng nhập ngay
          </Link>
        </Container>
      </main>
    </Fragment>
  );
};

export default HomeComponent;
