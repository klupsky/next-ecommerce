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
        <title>Thank you for your dotty order!</title>
        <meta name="thank you" content="Thank you for your order" />
        <link rel="icon" href="/dot.svg" />
      </Head>

      <main css={mainStyle}>
        <h2>
          Thank you for your dot order!
          <Link href="/dotshop">return to the dot shop.</Link>
        </h2>
      </main>
    </div>
  );
}
