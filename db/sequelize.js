const { Sequelize, DataTypes } = require("sequelize")
const UserModel = require("../models/user")
const CartModel = require("../models/cart")
const ProductModel = require("../models/product")
const bcrypt = require("bcrypt")

const sequelize = new Sequelize('HUMAN_database_development', 'root', '', {
  host: process.env.DATABASE_URL,
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
  return sequelize.sync({force: false}).then(_ => { //force: true pour drop la BDD et la recréer à chaque démarrage
/*
    bcrypt.hash('admin', 10)
    .then(hash => {
      User.create({
          email: 'admin@admin.admin',
          password: hash,
          firstName: "Admin",
          lastName: "Admin",
          streetAddress: "Admin",
          zipCode: "666666",
          state: "Admin",
          city: "Admin",
          country: "Admin",
          phone: "060000000",
          tickets: null,
          isAdmin: true,
        })
      })
    .then(_ => console.log("Admin account created. Username: admin@admin; Password: admin."))
*/
    console.log(`The database named ${sequelize.config.database}, has been initialized !`)
  })
}

module.exports = {
  initDb, User, Product, Cart
}
