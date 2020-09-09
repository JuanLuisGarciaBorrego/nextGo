export const buildInfoPaginationObject = (data) => {
    return {
        total: data.total,
        page: data.page,
        next: data.links.next,
        previous: data.links.previous
    }
};

export default {buildInfoPaginationObject};
