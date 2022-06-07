import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';
import { useState } from 'react';


export default function App({ Component, pageProps}) {
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

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
