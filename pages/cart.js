import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { productList } from '../util/products';

const shopHeaderStyles = css`
  text-align: center;
  justify-content: center;
  color: #000000;
  font-size: 1rem;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 0px 20px;
  text-align: center;

  h1 {
    font-size: 1.7rem;
    font-weight: normal;
  }

  > div {
    margin-left: 1rem;
  }
`;

const checkoutFooterStyles = css`
  text-align: center;
  color: #f6f5f1;
  background-color: #000000;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 15px 20px;
  padding: 18px;
  height: 80px;
  font-size: 1.7rem;

  a {
    color: #f6f5f1;
  }
`;

const buttonEffectStyle = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  margin: 1rem;
  padding: 8px;
  font-size: 1.3rem;
  justify-content: center;
  text-align: center;

  :hover {
    background-color: #000000;
    border: 2px solid #000000;
    color: #f6f5f1;
  }
`;

const productBoxStyles = css`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  // get cookies from cart
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setCartProducts(currentCart);
  }, []);

  // get number of items in cart

  let totalQuantity = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    totalQuantity += cartProducts[i].quantity;
  }

  return (
    <div>
      <Head>
        <title>Dot Shop</title>
        <meta
          name="Dot Shopping Cart"
          content="see what's inside your dot shopping cart"
        />
        <link rel="icon" href="/dot.svg" />
      </Head>

      <div css={shopHeaderStyles}>
        <div css={productBoxStyles}>
          <h1>your cart</h1>

          {cartProducts.map((cartProduct) => {
            return (
              <div key={`cart-${cartProduct.id}`}>
                <div>
                  <div>
                    {cartProduct.quantity} {cartProduct.name}{' '}
                    {cartProduct.price}
                    <button
                      onClick={() => {
                        const updatedItem = cartProducts.find(
                          (product) => product.name === cartProduct.name,
                        );
                        updatedItem.quantity += 1;
                        setStringifiedCookie('cart', cartProducts);
                        setCartProducts(cartProducts);
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        const updatedItem = cartProducts.find(
                          (product) => product.name === cartProduct.name,
                        );
                        updatedItem.quantity -= 1;
                        setStringifiedCookie('cart', cartProducts);
                      }}
                    >
                      -
                    </button>{' '}
                    <br />
                    <br />
                    <button
                      css={buttonEffectStyle}
                      onClick={() => {
                        const newCart = cartProducts.filter((product) => {
                          return product.name !== cartProduct.name;
                        });
                        setStringifiedCookie('cart', newCart);
                        setCartProducts(newCart);
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div>total dots: {totalQuantity}</div>
        </div>
      </div>
      <div css={checkoutFooterStyles} data-test-id="cart-checkout">
        <Link href="/checkout">check out</Link>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const singleProduct = productList.find((product) => {
    return product.id === context.query.productId;
  });

  if (!singleProduct) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      product: singleProduct || null,
    },
  };
}
