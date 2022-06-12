import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { setStringifiedCookie } from '../util/cookies';
import { getProducts } from '../util/database';

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
    text-align: center;
    font-size: 1.7rem;
    font-weight: normal;
  }
`;

const buttonCenterStyle = css`
  text-align: center;
  margin-bottom: 20px;
`;

const buttonBuyStyle = css`
  font-family: poppins;
  color: #f6f5f1;
  background-color: #000000;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  text-align: center;
  padding: 10px;
  font-size: 1.3rem;
  margin: 5px 0 0px;
  transition-duration: 0.3s;
  transition-property: transform;

  :hover,
  :focus,
  :active {
    transform: scale(1.1);
    background-color: #000000;
    border: 2px solid #000000;
    color: #f6f5f1;
  }
`;

const formContainerStyle = css`
  align-items: center;
  display: flex;
  margin: 0 20% 0;
`;

const formOuterStyles = css`
  display: flex;
  flex-wrap: wrap;

  align-items: center;

  li {
    flex: 300px;
    max-width: 300px;
    list-style-type: none;
    padding: 0;
    justify-content: center;
    margin-right: 30px;
  }

  input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid #000000;
    min-width: 300px;
    font-size: 1rem;
    -webkit-text-size-adjust: 100%;
    font-family: var(--typeBasePrimary);
    font-weight: var(--typeBaseWeight);
    font-style: var(--typeBaseStyle);
    letter-spacing: var(--typeBaseSpacing);
    line-height: var(--typeBaseLineHeight);
    display: inline-block;
    text-align: start;
    margin-bottom: 20px;
  }
`;

export default function Checkout(props) {
  //   const cleanUpSubmit = preventDefault(() => {
  //     setProductInCart('cart', []);
  //     props.setCartCounter(0);
  //   });

  return (
    <div>
      <Head>
        <title>check out</title>
        <meta
          name="dot shop checkout"
          content="submit your information for checkout"
        />
        <link rel="icon" href="/dot.svg" />
      </Head>
      <main css={shopMainStyles}>
        <h1>check out</h1>
        <div css={formContainerStyle}>
          <form>
            <ul css={formOuterStyles}>
              <li>
                <label>
                  <span>first name:</span>
                  <input data-test-id="checkout-first-name" required />
                </label>{' '}
              </li>{' '}
              <li>
                <label>
                  <span> last name:</span>
                  <input data-test-id="checkout-last-name" required />
                </label>
              </li>
              <li>
                <label>
                  <span>email:</span>
                  <input type="email" data-test-id="checkout-email" required />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  <span>adress:</span>
                  <input data-test-id="checkout-address" required />
                </label>{' '}
              </li>
              <li>
                {' '}
                <label>
                  <span> city:</span>
                  <input data-test-id="checkout-city" required />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  <span>postal code:</span>
                  <input data-test-id="checkout-postal-code" required />
                </label>
              </li>
              <li>
                <label>
                  country:
                  <input data-test-id="checkout-country" required />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  {' '}
                  <span>credit-card: </span>
                  <input
                    data-test-id="checkout-credit-card"
                    type="number"
                    maxLength={12}
                    required
                  />
                </label>{' '}
              </li>
              <li>
                <label>
                  <span>expiration date:</span>
                  <input
                    data-test-id="checkout-security-code"
                    type="number"
                    placeholder="mm/yyyy"
                    maxLength={6}
                    required
                  />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  <span> cvc:</span>
                  <input
                    data-test-id="checkout-security-code"
                    type="password"
                    required
                  />
                </label>
              </li>
              <br />{' '}
            </ul>
            <Link href="/thankyou">
              <div css={buttonCenterStyle}>
                <button
                  css={buttonBuyStyle}
                  data-test-id="checkout-confirm-order"
                  onClick={() => {
                    setStringifiedCookie('cart', []);

                    props.setProductInCart([]);
                  }}
                >
                  confirm
                </button>
              </div>
            </Link>
          </form>
        </div>
      </main>
      <div css={shopFooterStyles} data-test-id="cart-checkout">
        <Link href="/">return to dot shop</Link>
      </div>{' '}
    </div>
  );
}

export async function getServerSideProps(context) {
  // database products
  const product = await getProducts();
  // database products

  const cart = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: { cart: cart, product: product },
  };
}
