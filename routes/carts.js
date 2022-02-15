const { Cart } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  //CREATE
  app.post("/cart", (req, res) => {
    //Check if author or Admin
    Cart.create(req.body)
    .then(cart => {
      const message = "Cart has been created.";
      return res.status(201).json({ message, data: cart })
    })
    .catch(error => {
      const message = "Cart was NOT created. Please try again.";
      return res.status(500).json({ message })
    })
  })

  //INDEX (Display All)
  app.get("/carts", (req, res) => {
    //Check if Admin
    Cart.findAll()
    .then(carts => {
      const message = "List of carts has been retrieved.";
      res.status(200).json({ message, data: carts })
    })
    .catch(error => {
      const message = "List of carts could not be retrieved. Please try again.";
      return res.status(500).json({ message, error })
    })
  })

  //SHOW
  app.get("/cart/:id", (req, res) => {
    //Check si author or Admin
    Cart.findByPk(req.params.id)
    .then(cart => {
      if(cart === null){
        const message =  `Cart with the id ${req.params.id} does not exist. Try again with another id.`;
        return res.status(404).json({ message })
      }
      const message = `Cart with the id ${req.params.id} has been found.`
      return res.status(200).json({ message, data: cart })
    })
    .catch(error =>{
      const message = `Cart with the id ${req.params.id} could not be retrieved. Try again in a few moments or with another id.`
      return res.status(500).json({ message, data: error})
    })
  })

  //UPDATE
  app.put("/cart/:id", (req, res) => {
    //Check if author or Admin
    const id = req.params.id
    Cart.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Cart.findByPk(id).then(cart => { //on return pour transmettre l'erreur eventuelle au prochain bloc catch
        if(cart === null){
          const message = "The requested cart does not exist. Try again with another ID.";
          return res.status(404).json({ message })
        }
        const message = `Cart ${cart.name} has been modified.`;
        res.json({message, data: cart })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = "Cart could not be modified. Please try again in a few moments.";
      return res.status(500).json({ message, data: error})
    })
  })

  //DESTROY
  app.delete("/cart/:id", (req, res) => {
    //Check si Admin
    Cart.findByPk(req.params.id).then(cart => {
      const cartDeleted = cart;
      Cart.destroy({
        where: { id: cart.id }
      })
      .then(_ => {
        const message = `Cart named "${cartDeleted.name}" has been deleted.`;
        return res.status(200).json({message, data: cartDeleted })
      })
      .catch(error => {
        const message = "Cart could NOT be deleted. Please try again.";
        return res.status(500).json({ message })
      })
    })
  })
}
