const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const app = express();

//For Gatting Cookie from page
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// For Handling API's
app.use(express.urlencoded());
app.use(express.json())

// PORT 
const port = process.env.PORT || 4000;

// MongoDB Connection
require("./db/conn");

// Routing
app.use(require("./router/auth"))


// For Diployment on Heroku 
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
}

app.listen(port, () => {
    console.log(`Application started on http://localhost:${port}`)
})