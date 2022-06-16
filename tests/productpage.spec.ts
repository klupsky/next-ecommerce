import { expect, test } from '@playwright/test';

const baseUrl = 'https://next-ecommerce-kc.herokuapp.com/';

test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const titleLocator = await page.locator('h1');
  await expect(titleLocator).toHaveText('shop a dot');

  // navigate to productpage of product with id 1, add product to cart
  await page.goto(baseUrl + 'products/1');
  const addToCartButtonLocator = page.locator(
    'data-test-id=product-add-to-cart',
  );
  await addToCartButtonLocator.click();

  // check the header counter
  const headerCounterLocator = page.locator('data-test-id=cart-count');
  await expect(headerCounterLocator).toHaveText('1');

  // add 1 more
  const amountInputLocator = page.locator('data-test-id=product-quantity');
  await amountInputLocator.fill('1');
  await addToCartButtonLocator.click();
  await expect(headerCounterLocator).toHaveText('2');

  // click on cart count in link in header, go to cart page
  const goToCartButtonLocator = page.locator('data-test-id=cart-count');
  await goToCartButtonLocator.click();
  await expect(page).toHaveURL(`${baseUrl}cart`);

  // check counter again
  await expect(headerCounterLocator).toHaveText('2');

  // click on remove button
  const removeButtonLocator = page.locator(
    '[data-test-id^="cart-product-remove-"]',
  );
  await removeButtonLocator.click();

  // check counter again
  await expect(headerCounterLocator).toHaveText('0');
});

// PWDEBUG=1 yarn playwright test
