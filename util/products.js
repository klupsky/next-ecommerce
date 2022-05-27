// Simulate a Node.js server-side dependency
// to make the file fail if used in frontend
import fs from 'node:fs';

console.log(fs);
// End simulation

export const productList = [
  { id: '1', name: 'pink dot', type: 'happy', price: 102.0, color: '#ff92e9' },
  { id: '2', name: 'green dot', type: 'stoned', price: 5.0, color: '#82c7a3' },
  { id: '3', name: 'red dot', type: 'rolling', price: 11.0, color: '#ff6843' },
  { id: '4', name: 'lilac dot', type: 'dreamy', price: 34.0, color: '#af99ff' },
];
