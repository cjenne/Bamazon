DROP DATABASE IF EXISTS bamazon;
-- Create a MySQL Database called bamazon.
CREATE database bamazon;
USE bamazon;
-- Then create a Table inside of that database called products.
-- The products table should have each of the following columns:
CREATE TABLE products (
-- item_id (unique id for each product)
  id INT NOT NULL AUTO_INCREMENT,
-- product_name (Name of product)
  product_name VARCHAR(100) NULL,
-- department_name
  department_name VARCHAR(100) NULL,
-- price (cost to customer)
  price DECIMAL(10,2) NULL,
-- stock_quantity (how much of the product is available in stores)
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products (product_name, department_name, price, stock)
VALUES ("apples", "grocery", 4.58, 235), ("bear skin rug", "decor", 456.92, 2), ("canoe", "recreation", 240.06, 5),("donuts", "grocery", 1.02, 34), ("dalmations", "toys", 19.54, 1001), ("Waldo", "toys", 1.06, 404), ("gas fireplace insert", "decor", 203.54, 3), ("parachute", "recreation", 0.01, 1), ("back-up parachute", "recreation", 5674.53, 343), ("oranges", "grocery", 5.51, 43);
