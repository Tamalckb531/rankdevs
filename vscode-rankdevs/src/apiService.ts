import * as vscode from "vscode";
import * as dotenv from "dotenv";
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

interface Payload{
    apiKey: string,
    typingTime: number,
    language: string,
    timestamp:number,
}

const sendTypingDataToBackend = async ({ apiKey,typingTime,language}:Payload) => {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
        console.error('Backend URL not found! Please check your .env file.');
        return;
    }

    const payload:Payload = {
        apiKey,
        typingTime,
        language,
        timestamp: Date.now()
    } 
}
export default sendTypingDataToBackend;