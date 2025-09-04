const { apiSchema } = require("./validator");

const reqValidate = (req, res, next) => {
  const params = {
    page: req.query.page,
    limit: req.query.limit,
  };

  apiSchema
    .validate(params, { abortEarly: false })
    .then((validatedParams) => {
      req.validatedParams = validatedParams;
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: "Validation failed",
        errors: err.errors,
      });
    });
};

module.exports = { reqValidate };
