const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/confetti_cuisine_db');
const Course = require('./models/course');


Course.create({name: "Chocolate World", description: "Dive into the divine world of sweet and bitter chocolate making.", cost: 22, maxStudents: 14}).then(course => console.log(course.name)).catch(e => console.log(e.messages));
Course.create({name: "Pasta Boat", description: "Swim through original recipes and paddle your way through linguine", cost: 43, maxStudents: 8}).then(course => console.log(course.name)).catch(e => console.log(e.messages));
Course.create({name: "Hot Potato", description: "Potatoes are back and they're hot! Learn 7 different ways you can make potatoes relevant again.", cost: 12, maxStudents: 28}).then(course => console.log(course.name)).catch(e => console.log(e.messages));
Course.create({name: "A little less and samosa", description: "In this class you'll learn to make lowfat samosa. Less i'samo.", cost: 5, maxStudents: 16}).then(course => console.log(course.name)).catch(e => console.log(e.messages));


// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/confetti_cuisine_db');
// const Group = require('./models/group');
//
// Group.create({title: "Beets sitting at home", description: "Seasonal beets from the guy down the street.", zipCode: 12323, items: ['beets']}).then(course => console.log(course.name)).catch(e => console.log(e.messages));
// Group.create({title: "Barley even listening", description: "Organic wheats and barleys for bread, soup, and fun!", zipCode: 20325, items: ['barley', 'rye', 'wheat']}).then(course => console.log(course.name)).catch(e => console.log(e.messages));
// Group.create({title: "Peaching to the choir", description: "Get fresh peaches from the local farm.", zipCode: 1006, items: ['peaches', 'plums']}).then(course => console.log(course.name)).catch(e => console.log(e.messages));
