import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const mainStyle = css`
  text-align: center;
  align-content: center;
  margin-top: 3rem;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dot Shop 404</title>
        <meta nname="description" content="page not found" />
        <link rel="icon" href="/dot.svg" />
      </Head>

      <main css={mainStyle}>
        you got lost! <Link href="/">return to the dot shop.</Link>
      </main>
    </div>
  );
}
