import mysql from "mysql2";

export const pool = mysql
  .createPool({
    host: process.env.CON_HOST,
    user: process.env.USER_ACCESS,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  .promise();
