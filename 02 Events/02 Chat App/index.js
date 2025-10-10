const ChatRoom = require("./chatRoom.js");

const chat = new ChatRoom();

chat.on("join", (user) => {
  console.log(`${user} has joined the chat`);
});
chat.on("message", (user, msg) => {
  console.log(`${user} : ${msg}`);
});
chat.on("leave", (user) => {
  console.log(`${user} has left the chat`);
});

//simulating
chat.join("Pranab");
chat.join("Ram");

chat.sendMess("Pranab", "Good Morning");
chat.sendMess("Ram", "Mornig U too!");

chat.leave("Pranab");
chat.sendMess("Pranab", "What ur plan Today?");
chat.leave("Ram");
