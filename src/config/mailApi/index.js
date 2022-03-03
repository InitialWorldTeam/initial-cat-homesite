
import {
    Env_Debug
} from '@/config/util/const';

// const debug = process.env.NODE_ENV != 'production';

let baseurl = Env_Debug ? "/mailApi" : "https://mailsub.initialworld.net";

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
