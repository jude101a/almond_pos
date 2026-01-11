
// centralized error handling middleware

const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err);
    const status = err?.status || 500;
    const message = status === 500 ? "Internal Server Error" : err.message;
    const payload = { message };
    if (status !== 500) payload.error = err.message;
    res.status(status).json(payload);
}

export default errorHandler;