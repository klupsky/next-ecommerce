import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            font-family: 'Open Sans', sans-serif;
            background: #023365;
            font-size: 16px;
            letter-spacing: 0.16px;

            h1 {
              font-family: 'Open Sans', sans-serif;
              font-weight: normal;
              font-size: 16px;
              letter-spacing: 3px;
              text-transform: uppercase;
            }

            a {
              text-decoration: none;
              color: #fff;
              letter-spacing: 3px;
              text-transform: uppercase;
            }

            a:hover {
              color: #f1dd38;
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
