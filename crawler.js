'use strict';

var Request = require('request');
var Cheerio = require('cheerio');
var ErrorHandler = require('./error_handler.js');
var Page = require('./model/page.js');

function save(data) {
    var page = new Page(data);
    page.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
        }
    });
};

function getLinks($, host) {
    var links = [];
    $('a').each(function(idx) {
        var href = $(this).attr('href');
        var pattern = 'http:\/\/' + host + '.*?';
        if (href !== undefined && -1 !== href.search(pattern)) {
            links.push(href);
        }
    });
    return links;
};

var scraping = function(err, res, body) {
    var msg = ErrorHandler(err);
    if (!msg) {
        var $ = Cheerio.load(body);
        var data = {
            url: res.request.href,
            title: $('title').text(),
            body: $('body').html().replace(/<\/?br>|\n|\t|\r/g, '').replace(/<script.*?>.*?<\/script>/g, '')
        };
        save(data);
    } else {
        console.log(msg);
    }
};

var depth = 0;
var max_depth = 1;
var crawl = function(err, res, body) {
    scraping(err, res, body);
    depth++;
    if (depth <= max_depth) {
        var $ = Cheerio.load(body);
        var lists = getLinks($, res.request.originalHost);
        var length = lists.length;
        for (var i = 0; i < length; i++) {
            Request(lists[i], crawl);
        }
    }
};

var Crawler = {
    execute: function(seeds) {
        seeds.map(function(seed) {
            Request(seed, crawl);
        });
    }
};

module.exports = Crawler;
