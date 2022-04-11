const secret = process.env.token ?? 'secret'

module.exports = (req, res, next) => {
    const { token } = req.query
    if (token != secret) return res.status(401).json({
        status: 400,
        msg: "Token required"
    })
    next()
}