import {config} from 'dotenv';
config()
import express, { json } from "express";
import fileUpload from 'express-fileupload';
const app = express()
const port = process.env.PORT_NUM || 3000
app.use(json())
app.use(fileUpload())
app.get('/', (req, res) => {
    res.send("HELLO ")
})

app.use("/cohere", require("./routes/cohere"))

app.listen(port, () => {
    console.log("Server running on port:",port)
});
