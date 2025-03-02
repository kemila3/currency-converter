import express from "express";
import router from "./src/routes/routes.js";
const app = express();
app.use(express.json());
const port = 3000;


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/", router);