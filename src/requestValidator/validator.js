const Yup = require("yup");

const apiSchema = Yup.object().shape({
  page: Yup.number()
    .integer("page must be an integer")
    .positive("page must be a positive number")
    .default(1),
  limit: Yup.number()
    .integer("limit must be an integer")
    .positive("limit must be a positive number")
    .default(10),
});

module.exports = { apiSchema };
