/* eslint-disable */
const {authentication, adminAuth} = require('../../../middleware/authentication');
const {info}                      = require('../info.json');
const ServicePlugin               = require('../services/baseServices');
/* eslint-enable */

module.exports = function (app) {
    app
        .get(`/v2/${info.name}/:slug`, getFunction)
        .get(`/v2/${info.name}/config`, getConfig)
        .post(`/v2/${info.name}/test`, postFunction)
        .post(`/v2/${info.name}/protectedTest`, authentication, adminAuth, postFunction); // this route is protected
};

function getFunction(req, res) {
    // on return les params du GET
    return res.json(req.params);
}

function postFunction(req, res) {
    // on return le body du POST
    return res.json(req.body);
}

function getConfig(req, res) {
    // on return le body du POST
    return res.json(ServicePlugin.getPluginInfos());
}
