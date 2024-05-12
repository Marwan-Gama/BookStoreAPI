const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");

const dotenv = require("dotenv");
dotenv.config();

// Init app
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conected to MongoDB...");
  })
  .catch((error) => {
    console.log("Conection to MongoDB Filed!", error);
  });

// Apply Middlwares
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);
app.use("/api/users", usersPath);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Runing the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is runinig on por ${PORT}`));
