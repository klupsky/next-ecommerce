import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// don't forget yarn dev pg-connection-string
setPostgresDefaultsOnHeroku();

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getProducts() {
  const products = await sql`
    SELECT * FROM products
  `;
  return products.map((product) => camelcaseKeys(product));
}

export async function getProduct(id: any) {
  const [product] = await sql`
    SELECT
      *
    FROM
      products
    WHERE
      id = ${id}
  `;
  return camelcaseKeys(product);
}

// export const productList = [
//   { id: '1', name: 'pink dot', type: 'happy', price: 102.0, color: '#ff92e9' },
//   { id: '2', name: 'green dot', type: 'stoned', price: 5.0, color: '#82c7a3' },
//   { id: '3', name: 'red dot', type: 'rolling', price: 11.0, color: '#ff6843' },
//   { id: '4', name: 'lilac dot', type: 'dreamy', price: 34.0, color: '#af99ff' },
// ];
