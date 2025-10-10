const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (user) => {
  console.log(`Hello and wlcome ${user}`);
});
eventEmitter.on("greet", (user) => {
  console.log(`Hay ${user}`);
});

eventEmitter.once("notify", () => {
  console.log("This code will run once");
});
// Emit the event
eventEmitter.emit("greet", "Pranab");
eventEmitter.emit("greet", "Ram");
eventEmitter.emit("notify");
eventEmitter.emit("notify"); // don't run

const Listen = () => console.log("This is a listener");
eventEmitter.on("test", Listen);
eventEmitter.emit("test");
eventEmitter.emit("test");

eventEmitter.removeListener("test", Listen);
eventEmitter.emit("test");

console.log(eventEmitter.listeners("greet"));
