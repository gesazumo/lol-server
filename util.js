export const errorHandler = (err, req, res, next) => {
    // res.send(err)
    console.log(err)
    res.status(err.response.status).send(err.response.data.message)
}