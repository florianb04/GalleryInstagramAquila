// eslint-disable-next-line
const {aquilaEvents} = require('aql-utils');

module.exports = function () {
    // if you want to add an hook binded on an AquilaEvent
    aquilaEvents.on('userSchemaInit', (userSchema) => {
        // On ajoute au schema du user l'id galaxia
        userSchema.add({weight: {type: String, default: null}});
    });
};
