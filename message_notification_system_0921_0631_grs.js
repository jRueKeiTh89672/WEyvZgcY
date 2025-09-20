// 代码生成时间: 2025-09-21 06:31:59
const EventEmitter = require('events');

// MessageNotification class inherits from EventEmitter to handle events
class MessageNotification extends EventEmitter {
  // Constructor to initialize the message notification system
  constructor() {
    super();
    this.messages = [];
  }

  // Method to add a message to the notification system
  addMessage(message) {
    if (typeof message !== 'string') {
      throw new Error('Message must be a string.');
    }

    this.messages.push(message);
    this.emit('newMessage', message);
  }

  // Method to remove a message from the notification system
  removeMessage(message) {
    this.messages = this.messages.filter(msg => msg !== message);
  }

  // Method to get all messages in the notification system
  getAllMessages() {
    return this.messages;
  }
}

// Create an instance of the message notification system
const notificationSystem = new MessageNotification();

// Event listener for new messages
notificationSystem.on('newMessage', (message) => {
  console.log(`New message received: ${message}`);
  sendNotificationToUser(message); // Assuming this is a function that sends notifications to users
});

// Function to simulate sending a notification to the user
function sendNotificationToUser(message) {
  // Placeholder for sending notification logic
  console.log(`Notification sent: ${message}`);
}

// Usage example
try {
  notificationSystem.addMessage('Hello, this is a test message!');
} catch (error) {
  console.error(error.message);
}

// To remove a message
notificationSystem.removeMessage('Hello, this is a test message!');

// To get all messages
const messages = notificationSystem.getAllMessages();
console.log(messages);
