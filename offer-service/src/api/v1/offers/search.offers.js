module.exports = async (req, res) => {
    res.send({code: 200, message: `search.js`, query: req.query});;
}