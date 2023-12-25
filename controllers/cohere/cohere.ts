import { embeddingFile } from '../../model/cohere/cohere'
import { readdirSync } from 'fs';

const uploadFile = async (req, res) => {
    let sampleFile;
    let uploadedFile;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No Files were uploaded.")
    }
    sampleFile = req.files.file;

    await sampleFile.mv("." + "/uploads/" + sampleFile.name)

    await embeddingFile(sampleFile.name, "./db/").catch(err => {
        console.log(err)
        return res.status(500).send(err);
    })
    return res.status(200).json({ "message": "Upload Successful" })
}

const askQuestion = (req, res) => {

}

module.exports = { uploadFile }