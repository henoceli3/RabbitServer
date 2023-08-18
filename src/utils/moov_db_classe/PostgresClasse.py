import mysql.connector
import psycopg2


class DatabaseConnector:
    def __init__(self, host, user, password, database, database_type):
        self.host = host
        self.user = user
        self.password = password
        self.database = database  # Spécifiez le nom de la base de données
        self.database_type = database_type  # 'mysql' ou 'postgres'
        self.connection = None

    def connect(self):
        if self.database_type == "mysql":
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
            )
        elif self.database_type == "postgres":
            self.connection = psycopg2.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
            )
            self.connection.autocommit = True

        print("Connecté à la base de données")

    def disconnect(self):
        if self.connection:
            self.connection.close()
            print("Déconnecté de la base de données")

    def query(self, sql_query):
        if not self.connection:
            print("Pas de connexion à la base de données.")
            return

        try:
            cursor = self.connection.cursor()
            cursor.execute(sql_query)
            results = cursor.fetchall()
            cursor.close()
            return results
        except Exception as e:
            print("Erreur de requête :", e)

    def create(self, table, data):
        columns = ", ".join(data.keys())
        values = ", ".join([f"'{value}'" for value in data.values()])
        sql_query = f"INSERT INTO {table} ({columns}) VALUES ({values})"
        return self.query(sql_query)

    def update(self, table, record_id, data):
        updates = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
        sql_query = f"UPDATE {table} SET {updates} WHERE id = {record_id}"
        return self.query(sql_query)

    def delete(self, table, record_id):
        sql_query = f"DELETE FROM {table} WHERE id = {record_id}"
        return self.query(sql_query)

    def read(self, table):
        sql_query = f"SELECT * FROM {table}"
        return self.query(sql_query)


# Exemple d'utilisation
if __name__ == "__main__":
    db = DatabaseConnector("localhost", "root", "", "biliiv", "mysql")
    db.connect()

    new_record = {"idcom": 90, "idphotos": 13}
    created_record = db.create("exo_com", new_record)
    print("Record créé :", created_record)

    db.disconnect()
