import pool from "./pool.js";

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
};

const getMessageById = async (messageId) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    messageId,
  ]);
  return rows[0];
};

const insertMessage = async (messageText, username) => {
  await pool.query(
    "INSERT INTO messages (message_text, username) VALUES($1, $2)",
    [messageText, username],
  );
};

const updateUserMessage = async (messageId, messageText, username) => {
  await pool.query(
    "UPDATE messages SET message_text = $1, username = $2 WHERE id = $3",
    [messageText, username, messageId],
  );
};

const deleteMessageById = async (messageId) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
};

export {
  getAllMessages,
  getMessageById,
  insertMessage,
  updateUserMessage,
  deleteMessageById,
};
