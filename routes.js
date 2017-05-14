var statisticService = require('./app/statisticService');
var StatisticData = require('./app/statisticData');
var routes = function(){};
var sleep = require('sleep');

function verifyAuth(token, res) {
    if(process.env.SECURITY_TOKEN && token !== process.env.SECURITY_TOKEN) {
        res.status(401).send("Unauthorized");
    }
}

routes.listStatistics = function(req, res) {
    verifyAuth(req.query.token, res);
    statisticService.list(req.query.client, function(data) {
        res.status(200).send(data);
    });
};

routes.registerStatistic = function(req, res) {
    verifyAuth(req.body.token, res);
    statisticService.register(new StatisticData(req.body));
    res.status(200).send("done");
};

module.exports = routes;
