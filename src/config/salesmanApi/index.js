import {
    Env_Debug
} from '@/config/util/const';

// const debug = process.env.NODE_ENV != 'production';

let baseurl = Env_Debug ? "/saleApi" : "https://sale.initialworld.net";

export default {

    /**
     * get verify code of free mint
     * Post
     * @param {string} address
     * */
    getVerifyCode: `${baseurl}/sale/free/newverifycode`,

    /**
     * user mark that verify code has bee iapd
     * Post
     * @param {string} address
     * @param {string} verifyCode
     * */
    confirmTransferSuccess: `${baseurl}/sale/free/markpaid`,

}
