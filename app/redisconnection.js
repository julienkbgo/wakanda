var redis = require('redis');
var config = require('../config/config');

var redisClient = null;

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    redisClient = require("redis").createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
} else {
    redisClient = redis.createClient(config.redisConf);
    redisClient.auth(config.redisConf.password);
}

redisClient.on('connect', function() {
    console.log('connected to redis!!');
});

module.exports = redisClient;