const Message = require('../models/message');

module.exports = io => {

  io.on('connection', client => {
    console.log('new connection');

    Message.find({}).sort({createdAt: -1}).limit(10).then(messages => {
      client.emit('load all messages', messages.reverse())
    });

    client.on('disconnect',() => {
      client.broadcast.emit('user disconnected');
      console.log('user disconnected');
    });

    client.on('message', data => {
      console.log(data.userName)
      let messageAttributes = {content: data.content, userName: data.userName, user: data.userId };
      var m = new Message(messageAttributes);

      m.save()
      .then( message => {
        console.log(message);
        io.emit('message', messageAttributes);
      }).catch( e => console.log(`error: ${e.message}`));
    });
  });

}
