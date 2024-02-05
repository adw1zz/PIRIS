const ApiError = require('../exceptions/api-error');

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ data: { message: err.message, errors: err.errors } })
    }
    return res.status(500).json({ data: { message: 'Back-end error' } })
}