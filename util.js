export const errorHandler = (err, req, res, next) => {
    res.status(err.response?.status ?? 500).send(err.response?.data?.message ?? "서버에러!!!")
}

export const getFilter = (filter) => {
    for(const key in filter) {
        filter[key] ?? delete filter[key]
    }
    return filter
}