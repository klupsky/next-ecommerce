import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productList } from '../util/products';

const mainStyle = css`
  color: #ffffff;
  text-align: center;
  align-content: center;
  margin-top: 3rem;
`;

const productBoxStyle = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
`;

const typeStyle = css`
  font-size: 12px;
  margin: 0.2rem 0 0.2rem;
  color: #f1dd38;
`;

const priceStyle = css`
  font-size: 12px;
  margin: 0.2rem 0 0.2rem;
`;

export default function Mirandashop(props) {
  return (
    <div>
      <Head>
        <title>Miranda Shop</title>
        <meta name="Miranda Shop" content="Miranda Bar online shop" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <div css={mainStyle}>
        <h1>products</h1>

        {props.products.map((product) => {
          return (
            <div css={productBoxStyle} key={`product-${product.id}`}>
              <div>
                <div>
                  <Image
                    src={`/images/${product.id}.png`}
                    width="250"
                    height="250"
                  />
                </div>

                <div css={typeStyle}>{product.type}</div>
                <div>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </div>

                <div css={priceStyle}>Price: {product.price} €</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function getServerSideProps() {
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      products: productList,
    },
  };
}
