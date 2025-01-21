export const createQueryString = (params) => {
    const query = new URLSearchParams()

    if (params?.sort) {
        query.append("sort", JSON.stringify(params.sort))
    }

    if (params?.filter) {
        query.append("filter", JSON.stringify(params.filter))
    }

    return query.toString()
}
