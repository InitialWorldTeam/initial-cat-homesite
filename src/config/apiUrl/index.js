
const debug = process.env.NODE_ENV != 'production';

let baseurl = debug ? "" : "";

export default {

    /**
     * 获取数据
     * Post
     * @param {string} address
     * */
    getData: `${baseurl}/`,

}
