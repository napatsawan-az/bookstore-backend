import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
import "dotenv/config";

const app = express();
const database = process.env.MONGODB_URL;

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CROS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: ["http://localhost:5173", "https://bookstore-crud-web.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to Bookstore MERN Stack");
});

app.use("/books", bookRoute);

mongoose
  .connect(database)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
