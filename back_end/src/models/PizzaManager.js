const AbstractManager = require("./AbstractManager");

class PizzaManager extends AbstractManager {
  constructor() {
    super({ table: "pizza" });
  }

  insert(pizza) {
    return this.connection.query(
      `insert into ${this.table} (name) values (?)`,
      [pizza.name]
    );
  }

  update(pizza) {
    return this.connection.query(
      `update ${this.table} set name = ? where id = ?`,
      [pizza.name, pizza.id]
    );
  }

  readWithReduction() {
    return this.connection
      .query(`select *, sum(price * reduction / 100) as priceReduction from ${this.table}
    `);
  }
}

module.exports = PizzaManager;
