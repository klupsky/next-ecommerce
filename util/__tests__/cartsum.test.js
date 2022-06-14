function testTotalSum(cartProducts) {

  let total = 0;
  cartProducts.map((cartProduct) => {
    return (total +=
      props.product.find((product) => {
        return cartProduct.id === product.id;
      }).price * cartProduct.quantity);
  });
  return total;
}

calculate sum
useEffect(() => {
  function calculateTotalSum() {
    let total = 0;
    cartProducts.map((cartProduct) => {
      return (total +=
        props.product.find((product) => {
          return cartProduct.id === product.id;
        }).price * cartProduct.quantity);
    });
    setSum(total);
  }
  calculateTotalSum();
}, [cartProducts, props.product]);

test('updating quantity in item of cookie', () => {
  const cartProducts = [
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 2,

      quantity: 2,
    },
  ];
  // 1. Set the cookie value and test that the value was updated
  expect(checkCartSum(combinedData)).toBe(95);
});
