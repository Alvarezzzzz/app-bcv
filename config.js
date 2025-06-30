export const {
  PORT = 3000,
  ORIGIN_FRONT = "http://localhost:8080",
  DB_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "bcv",
    port: 3306,
  },
} = process.env;
