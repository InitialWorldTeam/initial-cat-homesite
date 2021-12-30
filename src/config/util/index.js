import { BaseNameSpace } from './const';

const UTILS = {
    // 将数据存在本地LocalStorage中
    setLocal(key, value) {
        window.localStorage.setItem(key, value);
    },

    setJsonLocal(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },

    // 从LocalStorage中取值
    getLocal(key) {
        return window.localStorage.getItem(key);
    },

    // 清空LocalStorage
    clearLocal() {
        window.localStorage.clear();
    },
    // 存储Base素材
    setNftBase(key, value) {
        const nameSpace = BaseNameSpace;
        let data = this.getLocal(nameSpace);

        if (data) {
            data = JSON.parse(data);
            data[key] = value;
        }
        else {
            let obj = {};
            obj[key] = value;
            this.setJsonLocal(nameSpace, obj);
        }
    },
    // 获取Base素材
    getNftBase(key) {
        const nameSpace = BaseNameSpace;
        let data = this.getLocal(nameSpace);
        
        if (data) {
            data = JSON.parse(data);
            return data[key];
        }
        else {
           return false;
        }
    },
    // 校验数据类型是否为数组
    checkIsArray(array) {
        return array && Array.isArray(array);
    },

    // 校验是否符合邮箱格式
    checkIsEmail(str) {
        const pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        return pattern.test(str);
    }
}

export default UTILS;