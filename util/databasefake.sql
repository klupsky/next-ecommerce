
-- this file is not gonna be run
-- install & import postgres
-- install & import dotenv-safe
-- make .env and add to gitignore
-- log in postgres:
psql -U next_ecommerce next_ecommerce;



-- create new table:
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL,
  type varchar(50) NOT NULL,
  price varchar(10) NOT NULL,
  color varchar(10) NOT NULL
);


-- insert infos:
INSERT INTO products
(name, type, price, color)
VALUES

  ('pink dot', 'happy', 102.00, '#ff92e9' ),
  ('green dot', 'stoned', 5.00, '#82c7a3' ),
  ('red dot', 'rolling', 11.00, '#ff6843' ),
  ('lilac dot', 'dreamy', 34.00, '#af99ff' );


-- read all animals:
SELECT * FROM products;









-- migration with ley
-- adding

export async function up(sql) {
  await sql`
    CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) NOT NULL,
  type varchar(50) NOT NULL,
  price varchar(10) NOT NULL,
  color varchar(10) NOT NULL
);

  `;
}
-- dropping

export async function down(sql) {
  await sql`
    DROP TABLE products
  `;
}
