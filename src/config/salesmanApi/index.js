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

    /**
     * create order
     * Post
     * @param {string} address
     * @param {string} nftType
     * */
    createBoxOrder: `${baseurl}/sale/onprice/order/create`,

    /**
     * user mark order paid
     * Post
     * @param {string} address
     * @param {string} orderId
     * */
    markBoxOrderPaid: `${baseurl}/sale/onprice/order/markpaid`,

    /**
     * check box order status
     * Post
     * @param {string} orderId
     * */
    checkBoxOrderStatus: `${baseurl}/sale/onprice/order/status`,

    /**
     * get swap key
     * Post
     * @param {string} address
     * */
    getSwapKeyList: `${baseurl}/sale/onprice/swap/keylist`,

    /**
     * get sale price
     * Post
     * @param {string} nftType
     * */
    getSalePrice: `${baseurl}/sale/basic/price`,

    /**
     * get sale report
     * Post
     * @param {string} nftType
     * */
    getSaleReport: `${baseurl}/sale/basic/report`,
    
}
