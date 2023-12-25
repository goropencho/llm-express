import express from "express";
const router = express.Router();
const cohereController = require("../controllers/cohere/cohere")


router
    .post("/uploadFile", cohereController.uploadFile)
    .get("/", cohereController.answerQuestion)
module.exports = router;