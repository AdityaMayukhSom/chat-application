import { io } from 'socket.io-client';
const serverURL = import.meta.env.VITE_SERVER_URL;
export const socket = io(serverURL);