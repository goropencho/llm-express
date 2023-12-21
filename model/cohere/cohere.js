import { config } from 'dotenv';
config();
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
// import { Chroma } from 'langchain/vectorstores/chroma';
import {FaissStore} from 'langchain/vectorstores/faiss';

const loader = new TextLoader("./restaurant.txt");
const docs = await loader.load()
const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20
});
let documents = await splitter.splitDocuments(docs);
const embeddings = new CohereEmbeddings({
    verbose: true,
    apiKey: process.env.COHERE_API_KEY
});
// const vectorstores = await Chroma.fromDocuments(documents, embeddings);
const vectorstores = await FaissStore.fromDocuments(documents, embeddings)
await vectorstores.save("./")