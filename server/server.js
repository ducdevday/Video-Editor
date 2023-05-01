const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/index");
// import authRouter from "./routes/authRouter.js";

const app = express();

dotenv.config({
  path: "./config.env",
});
// const db = process.env.DATABASE.replace(
//     "<password>",
//     process.env.DATABASE_PASSWORD
// );
const db = process.env.MONGODB_URI;
// Connect to the MongoDB cluster
mongoose.connect(
  "mongodb+srv://zimb240:0908218507zimb240@cluster0.4emxftv.mongodb.net/videoEditor?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
app.use("/api", routes);

const port = process.env.PORT || 5000;

const sever = app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});