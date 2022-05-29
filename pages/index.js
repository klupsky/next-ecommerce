import { css } from '@emotion/react';
import Head from 'next/head';
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
        <title>Dot Shop</title>
        <meta name="Dot Shop" content="shop a dot" />
        <link rel="icon" href="/doticon.svg" />
      </Head>

      <main css={mainStyle}>
        <Link href="/dotshop">dot dot dot </Link>
      </main>
    </div>
  );
}
