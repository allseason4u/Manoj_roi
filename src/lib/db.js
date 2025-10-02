import sql from "mssql";

// const config = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   database: process.env.DB_NAME,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

const config = {
  user: "jaaneramMannual",
  password: "3mf6HO5MzfRgiRyddd",
  server: "195.35.6.44",
  port: parseInt(1433, 10),
  database: "jaaneramMannual",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function queryDB(query, params = {}) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();
    for (let key in params) {
      request.input(key, params[key]);
    }
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
}
