const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
const jsxEngine = require("jsx-view-engine");
const dotenv = require("dotenv"); // Import dotenv module to connect to your env file
const port = 3000;

// Data
// const fruits = require("./models/fruits.js"); //NOTE: it must start with ./ if it's just a file, not an NPM package
const Fruit = require("./models/fruits");
const Vegetable = require("./models/vegetables.js");

//adding view templates

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// console.log(process.env);

//near the top, around other app.use() calls
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

// Seed Route
app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

app.get("/vegetables/seed", async (req, res) => {
  try {
    await Vegetable.create([
      { name: "broccoli", color: "brown", readyToEat: true },
      { name: "carrot", color: "orange", readyToEat: true },
      { name: "greenbeans", color: "green", readyToEat: true },
    ]);
    res.redirect("/vegetables");
  } catch (err) {
    console.error(err);
  }
});

// routes INDUCES
// Index route - All the fruits
app.get("/fruits/", async (req, res) => {
  // res.send(fruits);
  // res.render("fruits/Index", { fruits: fruits });
  try {
    const fruits = await Fruit.find();
    res.render("fruits/Index", { fruits: fruits });
  } catch (error) {
    console.error(error);
  }
  //^^^ This is used for the latest version of mongoose
});

app.get("/vegetables/", async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.render("vegetables/Index", { vegetables: vegetables });
  } catch (err) {
    console.error(err);
  }
});

//New - get the form to add a new fruit.

app.get("/fruits/new", function (req, res) {
  res.render("fruits/New");
});

app.get("/vegetables/new", function (req, res) {
  res.render("vegetables/New");
});

//delete
app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

app.delete("/vegetables/:id", async (req, res) => {
  try {
    await Vegetable.findByIdAndRemove(req.params.id);
    res.redirect("/vegetables");
  } catch (err) {
    console.error(err);
  }
});

// Update

app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/fruits");
  } catch (err) {
    console.error(err);
  }
});

app.put("/vegetables/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    await Vegetable.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/vegetables");
  } catch (err) {
    console.error(err);
  }
});

//Create - Add a new fruit to your fruits
app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.create(req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

app.post("/vegetables", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // res.send("data received");
    await Vegetable.create(req.body);
    res.redirect("/vegetables"); //send the user back to /vegetables
  } catch (err) {
    console.error(err);
  }
});

//Edit
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", { fruit: foundFruit });
  } catch (error) {
    console.log(error);
  }
});

app.get("/vegetables/:id/edit", async (req, res) => {
  try {
    const foundVeggie = await Vegetable.findById(req.params.id);
    res.render("vegetables/Edit", { vegetable: foundVeggie });
  } catch (err) {
    console.error(err);
  }
});

// Show route - one particular fruit by ID
app.get("/fruits/:id", async (req, res) => {
  // // res.send(fruits[req.params.indexOfFruitsArray]);
  // res.render("fruits/Show", {
  //   //second param must be an object
  //   fruit: fruits[req.params.indexOfFruitsArray], //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  // }); // renders the info using the appropriate template
  try {
    // const id = Number(req.params.indexOfFruitsArray);
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", { fruit: fruit });
  } catch (err) {
    console.error(err);
  }
});

app.get("/vegetables/:id", async (req, res) => {
  try {
    const vegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Show", { vegetable: vegetable });
  } catch (err) {
    console.error(err);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on http://localhost:${process.env.PORT || port}`);
});

//Notes

// URL	HTTP Verb	Action	Used For	Mongoose Model Function
// /things/	GET	index	Displaying a list of all things	.find
// /things/new	GET	new	Display HTML form for creating a new thing	N/A
// /things	POST	create	Create a new thing	.create
// /things/:id	GET	show	Display a specific thing	.findById
// /things/:id/edit	GET	edit	Return an HTML form for editing a thing	.findById
// /things/:id	PATCH/PUT	update	Update a specific thing	.findByIdAndUpdate
// /things/:id	DELETE	destroy	Delete a specific thing	.findByIdAndDelete
