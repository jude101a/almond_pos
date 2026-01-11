import pool from "../config/db.js";

export const createAgentReportsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS agent_reports (
      id SERIAL PRIMARY KEY,
      agent_name VARCHAR(100),
      closing_cash NUMERIC,
      pos_balance NUMERIC,
      added_cash NUMERIC,
      removed_funds NUMERIC,
      starting_money NUMERIC,
      starting_cash NUMERIC,
      commission_rate NUMERIC,
      report_date DATE,

      -- computed fields for convenience
      total_cash NUMERIC,
      processed_total NUMERIC,
      calculated_commission NUMERIC,
      expected_total_without_commission NUMERIC,
      actual_total NUMERIC,
      actual_commission NUMERIC,
      topping NUMERIC,
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("Agent reports table created or already exists.");
  } catch (err) {
    console.error("Error creating agent reports table:", err);
  }
};

export const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(queryText);
    console.log("User table created or already exists.");
  } catch (err) {
    console.error("Error creating user table:", err);
  }
};
