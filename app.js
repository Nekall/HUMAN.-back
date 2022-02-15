const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./db/sequelize");
const cors = require("cors");

const app = express()
const port = 3000

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(cors())

sequelize.initDb()
//Routes Init
require("./routes/initial")(app)

//Routes User
//require("./routes/user/login")(app)
//require("./routes/user/register")(app)
//require("./routes/user/all")(app)
require("./routes/users")(app)

//Routes Product
//require("./routes/product/create")(app)
//require("./routes/product/modify")(app)
//require("./routes/product/delete")(app)

//Routes Cart
//require("./routes/cart/create")(app)
//require("./routes/cart/modify")(app)
//require("./routes/cart/delete")(app)


app.use(({res}) =>{
  const message = "Impossible de trouver la ressource demandée ! Veuillez essayer une autre URL."
  res.status(404).json({message})
})

app.listen(port, () => console.log(`App démarrée sur: localhost:${port}`))
