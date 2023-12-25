import { config } from 'dotenv';
config();
import { FaissStore } from 'langchain/vectorstores/faiss';
import { CohereEmbeddings } from 'langchain/embeddings/cohere';
import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { Cohere } from 'langchain/llms/cohere';

const apiKey = process.env.COHERE_API_KEY

async function retriever(question: string, path: string) {
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
}

module.exports = {
    retriever
}