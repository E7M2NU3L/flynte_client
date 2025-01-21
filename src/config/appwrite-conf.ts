import { Client, Storage } from 'appwrite';

const client = new Client();
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const bucket = new Storage(client);