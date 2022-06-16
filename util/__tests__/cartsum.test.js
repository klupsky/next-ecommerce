function calculateTotalSum(cartArray, databaseProducts) {
  let total = 0;
  cartArray.map((cartProduct) => {
    return (total +=
      databaseProducts.find((product) => {
        return cartProduct.id === product.id;
      }).price * cartProduct.quantity);
  });
  return total;
}

test('calculate total sum', () => {
  const cartProductA = { id: 1, quantity: 1 };
  const cartProductB = { id: 2, quantity: 1 };

  const dataArray = [
    { id: 1, price: 1 },
    { id: 2, price: 2 },
  ];

  expect(calculateTotalSum([cartProductA, cartProductB], dataArray)).toBe(3);
});
