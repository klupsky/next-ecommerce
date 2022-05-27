import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const mainStyle = css`
  text-align: center;
  align-content: center;
  margin-top: 3rem;

  h2 {
    font-size: 1.7rem;
    font-weight: normal;
  }
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dot Shop 404</title>
        <meta name="Dot Shop 404" content="page not found" />
        <link rel="icon" href="/doticon.svg" />
      </Head>

      <main css={mainStyle}>
        <h2>
          you got lost! <Link href={'/dotshop'}>return to the dot shop.</Link>
        </h2>
      </main>
    </div>
  );
}
