/* eslint-disable */
const {aquilaEvents} = require('aql-utils');
const {info}         = require('../info.json');
/* eslint-enable */

const getPluginInfos = () => info;

aquilaEvents.on(`changePluginConfig_${info.name}`, (configToCheck) => {
    // this function is an hook, it is used when the config of this plugin is saved/updated
    // here you can verif the config stocked in configToCheck.config
    // https://doc.aquila-cms.com/#/Creating/Plugin/Plugin_Save?id=top
    return configToCheck;
});

module.exports = {
    getPluginInfos
};