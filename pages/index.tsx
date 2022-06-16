import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '../util/database';

const shopHeaderStyles = css`
  text-align: center;
  justify-content: center;
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 0px 20px;
  height: 80px;
  font-size: 1.7rem;
  text-align: center;

  h1 {
    padding: 0;
    font-size: 1.7rem;
    font-weight: normal;
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

const imageStyles = css`
  transition-duration: 0.3s;
  transition-property: transform;

  :hover,
  :focus,
  :active {
    transform: scale(1.1);
  }
`;

const nameTagStyles = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 10px 10px 10px;
  height: 50px;

  text-align: center;
  justify-content: center;
  padding: 6px;
  gap: 10px;
  font-size: 1.3rem;
  transition-duration: 0.3s;
  transition-property: transform;

  :hover,
  :focus,
  :active {
    background-color: #000000;
    color: #f6f5f1;
    transform: scale(1.1);
  }
`;

const priceTagStyles = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 10px 10px 0px;
  height: 50px;
  text-align: center;
  justify-content: center;
  padding: 6px;
  gap: 2px;
  font-size: 1.3rem;
`;

const productStyles = css`
  display: flex;
  align-items: center;
  margin: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

type Props = {
  products: {
    id: number;
    name: string;
    price: number;
    type: string;
    color: string;
  }[];
};

export default function Home(props: Props) {
  return (
    <div>
      <Head>
        <title>Dot Shop</title>
        <meta
          name="description"
          content="dot shop ecommerce store for upleveled"
        />
        <link rel="icon" href="/dot.svg" />
      </Head>
      <div css={shopHeaderStyles}>
        <h1>shop a dot</h1>
      </div>

      <div data-test-id="product-<product id>" css={productStyles}>
        {props.products.map((product) => {
          return (
            <div key={`product-${product.id}`}>
              <div>
                <Link href={`/products/${product.id}`}>
                  <div>
                    <Image
                      src={`/images/${product.id}.svg`}
                      width="300"
                      height="300"
                      css={imageStyles}
                    />
                  </div>
                </Link>

                <Link href={`/products/${product.id}`}>
                  <div css={nameTagStyles}>{product.name}</div>
                </Link>

                <div css={priceTagStyles}>{product.price} €</div>
              </div>
            </div>
          );
        })}
      </div>
      <div css={shopFooterStyles}>everybody loves dots</div>
    </div>
  );
}

// Code in getServerSideProps runs in
// Node.js (on the server)
//
// Important: ONLY in the /pages directory
export async function getServerSideProps() {
  const products = await getProducts();
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      products: products,
    },
  };
}
