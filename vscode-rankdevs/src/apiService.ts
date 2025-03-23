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

type Props = Omit<Payload, 'timestamp'>;

const sendTypingDataToBackend = async ({ apiKey,typingTime,language}:Props) => {
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

    try {
        const response = await fetch(`${backendUrl}/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Typing data sent successfully!');
        } else {
            console.error('Failed to send data to backend:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending typing data:', error);
    }
}
export default sendTypingDataToBackend;