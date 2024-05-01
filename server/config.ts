import "dotenv/config";
import pg, { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

// pool.on('release', (err: Error, client: Client) => void) => void

pool.on("error", (err: Error) => {
  console.log('"rreur from pool');
});

pool.on('connect', (_client: pg.PoolClient) => {
  // On each new client initiated, need to register for error(this is a serious bug on pg, the client throw errors although it should not)
  _client.on('error', (err: Error) => {
    console.log(err);
  });
});

export { pool };
