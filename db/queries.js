import pool from "./pool.js";

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
};

const insertMessage = async (messageText, username) => {
  await pool.query(
    "INSERT INTO messages (message_text, username) VALUES($1, $2)",
    [messageText, username],
  );
};

export { getAllMessages, insertMessage };
