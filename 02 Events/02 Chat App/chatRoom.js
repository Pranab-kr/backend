const EventEmitter = require("events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }
  join(user) {
    this.users.add(user);
    this.emit("join", user);
  }

  sendMess(user, msg) {
    if (this.users.has(user)) {
      this.emit("message", user, msg);
    } else {
      console.log(`${user} is not in chat`);
    }
  }

  leave(user) {
    if (this.users.has(user)) {
      this.users.delete(user);
      this.emit("leave", user);
    } else {
      console.log(`${user} is leaved from the chat`);
    }
  }
}

module.exports = ChatRoom;
