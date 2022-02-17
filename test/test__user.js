const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");
const { Sequelize, DataTypes } = require("sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.get("/test", (req, res) => {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], privateKey);
    console.log(decoded);
    return res.status(200).json({data: decoded })
  })

}
