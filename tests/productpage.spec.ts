import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const titleLocator = await page.locator('h1');
  await expect(titleLocator).toHaveText('shop a dot');

  // navigate to product page of product with id 1, add product to cart
  await page.goto(baseUrl + 'products/1');
  const addToCartButton = page.locator('data-test-id=product-add-to-cart');
  await addToCartButton.click();

  // check the counter in header
  const headerCounter = page.locator('data-test-id=cart-count');
  await expect(headerCounter).toHaveText('1');

  // add 1 more
  const amountInput = page.locator('data-test-id=product-quantity');
  await amountInput.fill('1');
  await addToCartButton.click();
  await expect(headerCounter).toHaveText('2');

  // click on cart count in link in header, go to cart page
  const goToCartButton = page.locator('data-test-id=cart-count');
  await goToCartButton.click();
  await expect(page).toHaveURL(`${baseUrl}cart`);

  // check the counter in header
  await expect(headerCounter).toHaveText('2');

  // check the product quantity
  const cartProduct = page.locator('[data-test-id^="cart-product-quantity-"]');
  await expect(cartProduct).toHaveText('2');

  // add a product
  await page.locator('text=+').click();
  await expect(headerCounter).toHaveText('3');

  // remove a product
  await page.locator('text=-').click();
  await page.locator('text=-').click();
  await expect(headerCounter).toHaveText('1');

  // click on remove button
  const removeButton = page.locator('[data-test-id^="cart-product-remove-"]');
  await removeButton.click();

  // check the counter in header
  await expect(headerCounter).toHaveText('0');
});

// PWDEBUG=1 yarn playwright test
