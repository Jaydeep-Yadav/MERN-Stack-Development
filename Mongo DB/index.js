const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const student = new mongoose.Schema({
  name: String,
  workout: Boolean,
  height: Number,
});

const Student = new mongoose.model("student", student);

//? const adder = async () => {
//   const ss = await Student.create({
//         name :"jaydeep",
//         workout: true,
//         height: 5
//   });

//   console.log(ss);
// };

const adder = async () => {
  const ss = await Student.find({ height: { $eq: 5 } });
  console.log(ss);
};

adder();
