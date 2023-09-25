// const vegetables = [
//   {
//     name: "tomato",
//     color: "red",
//     readyToEat: true,
//   },
//   {
//     name: "potato",
//     color: "yellow",
//     readyToEat: true,
//   },
//   {
//     name: "carrot",
//     color: "orange",
//     readyToEat: false,
//   },
//   {
//     name: "onion",
//     color: "red",
//     readyToEat: true,
//   },
//   {
//     name: "broccoli",
//     color: "green",
//     readyToEat: false,
//   },
// ];

// module.exports = vegetables;

const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  readyToEat: {
    type: Boolean,
  },
});

const Vegetable = mongoose.model("Vegetable", vegetableSchema);

module.exports = Vegetable;
