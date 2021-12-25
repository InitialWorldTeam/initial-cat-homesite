
const debug = process.env.NODE_ENV != 'production';

let baseurl = debug ? "/api" : "https://api.initialworld.app";

const Api = {
    /**
     * get user's all NFTs
     * Post
     * @param {string} address
     * */
    getAllNfts: `/user/getallnfts`,

    /**
     * get NFT by NFT id
     * Post
     * @param {string} nftId
     * */
    getNftById: `/rmrk2/status/nft`,

    /**
     * get Base by base id
     * Post
     * @param {string} baseId
     * */
    getBaseById: `/rmrk2/status/base`,

    /**
     * get Collection by collection id
     * Post
     * @param {string} collectionId
     * */
    getCollectionId: `/rmrk2/status/collection`,

}

function requestApi(api) {
    for(let item in api) {
        api[item] = `${baseurl}${api[item]}`;
    }
    return api;
}

export default requestApi(Api);
