
const TOKENKEY='heimammToken'


// 设置token
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY,token)
}

// 获取token
export function getToken(){
    return window.localStorage.getItem(TOKENKEY);
}

// 移除token
export function removeToken(){
    window.localStorage.removeItem(TOKENKEY)
}
