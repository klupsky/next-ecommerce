import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { productList } from '../../util/products';

const mainStyle = css`
  text-align: center;
  align-content: center;
  margin-top: 3rem;
`;

const labelStyles = css`
  font-size: 1.2rem;
  margin: 0 0.2rem 0;
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
  color: #f6f5f1;
  background-color: #000000;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  text-align: center;
  padding: 2%;
  font-size: 1.3rem;
  justify-content: center;
  margin: 0.5rem;
`;

const buttonNoEffectStyle = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  padding: 2%;
  font-size: 1.3rem;
  justify-content: center;
  text-align: center;
`;

const buttonEffectStyle = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  padding: 2%;
  font-size: 1.3rem;
  justify-content: center;
  text-align: center;

  :hover {
    background-color: #000000;
    border: 2px solid #000000;
    color: #f6f5f1;
  }
`;

const buttonBoxStyles = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const shopFooterStyles = css`
  text-align: center;
  color: #000000;
  font-size: 2.5rem;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 0px 20px;
  padding: 18px;
  height: 80px;
  font-size: 1.7rem;

  h1 {
    padding: 0;
    font-size: 1.7rem;
    font-weight: normal;
  }
`;

export default function Product(props) {
  const [quantity, setQuantity] = useState(1);

  if (!props.product) {
    return (
      <div css={mainStyle}>
        <Head>
          <title>sorry no dot for you</title>
          <meta name="description" content="dot shop error message." />
          <link rel="icon" href="/dot.svg" />
        </Head>
        you got lost!
        <Link href="/dotshop">return to the dot shop. </Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {props.product.name}, the {props.product.type}
        </title>
        <meta
          name="description"
          content={`${props.product.name} is a ${props.product.type} dot`}
        />
      </Head>
      <main>
        <div css={boxStyles}>
          <div css={imageStyles}>
            <Image
              src={`/images/${props.product.id}.svg`}
              width="500"
              height="500"
            />
          </div>
          <div css={descriptionBoxStyles}>
            <Link href="/dotshop"> GO BACK</Link>
            <div css={productTitleStyles}>
              <h1>{props.product.name}</h1>
              {props.product.price} €
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
              <div css={buttonNoEffectStyle}>
                <label css={labelStyles}>
                  quantity:
                  <input
                    css={inputStyles}
                    type="number"
                    value={quantity}
                    steps="1"
                    min="1"
                    max="10"
                    onChange={(e) => {
                      e.currentTarget.value > -1
                        ? setQuantity(e.currentTarget.value)
                        : setQuantity(0);
                    }}
                  />
                </label>
              </div>

              <button
                css={buttonEffectStyle}
                onClick={() => {
                  const currentCart = Cookies.get('cart')
                    ? getParsedCookie('cart')
                    : [];

                  if (
                    !currentCart.find(
                      (cookie) => cookie.name === props.product.name,
                    )
                  ) {
                    // add product if cart is empty
                    const newCart = [
                      ...currentCart,
                      {
                        id: props.product.id,
                        name: props.product.name,
                        type: props.product.type,
                        price: props.product.price,

                        quantity: parseInt(quantity),
                      },
                    ];
                    setStringifiedCookie('cart', newCart);
                  } else {
                    // add quantity if product is already in cart
                    const updatedCart = currentCart.find(
                      (cookie) => cookie.name === props.product.name,
                    );
                    updatedCart.quantity += parseInt(quantity);
                    setStringifiedCookie('cart', currentCart);
                  }
                }}
              >
                add to cart
              </button>

              <Link href="../../cart">
                <button css={buttonBuyStyle}>buy now</button>
              </Link>
            </div>
          </div>
        </div>
        <div css={shopFooterStyles}>
          everybody loves a {props.product.type} dot
        </div>
      </main>
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
