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
   const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rows[0];
}