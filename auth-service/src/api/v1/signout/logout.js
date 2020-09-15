module.exports = async (req, res) => {
    res.status(200).clearCookie("jwt").end();
}