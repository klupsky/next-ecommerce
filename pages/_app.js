import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  const [productInCart, setProductInCart] = useState([]);

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

            a {
              text-decoration: none;
              color: #000000;
              background-color: transparent;
            }
          }

          * {
            box-sizing: border-box;
          }
        `}
      />

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
