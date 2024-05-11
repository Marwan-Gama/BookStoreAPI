const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const mongoose = require("mongoose");

// Init app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/bookStoreDB")
  .then(() => {
    console.log("Conected to MongoDB...");
  })
  .catch((error) => {
    console.log("Conection to MongoDB Filed!", error);
  });

// Apply Middlwares
app.use(express.json());

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

// Runing the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is runinig on por ${PORT}`));
