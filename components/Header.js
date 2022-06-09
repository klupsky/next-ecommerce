import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 1rem;
  display: flex;
  align-items: center;
  color: #000000;
  font-size: 2.5rem;
  background-color: transparent;
  justify-content: space-between;
  border-radius: 55px;
  border: 2px solid #000000;
  margin: 20px 20px 15px;
  height: 110px;

  > div {
    margin-left: 10px;
  }

  > div > a + a {
    margin-left: 10px;
  }
`;

const empty = css`
  color: #000000;
  background-color: transparent;
  border-radius: 50px;
  border: 2px solid #000000;
  height: 60px;
  width: 60px;
  margin: 0.5rem;
  font-size: 1.2rem;
  padding-top: 13px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function Header(props) {
  // console.log(props.productInCart);
  let totalQuantity = 0;
  for (let i = 0; i < props.productInCart.length; i++) {
    totalQuantity += props.productInCart[i].quantity;
  }

  return (
    <header css={headerStyles}>
      <div>
        <Link data-test-id="products-link" href="/dotshop">
          Dot Shop
        </Link>
      </div>

      <div css={empty}>{totalQuantity}</div>
    </header>
  );
}
