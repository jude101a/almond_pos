import pkg from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "src/.env") });

const { Pool } = pkg;

const dbPassword = process.env.DB_PASSWORD;
if (!dbPassword) {
    console.error("Error: DB_PASSWORD is not set. Please set DB_PASSWORD in your .env or environment.");
    process.exit(1);
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(dbPassword),
    port: parseInt(process.env.DB_PORT, 10) || 5432
})

pool.on("connect", ()=>{
    console.log("Connected to the database");
})

export default pool;