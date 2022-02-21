const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
//CREATE
app.post("/register", (req, res) => {
  if(req.body.password != req.body.passwordConfirm){
    const message = "Passwords are not the same.";
    return res.status(400).json({ message })
  }

  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    User.create({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetAddress: req.body.streetAddress,
        zipCode: req.body.zipCode,
        state: req.body.state,
        city: req.body.city,
        country: req.body.country,
        phone: req.body.phone,
        tickets: null,
      })
    })
  .then(_ => {
    const message = `User ${req.body.email} has been created.`;
    res.status(201).json({ message, email: req.body.email})
  })
  .catch(error => {
    const message = "User has NOT been created. Please try again.";
    return res.status(401).json({ message, data: error })
  })
})

//LOGIN
app.post("/login", (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then(user => {

    if(!user){
      const message = "This user does not exist.";
      return res.status(404).json({ message })
    }

    bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
      if(!isPasswordValid){
        const message = "Wrong password.";
        return res.status(401).json({ message })
      }

      const token = jwt.sign(
        { userId: user.id },
        privateKey,
        { expiresIn: "24h" }
      )

      const message = "User has been successfully logged in";
      return res.status(200).json({ message, data: user, token })
    })
  })
  .catch(error => {
    const message = "User has NOT been logged in. Please try again.";
    return res.status(401).json({ message, data: error })
  })
})

  //INDEX (Display All)
  app.get("/users", (req, res) => {
    //Check if Admin
    User.findAll()
    .then(users => {
      const message = "List of users has been successfully collected.";
      res.status(200).json({ message, data: users })
    })
    .catch(error => {
      const message = "List of users could not be retrieved. Please try again.";
      return res.status(500).json({ message, error })
    })
  })

  //SHOW
  app.get("/user/:id", (req, res) => {
    //Check if author or Admin
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: {exclude: ['password']},
    })
    .then(user => {
      if(user === null){
        const message = `User with the id ${req.params.id} does not exist. Try again with another id.`;
        return res.status(404).json({ message })
      }
      const message = `User with the id ${req.params.id} has been found.`;
      return res.status(200).json({ message, data: user })
    })
    .catch(error =>{
      const message = `The user with the id ${req.params.id} could not be retrieved. Try again in a few moments or with another id.`;
      return res.status(500).json({ message, data: error})
    })
  })

  //UPDATE
  app.put("/user/:id", (req, res) => {
    //Check if author or Admin
    const id = req.params.id
    User.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return User.findByPk(id).then(user => { //on return pour transmettre l'erreur eventuelle au prochain bloc catch
        if(user === null){
          const message = "The requested user does not exist. Try again with another user.";
          return res.status(404).json({ message })
        }
        const message = `User ${user.email} has been modified.`;
        res.status(200).json({message, data: user })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = "User could not be changed. Please try again in a few moments.";
      return res.status(500).json({ message, data: error})
    })
  })

  //DESTROY
  app.delete("/user/:id", (req, res) => {
    //Check if author or Admin
    User.findByPk(req.params.id).then(user => {
      const userDeleted = user;
      User.destroy({
        where: { id: user.id }
      })
      .then(_ => {
        const message = `User : ${userDeleted.email} has been deleted.`;
        return res.status(200).json({message, data: userDeleted })
      })
      .catch(error => {
        const message = "The user could NOT be deleted. Please try again.";
        return res.status(500).json({ message })
      })
    })
  })

}
