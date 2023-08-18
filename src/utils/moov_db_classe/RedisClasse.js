import redis from "redis";

class RedisConnector {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.client = null;
  }

  connect() {
    this.client = redis.createClient(this.port, this.host);

    this.client.connect((error) => {
      if (error) {
        console.error("Connection error:", error);
      } else {
        console.log("Connected to Redis");
      }
    });

    this.client.on("connect", () => {
      console.log("Connected to Redis");
    });

    this.client.on("error", (error) => {
      console.error("Connection error:", error);
    });
  }

  disconnect() {
    if (this.client) {
      this.client.quit();
      console.log("Disconnected from Redis");
    }
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (error, result) => {
        if (error) {
          console.error("Set error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, result) => {
        if (error) {
          console.error("Get error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, result) => {
        if (error) {
          console.error("Delete error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

// Example usage
(async () => {
  const db = new RedisConnector("localhost", 6379);
  db.connect();

  await db.set("name", "Alice");
  const name = await db.get("name");
  console.log("Name:", name);

  await db.del("name");

  db.disconnect();
})();
