
const debug = process.env.NODE_ENV != 'production';

let baseurl = debug ? "/storageApi" : "https://storage.initialworld.net";

export default {

    /**
     * get url of NFT
     * Post
     * @param {string} ipfs_url
     * */
    getNftUrl: `${baseurl}/api/v1/urls`,

}
