// Create in-memory database
const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const getMessages = async () => {
  return messages;
};

const getLastestId = async () => {
  return messages[messages.length - 1].id;
};

export { getMessages, getLastestId };
