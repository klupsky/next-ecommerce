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
  font-family: poppins;
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  margin: 10px 10px 0px 0px;
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
  justify-content: center;
  margin: 0.5rem 0 18px;

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

const dotGridStyles = css`
  display: inline-grid;
  width: auto;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  align-items: center;
`;




const dotGridContentStyles = css`
  text-align: left;
`;
const dotGridTitleStyles = css`
  text-align: left;
  font-size: 1.3rem;
`;
const cartBoxStyles = css`
margin: 2rem;
`;


export default function Cart(props) {
  const [cartProducts, setCartProducts] = useState([]);
  const [sum, setSum] = useState(0);





  // get cookies from cart
  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setCartProducts(currentCart);
  }, []);
  // get number of items in cart
  const totalQuantity = 0;
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
        {cartProducts.length === 0 ? (
          <h1>there are no dots in your cart</h1>
        ) : (
          <div css={productBoxStyles}>
            <h1>your cart</h1>

            <div css={cartBoxStyles} data-test-id="cart-product-<product id>">

              {cartProducts.map((cartProduct) => {
                return (
                  <div css={dotGridStyles} key={`cart-${cartProduct.id}`}>
                    <div css={dotGridContentStyles}>
                      {cartProduct.quantity}{' '}
                    </div>
                    <div css={dotGridTitleStyles}>
                      {
                        props.product.find((product) => {
                          return cartProduct.id === product.id;
                        }).name
                      }
                    </div>
                    <div css={dotGridContentStyles}>
                      {props.product.find((product) => {
                        return cartProduct.id === product.id;
                      }).price * cartProduct.quantity}
                      .00 €
                    </div>
                    <div css={dotGridContentStyles}>
                      <button
                        css={buttonEffectStyle}
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
                        css={buttonEffectStyle}
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
                    </div>
                    <div css={dotGridContentStyles}>
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
                      </button>{' '}
                    </div>
                  </div>
                );
              })}
              <div data-test-id="cart-total">{totalQuantity}</div>
              <div>SUM: {sum}.00 €
            </div>
            <Link href="/checkout">
              <button css={buttonBuyStyle} data-test-id="cart-checkout">
                check out
              </button>
            </Link>
          </div></div>
        )}
      </div>
      <div css={shopFooterStyles} data-test-id="cart-checkout">
      <Link href="/dotshop"> return to dot shopping</Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get products from database
  const product = await getProducts();
  // get products from cookies
  const cart = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: { cart: cart, product: product },
  };
}
