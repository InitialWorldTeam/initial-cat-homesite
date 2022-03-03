import {
    Env_Debug
} from '@/config/util/const';

// const debug = process.env.NODE_ENV != 'production';

let baseurl = Env_Debug ? "/storageApi" : "https://storage.initialworld.net";

export default {

    /**
     * get url of NFT
     * Post
     * @param {string} ipfs_url
     * */
    getNftUrl: `${baseurl}/api/v1/urls`,

}
