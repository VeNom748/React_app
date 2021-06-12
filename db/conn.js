const mongoose = require("mongoose");

// MongoDb Specific Stuff
const db = process.env.DATABASE;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
    console.log("Connection Successful")
}).catch((err) => {
    console.log("Connection Fail")
    console.log(err)
})

