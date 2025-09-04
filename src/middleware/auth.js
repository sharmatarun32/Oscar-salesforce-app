require("dotenv").config();

const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const expectedUsername = process.env.USER_NAME;
  const expectedPassword = process.env.PASSWORD;

  if (username === expectedUsername && password === expectedPassword) {
    return next();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = basicAuth;
