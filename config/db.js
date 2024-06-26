const mongoose = require("mongoose");

async function connectToDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Conected to MongoDB...");
    })
    .catch((error) => {
      console.log("Conection to MongoDB Filed!", error);
    });
}

module.exports = connectToDB;
