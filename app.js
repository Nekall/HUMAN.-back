const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./db/sequelize");
const cors = require("cors");

const app = express()
const PORT = process.env.PORT || 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
//  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(cors())

sequelize.initDb()

require("./routes/initial")(app)
require("./routes/users")(app)
require("./routes/products")(app)
require("./routes/carts")(app)

//test section
require("./test/test__user")(app)

app.use(({res}) =>{
  const message = "Could not find the requested resource! Please try another URL."
  res.status(404).json({message})
})

app.listen(PORT, () => console.log(`App started on: localhost:${PORT}`))
