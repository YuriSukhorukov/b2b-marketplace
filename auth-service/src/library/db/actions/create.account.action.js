module.exports = async (client, params) => {
    return new Promise((res, rej) => {
        res(params != undefined);
    })
}