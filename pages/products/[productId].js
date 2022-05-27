import { css } from '@emotion/react';
//import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { productList } from '../../util/products';

const mainStyle = css`
  text-align: center;
  align-content: center;
  margin-top: 3rem;

  h2 {
    font-size: 1.7rem;
    font-weight: normal;
  }
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
  font-size: 2.5rem;

  h1 {
    padding: 0;
    font-size: 1.7rem;
    font-weight: normal;
  }

  h2 {
    padding: 0;
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
  padding: 4%;
`;

const buttonStyle = css`
  color: #000000;
  background-color: transparent;
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
const buttonCheckoutStyle = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  min-width: 60px;
  padding: 2%;
  margin: 0.5rem;
  font-size: 1.3rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  :hover {
    color: #000000;
    background-color: #000000;
    border-radius: 50px;
    border: 2px solid #000000;
    color: #f6f5f1;
    height: 60px;
    min-width: 60px;
    padding: 2%;
    margin: 0.5rem;
    font-size: 1.3rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const buttonBoxStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const shopFooterStyles = css`
  text-align: center;
  justify-content: center;
  color: #000000;
  font-size: 2.5rem;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  margin: 0px 20px;
  height: 80px;
  text-align: center;

  h1 {
    padding: 0;
    font-size: 1.7rem;
    font-weight: normal;
  }

  h2 {
    font-size: 1.7rem;
    font-weight: normal;
  }
`;

const addBoxStyles = css`
  margin: 0px;
  width: 70%;
`;

export default function Product(props) {
  const [shoppingCart, setshoppingCart] = useState('empty' in props.product);
  const [value, setValue] = useState(props.product.shoppingCart || 0);

  if (!props.product) {
    return (
      <div css={mainStyle}>
        <Head>
          <title>sorry no dot for you</title>
          <meta name="description" content="dot shop error message." />
        </Head>
        <h2>
          you got lost! <Link href="/dotshop">return to the dot shop. </Link>
        </h2>
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

      <div css={boxStyles}>
        <div css={imageStyles}>
          <Image
            src={`/images/${props.product.id}.svg`}
            width="500"
            height="500"
          />
        </div>
        <div css={descriptionBoxStyles}>
          <div css={productTitleStyles}>
            <h1>{props.product.name}</h1>
          </div>

          <div css={textStyle}>
            Congratulations, you made an excellent choice! This is the{' '}
            <span style={{ color: props.product.color }}>
              {props.product.name}
            </span>
            . We're in love with it's perfect round shape too. This dot is in a
            super-duper {props.product.type} mood. It's a dot with personality,
            just as unique as you!
            <br />
          </div>
          <div css={buttonBoxStyles}>
            <div css={addBoxStyles}>
              <button css={buttonStyle}>+</button>
              <button css={buttonStyle}>-</button>
              <button css={buttonStyle}>0</button>
              <button css={buttonStyle}>{props.product.price} €</button>
            </div>

            <button css={buttonCheckoutStyle}>BUY</button>
          </div>
        </div>
      </div>
      <div css={shopFooterStyles}>
        <h2>everybody loves a {props.product.type} dot</h2>
      </div>
    </div>
  );
}

// <div>{props.product.id}</div>

export function getServerSideProps(context) {
  const foundProduct = productList.find((product) => {
    return product.id === context.query.productId;
  });

  if (!foundProduct) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      product: foundProduct || null,
    },
  };
}
