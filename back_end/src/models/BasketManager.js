const AbstractManager = require("./AbstractManager");

class BasketManager extends AbstractManager {
  constructor() {
    super({ table: "basket" });
  }

  incrementBasket(basket) {
    const keys = Object.keys(basket);
    const values = Object.values(basket);
    const placeholders = keys.map(() => "?").join(", ");

    const query = `INSERT INTO ${this.table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;

    return this.connection.query(query, values);
  }

  updateBasket(id) {
    return this.connection.query(
      `update ${this.table} set numberPizza = numberPizza + 1 where pizza_id = ? AND user_id = 1`,
      [id]
    );
  }

  updateBasketDown(id) {
    return this.connection.query(
      `update ${this.table} set numberPizza = numberPizza - 1 where id = ?`,
      [id]
    );
  }
}

module.exports = BasketManager;
