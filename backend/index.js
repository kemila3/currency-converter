import express from "express";
import router from "./src/routes/routes.js";
import { dbConnect } from "./src/config/dbConfig.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

dbConnect();



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/", router);