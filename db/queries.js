import pool from "./pool.js";

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
};

export { getAllMessages };
