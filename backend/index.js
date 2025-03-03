import express from "express";
import router from "./src/routes/routes.js";
import { dbConnect } from "./src/config/dbConfig.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors, (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const port = 3000;

dbConnect();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/", router);