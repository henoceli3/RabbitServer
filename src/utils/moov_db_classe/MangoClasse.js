import { MongoClient } from "mongodb";

class MongoDBConnector {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = new MongoClient(this.uri, { useUnifiedTopology: true });
      await this.client.connect();
      this.db = this.client.db(this.dbName);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Connection error:", error);
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    }
  }

  async create(collectionName, document) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(document);
      return result.ops[0];
    } catch (error) {
      console.error("Create error:", error);
    }
  }

  async update(collectionName, filter, update) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.updateOne(filter, { $set: update });
      return result.modifiedCount;
    } catch (error) {
      console.error("Update error:", error);
    }
  }

  async delete(collectionName, filter) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.deleteOne(filter);
      return result.deletedCount;
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  async read(collectionName, filter = {}) {
    try {
      const collection = this.db.collection(collectionName);
      return collection.find(filter).toArray();
    } catch (error) {
      console.error("Read error:", error);
    }
  }
}

// Example usage
(async () => {
  const db = new MongoDBConnector("mongodb://localhost:27017", "mydb");
  await db.connect();

  const newDocument = { name: "Alice", age: 28 };
  const createdDocument = await db.create("users", newDocument);
  console.log("Document created:", createdDocument);

  const updatedDocumentCount = await db.update(
    "users",
    { name: "Alice" },
    { age: 29 }
  );
  console.log("Updated document count:", updatedDocumentCount);

  const deletedDocumentCount = await db.delete("users", { name: "Alice" });
  console.log("Deleted document count:", deletedDocumentCount);

  const allDocuments = await db.read("users");
  console.log("All documents:", allDocuments);

  await db.disconnect();
})();
