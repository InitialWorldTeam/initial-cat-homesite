
const debug = process.env.NODE_ENV != 'production';

let baseurl = debug ? "/saleApi" : "https://sale.initialworld.net";

export default {

    /**
     * get verify code of free mint
     * Post
     * @param {string} address
     * */
    getVerifyCode: `${baseurl}/sale/free/newverifycode`,

}
