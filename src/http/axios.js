'use strict'

import axios from 'axios';
import qs from 'qs';
import store from '../store';
import { Toast } from "vant";

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.credentials = 'include';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容

    return config;
}, err => {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
});

function checkStatus(response) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 ||
        response.status === 400)) {
        return response
    }
    // 异常状态下，把错误信息返回去
    return response
}

function checkCode(res, isToast) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (!res) {
        return false;
    }

    if (res.status === 404) {
        Toast.fail(res.statusText);
        return {};
    }
    const { code, msg } = res.data;
    /* Toast错误信息 */
    if (code === '0000') {
        return Promise.resolve(res?.data);
    } else {
        if (isToast) {
            msg && Toast.fail(msg);
        }
        return Promise.reject(res?.data);
    }

}
// 请求方式的配置
export default {
    post(url, data, dateType = 'formData', isToast = true) {  //  post
        let submitData, contentType;
        if (dateType !== 'formData') {
            submitData = data;
            contentType = 'application/json; charset=UTF-8';
        } else {
            submitData = qs.stringify(data);
            contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        }

        return axios({
            method: 'post',
            baseURL: '',
            url,
            data: submitData,
            timeout: 30000,
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                'Content-Type': contentType,
            }
        }).then(
            (response) => {
                console.log('response', response);
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res, isToast)
            }
        )
    },
    get(url, params, dateType = 'json', isToast = true) {  // get
        let contentType;
        if (dateType !== 'formData') {
            contentType = 'application/json; charset=UTF-8';
        } else {
            contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        }

        return axios({
            method: 'get',
            baseURL: '',
            url,
            params, // get 请求时带的参数
            timeout: 30000,
            headers: {
                'x-requested-with': 'XMLHttpRequest',
                'Content-Type': contentType,
            }
        }).then(
            (response) => {
                return checkStatus(response)
            }
        ).then(
            (res) => {
                return checkCode(res, isToast)
            }
        )
    }
}
