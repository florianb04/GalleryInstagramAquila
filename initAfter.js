const {info} = require('./info.json');
// ShortCode Extension
// const {Shortcodes} = require('../../orm/models');

// eslint-disable-next-line no-unused-vars, max-params, require-await
module.exports = async function (resolve, reject, server, app, passport) {
    try {
        require('./routes/base-plugin-aquila')(app);

        /* ShortCode Extension
        const shortCodes = {
            weight      : 100,
            tag         : 'base-plugin',
            translation : {
                fr : {
                    description : 'Description de votre shorcode.',
                    name        : 'Base Module',
                    properties  : [
                        {
                            props       : 'ns-code',
                            description : 'Description de votre propriété',
                            type        : 'text'
                        }
                    ]
                },
                en : {
                    description : 'Description of your shortcode.',
                    name        : 'Base Plugin',
                    properties  : [
                        {
                            props       : 'ns-code',
                            description : 'Desciption of your property',
                            type        : 'text'
                        }
                    ]
                }
            }
        };

        try {
            await Shortcodes.updateOne({tag: shortCodes.tag}, {$set: shortCodes}, {upsert: true});
        } catch (err) {
            console.error('base-plugin-aquila :', err);
        }

        */

        resolve();
    } catch (err) {
        console.error(`${info.name} -> initAfter.js :`, err);
        reject(err);
    }
};
