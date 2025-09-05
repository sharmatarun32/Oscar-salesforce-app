const getPageAndLimit = (args = {}) => {
const page = args.page > 0 ? args.page : 1;
const limit = args.limit > 0 ? args.limit : 10;
const orderBy = args.orderBy || "DESC";
const sortBy = args.sortBy || (args.useId ? "id" : "row_modified_on");
const skip = limit * (page - 1);
return { skip, limit, page, orderBy, sortBy };
};
 
module.exports = { getPageAndLimit };
 