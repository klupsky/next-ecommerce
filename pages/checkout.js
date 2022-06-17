import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteCookie, getParsedCookie } from '../util/cookies';
import { getProducts } from '../util/database';

const priceBoxStyle = css`
  align-items: flex-end;
  display: flex;
  margin: 20px 0px 40px;
  justify-content: space-between;
`;
const priceStyle = css`
  text-align: right;
  align-items: flex-end;
`;

const cartBoxStyle = css`
  align-items: center;
  display: flex;
  margin: 40px 0px 40px;
  justify-content: center;
`;

const productStyle = css`
  align-items: center;
  margin: 0px 40px 0px;
  justify-content: center;
`;

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
const sumStyle = css`
  align-items: flex-end;

  font-size: 1.3rem;
  text-decoration: underline;
  text-underline-position: under;
`;

const containerHeadStyle = css`
  text-align: center;

  margin: 60px 20% 20px;
`;

const containerStyle = css`
  text-align: center;

  margin: 40px 20% 20px;

  border-bottom: 2px solid black;
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

  const [cartProducts, setCartProducts] = useState([]);
  const [sum, setSum] = useState(0);

  // get the cookies and store them inside currentCart
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setCartProducts(currentCart);
  }, []);

  // run over cookies in cart and calculate the quantity
  let totalQuantity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    totalQuantity += cartProducts[i].quantity;
  }

  // calculate sum
  useEffect(() => {
    function calculateTotalSum() {
      let total = 0;
      cartProducts.map((cartProduct) => {
        return (total +=
          props.product.find((product) => {
            return cartProduct.id === product.id;
          }).price * cartProduct.quantity);
      });
      setSum(total);
    }
    calculateTotalSum();
  }, [cartProducts, props.product]);

  // resetting the form on submit
  const [infos, setInfos] = useState({
    firstname: '',
    llastname: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    creditCard: '',
    expirationDate: '',
    securityCode: '',
  });

  const set = (name) => {
    return ({ target: { info } }) => {
      setInfos((oldInfos) => ({ ...oldInfos, [name]: info }));
    };
  };

  // form submit links to thankyou page and cleans up the cookies in cart
  const onSubmit = (event) => {
    event.preventDefault();
    window.location.href = '/thankyou';
    deleteCookie('cart');
  };

  return (
    <div>
      <Head>
        <title>check out</title>
        <meta
          name="description"
          content="submit your information for checkout"
        />
        <link rel="icon" href="/dot.svg" />
      </Head>
      <main css={shopMainStyles}>
        <h1>check out</h1>
        <div css={containerStyle}>
          <div css={cartBoxStyle}>
            {cartProducts.map((cartProduct) => {
              return (
                <div key={`cart-${cartProduct.id}`}>
                  <div css={productStyle}>
                    <Image
                      data-test-id="product-image"
                      src={`/images/${cartProduct.id}.svg`}
                      width="70"
                      height="70"
                    />
                    <br />
                    {cartProduct.quantity}{' '}
                    {
                      props.product.find((product) => {
                        return cartProduct.id === product.id;
                      }).name
                    }
                    {cartProduct.quantity === 1 ? '' : 's'}
                  </div>
                </div>
              );
            })}
          </div>

          <div css={priceBoxStyle}>
            <div>
              your cart contains {totalQuantity}{' '}
              {totalQuantity === 1 ? 'dot' : 'dots'}
            </div>
            <div css={priceStyle}>
              total price: <span css={sumStyle}>{sum} €</span>
            </div>{' '}
          </div>
        </div>
        <div css={containerHeadStyle}>
          please submit your costumer information:
        </div>

        <br />
        <div css={formContainerStyle}>
          <form onSubmit={onSubmit}>
            <ul css={formOuterStyles}>
              <li>
                <label>
                  first name:
                  <input
                    data-test-id="checkout-first-name"
                    value={infos.firstname}
                    onChange={set('firstname')}
                    required
                  />
                </label>{' '}
              </li>{' '}
              <li>
                <label>
                  <span> last name:</span>
                  <input
                    data-test-id="checkout-last-name"
                    value={infos.lastname}
                    onChange={set('lastname')}
                    required
                  />
                </label>
              </li>
              <li>
                <label>
                  <span>email:</span>
                  <input
                    type="email"
                    data-test-id="checkout-email"
                    value={infos.email}
                    onChange={set('email')}
                    required
                  />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  <span>adress:</span>
                  <input
                    data-test-id="checkout-address"
                    value={infos.address}
                    onChange={set('address')}
                    required
                  />
                </label>{' '}
              </li>
              <li>
                {' '}
                <label>
                  <span> city:</span>
                  <input
                    data-test-id="checkout-city"
                    value={infos.city}
                    onChange={set('city')}
                    required
                  />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  <span>postal code:</span>
                  <input
                    data-test-id="checkout-postal-code"
                    value={infos.postalCode}
                    onChange={set('postalCode')}
                    required
                  />
                </label>
              </li>
              <li>
                <label>
                  country:
                  <input
                    data-test-id="checkout-country"
                    value={infos.country}
                    onChange={set('country')}
                    required
                  />
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
                    value={infos.creditCard}
                    onChange={set('creditCard')}
                    maxLength={12}
                    required
                  />
                </label>{' '}
              </li>
              <li>
                <label>
                  <span>expiration date:</span>
                  <input
                    data-test-id="checkout-expiration-date"
                    placeholder="mm/yyyy"
                    type="number"
                    value={infos.expirationDate}
                    onChange={set('expirationDate')}
                    maxLength={12}
                    required
                  />
                </label>
              </li>
              <li>
                {' '}
                <label>
                  <span> security code:</span>
                  <input
                    data-test-id="checkout-security-code"
                    value={infos.securityCode}
                    onChange={set('securityCode')}
                    type="password"
                    required
                  />
                </label>
              </li>
              <br />{' '}
            </ul>

            <div css={buttonCenterStyle}>
              <button
                css={buttonBuyStyle}
                data-test-id="checkout-confirm-order"
                onClick={() => {
                  deleteCookie('cart');

                  props.setProductInCart([]);
                }}
              >
                confirm
              </button>
            </div>
          </form>
        </div>
      </main>
      <div css={shopFooterStyles}>
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
