'use strict';

var Mongoose = require('mongoose');
var Config = require('./config.js');

module.exports = Mongoose.connect('mongodb:' + Config.connect);
