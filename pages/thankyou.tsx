import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const shopFooterStyles = css`
  text-align: center;
  justify-content: center;
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 0px 20px;
  height: 80px;
  padding: 18px;
  font-size: 1.7rem;
  text-align: center;
`;
const shopMainStyles = css`
  text-align: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 1rem;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 20px 20px;
  h1 {
    font-size: 7rem;
    font-weight: normal;
  }
  background-color: #f6f5f1;
  background-image: radial-gradient(#fe93e9 35px, transparent 35px),
    radial-gradient(#af99ff 35px, transparent 35px),
    radial-gradient(#ff6843 35px, transparent 35px),
    radial-gradient(#82c7a3 35px, transparent 35px);

  background-size: 160px 160px;
  background-position: 0 0, 80px 80px, 0px 80px, 80px 0px;
`;

export default function Home() {
  return (
    <div>
      <div>
        <Head>
          <title>Thank you for your dotty order!</title>
          <meta name="description" content="Thank you for your order" />
          <link rel="icon" href="/dot.svg" />
        </Head>

        <main css={shopMainStyles}>
          <div>
            {' '}
            <h1>
              thank you <br />
              for your order
            </h1>
          </div>
        </main>
        <div css={shopFooterStyles} data-test-id="cart-checkout">
          <Link href="/"> return to dot shop</Link>
        </div>
      </div>
    </div>
  );
}
