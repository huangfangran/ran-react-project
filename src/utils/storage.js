//数据持久化

//获取持久化数据
function getItem(key) {
    const result = window.localStorage.getItem(key);
    return JSON.parse(result)
}

//设置持久化数据
function setItem(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
}

//移除持久化数据
function removeItem(key) {
    window.localStorage.removeItem(key)
}

//暴露
export {
    getItem,
    setItem,
    removeItem
}