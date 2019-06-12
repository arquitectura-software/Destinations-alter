const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

/* MIDDLEWARE */

app.use(morgan("dev"));
app.use(bodyParser.json());

/* SETTINGS */

app.set("port", process.env.PORT || 3000);

/* ROUTES  */
require("./src/routes/destinationRoutes")(app);
app.listen(app.get("port"), () => {
  console.log(`sever on port ${app.get("port")}`);
});
