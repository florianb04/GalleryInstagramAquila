/* eslint-disable */
const {authentication, adminAuth} = require('../../../middleware/authentication');
const {info}                      = require('../info.json');
const ServicePlugin               = require('../services/instaServices');
const {IgApiClient} = require('instagram-private-api');
const {sample} = require('lodash');
/* eslint-enable */

module.exports = function (app) {
        app.post(`/v2/GalleryInstagramAquila`, coco) // getModuleConfig
        app.post(`/v2/GalleryInstagramAquila/config`, igStart) // getModuleConfig
        app.post('/v2/GalleryInstagramAquila/setConfig') // adminAuthRight('modules'),
        // .post('/v2/seo/config', authentication, setConfigModule) //
        // .get('/v2/seo/config', authentication, getConfigModule) //
};

const igStart = async (req, res, next) => {
    console.log('igStart begin ...');

    const ig = new IgApiClient();
    const userName    = 'api.testor';
    const userSecret  = '2@#xEIi&Cg%5';
    // const userName    = req.userName;
    // const userSecret  = req.userSecret;

    // You must generate device id's before login.
    // Id's generated based on seed
    // So if you pass the same value as first argument - the same id's are generated every time
    ig.state.generateDevice(userName);

    try {
        const login = async (req) => {
            console.log('login start ...');
            // Execute all requests prior to authorization in the real Android application
            // Not required but recommended
            // await ig.simulate.preLoginFlow();
            const loggedInUser = await ig.account.login(userName, userSecret);
            // The same as preLoginFlow()
            // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
            // process.nextTick(async () => await ig.simulate.postLoginFlow());
            // Create UserFeed instance to get loggedInUser's posts
            const userFeed = ig.feed.user(loggedInUser.pk);
            const myPostsFirstPage = await userFeed.items();
            console.log('myPostsFirstPage: ', myPostsFirstPage);
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

        login();
        console.log('igStart end ...');
    }catch (err) {
            console.log('igStart error ...');
            console.log(err);
        }

}

const setModuleConfig = async (req, res, next) => {
    // try {
    //     const module = await Modules.findOne({name: 'gallery-instagram-aquila'});
    //     if (module) return res.json(module.config);
    //     throw NSErrors.NotFound;
    // } catch (e) {
    //     return next(e);
    // }
    console.log('getConfig');
};

const coco = async (req, res, next) => {
    console.log('Basic route to config menu');
    console.log('req: ', req);
};


async function setConfigModule(req, res, next){
    try{
        await setConfig(info.name, req.body);
        res.end();
    }catch(err){
        next(err);
    }
}

async function getModuleConfig(req, res, next){
    try{
        return res.json(await getConfig(info.name, req.body));
        // login();
    }catch(err){
        next(err);
    }
}