const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csa_app_db');
mongoose.Promise = global.Promise;


const Course = require('../models/course');
const User = require('../models/user');
