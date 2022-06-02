import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getProducts } from '../util/products';

const shopHeaderStyles = css`
  text-align: center;
  justify-content: center;
  color: #000000;
  font-size: 1rem;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 20px 20px;
  text-align: center;

  h1 {
    font-size: 1.7rem;
    font-weight: normal;
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

const productBoxStyles = css`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [priceSum, setPriceSum] = useState(0);

  // get cookies from cart
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setCartProducts(currentCart);
  }, []);
  console.log(currentCart);
  // get number of items in cart
  const totalQuantity = 0;
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
          <div data-test-id="cart-product-<product id>">
            {cartProducts.map((cartProduct) => {
              return (
                <div key={`cart-${cartProduct.id}`}>
                  <div>
                    <div>
                      {' '}
                      {cartProduct.quantity}
                      <div>{cartProduct.name}</div>
                      <div data-test-id="cart-product-quantity-<product id>"></div>
                      <div>
                        <p>
                          Price: {cartProduct.price * cartProduct.quantity}.00 €
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const updatedItem = cartProducts.find(
                            (product) => product.id === cartProduct.id,
                          );
                          updatedItem.quantity += 1;
                          setStringifiedCookie('cart', cartProducts);
                          setCartProducts([...cartProducts]);
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          const updatedItem = cartProducts.find(
                            (product) => product.id === cartProduct.id,
                          );
                          updatedItem.quantity -= 1;
                          if (updatedItem.quantity < 0) {
                            updatedItem.quantity = 0;
                          }
                          setStringifiedCookie('cart', cartProducts);
                          setCartProducts([...cartProducts]);
                        }}
                      >
                        -
                      </button>{' '}
                      <br />
                      <br />
                      <button
                        data-test-id="cart-product-remove-<product id>"
                        css={buttonEffectStyle}
                        onClick={() => {
                          const newCart = cartProducts.filter((product) => {
                            return product.id !== cartProduct.id;
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
            <div> SUM: {priceSum} </div>
            {/* <span data-test-id="cart-total"> = {totalPrice} </span> */}
            <br />
          </div>
        </div>
        <Link href="/checkout">
          <button data-test-id="cart-checkout">check out</button>
        </Link>
      </div>
      <div css={shopFooterStyles} data-test-id="cart-checkout">
        everybody needs dots
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const product = await getProducts(context.query.productId);

  return {
    props: {
      product: product,
    },
  };
}
