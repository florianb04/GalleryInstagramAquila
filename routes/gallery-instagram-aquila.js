/* eslint-disable */
const {authentication, adminAuth} = require('../../../middleware/authentication');
const {info}                      = require('../info.json');
const ServicePlugin               = require('../services/instaServices');
const {IgApiClient} = require('instagram-private-api');
const {sample} = require('lodash');
/* eslint-enable */

module.exports = function (app) {
    app
        // .get(`/v2/${info.name}/:slug`, getFunction)
        .get(`/v2/GalleryInstagramAquila`, login)
        // .get(`/v2/${info.name}/config`, getConfig)
        // .post(`/v2/${info.name}/test`, postFunction)
        // .post(`/v2/${info.name}/protectedTest`, authentication, adminAuth, postFunction); // this route is protected
};


const ig = new IgApiClient();
const userName    = 'api.testor';
const userSecret  = '2@#xEIi&Cg%5';
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
// ig.state.generateDevice(process.env.IG_USERNAME);
ig.state.generateDevice(userName);
// Optionally you can setup proxy url
// ig.state.proxyUrl = process.env.IG_PROXY;
const login = async () => {
    // Execute all requests prior to authorization in the real Android application
    // Not required but recommended
    await ig.simulate.preLoginFlow();
    //   const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const loggedInUser = await ig.account.login(userName, userSecret);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    // Create UserFeed instance to get loggedInUser's posts
    const userFeed = ig.feed.user(loggedInUser.pk);
    const myPostsFirstPage = await userFeed.items();
    // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
    const myPostsSecondPage = await userFeed.items();
    await ig.media.like({
            // Like our first post from first page or first post from second page randomly
            mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]),
            moduleInfo: {
            module_name: 'profile',
            user_id: loggedInUser.pk,
            username: loggedInUser.username,
            },
            d: sample([0, 1]),
        });
};