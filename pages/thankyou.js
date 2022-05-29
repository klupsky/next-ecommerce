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
        <title>Dot Shop is saying thank you!</title>
        <meta name="THANK YOU" content="thank you for shopping dots" />
        <link rel="icon" href="/doticon.svg" />
      </Head>

      <main css={mainStyle}>
        <h2>
          Thank you for your dot purchase!
          <Link href="/dotshop">return to the dot shop.</Link>
        </h2>
      </main>
    </div>
  );
}
