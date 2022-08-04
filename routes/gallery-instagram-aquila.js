/* eslint-disable */
const {authentication, adminAuth} = require('../../../middleware/authentication');
const {info}                      = require('../info.json');
const ServicePlugin               = require('../services/instaServices');
const {IgApiClient}               = require('instagram-private-api');
const {sample, map}               = require('lodash');
/* eslint-enable */

module.exports = function (app) {
        app.post(`/v2/GalleryInstagramAquila`, coco) // getModuleConfig
        app.post(`/v2/GalleryInstagramAquila/config`, igStart) // getModuleConfig
        app.post('/v2/GalleryInstagramAquila/setConfig') // adminAuthRight('modules'),
        // .post('/v2/seo/config', authentication, setConfigModule)
        // .get('/v2/seo/config', authentication, getConfigModule)
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

            const loggedInUser = await ig.account.login(userName, userSecret);

            // Create UserFeed instance to get loggedInUser's posts
            const userFeed = ig.feed.user(loggedInUser.pk);
            const myPostsFirstPage = await userFeed.items();
            
            //create an array of objects with the following properties: {url: '', caption: '', src: '', alt: ''}
            
            console.log('myPostsFirstPage: ', myPostsFirstPage);
            const tab = [];
            for (let i = 0; i < myPostsFirstPage.length; i++) {
                const myItem = {
                    src: myPostsFirstPage[i].image_versions2.candidates[0].url,
                    srcset: [myPostsFirstPage[i].image_versions2.candidates[0].url],
                    alt: myPostsFirstPage[i].caption.text,
                    extension: '.jpg'
                };
                tab.push(myItem);
            }
            console.log('tab: ', tab);
            return res.json(tab);

        };
        login();
        console.log('igStart end ...');

    }catch (err) {
            console.log('igStart error : ', err);
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
    console.log('res: ', res);
};

// async function setConfigModule(req, res, next){
//     try{
//         await setConfig(info.name, req.body);
//         res.end();
//     }catch(err){
//         next(err);
//     }
// }

// async function getModuleConfig(req, res, next){
//     try{
//         return res.json(await getConfig(info.name, req.body));
//         // login();
//     }catch(err){
//         next(err);
//     }
// }