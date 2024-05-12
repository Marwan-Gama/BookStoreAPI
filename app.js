const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const connectToDB = require("./config/db");
const dotenv = require("dotenv").config();

// Init app
const app = express();

// Connect to MongoDB
connectToDB();

// Apply Middlwares
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// Error handling
app.use(notFound);
app.use(errorHandler);

// Runing the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is runinig on por ${PORT}`));
