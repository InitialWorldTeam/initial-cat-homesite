
const debug = process.env.NODE_ENV != 'production';

let baseurl = debug ? "/mailApi" : "https://mailsub.initialworld.app";

const Api = {
    /**
     * get user's all NFTs
     * Post
     * @param {string} email
     * */
    subEmail: `/dosub`,

}

function requestApi(api) {
    for(let item in api) {
        api[item] = `${baseurl}${api[item]}`;
    }
    return api;
}

export default requestApi(Api);
