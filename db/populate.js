import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const script = `
CREATE TABLE IF NOT EXISTS messages (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message_text TEXT NOT NULL,
    username VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO messages (message_text, username)
VALUES('Hi there', 'Amando'), 
      ('Hello World!', 'Charles');
`;

async function main() {
  console.log("seeding..");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(script);
  await client.end();
  console.log("done");
}

main();
