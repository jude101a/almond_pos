import pool from "../config/db.js";

export const getAllUsers = async () => {
    const res = await pool.query("SELECT * FROM users");
    return res.rows;
}

export const getUserById = async (id) => {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
}
export const createUser = async (name, email) => {
    // prevent duplicate emails with an existence check (helps return friendly error)
    const existing = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
    if (existing.rows.length) {
        const err = new Error("Email already exists");
        err.status = 409;
        throw err;
    }

    const res = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    );
    return res.rows[0];
}
export const updateUser = async (id, name, email) => {
    const res = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
    );
    return res.rows[0];
}
export const deleteUser = async (id) => {
   const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}

/* Insert report */
export const insertReport = async (report) => {
  const q = `
    INSERT INTO agent_reports (
      agent_name, closing_cash, pos_balance, added_cash,
      removed_funds, starting_money, starting_cash,
      commission_rate, date,
      total_cash, processed_total, calculated_commission,
      expected_total_without_commission, actual_total,
      actual_commission, topping, status
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,
      $10,$11,$12,$13,$14,$15,$16,$17
    )
    RETURNING id
  `;

  const v = Object.values(report.toJson());
  const { rows } = await pool.query(q, v);
  return rows[0].id;
};

/* Get report by ID */
export const getReport = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM agent_reports WHERE id = $1",
    [id]
  );
  return rows.length ? AgentReportModel.fromRow(rows[0]) : null;
};

/* Get last report */
export const getLastReport = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM agent_reports ORDER BY id DESC LIMIT 1"
  );
  return rows.length ? AgentReportModel.fromRow(rows[0]) : null;
};

/* Get all reports */
export const getAllReports = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM agent_reports ORDER BY date DESC"
  );
  return rows.map(AgentReportModel.fromRow);
};

/* Update report */
export const updateReport = async (id, report) => {
  const q = `
    UPDATE agent_reports SET
      agent_name=$1, closing_cash=$2, pos_balance=$3,
      added_cash=$4, removed_funds=$5,
      starting_money=$6, starting_cash=$7,
      commission_rate=$8, date=$9,
      total_cash=$10, processed_total=$11,
      calculated_commission=$12,
      expected_total_without_commission=$13,
      actual_total=$14, actual_commission=$15,
      topping=$16, status=$17
    WHERE id=$18
  `;

  const v = [...Object.values(report.toJson()), id];
  const res = await pool.query(q, v);
  return res.rowCount;
};

/* Delete one report */
export const deleteReport = async (id) => {
  const res = await pool.query(
    "DELETE FROM agent_reports WHERE id=$1",
    [id]
  );
  return res.rowCount;
};

/* Clear all reports */
export const clearAll = async () => {
  const res = await pool.query("DELETE FROM agent_reports");
  return res.rowCount;
};