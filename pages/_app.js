import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout.js';

export default function App({ Component, pageProps }) {
  // set the cookies in the cart in order to pass it to the components / prop drill
  const [productInCart, setProductInCart] = useState([]);
  // get the cookies to pass it to the components / prop drill

  useEffect(() => {
    const cartProduct = Cookies.get('cart')
      ? JSON.parse(Cookies.get('cart'))
      : [];
    setProductInCart(cartProduct);
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            font-family: 'Poppins', sans-serif;
            letter-spacing: 0.5px;
            background: #f6f5f1;
            font-size: 1rem;
          }
          a {
            text-decoration: none;
            color: #000000;
            background-color: transparent;
          }

          * {
            box-sizing: border-box;

            cursor: -webkit-image-set( url(https://i.postimg.cc/ZnLKTSwh/dotcursor.png) 3x ), auto;
          }
        `}
      />
      {/* prop drill infos to layout and component */}
      <Layout productInCart={productInCart} setProductInCart={setProductInCart}>
        <Component
          productInCart={productInCart}
          setProductInCart={setProductInCart}
          {...pageProps}
        />
      </Layout>
    </>
  );
}
