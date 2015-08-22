'use strict';

var Mongoose = require('mongoose');
var DB = require('../db/connect.js');

var schema = {
    url: {type:String},
    title: {type:String},
    body: {type:String},
    date: {type:Date, default: Date.now}
};

module.exports = DB.model('page', new Mongoose.Schema(schema));
