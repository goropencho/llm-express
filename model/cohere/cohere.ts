import { config } from 'dotenv';
config();
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import {FaissStore} from 'langchain/vectorstores/faiss';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { Cohere } from 'langchain/llms/cohere';

const apiKey = process.env.COHERE_API_KEY

export async function embeddingFile(fileName, path) {
    const loader = new TextLoader(`./uploads/${fileName}`);
    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 20
    });
    let documents = await splitter.splitDocuments(docs);
    const embeddings = new CohereEmbeddings({
        verbose: true,
        apiKey: apiKey
    });
    // const vectorstores = await Chroma.fromDocuments(documents, embeddings);
    const vectorstores = await FaissStore.fromDocuments(documents, embeddings);
    await vectorstores.save(path);
}

export async function retriever(question: string, path: string) {
    const embeddings = new CohereEmbeddings({ apiKey });
    const vectorstores = await FaissStore.load(path, embeddings);
    const model = new Cohere({ apiKey, temperature: 0, maxRetries: 1 });
    const chain = new RetrievalQAChain({
        combineDocumentsChain: loadQAStuffChain(model),
        retriever: vectorstores.asRetriever(),
        returnSourceDocuments: true,
    });
    const res = await chain.call({
        query: question
    });
    console.log(res.text);
    return res.text;
}


module.exports = {
    retriever,
    embeddingFile
}