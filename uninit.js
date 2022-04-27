const {info} = require('./info.json');
// const {Shortcodes} = require('../../orm/models');

/**
 * This function is called when the plugin is desactivated or when we delete it
 */
module.exports = async function (resolve, reject) {
    try {
        // await Shortcodes.deleteOne({tag: 'base-plugin'});
        return resolve();
    } catch (error) {
        console.error(`${info.name} : `, error);
        return reject(error);
    }
};
