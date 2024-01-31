const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  createUser(email, hashedPassword) {
    const query = `INSERT INTO ${this.table}( email, hashedPassword, role_id) VALUES (?,?,?)`;
    const values = [email, hashedPassword, "utilisateur2"];

    return this.connection.query(query, values);
  }

  findOneByEmail(email) {
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
  // findOneByEmailAndId(email) {
  //   return this.connection.query(
  //     `SELECT * FROM ${this.table} WHERE email = ?`,
  //     [email]
  //   );
  // }
}

module.exports = UserManager;
