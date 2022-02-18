'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 80],
          msg: "Product's name must be between 5 and 80 characters long."
        },
        notEmpty: { msg: "Name of a product cannot be empty."}
      }
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: { msg: "Price of a product cannot be empty."}
      }
    },
    sizes: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: { msg: "Sizes of a product cannot be empty."}
      }
    },
    reference: {
      type: DataTypes.INTEGER,
      unique: {
        msg: "This reference already exists."
      },
      validate: {
        notEmpty: { msg: "Reference of a product cannot be empty."}
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: "Quantity of a product cannot be empty."}
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [15, 500],
          msg: "Product's description must be between 15 and 500 characters long."
        },
        notEmpty: { msg: "Description of a product cannot be empty."}
      }
    },
    colors: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: { msg: "Colors of a product cannot be empty."}
      }
    },
    care: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Price of a product cannot be empty."}
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    composition: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 250],
          msg: "Composition must be between 5 and 250 characters long."
        },
        notEmpty: { msg: "Name of a product cannot be empty."}
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
