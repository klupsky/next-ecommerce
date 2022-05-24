// Simulate a Node.js server-side dependency
// to make the file fail if used in frontend
import fs from 'node:fs';

console.log(fs);
// End simulation

export const productList = [
  { id: '1', name: 'Negroni', type: 'Bottled Cocktail', price: 10.0 },
  { id: '2', name: 'Hoodie', type: 'Merch', price: 10.0 },
  { id: '3', name: 'Pin', type: 'Merch', price: 10.0 },
  { id: '4', name: '10€ Voucher', type: 'Voucher', price: 10.0 },
];
