import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { registerHandlers } from './handler';

let io: Server;

export const initSockets = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.on('connection', (socket) => {
        registerHandlers(io, socket);
    });

    console.log('Socket.io initialized');
    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized. Call initSockets first.');
    }
    return io;
};
