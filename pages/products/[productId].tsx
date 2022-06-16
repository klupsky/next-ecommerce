import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getProduct } from '../../util/database';
import { ProductDatabase } from '../../util/types';

const labelStyles = css`
  font-size: 1.2rem;
  margin: 0 5px 0;
`;

const inputStyles = css`
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid #000000;
  width: 30px;
  font-size: 1rem;
  -webkit-text-size-adjust: 100%;
  font-family: var(--typeBasePrimary);
  font-weight: var(--typeBaseWeight);
  font-style: var(--typeBaseStyle);
  letter-spacing: var(--typeBaseSpacing);
  line-height: var(--typeBaseLineHeight);
  display: inline-block;
  text-align: start;
  margin-left: 1.2rem;
  margin-right: 0.8rem;
`;

const boxStyles = css`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: 0;
`;

const textStyle = css`
  text-align: justify;
  margin: 2rem 3rem 3.5rem;
`;

const imageStyles = css`
  margin: 0px;
  transition-duration: 0.3s;
  transition-property: transform;

  :hover,
  :focus,
  :active {
    transform: scale(1.07);
  }
`;

const productTitleStyles = css`
  text-align: center;
  justify-content: center;
  color: #000000;
  h1 {
    font-size: 1.7rem;
    font-weight: normal;
  }
`;

const descriptionBoxStyles = css`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 50%;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 0px 30px 18px;
  padding: 50px;
  a {
    text-decoration: underline;
    text-underline-position: under;
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
  margin: 0.5rem;
  transition-duration: 0.3s;
  transition-property: transform;

  :hover,
  :focus,
  :active {
    transform: scale(1.1);
  }
`;

const buttonGrid = css`
  display: inline-grid;
  min-width: 30%;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  align-items: center;
`;

const buttonNoEffectStyle = css`
  font-family: poppins;

  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  padding: 10px;
  font-size: 1.3rem;
  justify-content: center;
  text-align: center;
`;

const buttonEffectStyle = css`
  font-family: poppins;

  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  padding: 3px;
  font-size: 1.3rem;
  justify-content: center;
  text-align: center;
  margin-left: 10px;

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

const buttonBoxStyles = css`
  font-family: poppins;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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

type Props = {
  product: ProductDatabase;
  setProductInCart: any;
};

export default function Product(props: Props) {
  const [quantity, setQuantity] = useState(1);

  // if (!props.product) {
  //   return (
  //     <div>
  //       <Head>
  //         <title>sorry no dot for you</title>
  //         <meta name="description" content="dot shop error message." />
  //         <link rel="icon" href="/dot.svg" />
  //       </Head>
  //       you got lost!
  //       <Link href="/">return to the dot shop. </Link>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Head>
        <title>
          {props.product.name}, the {props.product.type}
        </title>
        <meta name="description" content={props.product.name} />
      </Head>
      <main>
        <div css={boxStyles}>
          <div css={imageStyles}>
            <Image
              data-test-id="product-image"
              src={`/images/${props.product.id}.svg`}
              width="500"
              height="500"
            />
          </div>
          <div css={descriptionBoxStyles}>
            <div css={productTitleStyles}>
              <h1>{props.product.name}</h1>
              <span data-test-id="product-price">{props.product.price}</span> €
            </div>

            <div css={textStyle}>
              Congratulations, you made an excellent choice! This is the{' '}
              <span style={{ color: props.product.color }}>
                {props.product.name}
              </span>
              . We're in love with it's perfect round shape too. This dot is in
              a super-duper {props.product.type} mood. It's a dot with
              personality, just as unique as you!
              <br />
            </div>
            <div css={buttonBoxStyles}>
              <div css={buttonGrid}>
                <div css={buttonNoEffectStyle}>
                  <label css={labelStyles}>
                    quantity:
                    <input
                      data-test-id="product-quantity"
                      css={inputStyles}
                      type="number"
                      value={quantity}
                      min="1"
                      max="10"
                      onChange={(event) => {
                        setQuantity(Number(event.currentTarget.value));
                      }}
                    />
                  </label>
                </div>

                <button
                  data-test-id="product-add-to-cart"
                  css={buttonEffectStyle}
                  onClick={() => {
                    const currentCart = Cookies.get('cart')
                      ? getParsedCookie('cart')
                      : [];

                    if (
                      !currentCart.find(
                        (cookie: { id: number }) =>
                          cookie.id === props.product.id,
                      )
                    ) {
                      // add product if cart is empty
                      const newCart = [
                        ...currentCart,
                        {
                          id: props.product.id,
                          // name: props.product.name,
                          // type: props.product.type,
                          // price: props.product.price,

                          quantity: Number(quantity),
                        },
                      ];
                      setStringifiedCookie('cart', newCart);
                      // sets the setState in app.js

                      props.setProductInCart(newCart);
                    } else {
                      // add quantity if product is already in cart
                      const newCart = currentCart.find(
                        (cookie: { id: number }) =>
                          cookie.id === props.product.id,
                      );
                      newCart.quantity += Number(quantity);
                      setStringifiedCookie('cart', currentCart);
                      // sets the setState in app.js
                      props.setProductInCart(currentCart);
                    }
                  }}
                >
                  add to cart
                </button>
              </div>

              <Link href="/../../cart">
                <button css={buttonBuyStyle}>buy</button>
              </Link>
            </div>
          </div>
        </div>
        <div css={shopFooterStyles}>
          <Link href="/"> return to dot shop</Link>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const product = await getProduct(context.query.productId);

  return {
    props: {
      product: product,
    },
  };
}
