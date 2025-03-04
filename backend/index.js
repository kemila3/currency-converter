import express from "express";
import router from "./src/routes/routes.js";
import { dbConnect } from "./src/config/dbConfig.js";
import cors from "cors";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url'
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

const port = process.env.PORT || 5000;

dbConnect();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/", router);