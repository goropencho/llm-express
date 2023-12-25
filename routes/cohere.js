const express = require("express")
const router = express.Router();
const cohereController = require("../controllers/cohere/cohere")


router
    .post("/uploadFile", cohereController.uploadFile)
    .get("/", (req, res) => { return res.status(204).send() })



module.exports = router;