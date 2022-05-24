import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const headerStyles = css`
  padding: 1.4rem 1.4rem;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #fff;
  font-size: 16px;
  letter-spacing: 3px;

  > div > a + a {
    margin-left: 10px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      <div>
        <Link href="/">
          <Image
            src="/logos/logo_small_yellow.png"
            alt="logo"
            width="167"
            height="139"
          />
        </Link>
      </div>
      <Image src="/cart.png" alt="cart" width="30" height="30" />
    </header>
  );
}
