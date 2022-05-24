import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const mainStyle = css`
  color: #ffffff;
  text-align: center;
  align-content: center;
  margin-top: 3rem;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Miranda Shop</title>
        <meta name="Miranda Shop" content="Miranda Bar online shop" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <main css={mainStyle}>
        <Link href={`/logos/mirandashop`}>
          <Image src="/logo.png" alt="miranda logo" width="638" height="530" />
        </Link>
      </main>
    </div>
  );
}
