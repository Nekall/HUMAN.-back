const { Product } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  //CREATE
  app.post("/product", (req, res) => {
    //Check if Admin
    let slug = (req.body.name).toLowerCase().replace(/ /ig, "-");
    Product.create({
        slug: slug,
        name: req.body.name,
        sizes: req.body.sizes,
        reference: req.body.reference,
        quantity: req.body.quantity,
        description: req.body.description,
        colors: req.body.colors,
        care: req.body.care,
        composition: req.body.composition
      })
    .then(product => {
      const message = "Product has been created.";
      return res.status(201).json({ message, data: product })
    })
    .catch(error => {
      const message = "Product was NOT created. Please try again.";
      return res.status(500).json({ message })
    })
  })

  //INDEX (Display All)
  app.get("/products", (req, res) => {
    Product.findAll()
    .then(products => {
      const message = "List of products has been retrieved.";
      res.status(200).json({ message, data: products })
    })
    .catch(error => {
      const message = "List of products could not be retrieved. Please try again.";
      return res.status(500).json({ message, error })
    })
  })

  //SHOW
  app.get("/product/:id", (req, res) => {
    Product.findByPk(req.params.id)
    .then(product => {
      if(product === null){
        const message =  `Product with the id ${req.params.id} does not exist. Try again with another id.`;
        return res.status(404).json({ message })
      }
      const message = `Product with the id ${req.params.id} has been found.`
      return res.status(200).json({ message, data: product })
    })
    .catch(error =>{
      const message = `Product with the id ${req.params.id} could not be retrieved. Try again in a few moments or with another id.`
      return res.status(500).json({ message, data: error})
    })
  })

  //UPDATE
  app.put("/product/:id", (req, res) => {
    //Check if Admin
    const id = req.params.id
    Product.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Product.findByPk(id).then(product => { //on return pour transmettre l'erreur eventuelle au prochain bloc catch
        if(product === null){
          const message = "The requested product does not exist. Try again with another ID.";
          return res.status(404).json({ message })
        }
        const message = `Product ${product.name} has been modified.`;
        res.json({message, data: product })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = "Product could not be modified. Please try again in a few moments.";
      return res.status(500).json({ message, data: error})
    })
  })

  //DESTROY
  app.delete("/product/:id", (req, res) => {
    //Check if Admin
    Product.findByPk(req.params.id).then(product => {
      const productDeleted = product;
      Product.destroy({
        where: { id: product.id }
      })
      .then(_ => {
        const message = `Product named "${productDeleted.name}" has been deleted.`;
        return res.status(200).json({message, data: productDeleted })
      })
      .catch(error => {
        const message = "Product could NOT be deleted. Please try again.";
        return res.status(500).json({ message })
      })
    })
  })
}
