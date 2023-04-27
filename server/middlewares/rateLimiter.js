const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMs: 60 * 1000, //1 minute window
    max: 100, //100 requests max
})

const rateLimiterMiddleware = (req, res, next) => {
    apiLimiter(req,res,next)
}

module.exports = rateLimiterMiddleware;