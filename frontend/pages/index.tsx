import HomeComponent from '@components/Home/HomeComponent';
import { wrapper } from '@redux/store';
import { SSGContext } from '@type/context';
import Head from 'next/head';
import { FC, Fragment } from 'react';

const HomePage: FC<any> = () => {
  return (
    <Fragment>
      <Head>
        <title>DuTalk | Trang chủ</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <HomeComponent />
    </Fragment>
  );
};

export const getStaticProps = wrapper.getStaticProps((): SSGContext | any => async () => {
  // await Helper.delay(5000);
});

export default HomePage;
