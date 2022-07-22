const products = [
  { id: '1', name: 'pink dot', type: 'happy', price: 1, color: '#ff92e9' },
  { id: '2', name: 'green dot', type: 'stoned', price: 2, color: '#82c7a3' },
  { id: '3', name: 'red dot', type: 'rolling', price: 3, color: '#ff6843' },
  { id: '4', name: 'lilac dot', type: 'dreamy', price: 4, color: '#af99ff' },
];

// adding
exports.up = async (sql) => {
  await sql`
    INSERT INTO products ${sql(products, 'name', 'type', 'price', 'color')}
  `;
};

exports.down = async (sql) => {
  for (const product of products) {
    await sql`
    DELETE FROM products
    WHERE
name = ${product.name} AND
type = ${product.type} AND
price = ${product.price} AND
color = ${product.color}`;
  }
};
