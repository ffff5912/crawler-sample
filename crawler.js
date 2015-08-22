'use strict';

var Request = require('request');
var Cheerio = require('cheerio');
var ErrorHandler = require('./error_handler.js');
var Page = require('./model/page.js');

var saveAction = function(err, res, body) {
    var msg = ErrorHandler(err);
    if (!msg) {
        var $ = Cheerio.load(body);
        var data = {
            url: res.request.href,
            title: $('title').text(),
            body: $('body').html()
        };
        var page = new Page(data);
        page.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('success');
            }
        });
    } else {
        console.log(msg);
    }
};

var Crawler = {
    execute: function(targets) {
        targets.map(function(target) {
            Request(target, saveAction);
        });
    }
}

module.exports = Crawler;
