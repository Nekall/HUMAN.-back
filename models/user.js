'use strict';

const phoneValidationRegex = new RegExp('^[0-9]*$');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 30],
          msg: "User's firstname must be between 1 and 30 characters long."
        },
        notEmpty: { msg: "Firstname of a user cannot be empty."}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 30],
          msg: "User's name must be between 1 and 30 characters long."
        },
        notEmpty: { msg: "Name of a user cannot be empty."}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This email address has already been used in our database."
      },
      validate: {
        isEmail: {msg: "Enter a valid email address."},
        notEmpty: { msg: "User's email must be filled in."}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password cannot be empty."}
      }
    },
    streetAddress: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 350],
          msg: "User's address must be between 5 and 350 characters long."
        }
      }
    },
    zipCode: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "Use only numbers for the zip code."}
      }
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 50],
          msg: "State must be between 5 and 50 in length."
        },
        notEmpty: { msg: "State cannot be empty."}
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 100],
          msg: "City must be between 1 and 100."
        },
        notEmpty: { msg: "City cannot be empty."}
      }
    },
    country: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 50],
          msg: "Country must be between 1 and 50."
        },
        notEmpty: { msg: "Country cannot be empty."}
      }
    },
    phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
        is: ["^[0-9]*$"]
      },
    },
    tickets: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
