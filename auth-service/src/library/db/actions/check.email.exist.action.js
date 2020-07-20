module.exports = async (client, params) => {
    return new Promise((res, rej) => {
        res(params != undefined && params.email && params.email == 'xxx@xxx.com');
    })
}