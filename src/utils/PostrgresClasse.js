import mysql from "mysql2/promise";
import pg from "pg";

class DatabaseConnector {
  constructor(host, user, password, databaseType) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.databaseType = databaseType; // 'mysql' or 'postgres'
    this.connection = null;
  }

  async connect() {
    if (this.databaseType === "mysql") {
      this.connection = await mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
      });
    } else if (this.databaseType === "postgres") {
      this.connection = new pg.Client({
        host: this.host,
        user: this.user,
        password: this.password,
      });
      await this.connection.connect();
    }

    console.log("Connected to the database");
  }

  disconnect() {
    if (this.connection) {
      this.connection.end();
      console.log("Disconnected from the database");
    }
  }

  async query(sqlQuery) {
    if (!this.connection) {
      console.warn("Not connected to the database.");
      return;
    }

    try {
      const [results] = await this.connection.query(sqlQuery);
      return results;
    } catch (error) {
      console.error("Query error:", error);
    }
  }

  async create(table, data) {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((value) => `"${value}"`)
      .join(", ");

    const sqlQuery = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

    return this.query(sqlQuery);
  }

  async update(table, id, data) {
    const updates = Object.keys(data)
      .map((key) => `${key}="${data[key]}"`)
      .join(", ");
    const sqlQuery = `UPDATE ${table} SET ${updates} WHERE id=${id}`;

    return this.query(sqlQuery);
  }

  async delete(table, id) {
    const sqlQuery = `DELETE FROM ${table} WHERE id=${id}`;
    return this.query(sqlQuery);
  }

  async read(table) {
    const sqlQuery = `SELECT * FROM ${table}`;
    return this.query(sqlQuery);
  }
}

// Example usage
(async () => {
  const db = new DatabaseConnector("localhost", "user", "password", "mysql");
  await db.connect();

  const newRecord = { name: "John", age: 30 };
  const createdRecord = await db.create("users", newRecord);
  console.log("Record created:", createdRecord);

  db.disconnect();
})();
