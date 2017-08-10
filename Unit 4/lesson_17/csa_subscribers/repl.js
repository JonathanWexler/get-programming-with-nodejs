const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/csa_app_db');
var Subscriber = require('./models/subscriber');
var Group = require('./models/group');
mongoose.Promise = global.Promise;


Subscriber.create({name: "Jon", email: "jon@jonwexler.com", zipCode: "12345"}).then(subscriber => console.log(subscriber)).catch(error=> console.log(error.message));

var subscriber;
Subscriber.findOne({name: "Jon"}).then(result => subscriber = result); (3)
console.log(subscriber.getInfo());



Subscriber.findOne().populate({path: 'group', select: 'title'}).then(s => console.log(s))


var testGroup, testSubscriber;
Group.create({title: "Tomato Land", description: "Locally farmed tomatoes only", zipCode: 12345, items: ["cherry", "heirloom"] }).then(g => testGroup = g);
Subscriber.findOne({}).then(s=> testSubscriber = s);


var User = require('./models/user.js')

User.create({name: {first: 'Jon', last: 'Wexler '}, email: 'jon@jonwexler.com', password: 'pass123'}).then(u=> console.log(u)).catch(e => console.log(e.message))
