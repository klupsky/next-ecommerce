import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';
test('checkout test', async ({ page }) => {
  // go to product page and add a product to cart
  await page.goto(baseUrl + 'products/1');
  const addToCartButton = page.locator('data-test-id=product-add-to-cart');
  await addToCartButton.click();

  // click on cart in header, check if we are in cart
  const goToCartButton = page.locator('data-test-id=cart-count');
  await goToCartButton.click();
  await expect(page).toHaveURL(`${baseUrl}cart`);

  // is 1 product in cart?
  const cartProduct = page.locator('[data-test-id^="cart-product-quantity-"]');
  await expect(cartProduct).toHaveText('1');

  // click on buy button and control if you are on checkout page
  const checkoutButton = page.locator('data-test-id=cart-checkout');
  await checkoutButton.click();
  await expect(page).toHaveURL(`${baseUrl}checkout`);

  // on checkout page fill out form
  await page.locator('data-test-id=checkout-first-name').fill('test');
  await page.locator('data-test-id=checkout-last-name').fill('test');
  await page.locator('data-test-id=checkout-email').fill('test');
  await page.locator('data-test-id=checkout-address').fill('test');
  await page.locator('data-test-id=checkout-city').fill('test');
  await page.locator('data-test-id=checkout-postal-code').fill('test');
  await page.locator('data-test-id=checkout-country').fill('test');
  await page.locator('data-test-id=checkout-credit-card').fill('123');
  await page.locator('data-test-id=checkout-expiration-date').fill('123');
  await page.locator('data-test-id=checkout-security-code').fill('123');

  // on checkout page fill out form

  const confirmButtonLocator = page.locator(
    'data-test-id=checkout-confirm-order',
  );
  await expect(confirmButtonLocator).toHaveText('confirm');
  await confirmButtonLocator.click();

  // check if new page is thank you page
  // await expect(page).toHaveURL(`${baseUrl}thankyou`);
});
