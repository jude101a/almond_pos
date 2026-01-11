import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { createUserTable, createAgentReportsTable } from "./data/createUserTable.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api", userRoutes);


// error handling middleware
app.use(errorHandler);

// Create user and agent reports tables on startup
createAgentReportsTable();
createUserTable();

// testing connection
app.get("/", async (req, res)=>{
    const result = await pool.query("SELECT current_database()");
    res.send(`Connected to the database: db name is ${result.rows[0].current_database}`);
})

// server running
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})