CREATE TABLE `users` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `role_id` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL
);

INSERT INTO
  `users`(`role_id`, `email`, `hashedPassword`)
VALUES
  ('utilisateur', 'gabriel@gmail.com', '123456789');

CREATE TABLE `ingredients` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(200) NOT NULL,
  `quantity` int(11) NOT NULL
);

CREATE TABLE `roles` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `pizza` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `name` varchar(200) NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `base` varchar(50) NOT NULL,
  `reduction` integer NULL
);

CREATE TABLE `basket` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `user_id` int(11),
  `pizza_id` int(11),
  `namePizza` varchar(200) NULL,
  `pricePizza` DECIMAL(10, 2) NOT NULL,
  `numberPizza` int(11) NULL
);

CREATE TABLE `pizzaIngredients` (
  `pizza_id` int(11),
  `ingredient_id` int(11)
);

INSERT INTO
  `pizza`(`name`, `price`, `base`, `reduction`)
VALUES
  ('margherita', 9.99, 'tomate', 10),
  ('reine', 12.99, 'tomate', 10),
  ('quatre fromage', 15, 'tomate', 50),
  ('4 saisons', 19.99, 'crème fraîche', 100),
  ('fruit de mer', 15, 'tomate', 10),
  ('sicilienne', 9.99, 'crème fraîche', 10),
  ('la calzone', 11, 'tomate', 10);

INSERT INTO
  `ingredients`(`name`, `quantity`)
VALUES
  ('poivron', 50),
  ('tomate', 50),
  ('champignon', 250),
  ('oignon', 150),
  ('pomme de terre', 1000),
  ('fromage', 500),
  ('basilic', 100);

ALTER TABLE
  `pizzaIngredients`
ADD
  CONSTRAINT `pp_pizza_pizzaIngredients` FOREIGN KEY (`pizza_id`) REFERENCES `pizza` (`id`);

ALTER TABLE
  `pizzaIngredients`
ADD
  CONSTRAINT `ip_ingredients_pizzaIngredients` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

ALTER TABLE
  `basket`
ADD
  CONSTRAINT `bu_users_basket` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);