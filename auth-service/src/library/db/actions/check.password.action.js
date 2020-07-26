module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        res(params.password == 'sdWE343sx!');
    })
}