const { Sequelize, DataTypes } = require("sequelize")
const UserModel = require("../models/user")
const CartModel = require("../models/cart")
const ProductModel = require("../models/product")
const bcrypt = require("bcrypt")

const sequelize = new Sequelize('HUMAN_database_development', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const User = UserModel(sequelize, DataTypes);
const Cart = CartModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => { //force: true pour drop la BDD et la recréer à chaque démarrage

    bcrypt.hash('admin', 10)
    .then(hash => {
      User.create({
          firstName: 'admin',
          password: hash
        })
      })
    .then(_ => console.log("Compte Admin créé. Username: admin; Password: admin."))

    console.log(`La base de donnée nommée ${sequelize.config.database}, a bien été initialisée !`)
  })
}

module.exports = {
  initDb, User
}
