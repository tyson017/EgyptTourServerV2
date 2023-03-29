const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const db = require("./models/index.js");
const router = require("./routes/auth.routes.js");

const userroutes = require('./routes/user.routes.js');
const authroutes = require('./routes/auth.routes.js');

// require('./routes/auth.routes')(router);
// require('./routes/user.routes')(router);




const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };

  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  app.use(
    cookieSession({
      name: "EgyptTour-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true
    })
  );


  app.use('/',userroutes);
  app.use('/',authroutes);


  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to EgyptTour application." });
  });

  




  
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });  







// database connection

const Role = db.role;



db.mongoose
  .set('strictQuery',true)
  .connect("mongodb+srv://david-wasfy10:David_123@cluster0.jicfcte.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
   
  });


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

    

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
